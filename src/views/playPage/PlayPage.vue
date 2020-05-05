<template>
    <div class='play-page'>
        <audio
                :src="songInfo.songUrl"

                :loop=true
                autoplay
                @timeupdate="getCurrentTime"
                ref="myAudio"/>
        <div class="my-player" v-show="!showMini">
            <div class="bg" :style="{background:`url(${songInfo.picUrl})`}"></div>
            <div class="player-container" v-show="!showMini">
                <button @click="togglePlayer" class="btn-back">返回列表</button>
                <!--指针,碟片start-->
                <desc-needle
                        :playing="playing"
                        :song-pic="songInfo.picUrl"
                />
                <!--指针,碟片end-->
                <!-- 歌词start -->
                <lyric-box
                        :lyric-index="lyricIndex"
                        :lyric-list="lyricList"
                        :song-info="songInfo"
                />
                <!-- 歌词end -->
                <!-- 进度条start -->
                <song-progress
                        :time-long-number="timeLongNumber"
                        :current-time-number="currentTimeNumber"
                        :math-left="mathLeft"
                        :time-long="timeLong"
                        :current-time="currentTime"
                        ref="refProgress"
                />
                <!-- 进度条end -->
            </div>
        </div>
        <!--miniPlayer start-->
        <mini-player
                v-show="showMini"
                :math-left="mathLeft"
                :playing="playing"
                :song-info="songInfo"
                :time-long-number="timeLongNumber"
                :current-time-number="currentTimeNumber"
        />
        <!--miniPlayer end-->
    </div>
</template>

