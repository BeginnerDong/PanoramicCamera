<template>
	<view style="width: 100%;">
		<view class="loginTop">
		  <image class="bjPic" src="/static/images/login-icon1.png"></image>
		</view>
		
		<view >
		  <view class="logoForm">
		    <view class="lis">
		      <image class="icon" src="/static/images/login-icon2.png"></image>
		      <input class="text" type="number" maxlength="11" value="" placeholder="请输入手机号"></input>
		    </view>
		    <view class="lis pasWTex">
		      <image class="icon" src="/static/images/login-icon3.png"></image>
		      <input class="text" type="text" value="" placeholder="请输入验证码"></input>
		      <view class="yzm font24" :style="'background-color:'+basic_blue">获取验证码</view>
		    </view>
		    <view class="explain font24">输入未注册的手机号，将自动闯将平台账号、注册即视为同意</view>
		      <button class="bigBtnB pubbj color5 font15" @click="Router.redirectTo({route:{path:'/pages/topay/topay'}})"   open-type="getUserInfo" role="button" aria-disabled="false">登录</button>
		  </view>
		</view>
	</view>
	
</template>

<script>
	export default {
		
		data() {
			return {
				basic_blue:this.$AssetsConfig.basic_blue,
				Router:this.$Router
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
	.loginTop{padding-bottom:60rpx; }
	.loginTop .bjPic{ width: 100%;height: 400rpx;}
	.logoForm{width: 90%;height: 600rpx; margin: 0 auto;}
	.logoForm .lis{padding: 40rpx 0 18rpx 0;border-bottom: 2rpx solid gray; position: relative;}
	.logoForm .lis .icon{ width: 40rpx;height: 40rpx; display: inline-block; position: absolute; left: 19rpx; top: 45rpx;}
	.logoForm .lis .text{width:70%; height: 40rpx; line-height: 26rpx; display: inline-block; font-size: 26rpx; color: rgba(102,102,102,0.7);padding:0 20rpx 0 85rpx;}
	.logoForm .pasWTex .text{ width:50%;}
	.yzm{background: none;color: white; margin: 0; line-height: 40rpx; position: absolute; top: 45rpx; right: 20rpx;padding: 0 10rpx;}
	.explain{ color: #7b7b7b; padding: 30rpx 3% 100rpx 3%;}
	
</style>
