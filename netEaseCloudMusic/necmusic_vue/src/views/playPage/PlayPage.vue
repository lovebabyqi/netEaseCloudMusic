<template>
    <div class='play-page'>
        <!-- <top-nav :show-top='false'></top-nav> -->
        <my-player v-if="Object.keys(songInfo).length!==0" :song-info='songInfo'></my-player>
    </div>
</template>

<script>
import TopNav from '../../components/top-nav/TopNav';
import MyPlayer from './base/MyPlayer'
import {reqGetMusicUrl,reqSongDetail} from '../../api/music';
export default {
    name:'PlayPage',
    components:{
        TopNav,
        MyPlayer
    },
    data(){
        return {
            songInfo:{}
        }
    },
    mounted(){
        this.songId = this.$route.query.songId;
        this.getMusicDetail()
    },
    methods:{
        async getMusicDetail(){
            const result = await reqSongDetail({ids:this.songId});
            const result2 = await reqGetMusicUrl({id:this.songId});
            let songUrl = result2.data[0].url;
            let songInfo = {
                name:result.songs[0].al.name,//歌名
                singer:result.songs[0].ar.reduce((pre,next)=>{return pre  + next.name},''),//歌手名
                picUrl:result.songs[0].al.picUrl,//歌曲图片
                songId:this.songId,
                songUrl:songUrl
            }
            this.songInfo = Object.freeze(songInfo);
        }
    },
}

</script>

<style scoped lang='less'>
    .play-page{
        width:100vw;
        min-height:100vh;
    }
</style>