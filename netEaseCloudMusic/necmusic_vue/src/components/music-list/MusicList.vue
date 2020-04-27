<template>
	<div class="music-list" v-if='Object.keys(songInfo).length!==0'>
		<div class="music-index" v-show='index'>
			<span :class='{active:index<4}'>{{index|stringIndex}}</span>
		</div>
		<div class="music-info">
			<div class="left">
				<div class="music-name">
					<span class='name'>{{songInfo.name}}</span><span class='desc'>{{songInfo.desc}}</span>
				</div>
				<div class='music-singer'>
					<span class='u-vip' v-show='+(songInfo.status)===0'></span>
					<span>{{songInfo.singer}}-</span><span>{{songInfo.name}}</span>
				</div>
			</div>
			<div class="right">
				<span class="u-hmsprt">
				</span>
			</div>
		</div>
	</div>
</template>

<!-- 不同接口拿到的歌单数据格式不统一,处理好数据在传递进来使用 -->
<script>
	export default {
        name: "MusicList",
        props:['songInfo','index'],
		filters: {
			stringIndex(index) {
				if (index < 10) {
					return '0' + index
				}else{
					return index
				}

			}
        }
	}
</script>

<style scoped lang='less'>
	.music-list {
		display: flex;
		height: 43px;
		overflow: hidden;
		padding: 6px 0px 6px 9px;
		
		.music-index {
			height: 43px;
			padding:10px 10px 10px 8px;
			.active {
				color: red;
			}
		}
		.music-info{
			position:relative;
			padding-right:42px;
			padding-bottom:6px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			border-bottom:1px solid rgba(0,0,0,.1);
			.left {
				.music-name {
                    box-sizing:border-box;
					width:350px;
					padding-right:65px;
					height: 25px;
					font-size: 17px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
                    .name{
                        width:350px;
                        overflow:hidden;
                    }
					.desc {
                        color: #888888;
                        overflow:hidden;
					}
				}
			
				.music-singer {
					height: 18px;
					font-size: 12px;
					color: #888888;
                    overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					.u-vip {
						padding-top: 8px;
						display: inline-block;
						width: 18px;
						background: url('../../assets/images/index_icon.png') 0 0 no-repeat;
						background-size: 166px 97px;
						background-position: 0 0;
					}
				}
			}
			
			.right {
				position: absolute;
				right: 0;
				top:-9px;
				width: 24px;
				height:24px;
				padding: 0 10px;
			
				.u-hmsprt {
					margin: 17px auto;
					display: inline-block;
					width: 24px;
					height: 24px;
					background: url('../../assets/images/index_icon.png') 0 0 no-repeat;
					background-size: 166px 97px;
					background-position: -24px 0px;
				}
			}
		}

		
	}
</style>
