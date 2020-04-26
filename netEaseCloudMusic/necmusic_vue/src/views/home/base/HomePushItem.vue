<template functional>
    <div class='push-item'>
        <div class='imgBox'>
            <img :src="props.info.picUrl" alt="">
            <span class='playCount'><img class='counts-icon' src="../../../assets/images/erji.svg" alt=""> {{(props.info.playCount/10000).toString().slice(0,3)}}万</span>
        </div>
        <p class='infoName'>{{props.info.name}}</p>
    </div>
</template>

<script>

export default {
    name:'HomePushItem'
}

</script>

<style scoped lang='less'>
    .push-item{
		margin:5px 0;
		box-sizing:border-box;
		width: 122px;
		.imgBox{
			position:relative;
			width: 122px;
			height: 122px;
			img{
				width: 122px;
				height: 122px;
			}
			.playCount{
				position:absolute;
				right:5px;
				top:5px;
				font-size:12px;
				color:#fff;
				.counts-icon{
					width: 13px;
					height:13px;
					transform:translateY(10%);
				}
			}
		}
		.infoName{
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			padding: 6px 2px 0 6px;
			min-height: 30px;
			line-height: 1.2;
			font-size: 13px;
		}
	}
</style>