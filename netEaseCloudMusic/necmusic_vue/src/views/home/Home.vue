<template>
  <div class="home">
    <nec-header></nec-header>
    <home-tabs @tabClick="toggleTab" :current-index="currentIndex"></home-tabs>
    
    <div class="container">
     <transition-group :name='activeClass'>
        <home-push v-show="currentIndex===0" class="fade" key='homeP'></home-push>
        <home-hot v-show="currentIndex===1" class="fade" key='homeH'></home-hot>
        <home-search v-show="currentIndex===2" class="fade" key='homeS'></home-search>
      </transition-group>
    </div>
    
  </div>
</template>

<script>
import NecHeader from "../../components/nec-header/NecHeader";
import HomeTabs from "./base/HomeTabs";
import HomePush from "./base/HomePush";
import HomeHot from "./base/HomeHot";
import HomeSearch from "./base/HomeSearch";

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
    toggleTab(index) {
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
    width:100vw;
  }
  .left-leave-active{
        transform:translateX(0px);
        transition:1s;
    }
    .left-leave-to{
        transform:translateX(-100%);
    }
    .left-enter-active{
        transform:translateX(100%);
        transition:1s;
    }
    .left-enter-to{
        transform:translateX(0);
    }
    .right-leave-active{
        opacity: 1;
        transform:translateX(0px);
        transition:1s;
    }
    .right-leave-to{
        opacity: 1;
        transform:translateX(100%);
    }
    .right-enter-active{
        transform:translateX(-100%);
        transition:1s;
    }
    .right-enter-to{
        transform:translateX(0);
    }
}

     
</style>
