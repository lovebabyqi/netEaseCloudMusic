<template>
    <div class="my-player" :class="{active:showMini}">
        <audio
                :src="songInfo.songUrl"
                muted
                :loop=true
                autoplay
                @timeupdate="getCurrentTime"
                ref="myAudio"/>
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
    import {reqGetLyric} from "../../../api/music";
    import DescNeedle from "./DescNeedle";//碟片
    import LyricBox from "./LyricBox";//歌词
    import SongProgress from "./SongProgress";//进度条
    import MiniPlayer from "./MiniPlayer";//mini播放器
    import {mapState} from 'vuex';

    export default {
        name: "MyPlayer",
        props: ["songInfo"],
        components: {
            DescNeedle,
            LyricBox,
            SongProgress,
            MiniPlayer
        },
        data() {
            return {
                lyricList: [],
                currentTime: '', //进度时间00:00字符串
                timeLong: '', //歌曲总时长00:00字符串
                currentTimeNumber: 0,//进度时间s
                timeLongNumber: 0,//总时长s
                mathLeft: '',//记录小球left
                lyricIndex: 0,//正在显示的index.根据index控制歌词
                preTime: 0,//时间戳节流preTime
                progressWidth:0,//组件挂载,计算一次进度条宽度,60vw
            };
        },
        mounted() {
            this.getMusicLyric();
            this.$nextTick(()=>{
                console.log(document.body.offsetWidth)
                this.progressWidth = document.body.offsetWidth *0.6;//计算progress宽度
            })
        },
        computed: mapState({
            showMini: state => state.showMini,//控制mini播放器显示
            playing: state => state.isPlaying,//记录是否正在播放
            songId: state => state.playingSongId
        })
        ,
        watch: {
            songId: function () {   //监听切歌
                this.getMusicLyric();
            },
            playing: function () {  //监听状态,控制暂停,播放
                this.togglePlay()
            }
        },
        methods: {
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
                const result = await reqGetLyric({id: this.songId||this.songInfo.songId});
                this.lyricList = result.lrc.lyric.split('\n').map(item => {
                    let cItem = item.split(']') || '';//连续换行或最后一个换行分割后会出现空串,split出错
                    return {
                        time: cItem[0].slice(1, 6),
                        content: cItem[1],
                    }
                });
                this.timeLongNumber = Math.ceil(this.$refs.myAudio.duration); //总时长向上取整s为单位
                this.timeLong = this.stringTime(this.timeLongNumber);//总时长'03:10'
                this.togglePlay();
            }
            ,
            getCurrentTime() {  //绑定了audio.timeupdate事件,计算时间,小球位置,歌词位置
                let nowTime = Date.now();//获取当前时间戳
                //歌词的时间节点是00:00以秒为单位的,节流不能大于1s,大于1s可能跳过了歌词条目
                if (nowTime - this.preTime > 300) {   //节流每隔500ms执行一次
                    this.findLyric();
                    this.currentTimeNumber = +this.$refs.myAudio.currentTime.toString().split(".")[0]; //播放进度s为单位
                    this.mathLeft = `translateX(${(this.currentTimeNumber / this.timeLongNumber) * (this.progressWidth) + "px"})`;
                    //进度条小球位置,250px不能写死,视口变化后会出问题,将progress宽度设置为60vw,挂载时计算一次60vw
                    this.currentTime = this.stringTime(this.currentTimeNumber);//进度时间
                    this.preTime = nowTime;
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
        }
    }
    ;
</script>

<style scoped lang='less'>
    .my-player {
        position: fixed;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        z-index: 101;

        .btn-back {
            position: absolute;
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

    .my-player.active {
        height: 60px;
        transition: all .5s ease;
    }

</style>