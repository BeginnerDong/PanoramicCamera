<template>
	<view style="width:100%;">
		<view class="indexbox">
		  <!-- 信息列表 -->
		  <view class="indexForm">
		    <view class="contbox bg1 radiu15" v-for="(item,index) in mainData" :key="index">
		      <view class="msgLis">
		        <view class="left font26 color2">开始时间</view>
		        <view class="right font28 color2">{{item.create_time}}</view>
		      </view>
			  <view class="msgLis">
			    <view class="left font26 color2">归还状态</view>
			    <view class="right font28 color2">{{item.transport_stataus==2?'已归还':'未归还'}}</view>
			  </view>
			  <view class="msgLis">
			    <view class="left font26 color2">订单状态</view>
			    <view class="right font28 color2">{{item.express_info}}</view>
			  </view>
			  <view class="msgLis">
			    <view class="left font26 color2">租赁单价</view>
			    <view class="right font28 color2">{{item.products&&item.products[0]&&item.products[0].snap_product?item.products[0].snap_product.price:''}}/天</view>
			  </view>
			  <view class="msgLis">
			    <view class="left font26 color2">租赁总价</view>
			    <view class="right font28 color2" style="color: red;">¥{{item.price}}</view>
			  </view>
		      <button v-if="item.express_info=='已延期'" class="finalBtn pubbj color5 center font26 radiu40" @click="pay(index)">结算</button>
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
				searchItem:{
					thirdapp_id:2
				},
				mainData:[],

			}
		},
		
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getMainData'], self)
		
		},
		
		
		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},
		
		methods: {
			
			pay(index) {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					order_id:self.mainData[index].id
				}
				const callback = (res) => {
					if (res.info.data.length > 0) {
					
					} 

				};
				self.$apis.payAll(postData, callback);
			},
			
			getMainData(isNew) {
				const self = this;
				var nowTime = Date.parse(new Date()) / 1000;
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 5,
						is_page: true,
					};
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no = uni.getStorageSync('user_info').user_no;
				postData.searchItem.pay_status = 1;
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						for (var i = 0; i < self.mainData.length; i++) {
							if(self.mainData[i].transport_status==1){
								if(parseInt(self.mainData[i].pay_time)>parseInt(nowTime)){
									self.mainData[i].express_info ='未延期'
								}else{
									self.mainData[i].express_info ='已延期'
								}
							}else{
								self.mainData[i].express_info ='已完结'
							}
						}
					} 
					console.log(self.mainData)
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
