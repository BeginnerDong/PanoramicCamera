<template>
	<view class="indexbox">
	  <!-- 信息列表 -->
	  <view class="indexForm">
	    <view class="contbox bg1 radiu15" v-for="item in contbox">
	      <view class="msgLis" v-for="c_item in item.indexForm">
	        <view class="left font26 color2">{{c_item.title}}</view>
	        <view class="right font28 color2">{{c_item.msginfor}}</view>
	      </view>
	      <button class="finalBtn pubbj color5 center font26 radiu40" @click="Router.redirectTo({route:{path:'/pages/orderXq/orderXq'}})">去结算</button>
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
				contbox: [
				  {
				    indexForm: [
				      {
				        title: "开始时间",
				        msginfor: "2019-07-20 10：48：30"
				      },
				      {
				        title: "归还状态",
				        msginfor: "未归还"
				      },
				      {
				        title: "订单状态",
				        msginfor: "已延期"
				      },
				      {
				        title: "租赁单价",
				        msginfor: "39.8/天"
				      },
				      {
				        title: "租赁总价",
				        msginfor: "￥166.6/天"
				      }
				    ]
				  },
				  {
				    indexForm: [
				      {
				        title: "开始时间",
				        msginfor: "2019-07-19 10：48：30"
				      },
				      {
				        title: "归还状态",
				        msginfor: "未归还"
				      },
				      {
				        title: "订单状态",
				        msginfor: "已延期"
				      },
				      {
				        title: "租赁单价",
				        msginfor: "39.8/天"
				      },
				      {
				        title: "租赁总价",
				        msginfor: "---"
				      }
				    ]
				  }
				]
			}
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
	.indexbox{padding: 30rpx; box-sizing: border-box;}
	.contbox{ margin-bottom: 30rpx; position: relative;}
	.msgLis{ padding: 40rpx 30rpx; border-top: 2rpx solid #e1e1e1; line-height: 28rpx; }
	.msgLis:first-child{border-top: none;}
	.msgLis .left,.msgLis .right{ display: inline-block;}
	.msgLis .left{ margin-right: 60rpx;}
	.msgLis:nth-child(3) .right{ color: red}
	.finalBtn{width: 120rpx; height: 50rpx; line-height: 50rpx; position: absolute; right: 30rpx; bottom: 30rpx;padding: 0;}
	.msgLis:last-of-type .right{ color: red}
</style>
