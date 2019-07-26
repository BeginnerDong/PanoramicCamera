<template>
	<view class="protocolPg">
	  <view class="title font28">共享协议</view>
	  <view class="texLis font26 color2" v-for="item in protext">{{item}}</view>
	    <view class="writeBtn">
	      <view class="LBtn btn color1 pubColor" @click="Router.redirectTo({route:{path:'/pages/star/star'}})" open-type='navigate'>取消签署</view>
	      <view class="RBt btn pubbj color5"  @click="Router.redirectTo({route:{path:'/pages/login/login'}})"  open-type='navigate'>同意签署</view>
	    </view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				basic_blue:this.$AssetsConfig.basic_blue,
				Router:this.$Router,
				protext:[
				  "1.猎光人电子科技有限公司提供鱼灵VR共享相机，任何微信积分超过650分，支付宝积分超过550分的游客均可免押金共享设备，租赁前只需向工作人员出示积分即可。",
				  "2.猎光人电子科技有限公司提供鱼灵VR共享相机，任何微信积分超过650分，支付宝积分超过550分的游客均可免押金共享设备，租赁前只需向工作人员出示积分即可。",
				  "3.猎光人电子科技有限公司提供鱼灵VR共享相机，任何微信积分超过650分，支付宝积分超过550分的游客均可免押金共享设备，租赁前只需向工作人员出示积分即可。",
				  "4.猎光人电子科技有限公司提供鱼灵VR共享相机，任何微信积分超过650分，支付宝积分超过550分的游客均可免押金共享设备，租赁前只需向工作人员出示积分即可。",
				  "5.猎光人电子科技有限公司提供鱼灵VR共享相机，任何微信积分超过650分，支付宝积分超过550分的游客均可免押金共享设备，租赁前只需向工作人员出示积分即可。",
				  "6.猎光人电子科技有限公司提供鱼灵VR共享相机，任何微信积分超过650分，支付宝积分超过550分的游客均可免押金共享设备，租赁前只需向工作人员出示积分即可。"
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
	.protocolPg{ padding:0 20rpx;}
	.protocolPg .title{text-align: center; line-height: 30rpx; padding-bottom: 40rpx;padding-top:30rpx; color: rgba(34,34,34) }
	.protocolPg .texLis{padding-bottom: 20rpx;}
	.writeBtn{ padding:130rpx 0;}
</style>
