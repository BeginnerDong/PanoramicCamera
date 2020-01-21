<template>
	<view style="width: 100%;">
		<view class="loginTop">
		  <image class="bjPic" src="/static/images/login-icon1.png"></image>
		</view>
		
		<view >
		  <view class="logoForm">
		    <view class="lis">
		      <image class="icon" src="/static/images/login-icon2.png"></image>
		      <input class="text" type="number" maxlength="11" value="" placeholder="请输入手机号" v-model="submitData.phone"></input>
		    </view>
		    <view class="lis pasWTex">
		      <image class="icon" src="/static/images/login-icon3.png"></image>
		      <input class="text" type="text" value="" placeholder="请输入验证码" v-model="submitData.code"></input>
		      <view class="yzm font24" @click="sendCode" v-if="!hasSend" :style="'color:'+basic_blue">{{text}}</view>
			  <view class="yzm font24"  v-else :style="'color:'+basic_blue">{{text}}</view>
		    </view>
		    <view class="explain font24">输入未注册的手机号，将自动创建平台账号、注册即视为同意</view>
		      <button class="bigBtnB pubbj color5 font15" open-type="getUserInfo"  @getuserinfo="Utils.stopMultiClick(submit)" role="button" aria-disabled="false">登录</button>
		  </view>
		</view>
	</view>
	
</template>

<script>
	export default {
		
		data() {
			return {
				basic_blue:this.$AssetsConfig.basic_blue,
				Router:this.$Router,
				submitData:{
					phone:'',
					code:''
				},
				Utils:this.$Utils,
				currentTime:61,
				text:'获取验证码',
				hasSend:false,
			};
		},
		
		onLoad:function(){
			const self = this;	
		},
		
		methods: {	
			
			sendCode(){
				var self = this;
				console.log(111)
				if(self.hasSend){
					return;
				};
				var phone = self.submitData.phone;
				
				if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
					
					self.$Utils.showToast('请输入正确的手机号', 'none');
					return;
				}
				var postData = {
					data:{
						phone:self.submitData.phone
					}
					
				};
				var callback = function(res){
					if(res.solely_code==100000){
						self.hasSend = true;
						var interval = setInterval(function() {
							self.currentTime--; //每执行一次让倒计时秒数减一
						
							self.text=self.currentTime + 's';//按钮文字变成倒计时对应秒数
							
							//如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
							if (self.currentTime <= 0) {
								clearInterval(interval)
								
								self.hasSend = false;
								self.text='重新发送';
								self.currentTime= 61;
								
							}
							
						}, 1000);
					}else{
						self.$Utils.showToast('发送失败', 'none');
					};
				};
				self.$apis.codeGet(postData, callback);
			},
			
			submit() {
				const self = this;
				uni.setStorageSync('canClick', false);
				const pass = self.$Utils.checkComplete(self.submitData);
				console.log('pass', pass);
				console.log('self.submitData',self.submitData)
				if (pass) {	
					const callback = (user, res) => {
						self.userInfoUpdate();	
					};
					self.$Utils.getAuthSetting(callback);
				} else {
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请补全信息', 'none')
				};
			},
			
			userInfoUpdate() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				if(!wx.getStorageSync('user_info')||!wx.getStorageSync('user_info').headImgUrl){
				  postData.refreshToken = true;
				};
				postData.searchItem = {
					user_no:uni.getStorageSync('user_info').user_no
				};
				postData.data = {
					phone:self.submitData.phone
				};
				postData.smsAuth = {
					phone:self.submitData.phone,						
					code:self.submitData.code
				};
				const callback = (data) => {				
					if (data.solely_code == 100000) {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast('登录成功', 'none');
							setTimeout(function() {
								self.Router.redirectTo({route:{path:'/pages/topay/topay'}})
							}, 1000);
					} else {
						uni.setStorageSync('canClick', true);
						self.$Utils.showToast(data.msg, 'none', 1000)
					}	
				};
				self.$apis.userInfoUpdate(postData, callback);
			},
			
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
