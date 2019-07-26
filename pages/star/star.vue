<template>
	<view style="height:100%" @click="Router.redirectTo({route:{path:'/pages/protocol/protocol'}})"  bindtap="goProtocol" >
	      <view class="open">关闭</view>
	      <image class="allHpic" src="/static/images/img1.png"></image>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				basic_blue:this.$AssetsConfig.basic_blue,
				Router:this.$Router,
				imgLis:""
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
	page{ height: 100%}
	navigator{ width: 100%; height: 100%;}
	.starpage .open{ color: #fff;font-size: 26rpx; position: absolute; top:
	10rpx; right:24rpx; z-index: 111;}
	.starpage .allHpic{ height: 100%; width: 100%; display: block;}
</style>
