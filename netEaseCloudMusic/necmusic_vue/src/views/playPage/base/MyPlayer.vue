<template>
    <div class="my-player">
        <div class="desc-needle" :class="{active:playing}"></div>
        <div class="player-box">
            <h2 class="title">网易云音乐</h2>
            <div class="song-desc" :class="{active:playing}">
                <div class="song-img" @click="togglePlay">
                    <img class="song-img" :src="songInfo.picUrl"/>
                    <img class="play-pause" src alt v-show="!playing"/>
                </div>
            </div>
        </div>
        <audio
                :src="songInfo.songUrl"
                muted="true"
                :loop=true
                @timeupdate="getCurrentTime"
                ref="myAudio"></audio>
        <!-- 歌词start -->
        <div class="lyric-box">
            <h2 class="lyric-title">
                <span class="name">{{songInfo.name}}-</span>
                <span class="singer">{{songInfo.singer}}</span>
            </h2>
            <div class="lyric-item">
                <div class="item" :style="{transform:`translateY(${-lyricIndex*22+'px'})`}">
                    <p

                            class="lyric"
                            v-for="(lyric,index) in lyricList"
                            :key="index"
                            :class="{active:index===lyricIndex}"
                    >
                        {{lyric.content}}
                    </p>
                </div>
            </div>
        </div>
        <!-- 歌词end -->
        <!-- 进度条start -->
        <div class="progress-box">
            <progress :max="timeLongNumber" :value="currentTimeNumber" class="my-progress"></progress>
            <div class="boll" :style="{transform:mathLeft}"></div>
            <span class="now-time time">{{currentTime}}</span>
            <span class="time-long time">{{timeLong}}</span>
        </div>
        <!-- 进度条end -->
    </div>
</template>

