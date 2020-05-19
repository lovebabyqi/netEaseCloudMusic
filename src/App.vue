<template>
    <div id="app">
        <keep-alive exclude="SongList">
            <router-view class='content'/>
        </keep-alive>
        <play-page/>

    </div>
</template>
<script>
    import PlayPage from "./views/playPage/PlayPage";
    export default {
        components: {
            PlayPage
        }
    }
</script>
<style lang="less">

</style>
