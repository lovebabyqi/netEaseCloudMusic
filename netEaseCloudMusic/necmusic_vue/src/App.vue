<template>
  <div id="app">
      <keep-alive include="PlayPage">
          <router-view class='content'></router-view>
      </keep-alive>
  </div>
</template>
<script>
  export default {
    components:{
      
    }
  }
</script>
<style lang="less">

</style>
