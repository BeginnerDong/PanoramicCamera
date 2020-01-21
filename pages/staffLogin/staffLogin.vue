<template>
	<view style="width: 100%;">
		<view class="loginTop">
		  <image class="bjPic" src="/static/images/login-icon1.png"></image>
		</view>
		
		<view >
		  <view class="logoForm">
		    <view class="lis" style="border-bottom: 2rpx solid #f5f5f5">
		      <image class="icon" src="/static/images/login-icon2.png"></image>
		      <input class="text" type="number" maxlength="11" value="" placeholder="请输入手机号" v-model="submitData.login_name"></input>
		    </view>
		    <view class="lis pasWTex" style="border-bottom: 2rpx solid #f5f5f5">
		      <image class="icon" src="/static/images/login-icon3.png"></image>
		      <input class="text" type="password" value="" placeholder="请输入密码" v-model="submitData.password"></input>
		     
		    </view>
		   
		      <button class="bigBtnB pubbj color5 font15" 
			  style="border-radius:80rpx;margin-top: 100rpx;" 
			    @click="Utils.stopMultiClick(submit)" role="button" aria-disabled="false">登录</button>
		  </view>
		</view>
		<c-tabbar></c-tabbar>
	</view>
	
</template>

<script>
	import cTabbar from "@/components/tabbar/tabbar.vue"
	
	export default {
		components: {
			cTabbar
		},
		data() {
			return {
				basic_blue:this.$AssetsConfig.basic_blue,
				Router:this.$Router,
				submitData:{
					login_name:'',
					password:''
				},
				Utils:this.$Utils
			};
		},
		
		onLoad:function(){
			const self = this;	
			uni.setStorageSync('canClick', true);
		},
		
		methods: {	
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				const postData = {
					login_name: self.submitData.login_name,
					password:self.submitData.password
				};
				if (self.$Utils.checkComplete(self.submitData)) {
					
					const callback = (res) => {
						if (res.solely_code == 100000) {
							uni.setStorageSync('canClick', true);
							console.log(res);
							uni.setStorageSync('sale_token', res.token);
							uni.setStorageSync('sale_info', res.info);
							uni.redirectTo({
								url: '/pages/salesman/salesman'
							}) 
						} else {
							uni.setStorageSync('canClick', true);
							self.$Utils.showToast(res.msg,'none')
						}
					}
					self.$apis.login(postData, callback);
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全登录信息', 'none')
				};
			},
			
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	page{
		background: #fff;
	}
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
