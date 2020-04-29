<template>
    <div class='home-hot'>
        <div class="hot-logo">
			<div class="logo-icon"></div>
			<div class="update-time"><span>更新日期：04月23日</span></div>
		</div>
		<music-list-item v-for='(song,index) in showSongList' :key='song.id' :song-info='song' :index='index+1' @click.native='goPlayer(song.id)'></music-list-item>
		<div class='load-more' @click='loadMore'>
			<span v-if='showLoadMore'>加载更多...</span>
			<span v-else>热歌榜200首,暂无更多</span>
		</div>
    </div>
</template>

<script>

import MusicListItem from '../../../components/music-list-item/MusicListItem.vue'
import {reqHotSongList} from '../../../api/home.js'
export default {
    name:'HomeHot',
    data(){
        return {
            hotSongList:[],
			showSongList:[],
			page:1,//记录当前第几组数据,每组20条,初始(0,20)
			showLoadMore:true,//控制加载更多...是否以至最底部
        }
    },
	created(){
		this.getHotSongList()
	},
    methods:{
        async getHotSongList(){
			const result = await reqHotSongList({idx:'1'})//拿到两百条热歌
			this.hotSongList = Object.freeze(result.playlist.tracks);//不需要响应式
			this.formatSongList()
		},
		formatSongList(){
			let showNewSongList = this.hotSongList.slice(0,20*this.page).map(item=>{
				return {
					id:item.id,//歌曲id,后面需要根据id请求播放
					name:item.name,//歌名
					desc:item.alia[0]||'',//歌名额外描述,可能没有
					singer:item.ar[0].name,//歌手名
					status:item.st||0,//是否sq音质 0为sq
				}
			})
			this.showSongList = Object.freeze(showNewSongList);//先拿20条,如果之后要上拉再获取
		},
		loadMore(){
			if(this.page<10){
				this.page = this.page+1;
				this.formatSongList()
			}
			if(this.page===10){
				this.showLoadMore = false;
			}
        },
        goPlayer(id){
            this.$router.push({
                path:'/playPage',
                query:{songId:id}
            })
        }
    },
	components:{
		MusicListItem
	}
}

</script>

<style scoped lang='less'>
	.home-hot{
		width: 100vw;
		.hot-logo{
			padding-left:20px;
			padding-top:20px;
			width: 100vw;
			height:150px;
			background: url('../../../assets/images/hot_music_bg.jpg') no-repeat;
			background-size: contain;
			.logo-icon{
				width: 142px;
				height: 67px;
				background: url('../../../assets/images/index_icon.png') no-repeat;
				background-size: cover;
				background-position: -22px -22px;
			}
			.update-time{
				margin-top:10px;
				margin-left:-17px;
				font-size:12px;
				transform: scale(.9);
				color:#fff;
			}
		}
		.load-more{
			height:55px;
			line-height:55px;
			text-align:center;
		}
	}
    
</style>