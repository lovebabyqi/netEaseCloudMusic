<template>
  <div id="app">
      <router-view class='content'/>
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
