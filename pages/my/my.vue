<template>
	<view class="container">
		<!-- 用户基本信息 -->
		<view class="head">
			<image :src="userImgUrl" class="userImage"></image>
			<text class="userText" @tap="login">{{userName}}</text>
		</view>
		
		<view style="height: 36upx;"></view>
		
		<view  v-for="(item,index) in itemList" :key = "index" >
			<view class="item" hover-class="item-hover">
				<image class="item-img" :src="item.imgUrl" ></image>
				<view class="item-right">
					<text class="item-text">{{item.text}}</text>
					<image class="item-img2" src="../../static/arrow-right.png"></image>
				</view>
			</view>
		</view>
		<view class="logout" @tap="logout">退出登录</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import service from '../../service.js'
	import helper from '../../common/helper.js'
	export default {
		data() {
			console.log("data");
			return {
				userImgUrl: "../../static/logo.png",
				userName: "登录",
				itemList: [{
						imgUrl: "../../static/account.png",
						text: "消息",
					},
					{
						imgUrl: "../../static/account.png",
						text: "我的医生",
					}, {
						imgUrl: "../../static/account.png",
						text: "反馈",
					}, {
						imgUrl: "../../static/account.png",
						text: "设置",
					},
				],
			};
		},
		// 这个暂时未使用
		computed: mapState(['userName', 'avatarUrl']),
		methods: {
			logout() {
				if(!helper.isLogin()){
					return
				}
				helper.setIsLogin(false);
				service.clearUserInfo();
				helper.showToast("您已退出登录！");
				this.userImgUrl="../../static/logo.png";
				this.userName="登录";
			},
			login(){
				if(helper.isLogin()){
					return
				}
				uni.navigateTo({
					url: '../login/login',
				});
			},
		},
		onLoad() {
			let userInfo = service.getUserInfo();
			console.log("userInfo:" + JSON.stringify(userInfo));
			this.userImgUrl = userInfo.img_url;
			this.userName = userInfo.zsxm;
		},
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		font-size: 36upx;
	}

	.head {
		display: flex;
		flex-direction: row;
		background: #fff;
		position: relative;
		box-shadow: 0 2upx 4upx rgba(0, 0, 0, 0.3);
		align-items: center;
		padding: 60upx 50upx;
	}

	.userImage {
		width: 150upx;
		height: 150upx;
		margin-right: 50upx;
	}

	.userText {
		text-align: center;
		color: #888888;
	}

	.logout {
		margin-top: 50upx;
		background-color: #FF0000;
		color: #FFFFFF;
		min-height: 100upx;
		text-align: center;
		line-height: 100upx;
	}

	.item {
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		align-items: center;
		min-height: 100upx;
		position: relative;
	}
	
	.item-list{
		margin-bottom: 36upx;
		margin-top: 36upx;
	}

	
	.item:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 40upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.item-hover {
		background-color: #eee
	}

	.item-img {
		width: 60upx;
		height: 60upx;
		margin-left: 40upx;
	}

	.item-text {
		color: #888888;
		margin-right: 18upx;
	}

	.item-img2 {
		width: 40upx;
		height: 40upx;
	}

	.item-right {
		position: absolute;
		right: 30upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
