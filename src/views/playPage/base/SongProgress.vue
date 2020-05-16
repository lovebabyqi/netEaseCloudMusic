<template>
    <div class="progress-box">
        <progress :max="timeLongNumber" :value="currentTimeNumber" class="my-progress" @click="toggleTime($event)"/>
        <div class="boll" :style="{transform:mathLeft}"></div>
        <span class="now-time time" v-show="currentTime">{{currentTime}}</span>
        <span class="time-long time" v-show="timeLong">{{timeLong}}</span>
    </div>
</template>

<script>
    export default {
        name: "SongProgress",
        props: ['timeLongNumber', 'currentTimeNumber', 'mathLeft', 'timeLong', 'currentTime'],
        methods:{
            toggleTime(e){//点击进度条
                this.$bus.$emit('changeCurrentTime',e.offsetX);
            }
        }
    }
</script>

<style scoped lang="less">
    .progress-box {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 40px;
        z-index: 20;

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
            transform: translateX(0);
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
            width: 60vw;
            height: 3px;
            border-radius: 0.1rem;
        }

        /* 表示总长度背景色 */

        .my-progress::-webkit-progress-bar {
            background-color: #999;
        }

        /* 表示已完成进度背景色 */

        .my-progress::-webkit-progress-value {
            background-color: red;
        }
    }
</style>