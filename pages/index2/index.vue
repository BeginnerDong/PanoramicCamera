<template>
	<view>
		<view class="index-top" style="display: flex">
			<view class="logo ">
				<img src="../../static/images/logo2.png" />
			</view>
			<view class="logo-right" style="display: flex;justify-content: flex-end;align-items: center;">
				<view class="logo-right-span" style="width:50%;margin-right: 50rpx;display: flex;align-items: center;justify-content: flex-end;" @click="showCity">{{currentSiteData.title}}
					<image src="../../static/images/home-icon10.png"></image>
				</view>
				<view  style="margin-right: 20rpx;display: flex;align-items: center;" @click="showSearch">
					<image style="width:18px;height:18px" src="../../static/images/home-icon13.png"></image>
				</view>
			</view>
		</view>
		<view  :style="show_search?'display:block':'display:none'" style="padding: 0 20px;margin-top: 20px;">
			<input style="width:70%;border: 1px solid #e2e2e2;" placeholder="请输入商品名称搜索" v-model="title" class="ilblock" />
			<button style="width:20%;height: 23px;line-height: 23px;font-size: 12px;display: inline-block;margin-left: 20px;" 
			@click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?title='+title}})" class="color8 ilblock">搜索</button>
		</view>
		<view style="width: 100%;background: #F8F8F8;">
			<c-swiper :list="swiperData">
			</c-swiper>
			<view class="radionav">
				<view class="radionav-box ilblock" style="width:100%">
					<view class="radionav-item" style="margin-left: 0px;" v-for="(item,index) in labelData"  :data-id="item.id"
					 @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id='+$event.currentTarget.dataset.id}})">
						<view>
							<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
							<view class="color2">{{item.title}}</view>
						</view>
					</view>
					<view class="radionav-item" v-for="(item,index) in currentSiteData.cityData" v-if="index<5" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?city_id='+$event.currentTarget.dataset.id}})">
						<view>
							<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
							<view class="color2">{{item.title}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="recommend" v-if="currentSiteData.description&&currentSiteData.description!='0'&&showMore">
				<view class="recommend-top">
					<span>更多推荐</span>
					<img src="../../static/images/home-icon11.png" style="margin-left: 10%;" />
					<img src="../../static/images/home-icon12.png" style="margin-left: 30%;" />
				</view>
				<view class="recommend-middle">
					<view class="recommend-box r-type1" style="width: 24%;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id=22'}})">
						<view class="color2" style="font-weight: bold;">省内酒店</view>
						<view class="color1">省内精选</view>
					</view>
					<view class="recommend-box" style="width: 24.5%;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id=22&noSite=true'}})">
						<view class="color2" style="font-weight: bold;">全国酒店</view>
						<view class="color1">全国精选</view>
					</view>
					<view class="recommend-box" style="width: 26.5%;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id=32'}})">
						<view class="color2" style="font-weight: bold;">长隆度假区</view>
						<view class="color1">长隆</view>
					</view>
					<view class="recommend-box" style="width: 23.5%;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id=33'}})">
						<view class="color2" style="font-weight: bold;">港澳酒店</view>
						<view class="color1">动感之都</view>
					</view>
				</view>
				<view class="recommend-middle" >
					<view class="recommend-box" style="width: 32.8%;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id=34'}})">
						<view class="color2" style="font-weight: bold;">全球购</view>
						<view class="color1">全球热卖好货</view>
					</view>
					<view class="recommend-box" style="width: 32.5%;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id=35'}})">
						<view class="color2" style="font-weight: bold;">果蔬百货</view>
						<view class="color1">果蔬百货</view>
					</view>
					<view class="recommend-box" style="width: 32.8%;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?category_id=37'}})">
						<view class="color2" style="font-weight: bold;">一日游</view>
						<view class="color1">周边精选</view>
					</view>
					
				</view>
			</view>
			<view style="width: 100%; height: 15px;" v-if="currentSiteData.description&&currentSiteData.description!='0'"></view>
		</view>
		<view style="width: 100%; height: 10px;"></view>
		<view style="width: 100%; background: #F8F8F8; overflow: hidden; 
		overflow: hidden;white-space: nowrap;">
			<view class="best-top">
				<view class="color2 ilblock font14" style="margin-left: 15px;">最火热卖</view>
				<view class="color1 ilblock besttext font14" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more?order=sale_count'}})">
					查看更多</view>
			</view>
			<scroll-view scroll-x="true">
				<view class="best-box ilblock" style="margin-left: 15px;" v-for="(item,index) in hotData" v-if="index<5" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+$event.currentTarget.dataset.id}})">
					<view class="best-box-top">
						<img :src="item.hotImg&&item.hotImg[0]?item.hotImg[0].url:''" />
						<view class="best-num ilblock">
							{{item.false_stock>0?'已售'+item.false_sale_count:'已售罄'}}
						</view>
					</view>
					<view class="best-text ilblockxz" style="white-space: normal;">
						{{item.title}}
					</view>
					<view style="margint: 0 4%;" >
						<view class="ilblock" style="margin-left: 10rpx; font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">{{item.price}}</span></view>
						<div class="ilblock best-money1" style="width: auto;" v-if="userData.primary_scope>10">
							<view class="span1 ilblock bg3" style="width: auto;padding: 0 3px;">店返</view>
							<view class="span2 ilblock color8" style="width: auto;padding-right: 8px;">￥{{item.shop_reward}}</view>
						</div>
						<div class="ilblock best-money2" style="width: auto;" v-if="userData.primary_scope>10">
							<view class="span1 ilblock bg4" style="width: auto;padding: 0 3px;">团返</view>
							<view class="span2 ilblock" style="color: #F14667;width: auto;padding-right: 8px;">￥{{item.group_reward}}</view>
						</div>
					</view>
				</view>
			</scroll-view>
			<view style="width: 100%; height: 15px;"></view>
		</view>
		<view style="width: 100%; height: 10px;"></view>
		<view style="width: 100%; background: #F8F8F8; overflow: hidden; margin-bottom: 50px;">
			<view class="best-top">
				<view class="color2 ilblock" style="margin-left: 15px;font-size:14px">全部商品</view>
				<view class="color1 ilblock besttext" style="font-size:14px" @click="webSelf.$Router.navigateTo({route:{path:'/pages/more/more'}})">查看更多</view>
			</view>
			<view class="all-store" v-for="(item,index) in mainData" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+$event.currentTarget.dataset.id}})">
				<view class="all-store-img ilblock">
					<img :src="item.mainImg&&item.mainImg[0]?item.mainImg[0].url:''" />
					<view class="store-num ilblock">
						{{item.false_stock>0?'已售'+item.false_sale_count:'已售罄'}}
					</view>
				</view>
				<view class=" ilblock" style="width: 67%;position: absolute; top: 0px;right: 0px;">
					
					<view class="color1 font12 time" v-if="item.timeCount&&item.hourCount<24"> 距结束仅剩
						<view class="bg3">{{item.hourCount}}</view>:<view class="bg3">{{item.minCount}}</view>:<view class="bg3">{{item.secCount}}</view>
					</view>
					<view class="color1 font12 time" style="color: #F98A48;" v-else> 
						抢购中
					</view>
					<view class="ilblock color2 all-store-text">
						<view class="ilblockxz">
							{{item.title}}
						</view>
					</view>
					<view class="ilblock" style="padding: 0px 5px;width: 100%;">

						<view class="ilblock fsize price_p0" style="color: rgb(249,138,72);margin-bottom: 10pz;width: 100%;">￥<span class="price_p1" style="width: 100%;">{{item.price}}</span></view>

						<view class="ilblock wiblock" style="flex-wrap: nowrap;width: 100%;" v-if="item.skuDate.length==0&&userData.primary_scope>10">
							<div class="ilblock best-money1 wiblock1" style="width: auto;" >
								<view class="span1 ilblock bg3" style="width: auto;padding: 0 3px;">店返</view>
								<view class="span2 ilblock color8" style="width: auto;padding-right: 3px;">￥{{item.shop_reward}}</view>
							</div>
							<div class="ilblock best-money2 wiblock1" style="width: auto;">
								<view class="span1 ilblock bg4" style="width: auto;padding: 0 3px;">团返</view>
								<view class="span2 ilblock color9" style="width: auto;">￥{{item.group_reward}}</view>
							</div>
						</view>

						<view class="ilblock best-topred wiblock2 hinnt_p" style="left: 0;margin-left: 8px;" v-if="item.skuDate.length>0&&userData.primary_scope>10">
							返佣具体以日期为准
						</view>
					</view>
				</view>
			</view>
			<view style="width: 100%; height: 15px; background: #F8F8F8;"></view>
			<view class="zhan" v-if="show_city">
				<view class="zhan-item ilblock" v-for="item in siteData" :style="item.id==currentSiteData.id?'background: linear-gradient(to right,#FF9B5C,#FF6160);color:#fff':''"
				 @click="changeSite(item.id)">
					{{item.title}}
				</view>
				<view style="width: 100%; height: 20px;"></view>
			</view>
		</view>

		

		<view style="width: 100%; height: 20px;"></view>
		<view class="navbar-brand">
			<view class="color1" style="margin-top: 10px;">
				<view class="navbar-item ilblock">
					<view class="navbar-img">
						<image src="../../static/images/navbar1-a.png"></image>
					</view>
					<view class="color8">首页</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.redirectTo({route:{path:'/pages/follow/follow'}})">
					<view class="navbar-img">
						<image src="../../static/images/navbar2.png"></image>
					</view>
					<view>关注</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.redirectTo({route:{path:'/pages/user/user'}})">
					<view class="navbar-img">
						<image src="../../static/images/navbar3.png"></image>
					</view>
					<view>我的</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cSwiper from "@/components/swiper/swiper.vue"
	import cTabbar from "@/components/tabbar/tabbar.vue"
	export default {
		components: {
			cSwiper,
			cTabbar
		},
		data() {
			return {
				siteDataId: [],
				hotData: [],
				siteData: [],
				mainData: [],
				labelData: [],
				currentSiteData:{},
				endTimeList: [],
				countDownList:[],
				userData:{},
				swiperData: [],
				webSelf: this,
				now: '',
				show_city: false,
				isLoadAll:false,
				show_search:false,
				title:'',
				primary_scope:'',
				showMore:false
			}
		},
		onLoad() {
			
			const self = this;
			self.timestampNow = (new Date()).getTime();
			var options = self.$Utils.getHashParameters();
			if(options[0]&&options[0].site_id){
				self.site_id = options[0].site_id
			};
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.paginateTwo = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			self.$Utils.loadAll(['getSiteData', 'getLabelData','wxJsSdk','getUserData','tokenGet'], self);
			/* var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['getSiteData', 'getLabelData','wxJsSdk','getUserData'], self);
			});
			console.log('res',res);
			if(res){
				console.log('login');
				self.$Utils.loadAll(['getSiteData', 'getLabelData','wxJsSdk','getUserData'], self);
			}; */
			if(uni.getStorageSync('user_info').primary_scope){
				self.primary_scope  = uni.getStorageSync('user_info').primary_scope;
			};	
				
		},
		
		onShow() {
			const self = this;
			console.log('onShow',self.timestampNow)
			self.countDown();
		},	
		
		onReachBottom(){
			console.log('onReachBottom')
			const self = this;
			if(!self.isLoadAll&&uni.getStorageSync('canClick')){
				self.paginate.currentPage++;
				self.getMainData()
			};	
		},
		
		onUnload () {
			const self = this;
			console.log('onUnload')
              clearTimeout(self.timeInterval);  
        },
		
		onHide () {
			const self = this;
			console.log('onHide')
		    clearTimeout(self.timeInterval);  
		},
		
		methods: {
			
			showSearch(){
				const self = this;
				self.show_search = !self.show_search
			},
			
			getUserData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.solely_code == 100000&&res.info.data[0]) {
						self.userData = res.info.data[0]
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getUserData');
					
				};
				self.$apis.userGet(postData, callback);
			},
			
			tokenGet() {
				const self = this;
				const postData = {
					searchItem: {
						user_no: 'U625437036798440'
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.solely_code == 100000) {
						uni.setStorageSync('user_token', res.token);
						uni.setStorageSync('user_no', res.info.user_no);
						uni.setStorageSync('user_info', res.info);
					}
					console.log('res', res)
					self.$Utils.finishFunc('tokenGet');
				};
				self.$apis.tokenGet(postData, callback);
			},
			
			getSiteData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type: 9
				};
				postData.order = {
					listorder: 'desc'
				};
				postData.getAfter = {
					cityData: {
						tableName: 'Label',
						middleKey: 'id',
						key: 'parentid',
						condition: '=',
						searchItem: {
							status: 1
						}
					}
				};		
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.showMore = true;
						self.siteData.push.apply(self.siteData, res.info.data);
						for (var i = 0; i < self.siteData.length; i++) {
							self.siteDataId.push(self.siteData[i].id)
						};
						if (self.site_id) {
							for (var i = 0; i < self.siteData.length; i++) {
								if (self.site_id == self.siteData[i].id) {
									uni.setStorageSync('siteData', self.siteData[i]);
									self.currentSiteData = uni.getStorageSync('siteData');
								};
							};
						} else {
							uni.setStorageSync('siteData', self.siteData[0]);
							self.currentSiteData = uni.getStorageSync('siteData');
						};	
						self.getSliderData();
						self.getMainData();
						self.getHotData();
						
					};
				};
				self.$apis.labelGet(postData, callback);
			},
			
			
			
			getMainData(isNew) {
				const self = this;
				var now = new Date().getTime();
				if(isNew){
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 5,
						is_page: true,
					}
				};
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					province_id: uni.getStorageSync('siteData').id,
					end_time: ['>', now],
					onShelf:1
				};
				postData.getAfter = {
					skuDate: {
						tableName: 'SkuDate',
						middleKey: 'product_no',
						key: 'product_no',
						condition: '=',
						searchItem: {
							status: 1
						}
					}
				};
				postData.order = {
					listorder: 'desc'
				};
				const callback = (res) => {
					
					if (res.info.data.length > 0) {
						for (var i = 0; i < res.info.data.length; i++) {
							if(res.info.data[i].start_time<self.timestampNow&&res.info.data[i].end_time>self.timestampNow&&res.info.data[i].end_time-self.timestampNow<24*60*60*1000){
								res.info.data[i].timeCount = true;
								let time = (res.info.data[i].end_time - self.timestampNow) / 1000;
								// 获取天、时、分、秒
								//let day = parseInt(time / (60 * 60 * 24));
								res.info.data[i].hourCount = parseInt(time/(60 * 60));
								res.info.data[i].minCount = parseInt(time % (60 * 60)/60);
								res.info.data[i].secCount = parseInt(time % 60 );
								console.log('res.info.data[i].timeCount',res.info.data[i])	
							};
						};
						self.mainData.push.apply(self.mainData, res.info.data);
						
					
					
					}else{
						self.isLoadAll = true;
						
						uni.showToast({
						    title: '没有更多了',
						    icon: 'fail',
						    duration: 2000,
						    mask:true
						});
					};
					
					self.$Utils.finishFunc('getMainData');
						
				};
				self.$apis.productGet(postData, callback);
			},
			
			getHotData() {
				const self = this;
				var now = new Date().getTime();
				self.hotData = [];
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					province_id: uni.getStorageSync('siteData').id,
					onShelf:1,
					end_time: ['>', now],
				};
				postData.order = {
					false_sale_count: 'desc',
					
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.hotData.push.apply(self.hotData, res.info.data);
					};
					self.$Utils.finishFunc('getSiteData');
					self.$Utils.finishFunc('getHotData');
				};
				self.$apis.productGet(postData, callback);
			},
			
			getLabelData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					id:['not in',[22,32,33,34,35,37]]
				};
				postData.getBefore = {
					city: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['商品类别']],
						},
						middleKey: 'parentid',
						key: 'id',
						condition: 'in',
					},
				};
				postData.order = {
					listorder: 'desc'
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.labelData.push.apply(self.labelData, res.info.data);
					};
					self.$Utils.finishFunc('getLabelData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
			getSliderData() {
				const self = this;
				self.swiperData = [];
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id
				};
				postData.getBefore = {
					city: {
						tableName: 'Label',
						searchItem: {
							title: ['=', [uni.getStorageSync('siteData').title+'轮播']],
						},
						middleKey: 'parentid',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						for (var i = 0; i < res.info.data.length; i++) {
							res.info.data[i].mainImg[0].src=res.info.data[i].url;
							self.swiperData.push(res.info.data[i].mainImg[0]);
						};
						console.log('swiperData',self.swiperData)
					};
					self.$Utils.finishFunc('getSliderData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
			

			wxJsSdk(){
				const self = this;
				const postData = {
					thirdapp_id:2,
					url:window.location.href
				};
				const callback = (res)=>{
					
					self.$jweixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId:res.appId, // 必填，公众号的唯一标识
						timestamp:res.timestamp , // 必填，生成签名的时间戳
						nonceStr:res.nonceStr, // 必填，生成签名的随机串
						signature:res.signature,// 必填，签名
						jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
					});
					self.$jweixin.ready(function () {   //需在用户可能点击分享按钮前就先调用
						
						
						self.$jweixin.updateAppMessageShareData({ 
							title: '本地捕手', // 分享标题
							desc: '搜寻吃喝玩乐', // 分享描述
							link: 'http://www.local-scanner.com/wx/?parent_no='+uni.getStorageSync('user_info').user_no, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
							imgUrl: '', // 分享图标
							success: function () {
							  // 设置成功
							}
						})
						
					});
					self.$jweixin.error(function(res){
						console.log('error',res)
					});
					self.$Utils.finishFunc('wxJsSdk');
				};
				self.$apis.WxJssdk(postData,callback);
			},

			changeSite(site_id) {
				const self = this;
				for (var i = 0; i < self.siteData.length; i++) {
					if (site_id == self.siteData[i].id) {
						uni.setStorageSync('siteData', self.siteData[i]);
						self.currentSiteData = uni.getStorageSync('siteData');
					};
				};
				self.show_city = false;
				self.getSliderData();
				self.getMainData(true);
				self.getHotData()
			},
			
			showCity() {
				const self = this;
				self.show_city = !self.show_city
			},

			
			
			timeFormat(param) { //小于10的格式化函数
				const self = this;
				return param < 10 ? '0' + param : param;
			},

			countDown() { //倒计时函数
				// 获取当前时间，同时得到活动结束时间数组
				const self = this;
				self.countDownList = [];
				let newTime = Date.parse(new Date());
				let time = (newTime - self.timestampNow) / 1000;
				// 获取天、时、分、秒
				let hou = parseInt(time/(60 * 60));
				let min = parseInt(time % (60 * 60)/60);
				let sec = parseInt(time % 60 );
				for (var i = 0; i < self.mainData.length; i++) {
					if(self.mainData[i].timeCount){
						self.mainData[i].secCount = self.mainData[i].secCount-sec;
						self.mainData[i].minCount = self.mainData[i].minCount-min;
						self.mainData[i].hourCount = self.mainData[i].hourCount-hou;
						if(self.mainData[i].secCount<0){
							self.mainData[i].secCount = self.mainData[i].secCount+60;
							self.mainData[i].minCount = self.mainData[i].minCount-1;
						};
						if(self.mainData[i].minCount<0){
							self.mainData[i].minCount = self.mainData[i].minCount+60;
							self.mainData[i].hourCount = self.mainData[i].hourCount-1;
						};
						if(self.mainData[i].hourCount<0){
							self.mainData[i].hourCount = 0;
							self.mainData[i].timeCount = true;
						};
					};
				};	
				self.timestampNow = newTime;
				console.log('countDown');
				self.timeInterval = setTimeout(function(){
					self.countDown()
				},1000)
			},

		}
	}
</script>

<style>
	
	@import "../../assets/style/index.css";
	.ilblockxz{
		display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
	}
	.hinnt_p{
		font-size: 14px;
		/*position: absolute;
		bottom: 1px; 
		left: 32%;*/
	}
	.price_p1{
		font-size: 20px;
	}
	.wiblock{
		display: block;min-height: 23px;
	}
	.wiblock1{
		margin-left: 4px !important;
		
	}
	@media screen and (max-width: 360px){
		/* .recommend-middle{
			font-size: 10px;
		} */
		.r-type1{
			width: 23.5% !important;
		}
		.wiblock{
			width: 64% !important;
		}
		.wiblock1{
			width: 46% !important;
			margin-left: 4px !important;
		}
		/*.wiblock2{
			left: 29% !important;
		}*/
		.font12{
			font-size: 10px !important;
		}
		.fsize{
			font-size: 14px !important;
		}
		.price_p1,.price_p0{
			font-size: 20px !important;
		}
		.hinnt_p{
			font-size: 12px !important;
			bottom: 2px !important;
			/*left: 32% !important;*/
		}
	}
</style>
