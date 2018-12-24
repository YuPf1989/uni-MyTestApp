<template>
	<view class="container">
		<!-- 用户基本信息 -->
		<view class="head" :hover-class="isLogin? 'item-hover':''" @tap="isLogin? goToUserInfo(userInfo):''">
			<image :src="isLogin? avatarUrl:'../../static/userImg.png'" class="userImage"></image>
			<text class="userText" @tap="login">{{isLogin? userName:'登录'}}</text>
		</view>

		<view style="height: 36upx;"></view>

		<view v-for="(item,index) in itemList" :key="index">
			<view class="item" hover-class="item-hover">
				<image class="item-img" :src="item.imgUrl"></image>
				<text class="item-text">{{item.text}}</text>
				<image class="item-img2" src="../../static/arrow-right.png"></image>
			</view>
		</view>
		<view class="logout" @tap="logout" hover-class="item-hover-light">退出登录</view>
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
				userInfo:{},
				isLogin: false,
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
		computed: mapState(['userName', 'avatarUrl']),
		methods: {
			logout() {
				if (!this.isLogin) {
					return
				}
				this.isLogin = false;
				service.setIsLogin(false);
				service.clearUserInfo();
				helper.showToast("您已退出登录！");
			},
			login() {
				if (this.isLogin) {
					return
				}
				uni.navigateTo({
					url: '../login/login',
				});
			},
			goToUserInfo(userInfo){
				uni.navigateTo({
					url: `./userInfo?userInfo=${JSON.stringify(this.userInfo)}`,
				});
			}
		},
		onLoad() {
			this.isLogin = service.isLogin();
			console.log("isLogin:"+this.isLogin)
			
			if (this.isLogin) {
				this.userInfo = service.getUserInfo();
				this.avatarUrl = this.userInfo.img_url;
				this.userName = this.userInfo.zsxm;
				// console.log("userInfo:" + JSON.stringify(this.userInfo));
			}
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

	.item-list {
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
		margin-left: 18upx;
	}

	.item-img2 {
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: 30upx;
	}

</style>
