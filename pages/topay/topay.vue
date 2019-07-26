<template>
	<view class="payCont">
	  <image class="photo" src="/static/images/img4.png"></image>
	  <view class="mny center color1 fat-font">￥ {{payMoney}}/天</view>
	  <view class="writeBtn">
	    <view class="LBtn btn color1 pubColor" @click="Router.redirectTo({route:{path:'/pages/star/star'}})"  open-type='navigate'>取消支付</view>
	    <view class="RBt btn pubbj color5"  @click="Router.redirectTo({route:{path:'/pages/payEwm/payEwm'}})"  open-type='navigate'>确认支付</view>
	  </view>
	    <view class="titFS font26 color1 fat-font">收费方式：</view>
	    <view class="payFs font24 color2" v-for="item in payFs">{{item}}</view>
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
	@import "../../assets/style/public.css";
	.payCont{ width: 90%; margin: 0 auto;}
	.photo{ width: 207rpx; height: 175rpx;margin: 0 auto; display: block; margin-top: 145rpx; }
	.payCont .mny{ font-size: 60rpx;  margin-top: 80rpx; margin-bottom: 200rpx; line-height: 1;}
	.titFS{ padding-top: 100rpx; line-height: 1; padding-bottom: 30rpx;}
	.payFs{ padding-bottom: 10rpx;}
</style>
