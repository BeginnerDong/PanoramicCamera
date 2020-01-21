<template>
	<view class="center">
	  <image class="ewmPic" @click="preView()" :src="mainData.mainImg&&mainData.mainImg[0]?mainData.mainImg[0].url:''"></image>
	  <text class="color2 note font24" style="text-align: center;width: 100%;">说明：请保存二维码下载APP使用相机</text>
	  <button class="okbtn h80 font15 radiu15 pubbj color5"  @click="Router.redirectTo({route:{path:'/pages/index/index'}})">确认</button>
	</view>
	<!-- <web-view src="https://appgallery.cloud.huawei.com/uowap/index.html#/detailApp/C100019555?source=appshare&subsource=C100019555&shareTo=weixin&locale=zh_CN"></web-view> -->
</template>

<script>
	export default {
		
		data() {
			return {
				basic_blue:this.$AssetsConfig.basic_blue,
				Router:this.$Router,
				mainData:{}
			};
		},
		
		onLoad:function(){
			const self = this;	
			self.$Utils.loadAll(['getMainData'], self);
		},
		
		methods: {	
			
			preView(){
				const self = this;
				 uni.previewImage({
					urls: [self.mainData.mainImg[0].url],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					title:'二维码'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
		}
	}
</script>


<style>
	.ewmPic{ width:385rpx; height: 385rpx; display: block; margin: 0 auto; padding-top: 150rpx; }
	.note{ padding: 60rpx 0 200rpx 0; line-height: 1; display: inline-block;}
	.okbtn{ width: 71%; margin: 0 auto; display: block; line-height: 80rpx; }
</style>
