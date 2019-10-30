<template>
	<view class="payCont">
	  <image class="photo" src="/static/images/img4.png"></image>
	  <view class="mny center fat-font" style="text-align: center;">￥ {{mainData.price}}/天</view>
	  <view class="writeBtn">
	    <view class="LBtn btn color1 pubColor" @click="Router.redirectTo({route:{path:'/pages/star/star'}})"  open-type='navigate'>取消支付</view>
	    <view class="RBt btn pubbj color5"   @click="Utils.stopMultiClick(addOrder)">确认支付</view>
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
				],
				mainData:{},
				Utils:this.$Utils
			};
		},
		
		onLoad:function(){
			const self = this;	
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {	
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
			
			addOrder() {
				const self = this;				
				uni.setStorageSync('canClick', false);
				const postData = {};
				postData.orderList = [
					{
						product: [{
							id: self.mainData.id,
							count: 1,
							product: self.mainData
						}],
						type:self.mainData.type,
					}
				];
				postData.data = {
					transport_status:1,
					passage1:uni.getStorageSync('user_info').info.phone
				};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.pay()
					} else {		
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};		
				};
				self.$apis.addOrder(postData, callback);
			},
			

			pay(order_id) {
				const self = this;	
				const postData = {};	
				postData.wxPay = {
					price: self.mainData.price
				};
				postData.tokenFuncName = 'getProjectToken',
				postData.searchItem = {
					id: self.orderId
				};	
				const callback = (res) => {
					if (res.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData', payData)
								if (payData == 1) {
									uni.showToast({
										title: '支付成功',
										duration: 1000,
										success: function() {
											
										}
									});
									setTimeout(function() {
										self.$Router.redirectTo({route:{path:'/pages/index/index'}})
									}, 1000);
								} else {
									uni.setStorageSync('canClick', true);
									uni.showToast({
										title: '支付失败',
										duration: 2000
									});
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							
							uni.showToast({
								title: '支付成功',
								duration: 1000,
								success: function() {
									
								}
							});
							setTimeout(function() {
								self.$Router.redirectTo({route:{path:'/pages/index/index'}})
							}, 1000);
						};
					} else {
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					};
				};
				self.$apis.pay(postData, callback);
			},
			
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
