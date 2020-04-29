<template>
    <div class="home">
        <!--头部logo start-->
        <nec-header></nec-header>
        <!--头部logo end-->
        <!--tab选项卡 start-->
        <home-tabs @tabClick="toggleTab" :current-index="currentIndex"></home-tabs>
        <!--tab选项卡 end-->
        <div class="container">
            <transition-group :name='activeClass'>
                <!--推荐音乐start-->
                <home-push v-show="currentIndex===0" class="fade" key='homeP'></home-push>
                <!--推荐音乐end-->
                <!--热歌榜start-->
                <home-hot v-show="currentIndex===1" class="fade" key='homeH'></home-hot>
                <!--热歌榜end-->
                <!--搜索start-->
                <home-search v-show="currentIndex===2" class="fade" key='homeS'></home-search>
                <!--搜索end-->
            </transition-group>
        </div>

    </div>
</template>

<script>
    import NecHeader from "../../components/nec-header/NecHeader";//头部
    import HomeTabs from "./base/HomeTabs";//选项卡
    import HomePush from "./base/HomePush";//推荐音乐
    import HomeHot from "./base/HomeHot";//热歌榜
    import HomeSearch from "./base/HomeSearch";//搜索

    export default {
        name: "Home",
        data() {
            return {
                currentIndex: 0,
                activeClass: ""
            };
        },
        components: {
            NecHeader,
            HomeTabs,
            HomePush,
            HomeHot,
            HomeSearch
        },
        computed: {},
        methods: {
            toggleTab(index) {//切换选项卡
                if (index > this.currentIndex) {  //to from
                    this.currentIndex = index;
                    this.activeClass = "left";
                } else {
                    this.currentIndex = index;
                    this.activeClass = "right";
                }
            }
        }
    };
</script>

<style scoped lang='less'>
    .container {
        position: absolute;
        left: 0;
        right: 0;
        top: 124px;
        bottom: 0;
        overflow: hidden;
        overflow-y: scroll;

        .fade {
            position: absolute;
            width: 100vw;
        }

        .left-leave-active {
            transform: translateX(0px);
            transition: 1s;
        }

        .left-leave-to {
            transform: translateX(-100%);
        }

        .left-enter-active {
            transform: translateX(100%);
            transition: 1s;
        }

        .left-enter-to {
            transform: translateX(0);
        }

        .right-leave-active {
            opacity: 1;
            transform: translateX(0px);
            transition: 1s;
        }

        .right-leave-to {
            opacity: 1;
            transform: translateX(100%);
        }

        .right-enter-active {
            transform: translateX(-100%);
            transition: 1s;
        }

        .right-enter-to {
            transform: translateX(0);
        }
    }


</style>
