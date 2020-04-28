<template>
	<div class='home-search'>
		<div class="search-table">
			<div class="search-input">
				<span class='search-icon input-block'></span>
				<input type="text" v-model='searchWords' class='input' placeholder="搜索歌曲、歌手、专辑" @input='getSearchSuggest'
				 @keyup.enter='searchSongs'>
				<span class='search-right input-block' v-if='searchWords' @click='clearInput'></span>
			</div>

			<div class="hot-words" v-show='!searchWords&&songList.length===0'>
				<h3 class='word-title'>热门搜索</h3>
				<ul class="list">
					<li class='word' v-for='word in hotWords' :key='word' @click='searchWord(word)'>{{word}}</li>
				</ul>
			</div>
			<div class="suggest" v-show='searchWords&&songList.length===0'>
				<div v-if='Object.keys(suggestList).length!==0'>
					<h3 class='suggest-title'>搜索"{{this.searchWords}}"</h3>
					<ul class='suggest-list'>
						<li class='suggest-item' v-for='item in suggestList' :key='item.id' @click='searchWord(item.name)'>
							<span class='suggest-icon'></span>
							<span class='name'>{{item.name}}</span>
						</li>
					</ul>
				</div>
				<div v-else>
					<h3 class='suggest-title'>暂无搜索建议,换其他词试试</h3>
				</div>
			</div>
			<div v-show='songList'>
				<music-list v-for='song in songList' :key='song.id' :songInfo='song' @click.native='goPlayer(song.id)'></music-list>
			</div>
		</div>
	</div>
</template>

<script>
	import MusicList from '../../../components/music-list/MusicList.vue'
	import {
		reqHotSearch,
		reqSearchSuggest,
		reqSearchSongs
	} from '../../../api/home.js';
	export default {
		name: 'HomeSearch',
		data() {
			return {
				searchWords: '', //搜索关键词
				hotWords: [], //热门搜索
				suggestList: [], //搜索建议
				songList: [], //搜索结果,歌曲列表
			}
		},
		components: {
			MusicList
		},
		created() {
			this.getHotSearchWords();
		},
		methods: {
			async getHotSearchWords() {
				this.songList = []; //清空列表
				const result = await reqHotSearch();
				if (result) {
					this.hotWords = Object.freeze(result.result.hots.map(item => item.first));
				}
			},
			searchWord(word) {
				this.searchWords = word;
				this.searchSongs(word);
			},
			clearInput() {
				this.searchWords = '';
				this.songList = []; //清空列表
			},
			async getSearchSuggest() { //获取搜搜建议
				this.songList = []; //清空列表
				if (this.searchWords !== '') {
					const result = await reqSearchSuggest(this.searchWords)
					if (!result.result.songs) return;
					this.suggestList = Object.freeze(result.result.songs.map(item => {
						return {
							id: item.id,
							name: item.name
						}
					}))
				}

			},
			async searchSongs(name) { //搜歌,这里根据歌名搜
				let searchWord = {
					keywords: this.searchWords,
					type: 1018,
					//type搜索类型默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
				}
				const result = await reqSearchSongs(searchWord);
				console.log(result)
				let showSongList = result.result.song.songs.map(item => {
					return {
						id: item.id, //歌曲id,后面需要根据id请求播放
						name: item.name, //歌名
						desc: item.al[0] || '', //歌名额外描述,可能没有
						singer: item.ar.reduce((pre,next)=>pre+ ' / ' +next.name,'').replace('/',''), //歌手名,多个歌手
						status: item.status, //是否sq音质 0为sq
					}
				})
				this.songList = Object.freeze(showSongList)
            },
            goPlayer(id){
                this.$router.push({
                    path:'/playPage',
                    query:{songId:id}
                })
            }
		},
	}
</script>

<style scoped lang='less'>
	.home-search {
		.search-table {
			.search-input {
				position: relative;
				padding: 15px 10px;
				width: 100vw;
				height: 60px;
				border-bottom: 1px solid rgba(0, 0, 0, .1);
				display: flex;

				.input-block {
					display: inline-block;
					width: 30px;
					height: 30px;
					background-color: #ebecec;
				}

				.search-icon {
					border-radius: 30px 0 0 30px;
					background: url('../../../assets/images/search_input_icon.svg') no-repeat;
					background-size: 14px 14px;
					background-position: 7px 7px;
					background-color: #ebecec;

				}

				.search-right {
					position: absolute;
					right: 10px;
					border-radius: 0 30px 30px 0;
					background: url('../../../assets/images/search_input_del.svg') no-repeat;
					background-size: 14px 14px;
					background-position: 7px 7px;
					background-color: #ebecec;
				}

				.input {
					display: block;
					flex: 1;
					height: 30px;
					background-color: #ebecec;
					outline: none;
					border: 0px solid rgba(0, 0, 0, .1);
					border-radius: 0 30px 30px 0;
				}

				.input:focus {
					outline: none;
				}
			}

			.hot-words {
				padding: 15px 10px 0;

				.word-title {
					font-size: 12px;
					line-height: 12px;
					color: #666;
					display: block;
					width: 100vw;
				}

				.list {
					margin: 10px 0 7px;

					.word {
						display: inline-block;
						height: 32px;
						margin-right: 8px;
						margin-bottom: 8px;
						padding: 0 13px;
						font-size: 14px;
						line-height: 32px;
						color: #333;
						border: 1px solid #d3d4da;
						border-radius: 15px;
					}
				}
			}

			.suggest {
				.suggest-title {
					height: 50px;
					margin-left: 10px;
					font-size: 15px;
					line-height: 50px;
					color: steelblue;
					overflow: hidden;
					word-wrap: nowrap;
				}

				.suggest-list {
					.suggest-item {
						height: 45px;
						padding-left: 10px;
						display: flex;
						flex-wrap: nowrap;

						.suggest-icon {
							margin: 10px 7px 0 0;
							display: inline-block;
							width: 20px;
							height: 20px;
							border-radius: 30px 0 0 30px;
							background: url('../../../assets/images/search_input_icon.svg') no-repeat;
							background-size: 15px 15px;
							background-position: 7px 7px;
						}

						.name {
							flex: 1;
							display: inline-block;
							line-height: 45px;
							border-bottom: 1px solid rgba(0, 0, 0, .1);
						}
					}
				}
			}
		}
	}
</style>
