<template>
	<view class="protocolPg">
	  <view class="title font28">{{mainData.title}}</view>
	  <view class="texLis font26 color2">
		  <view class="content ql-editor"  v-html="mainData.content">
		  </view>
	  </view>
	    <view class="writeBtn">
	      <view class="LBtn btn color1 pubColor" 
		  @click="Router.redirectTo({route:{path:'/pages/star/star'}})" open-type='navigate'>取消签署</view>
	      <view class="RBt btn pubbj color5"  
		  @click="Router.redirectTo({route:{path:'/pages/login/login'}})"  open-type='navigate'>同意签署</view>
	    </view>
	</view>
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
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['协议']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0]
					}
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
			
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	page{
		background: #fff;
	}
	.protocolPg{ padding:0 20rpx;}
	.protocolPg .title{text-align: center; line-height: 30rpx; padding-bottom: 40rpx;padding-top:30rpx; color: rgba(34,34,34) }
	.protocolPg .texLis{padding-bottom: 20rpx;}
	.writeBtn{ padding:130rpx 0;}
</style>