<script>
import DescNeedle from "./base/DescNeedle";
import LyricBox from "./base/LyricBox";
import MiniPlayer from "./base/MiniPlayer";
import SongProgress from "./base/SongProgress";
import {reqGetMusicUrl,reqSongDetail,reqGetLyric} from '../../api/music';
import {mapState} from "vuex";
export default {
    name:'PlayPage',
    components:{
        DescNeedle,
        LyricBox,
        MiniPlayer,
        SongProgress
    },
    data(){
        return {
            // songId:'',
            songInfo:{},
            lyricList: [],
            currentTime: '', //进度时间00:00字符串
            timeLong: '', //歌曲总时长00:00字符串
            currentTimeNumber: 0,//进度时间s
            timeLongNumber: 0,//总时长s
            mathLeft: '',//记录小球left
            lyricIndex: 0,//正在显示的index.根据index控制歌词
            preTime: 0,//时间戳节流preTime
            progressWidth:0,//组件挂载,窗口变化，计算一次进度条宽度,60vw
        }
    },
    computed:mapState({
        showMini: state => state.showMini,//控制mini播放器显示
        playing: state => state.isPlaying,//记录是否正在播放
        songId: state => state.playingSongId
    }),
    mounted(){
        // this.getMusicLyric();
        this.$nextTick(()=>{
            this.getProgressWidth()
            this.progressWidth = document.body.offsetWidth *0.6;//计算progress宽度
            window.onresize = ()=>{
                this.getProgressWidth()
            }
        })
    },
    watch:{
        songId:function(){
            this.getMusicDetail();
            this.getMusicLyric();
        },
        playing: function () {  //监听状态,控制暂停,播放
            this.togglePlay()
        }
    },
    methods:{
        async getMusicDetail(){   //根据id获取音乐info
            // const songId = this.songId;
            const result = await reqSongDetail({ids:this.songId});
            const result2 = await reqGetMusicUrl({id:this.songId});
            let songUrl = result2.data[0].url;
            this.songInfo = {
                name:result.songs[0].name,//歌名
                singer:result.songs[0].ar.reduce((pre,next)=>{return pre  + next.name},''),//歌手名
                picUrl:result.songs[0].al.picUrl,//歌曲图片
                songId:this.songId,
                songUrl:songUrl
            }
        },
        getProgressWidth(){//屏幕尺寸变化，计算progress宽度，不然进度条小球会出问题
            this.progressWidth = document.body.offsetWidth *0.6;//计算progress宽度
        },
        togglePlay() {  //控制播放状态
            if (!this.playing) {    //根据状态 判断播放暂停
                console.log('暂停')
                this.$nextTick(() => {
                    this.$refs.myAudio.pause(); //暂停,停止获取播放进度
                })
            } else {
                console.log('播放')
                this.$nextTick(() => {
                    this.$refs.myAudio.play(); //播放,开启定时器获取播放进度
                })
            }
        }
        ,
        async getMusicLyric() {//处理歌词,网易云歌词是一整串字符串,将时间和歌词条目提取出来
            const result = await reqGetLyric({id: this.songId});
            if(result.nolyric){//无歌词，纯音乐
                this.lyricList = [{time:'00:00',content:'纯音乐，暂无歌词'}]
            }else{//有歌词
                this.lyricList = result.lrc.lyric.split('\n').map(item => {
                    let cItem = item.split(']') || '';//连续换行或最后一个换行分割后会出现空串,split出错
                    return {
                        time: cItem[0].slice(1, 6),
                        content: cItem[1],
                    }
                });
            }
            this.togglePlay();
        }
        ,
        getCurrentTime(e) {  //绑定了audio.timeupdate事件,计算时间,小球位置,歌词位置
            let nowTime = Date.now();//获取当前时间戳
            //歌词的时间节点是00:00以秒为单位的,节流不能大于1s,大于1s可能跳过了歌词条目
            if (nowTime - this.preTime > 300) {   //节流每隔300ms执行一次
                this.findLyric();
                this.currentTimeNumber = +e.target.currentTime.toString().split(".")[0]; //播放进度s为单位
                this.mathLeft = `translateX(${(this.currentTimeNumber / this.timeLongNumber) * (this.progressWidth) + "px"})`;
                //进度条小球位置,250px不能写死,视口变化后会出问题,将progress宽度设置为60vw,挂载时计算一次60vw
                this.currentTime = this.stringTime(this.currentTimeNumber);//进度时间
                this.preTime = nowTime;
                this.timeLongNumber = Math.ceil(e.target.duration); //总时长向上取整s为单位
                this.timeLong = this.stringTime(this.timeLongNumber);//总时长'03:10'
            }
        }
        ,
        findLyric() {//查找歌词
            let currentIndex = this.lyricList.findIndex((item) => {
                return item.time === this.currentTime
            });
            if (currentIndex !== -1) {//找到当前进度时间的 歌词条目
                this.lyricIndex = currentIndex
            }
        },
        stringTime(time) {   //格式时间1:1-->01:01
            const m = Math.floor((time % 3600) / 60);
            const s = Math.floor(time % 60);

            function toTwo(num) {
                //这个方法用来格式时间1-->01
                return num < 10 ? "0" + num : num + "";
            }

            return toTwo(m) + ':' + toTwo(s)
        },
        togglePlayer() {
            this.$store.commit('changePlayer', {status: 1})
        }
    },
}

</script>

<style scoped lang='less'>
    .play-page{
        .my-player{
            position: fixed;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            z-index: 101;
            .bg {
                filter: blur(15px);
                background-color: #161824;
                background-position: 50%;
                background-repeat: no-repeat;
                background-size: auto 100%;
                -webkit-transform: scale(1.5);
                -ms-transform: scale(1.5);
                transform: scale(1.5);
                -webkit-transform-origin: center top;
                -ms-transform-origin: center top;
                transform-origin: center top;
                position: fixed;
                left: 0;
                right: 0;
                top: 0;
                height: 100%;
                overflow: hidden;
                z-index: -1;
                -webkit-transition: opacity .3s linear;
                transition: opacity .3s linear;
                z-index: 1;
            }
            .btn-back {
                position: fixed;
                left: 10px;
                top: 10px;
                z-index: 101;
            }
            .player-container {
                background-color: #fff;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
        }
    }
</style>