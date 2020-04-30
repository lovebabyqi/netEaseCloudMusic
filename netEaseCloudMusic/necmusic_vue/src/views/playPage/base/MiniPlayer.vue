<template>
    <div class="mini-player">
        <img :src="songInfo.picUrl" alt="" @click="togglePlayer" class="mini-pic" :class="{active:playing}">
        <p class="singer-info">{{songInfo.name}} - {{songInfo.singer}}</p>
        <div class="mini-progress">
            <song-progress
                    :time-long-number="timeLongNumber"
                    :current-time-number="currentTimeNumber"
                    :math-left="mathLeft"
            />
        </div>
    </div>
</template>

<script>
    import SongProgress from "./SongProgress";
    import {mapState} from "vuex";

    export default {
        name: "MiniPlayer",
        props: ['timeLongNumber', 'currentTimeNumber', 'mathLeft', 'songInfo'],
        components: {
            SongProgress
        },
        computed: mapState({
            playing: state => state.isPlaying,//记录是否正在播放
        }),
        methods: {
            togglePlayer() {
                this.$store.commit('changePlayer', {status: 0})
            }
        }
    }
</script>

<style scoped lang="less">
    .mini-player {
        position: fixed;
        bottom: 0;
        height: 60px;
        border-radius: 30px 30px 0 0;
        width: 100vw;
        background-color: #333333;
        z-index: 101;

        .mini-pic {
            padding: 5px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }

        .mini-pic.active {
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

        .singer-info {
            position: absolute;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 15px;
            color: #fff;
        }

        .mini-progress {
            position: relative;
            top: 18px;
        }
    }
</style>