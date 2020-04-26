<template>
  <div class="tab">
    <ul class="tab-list">
      <li v-for="(item,index) in tabList" :key="item" @click='toggle(index)'>
        <span :class="{active:index===currentIndex}">{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeTabs",
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabList: ["推荐音乐", "热歌榜", "搜索"]
    };
  },
  methods: {
      toggle(index){
          this.$emit('tabClick',index)
      }
  }
};
</script>

<style scoped lang='less'>
.tab {
  height: 40px;
  position:fixed;
  top:84px;
  left:0;
  right:0;
  z-index:100;
  background-color: #fff;
  .tab-list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    li {
      flex: 1;
      height: 40px;
      line-height: 40px;
      font-size:15px;
      text-align: center;
      transition: all 0.5s;
      border-bottom: 1px solid #ccc;
      span {
		padding:0 5px;
        border-bottom: 2px solid transparent;
        box-sizing: border-box;
        display: inline-block;
        height: 40px;
      }
      .active {
        color: #d43c33;
        border-bottom: 2px solid #d43c33;
      }
    }
  }
}
</style>