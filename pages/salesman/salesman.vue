<template>
	<view class="salemanCont">
	  <image class="bjtu" src="/static/images/img2.png"></image>
	  <view class="seach bg1 radiu15">
	      <image class="icon" src="/static/images/search-icon1.png"></image>
	      <input class="write font28" type="number" placeholder="输入手机号码" maxlength="11" v-model="phone"></input>
	      <button class="seacBtn pubbj color5 center font26" type="submit" 
		   @click="goSearch">搜索</button>
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
				phone:''
			};
		},
		onLoad:function(){
			const self = this;	
		},
		methods: {	
			
			goSearch(){
				const self = this;
				if(self.phone!=''){
					self.Router.navigateTo({route:{path:'/pages/saleing/saleing?phone='+self.phone}})
				}else{
					self.$Utils.showToast('请输入手机号搜索', 'none')
				}
			},
			
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	.salemanCont{width: 100%; height: 100%; position: fixed; top: 0; left: 0; }
	.bjtu{ width: 100%; height: 100%; display: block;}
	.seach{ width: 90%; margin: 0 auto; position: fixed; top: 40%; left:5%;z-index: 10; height: 50rpx;  padding: 15rpx 0; }
	.seach .icon{ width: 40rpx; height: 40rpx; display:block; position: absolute; top: 20rpx;left: 30rpx;}
	.seach .write{ width: 430rpx; display: inline-block; line-height: 50rpx; height: 50rp;border: none;padding: 0 90rpx ;}
	.seacBtn{ height: 80rpx;width: 120rpx; position: absolute; right: 0; top: 0; border-radius: 0 15rpx 15rpx 0;margin: 0; line-height: 80rpx; color: #fff;}
</style>
