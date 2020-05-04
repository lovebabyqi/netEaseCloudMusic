<template>
	<div class="home-footer">
		<div class="logo"><span class='logo-icon'></span>网易云音乐</div>
		<div class="openapp">
			打开APP,发现更多好音乐>
		</div>
		<div class="copyright">
			网易公司版权所有©1997-2020   杭州乐读科技有限公司运营
		</div>
	</div>
</template>

<script>
export default{
    name:'HomeFooter'
}
</script>

<style scoped lang='less'>
	.home-footer{
		width:100vw;
		height:200px;
		background: url('../../../assets/images/footer_bg.png') no-repeat;
		background-size: contain;
		.logo{
			text-align:center;
			padding-top:64px;
			font-size:35px;
			.logo-icon{
				display:inline-block;
				margin-bottom:-5px;
				margin-right:10px;
				width:35px;
				height:35px;
				background: url('../../../assets/images/icon.png') no-repeat;
				background-size: contain;
				
			}
		}
		.openapp {
		    line-height: 38px;
		    border: 1px solid #d33a31;
		    border-radius: 38px;
		    font-size: 16px;
			text-align:center;
		    color: #d33a31;
		    margin: 15px 37px 5px;
		}
		.copyright{
			font-size:12px;
			text-align:center;
			transform:scale(.75)
		}
	}
</style>
