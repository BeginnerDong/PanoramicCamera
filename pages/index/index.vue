<template>
	<view style="width:100%;">
		<view class="indexbox">
		  <!-- 信息列表 -->
		  <view class="indexForm">
		    <view class="contbox bg1 radiu15" v-for="(item,index) in contbox" :key="index">
		      <view class="msgLis" v-for=" c_item in item.indexForm" :key="c_item.title">
		        <view class="left font26 color2">{{c_item.title}}</view>
		        <view class="right font28 color2">{{c_item.msginfor}}</view>
		      </view>
		      <button class="finalBtn pubbj color5 center font26 radiu40" bindtap="goFinal">结算</button>
		    </view>
		  </view>
		</view>
		<view style="width: 100%;height: 150rpx;"></view>
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
				        msginfor: "---"
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
				],
				tapName: function (event) {
				  console.log(event)
				}
			}
		},
		onLoad() {
			const self = this;
			//self.$Utils.loadAll(['getMainData'], self);
		},
		methods: {
			
			getMainData:function(){
				const self = this;
				console.log('852369')
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				
				const callback = (res) => {
					if (res.solely_code == 100000&&res.info.data[0]) {
						self.mainData = res.info.data;
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getMainData');
					
				};
				self.$apis.orderGet(postData, callback);
				
			},
			goFinal:function(){
			  wx.navigateTo({
			    url: '../orderList/orderList',
			  })
			},
		},
	};
</script>

<style>
	page{ background:#f5f5f5;}
	.indexbox{padding: 30rpx; box-sizing: border-box;}
	.contbox{ margin-bottom: 30rpx; position: relative;}
	.msgLis{ padding: 40rpx 30rpx; border-top: 2rpx solid #e1e1e1; line-height: 28rpx; }
	.msgLis:first-child{border-top: none;}
	.msgLis .left,.msgLis .right{ display: inline-block;}
	.msgLis .left{ margin-right: 60rpx;}
	.msgLis:nth-child(3) .right{ color: red}
	.finalBtn{width: 120rpx; height: 50rpx; line-height: 50rpx; position: absolute; right: 30rpx; bottom: 30rpx;padding: 0;}
</style>
