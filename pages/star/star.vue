<template>
	<view style="height:100%">
		<view class="open"  style="position: absolute;top: 10rpx;right: 10rpx;color: #fff;">{{text}}</view>
		<image class="allHpic" style="width: 100%;height: 100%;" :src="swiperData.mainImg&&swiperData.mainImg[0]?swiperData.mainImg[0].url:''"></image>
	</view>
</template>

<script>
	export default {


		data() {
			return {
				Router: this.$Router,
				mainData: [],
				swiperData: {},
				showAll: false,
				currentTime:5,
				text:"5s"
			}
		},

		onLoad(options) {
			const self = this;

			const callback = (res) => {
				self.$Utils.loadAll(['getUserInfoData', 'getSliderData'], self);
			};
			self.$Token.getProjectToken(callback, {
				refreshToken: true
			})
		},



		methods: {

			next() {
				const self = this;
				if (uni.getStorageSync('user_info').info.phone != '') {
					self.Router.redirectTo({route:{path:'/pages/topay/topay'}})
				}else{
					self.Router.redirectTo({route:{path:'/pages/protocol/protocol'}})
				}
			},

			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {
					user_no: uni.getStorageSync('user_info').user_no
				};
				postData.getAfter = {
					order:{
						tableName:'Order',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{status:1,transport_status:1},
						condition:'='
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userInfoData = res.info.data[0]
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},

			getSliderData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					title: '首页广告图'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.swiperData = res.info.data[0];
						var interval = setInterval(function() {
							self.currentTime--; //每执行一次让倒计时秒数减一
						
							self.text=self.currentTime + 's';//按钮文字变成倒计时对应秒数
							
							//如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
							if (self.currentTime <= 0) {
								clearInterval(interval)
								/* if (uni.getStorageSync('user_info').info.phone != ''&&self.userInfoData.order.length==0) {
									self.Router.redirectTo({route:{path:'/pages/topay/topay'}})
								}else if(uni.getStorageSync('user_info').info.phone != ''&&self.userInfoData.order.length>0){
									self.Router.redirectTo({route:{path:'/pages/index/index'}})
								}else if(uni.getStorageSync('user_info').info.phone == ''){
									self.Router.redirectTo({route:{path:'/pages/protocol/protocol'}})
								} */
							}
						
						}, 1000);
					}
					console.log('self.swiperData', self.swiperData)
					self.$Utils.finishFunc('getSliderData');
				};
				self.$apis.labelGet(postData, callback);
			},
		},
	};
</script>

<style>
	@import "../../assets/style/public.css";

	page {
		height: 100%
	}

	navigator {
		width: 100%;
		height: 100%;
	}

	.starpage .open {
		color: #fff;
		font-size: 26rpx;
		position: absolute;
		top:
			10rpx;
		right: 24rpx;
		z-index: 111;
	}

	.starpage .allHpic {
		height: 100%;
		width: 100%;
		display: block;
	}
</style>
