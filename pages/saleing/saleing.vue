<template>
	<view>
		<view class="saleContbox" v-for="(item,index) in mainData">
			<view class="saleMain bg1 radiu15">
				<view class="top">
					<image class="leftPhoto radiu50" :src="item.user&&item.user[0]?item.user[0].headImgUrl:''"></image>
					<view class="righMsg ligh1">
						<view class="name font24 color2">{{item.user&&item.user[0]?item.user[0].nickname:''}}</view>
						<view class="number font26 color1">{{item.phone}}</view>
						<view class="orderState font24 pubColor">待用户补缴费用</view>
					</view>
				</view>
				<view class="bottom radiu15">
					<view class="botCont  radiu15">
						<view class="name font24 color2">订单开始时间</view>
						<view class="infor font26 color1">2019-07-20 14:24:30</view>
					</view>
					<view class="botCont  radiu15">
						<view class="name font24 color2">逾期累积费用</view>
						<view class="infor font26 color1">￥156.6</view>
					</view>
				</view>
				<button class="overBtn borderBtn bdColor1 borderH60 font26" bindtap="overOrder">结束订单</button>
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

		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	
	.salemanCont {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}

	.bjtu {
		width: 100%;
		height: 100%;
		display: block;
	}

	.seach {
		width: 90%;
		margin: 0 auto;
		position: fixed;
		top: 40%;
		left: 5%;
		z-index: 10;
		height: 50rpx;
		padding: 15rpx 0;
	}

	.seach .icon {
		width: 40rpx;
		height: 40rpx;
		display: block;
		position: absolute;
		top: 20rpx;
		left: 30rpx;
	}

	.seach .write {
		width: 430rpx;
		display: inline-block;
		line-height: 50rpx;
		height: 50rp;
		border: none;
		padding: 0 90rpx;
	}

	.seacBtn {
		height: 80rpx;
		width: 120rpx;
		position: absolute;
		right: 0;
		top: 0;
		border-radius: 0 15rpx 15rpx 0;
		margin: 0;
		line-height: 80rpx;
		color: #fff;
	}
</style>
