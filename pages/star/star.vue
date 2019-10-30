<template>
	<view style="height:100%">
		<view class="open" @click="next()" style="position: absolute;top: 10rpx;right: 10rpx;color: #fff;">关闭</view>
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
				showAll: false
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
				const callback = (res) => {
					if (res.info.data.length > 0) {

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
						self.swiperData = res.info.data[0]
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