<script>
    import {reqGetLyric} from "../../../api/music";
    export default {
        name: "MyPlayer",
        props: ["songInfo"],
        data() {
            return {
                playing: false, //记录是否正在播放
                lyricList: [],
                currentTime: '', //进度时间00:00字符串
                timeLong: '', //歌曲总时长00:00字符串
                currentTimeNumber:0,//进度时间s
                timeLongNumber:0,//总时长s
                mathLeft:'',//记录小球left
                lyricIndex:0,//正在显示的index.根据index控制歌词
                preTime:0,//时间戳节流preTime
            };
        },
        mounted() {
            this.getMusicLyric();
        }
        ,
        methods: {
            togglePlay() {  //控制播放状态
                if (this.playing) {
                    this.playing = false;
                    this.$refs.myAudio.pause(); //暂停,停止获取播放进度
                } else {
                    this.playing = true;
                    this.$refs.myAudio.play(); //播放,开启定时器获取播放进度
                    this.timeLongNumber = Math.ceil(this.$refs.myAudio.duration); //总时长向上取整s为单位
                    this.timeLong = this.stringTime(this.timeLongNumber);//总时长'03:10'
                }
            }
            ,
            async getMusicLyric() {//处理歌词,网易云歌词是一整串字符串,将时间和歌词条目提取出来
                const result = await reqGetLyric({id: this.songInfo.songId});
                let _lyricList = result.lrc.lyric.split('\n').map(item => {
                    let cItem = item.split(']') || '';//连续换行或最后一个换行分割后会出现空串,split出错
                    return {
                        time: cItem[0].slice(1, 6),
                        content: cItem[1],
                    }
                });
                this.lyricList = Object.freeze(_lyricList)
                this.togglePlay();//play() first警告 浏览器是不希望我们自动播放的,手动来一下
                // 但是播放仍然会有警告,解决方案,给audio加上muted属性,muted属性设置返回音频是否应该被静音(关闭声音)
            }
            ,
            getCurrentTime() {
                let nowTime = Date.now();//获取当前时间戳
                //歌词的时间节点是00:00以秒为单位的,节流不能大于1s,大于1s可能跳过了歌词条目
                if(nowTime-this.preTime>500){   //节流每隔500ms执行一次
                    this.findLyric();
                    this.currentTimeNumber = + this.$refs.myAudio.currentTime.toString().split(".")[0]; //播放进度s为单位
                    this.mathLeft = `translateX(${(this.currentTimeNumber / this.timeLongNumber) * 260 + "px"})`;//进度条小球位置
                    this.currentTime = this.stringTime(this.currentTimeNumber);//进度时间
                    this.preTime = nowTime;
                }
            }
            ,
            findLyric(){//查找歌词
                let currentIndex = this.lyricList.findIndex((item)=>{
                    return item.time === this.currentTime
                });
                if(currentIndex!==-1){//找到当前进度时间的 歌词条目
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
            }
        }
    }
    ;
</script>

<style scoped lang='less'>
    .my-player {
        position:relative;
        width: 100vw;
        min-height: 100vh;
        overflow: hidden;

        /*播放指针*/

        .desc-needle.active {
            transform: translateX(-30%) rotate(0deg);
        }

        .desc-needle {
            transition: transform 0.5s;
            position: absolute;
            left: 50%;
            transform-origin: 0 0;
            transform: translateX(-30%) rotate(-20deg);
            width: 140px;
            height: 140px;
            background: url("../../../assets/images/needle-ip6.png");
            background-size: contain;
            background-repeat: no-repeat;
            z-index: 11;
        }

        .player-box {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            padding: 10px;
            z-index: 10;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;

            .title {
                color: #fff;
                font-size: 14px;
                display: inline-block;
                width:100%;
                text-align:right;
                padding-left: 25px;
                height: 20px;
                line-height: 20px;
                background: url("../../../assets/images/icon.png");
                background-repeat: no-repeat;
                background-size: contain;
                background-position: 262px 0;
            }

            .song-desc.active {
                animation: rotateActive 20s infinite linear;
            }

            @keyframes rotateActive {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }

            .song-desc {
                position: relative;
                margin: 50px auto;
                width: 296px;
                height: 296px;
                background: url("../../../assets/images/disc.png");
                background-size: contain;

                .song-img {
                    margin: 56px auto;
                    width: 184px;
                    height: 184px;
                    border-radius: 50%;
                }

                .play-pause {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                    width: 50px;
                    height: 50px;
                    border: 3px solid #fff;
                    border-radius: 50%;
                    background: url("../../../assets/images/play.png");
                    background-size: contain;
                }
            }
        }

        .lyric-box {
            text-align: center;
            position: absolute;
            bottom: 60px;
            font-size: 18px;
            padding: 10px 15px;
            width: 100vw;
            height: 220px;
            z-index: 100;

            .lyric-title {
                .name {
                    color: #fff;
                    font-size: 18px;
                }

                .singer {
                    color: #666666;
                    font-size: 16px;
                }
            }


            .lyric-item {
                position: absolute;
                top:45px;
                height:168px;
                left:0;
                right:0;
                margin:auto;
                color: #999;
                overflow: hidden;
                font-size: 14px;
                .item{
                    position:absolute;
                    top:40px;
                    left:0;
                    right:0;
                    margin:auto;
                    transform: translateY(0);
                    transition: all .5s ease;
                    .lyric {
                        text-align:center;
                        width:100%;
                        line-height: 22px;
                        transition: all .5s ease;
                    }

                    .lyric.active {
                        color: #fff;
                        font-size:16px;
                    }
                }
            }
        }

        /*进度条*/

        .progress-box {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 40px;
            z-index: 20;
            // overflow: hidden;
            .time {
                position: absolute;
                color: #fff;
                font-size: 12px;
                z-index: 15;
                top: 8px;
            }

            .now-time {
                left: -40px;
            }

            .time-long {
                right: -40px;
            }

            .my-progress:focus {
                outline: none;
            }

            .boll {
                position: absolute;
                transition: transform 0.5s ease;
                left: -6px;
                transform:translateX(0);
                top: 50%;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                box-shadow: 0 1px 3px rgba(255, 255, 255, 0.7);
                background-color: #fff;
            }

            .my-progress {
                position: relative;
                outline: none;
                width: 260px;
                height: 3px;
                border-radius: 0.1rem;
                background-color: #fff;
            }

            /* 表示总长度背景色 */

            .my-progress::-webkit-progress-bar {
                background-color: #999;
                border-radius: 0.2rem;
            }

            /* 表示已完成进度背景色 */

            .my-progress::-webkit-progress-value {
                background-color: #fff;
                border-radius: 0.2rem;
            }
        }
    }
</style>