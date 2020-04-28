<template>
    <div class='play-page'>
        <!-- <top-nav :show-top='false'></top-nav> -->
        <my-player :song-url='songUrl' :song-lyric='songLyric' :song-info='songInfo'></my-player>
    </div>
</template>

<script>
import TopNav from '../../components/top-nav/TopNav';
import MyPlayer from './base/MyPlayer'
import {reqGetMusicUrl,reqGetLyric,reqSongDetail} from '../../api/music';
export default {
    name:'PlayPage',
    components:{
        TopNav,
        MyPlayer
    },
    data(){
        return {
            songId:'',
            songUrl:'',
            songLyric:'',
            songInfo:{}
        }
    },
    mounted(){
        this.songId = this.$route.query.songId;
        this.getMusicUrl();
        this.getMusicLyric();
        this.getMusicDetail()
    },
    methods:{
        async getMusicUrl(){
            const result = await reqGetMusicUrl({id:this.songId});
            this.songUrl = result.data[0].url;
        },
        async getMusicLyric(){
            const result = await reqGetLyric({id:this.songId});
            this.songLyric = Object.freeze(result.lrc)
        },
        async getMusicDetail(){
            const result = await reqSongDetail({ids:this.songId});
            let songInfo = {
                name:result.songs[0].al.name,//歌名
                singer:result.songs[0].ar.reduce((pre,next)=>{return pre  + next.name},''),//歌手名
                picUrl:result.songs[0].al.picUrl,//歌曲图片
            }
            this.songInfo = Object.freeze(songInfo);
        }
    },
}

</script>

<style scoped lang='less'>
    .play-page{
        box-sizing: border-box;
        width:100vw;
        min-height:100vh;
    }
</style>