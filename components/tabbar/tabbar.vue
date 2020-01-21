<template>
	<view class="flex flexCenter tabbar" style="" >
		
		<view class="tabbar_item" @click="!color_one?Router.redirectTo({route:{path:'/pages/index/index'}}):''">
			<view class="nav_img flex flexCenter">
			   <image  :src="src_one"></image>
			</view>
			<view class="nav_title" :style="color_one?'color:'+basic_blue:''">首页</view>
		</view>
	   
		<view class="tabbar_item" @click="intoPath">
		  <view class="nav_img flex flexCenter">
		     <image  :src="src_two"></image>
		  </view>
		  <view class="nav_title" :style="color_two?'color:'+basic_blue:''">业务员</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Array
		},
		
		data() {
			return {
				currIndex: 0,
				src_one:'',
				src_two:'',
				color_one:false,
				color_two:false,
				basic_blue:this.$AssetsConfig.basic_blue,
				Router:this.$Router
			};
		},
		
		mounted:function(){
			const self = this;
			console.log('$AssetsConfig',this.$AssetsConfig)
			var route = getCurrentPages()[0].__route__;
			console.log('route323',route)
			if(route=="pages/index/index"){
				self.src_one = '/static/images/nabar1-a.png';
				self.color_one = true;
				self.src_two = '/static/images/nabar2.png';
				self.color_two = false;
			}else{
				self.src_one = '/static/images/nabar1.png';
				self.color_one = false;
				self.src_two = '/static/images/nabar2-a.png';
				self.color_two = true;
			};
			
		},
		
		methods: {
			intoPath(){
				const self = this;
				const sale_token = uni.getStorageSync('sale_token');
				if(sale_token){
					self.$Router.redirectTo({route:{path:'/pages/salesman/salesman'}});
				}else{
					self.$Router.redirectTo({route:{path:'/pages/staffLogin/staffLogin'}});
				};	
			}
		}
	}
</script>

<style >
	@import "../../assets/style/public.css";
	.tabbar{
		width: 100%;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: white;
	}
	.tabbar_item{
		width: 50%;
		height: 100%;
	}
	.nav_img{
		width:100%;
		height: 80rpx;
		text-align: center;
		overflow: hidden;
	}
	.nav_img image {
		width: 70rpx;
		height: 63rpx;
	}
	.nav_title{
		width:100%;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 30rpx;
		text-align: center;
	}
	
</style>
