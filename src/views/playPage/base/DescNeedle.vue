<template>
    <div class="needle">
        <div class="desc-needle" :class="{active:playing}"></div>
        <div class="player-box">
            <h2 class="title">网易云音乐</h2>
            <div class="song-desc" :class="{active:playing}">
                <div class="song-img" @click="togglePlay">
                    <img class="song-img" :src="songPic"/>
                    <img class="play-pause" src alt v-show="!playing"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DescNeedle",
        props:["songPic",'playing'],
        methods:{
            togglePlay(){
                this.$store.commit('changeStatus',{status:!this.playing})
            }
        }
    }
</script>

<style scoped lang='less'>
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
            width: 100%;
            text-align: right;
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


</style>