<template>
    <div class="lyric-box" v-if="Object.keys(lyricList).length!==0">
        <h2 class="lyric-title">
            <span class="name">{{songInfo.name}}</span>
            <span class="singer"> - {{songInfo.singer}}</span>
        </h2>
        <div class="lyric-item">
            <div class="item" :style="{transform:`translateY(${(-lyricIndex+2)*22+'px'})`}">
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
</template>

<script>
    export default {
        name: "LyricBox",
        props:['songInfo','lyricList','lyricIndex']
    }
</script>

<style scoped lang="less">
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
                color: #fff;
                font-size: 14px;
            }
        }


        .lyric-item {
            position: absolute;
            top: 45px;
            height: 168px;
            left: 0;
            right: 0;
            margin: auto;
            color: #999;
            /*transform: translateY(20px);*/
            overflow: hidden;
            font-size: 14px;

            .item {
                position: absolute;
                top: 10%;
                left: 0;
                right: 0;
                margin: auto;
                transform: translateY(0);
                transition: all .5s ease;

                .lyric {
                    text-align: center;
                    width: 100%;
                    line-height: 22px;
                    transition: all .5s ease;
                }

                .lyric.active {
                    color: #fff;
                    font-size: 16px;
                }
            }
        }
    }
</style>