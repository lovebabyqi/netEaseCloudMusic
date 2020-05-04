<template>
    <div class='play-page'>
        <div class="bg" :style="{background:`url(${songInfo.picUrl})`}" v-show="!showMini"></div>
        <my-player
                v-if="Object.keys(songInfo).length!==0"
                :song-info='songInfo'/>
    </div>
</template>

<script>
import TopNav from '../../components/top-nav/TopNav';//头部导航
import MyPlayer from './base/MyPlayer';//播放器
import {reqGetMusicUrl,reqSongDetail} from '../../api/music';
import {mapState} from "vuex";
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
    computed:mapState({
        songId:state=>state.playingSongId,
        showMini:state=>state.showMini
    }),
    watch:{
        songId:function(){
            this.getMusicDetail()
        }
    },
    methods:{
        async getMusicDetail(){   //根据id获取音乐info
            const songId = this.songId;
            const result = await reqSongDetail({ids:songId});
            const result2 = await reqGetMusicUrl({id:songId});
            let songUrl = result2.data[0].url;
            this.songInfo = {
                name:result.songs[0].name,//歌名
                singer:result.songs[0].ar.reduce((pre,next)=>{return pre  + next.name},''),//歌手名
                picUrl:result.songs[0].al.picUrl,//歌曲图片
                songId:songId,
                songUrl:songUrl
            }
        },
    },
}

</script>

<style scoped lang='less'>
    .play-page{
        position: relative;
        width:100vw;
        top:0;
        bottom:0;
        /*min-height:500vh;*/
        overflow: hidden;
        // background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        z-index:100;
        .bg {
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            background-color: rgba(0, 0, 0, 0.25);
            background-repeat: repeat;
            background-size: contain;
            filter: blur(15px);
        }
    }
</style>