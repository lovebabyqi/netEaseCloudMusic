<template>
  <div id="app">
      <keep-alive>
           <router-view class='content'/>
      </keep-alive>
      <play-page/>

  </div>
</template>
<script>
    import PlayPage from "./views/playPage/PlayPage";
  export default {
    components:{
        PlayPage
    }
  }
</script>
<style lang="less">

</style>
