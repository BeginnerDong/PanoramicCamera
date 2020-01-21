<template>
	<view>
		<view class="saleContbox" v-for="(item,index) in mainData">
			<view class="saleMain bg1 radiu15">
				<view class="top">
					<image class="leftPhoto radiu50" :src="item.user&&item.user[0]?item.user[0].headImgUrl:''"></image>
					<view class="righMsg ligh1">
						<view class="name font24 color2">{{item.user&&item.user[0]?item.user[0].nickname:''}}</view>
						<view class="number font26 color1">{{item.phone}}</view>
						<view class="orderState font24 pubColor" v-if="item.express_info=='已延期'">待用户补缴费用</view>
						<view class="orderState font24 pubColor" v-if="item.transport_status==2">已完结</view>
					</view>
				</view>
				<view class="bottom radiu15">
					<view class="botCont  radiu15">
						<view class="name font24 color2">订单开始时间</view>
						<view class="infor font26 color1">{{item.create_time}}</view>
					</view>
					<view class="botCont  radiu15">
						<view class="name font24 color2">逾期累积费用</view>
						<view class="infor font26 color1">￥{{item.transport_status==2?item.balance:item.topay}}</view>
					</view>
				</view>
				<button class="overBtn borderBtn bdColor1 borderH60 font26" v-if="item.transport_status==1" @click="overOrder(index)">结束订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				basic_blue: this.$AssetsConfig.basic_blue,
				Router: this.$Router,
				phone: '',
				mainData:[]
			};
		},
		
		onLoad(options) {
			const self = this;
			self.phone = options.phone
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
			
			overOrder(index) {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getMerchantToken';
				postData.data = {
					order_id:self.mainData[index].id
				}
				const callback = (res) => {
					if(res.solely_code==100000){
						self.$Utils.showToast('成功完结', 'none');
						setTimeout(function() {
							self.getMainData(true)
						}, 1000);
					}else{
						self.$Utils.showToast(res.msg, 'none');
					}
				};
				self.$apis.closeOrder(postData, callback);
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
				postData.searchItem = {
					passage1:self.phone,
					user_type:0
				};
				postData.searchItem.pay_status = 1;
				postData.tokenFuncName = 'getMerchantToken';
				postData.getAfter = {
					user:{
						tableName:'User',
						middleKey:'user_no',
						key:'user_no',
						searchItem:{
							status:1,
							user_type:0
						},
						condition:'='
					}
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						for (var i = 0; i < self.mainData.length; i++) {
							if(self.mainData[i].transport_status==1){
								if(parseInt(self.mainData[i].topay)==0){
									self.mainData[i].express_info ='未延期'
								}else{
									self.mainData[i].express_info ='已延期'
								}
							}else{
								self.mainData[i].express_info ='已完结'
							}
						}
					}else{
						self.$Utils.showToast('未找到相关订单', 'none');
						setTimeout(function() {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
					}
					console.log(self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},

		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	
	page{ background: #f5f5f5;}
	.saleContbox{ padding: 30rpx;}
	.saleMain{ padding: 30rpx; overflow: hidden; position: relative;}
	.saleMain .top{ overflow: hidden; padding-bottom: 29rpx; border-bottom: 2rpx solid #f5f5f5}
	.top .leftPhoto{ width: 100rpx; height: 100rpx;display: inline-block; float: left;}
	.top .righMsg{ padding:10rpx 0 0 19rpx; float: left;}
	.top .righMsg .name{padding-bottom: 26rpx;}
	.bottom{ margin-top: 30rpx; background: #f6f6f6; padding:20rpx;}
	.botCont{ line-height: 64rpx; overflow: hidden}
	.botCont .name{ width: 33.3%;float: left;}
	.botCont .infor{ float: right;}
	.overBtn{ width: 160rpx;padding: 0;float: right;margin-top: 50rpx; }
	.orderState{ position: absolute; top: 20rpx; right: 30rpx;}
	
</style>
