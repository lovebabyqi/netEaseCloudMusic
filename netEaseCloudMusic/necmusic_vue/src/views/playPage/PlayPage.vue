<template>
    <div class='play-page'>
<!--        <button @click="goBack" class="btn-back">返回</button>-->
        <div class="bg" :style="{background:`url(${songInfo.picUrl})`}"></div>
        <my-player v-if="Object.keys(songInfo).length!==0" :song-info='songInfo'></my-player>
    </div>
</template>

<script>
import TopNav from '../../components/top-nav/TopNav';//头部导航
import MyPlayer from './base/MyPlayer';//播放器
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
        const songId = this.$route.query.songId;
        this.getMusicDetail(songId);
    },
    methods:{
        async getMusicDetail(songId){   //根据id获取音乐info
            const result = await reqSongDetail({ids:songId});
            const result2 = await reqGetMusicUrl({id:songId});
            let songUrl = result2.data[0].url;
            let songInfo = {
                name:result.songs[0].al.name,//歌名
                singer:result.songs[0].ar.reduce((pre,next)=>{return pre  + next.name},''),//歌手名
                picUrl:result.songs[0].al.picUrl,//歌曲图片
                songId:songId,
                songUrl:songUrl
            }
            this.songInfo = Object.freeze(songInfo);
        },
        goBack(){
            this.$router.go(-1);
        }
    },
}

</script>

<style scoped lang='less'>
    .play-page{
        position:relative;
        width:100vw;
        min-height:500vh;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
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
        .btn-back{
            position:absolute;
            left:10px;
            top:10px;
            z-index:15;
        }
    }
</style>