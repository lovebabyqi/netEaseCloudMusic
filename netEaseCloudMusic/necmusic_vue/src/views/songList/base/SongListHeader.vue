<template>
    <div class="list-header">
        <div class="header_bg" :style="{backgroundImage:`url(${playListInfo.coverImgUrl})`}"></div>
        <div class="img_box">
            <img class="listImg" :src="playListInfo.coverImgUrl" alt/>
            <span class="icon">歌单</span>
            <span class="count">
        <img class="count-icon" src="../../../assets/images/erji.svg" alt/>
        {{playListInfo.playCount|stringCount}}
      </span>
        </div>
        <div class="header-right">
            <h2 class="info-name">{{playListInfo.name}}</h2>
            <div class="info-user">
                <img class="user-pic" :src="playListInfo.creator.avatarUrl" alt/>
                <span class="user-icon"></span>
                <div class="user-name">{{playListInfo.creator.nickname}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SongListHeader",
        props: ['playListInfo'],
        data() {
            return {};
        },
        filters: {
            stringCount(count) {
                if (count > 100000000) {
                    let _count = (count / 100000000).toString().split(".");
                    return _count[1][0] === "0"
                        ? _count[0] + "亿"
                        : _count[0] + "." + _count[1][0] + "亿";
                } else {
                    let _count = (count / 10000).toString().split(".");
                    return _count[1][0] === "0"
                        ? _count[0] + "万"
                        : _count[0] + "." + _count[1][0] + "万";
                }
            }
        },
        methods: {}
    };
</script>

<style scoped lang='less'>
    .list-header {
        height: 186px;
        width: 100vw;
        padding: 30px 10px 30px 15px;
        position: relative;
        overflow: hidden;

        .header_bg {
            height: 186px;
            width: 100vw;
            background-color: rgba(0, 0, 0, 0.25);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
            -webkit-filter: blur(20px);
            filter: blur(20px);
            -webkit-transform: scale(1.5);
            -ms-transform: scale(1.5);
            transform: scale(1.5);
        }

        .img_box {
            position: absolute;
            width: 126px;
            height: 126px;
            top: 30px;
            left: 15px;
            z-index: 10;

            .icon {
                position: absolute;
                z-index: 3;
                top: 10px;
                left: 0;
                padding: 0 8px;
                height: 17px;
                color: #fff;
                font-size: 9px;
                text-align: center;
                line-height: 17px;
                background-color: rgba(217, 48, 48, 0.8);
                border-top-right-radius: 17px;
                border-bottom-right-radius: 17px;
            }

            .count {
                position: absolute;
                right: 2px;
                top: 0;
                z-index: 3;
                padding-left: 15px;
                color: #fff;
                font-size: 12px;
                background-position: 0;
                background-repeat: no-repeat;
                background-size: 11px 10px;
                text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);

                .count-icon {
                    width: 13px;
                    height: 13px;
                    transform: translateY(10%);
                }
            }

            .listImg {
                width: 126px;
                height: 126px;
            }
        }

        .header-right {
            position: absolute;
            padding-left: 16px;
            right: 10px;
            top: 30px;
            left: 141px;
            height: 126px;
            z-index: 10;

            .info-name {
                padding-top: 1px;
                font-size: 17px;
                line-height: 1.3;
                color: #fefefe;
                height: 44px;
                display: -webkit-box;
                -webkit-box-pack: center;
            }

            .info-user {
                height: 30px;
                width: 100px;
                margin-top: 20px;
                position: relative;
                overflow: hidden;

                .user-pic {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }

                .user-icon {
                    position: absolute;
                    left: 25px;
                    display: inline-block;
                    background: url("../../../assets/images/usericn.png");
                    background-repeat: no-repeat;
                    background-size: 75px auto;
                    width: 75px;
                    height: 30px;
                    background-position: -40px 18px;
                    z-index: 12;
                }

                .user-name {
                    position: absolute;
                    left: 35px;
                    top: 0;
                    font-size: 14px;
                    width: 65px;
                    color: rgba(255, 255, 255, 0.7);
                    line-height: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }

    }
</style>