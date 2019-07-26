<template>
	<view class="center">
	  <image class="ewmPic" src="../../image/code-img.png"></image>
	  <text class="color2 note font24">说明：请长按二维码下载APP使用相机</text>
	  <button class="okbtn h80 font15 radiu15 pubbj color5"  @click="Router.redirectTo({route:{path:'/pages/index/index'}})">确认</button>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				basic_blue:this.$AssetsConfig.basic_blue,
				Router:this.$Router,
				payMoney:"39.8",
				payFs:[
				  "1、收费标准66.6元/天，支付24小时的费用，结算时间为下单的第二天进行结算。",
				  "2、用户没有结算，则在归还物品时，进行补缴费用。"
				]
			};
		},
		onLoad:function(){
			const self = this;	
		},
		methods: {	
		}
	}
</script>

<style>
	.ewmPic{ width:385rpx; height: 385rpx; display: block; margin: 0 auto; padding-top: 150rpx; }
	.note{ padding: 60rpx 0 200rpx 0; line-height: 1; display: inline-block;}
	.okbtn{ width: 71%; margin: 0 auto; display: block; line-height: 80rpx; }
</style>
