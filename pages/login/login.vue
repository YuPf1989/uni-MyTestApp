<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>

		<!-- 登录注册区块 -->
		<view class="input-group">
			<view class="input-row">
				<image class="img" src="../../static/account.png"></image>
				<input type="text" v-model="account" placeholder="请输入账号" />
			</view>
			<view class="input-row">
				<image class="img" src="../../static/pwd.png"></image>
				<input type="password" v-model="password" placeholder="请输入密码" />
			</view>
		</view>

		<!-- 登录按钮 -->
		<button plain="true" type="primary" @tap="bindLogin">登录</button>
	</view>
</template>

<script>
	import service from '../../service.js';
	import helper from '../../common/helper.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				account: '',
				password: '',
				// positionTop: 0
			}
		},

		// 需要全局动态改变的变量
		computed: mapState(["hasLogin", "userName", "avatarUrl"]),
		
		methods: {
			// 通过调用方法改变全局变量
			...mapMutations(['login']),

			// 			initPosition() {
			// 				/**
			// 				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			// 				 * 反向使用 top 进行定位，可以避免此问题。
			// 				 */
			// 				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			// 			},

			bindLogin() {
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					})
					return;
				}

				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}

				const data = {
					loginname: this.account,
					password: this.password
				};
				
				const _this = this;
				const loginUrl = 'accountLogin.html';
				helper.postRequest(loginUrl, data, function(data) {
					// 已经是data内层数据
					console.log(data);
					helper.showToast(data.msg);
					// 登录成功
					if (data.status == 0) {
						// 保存用户数据到本地
						service.setUserInfo(data);
						// 设置是否登录到本地
						service.setIsLogin(true);
						// 更新全局变量
						var provider = {
							"userName": data.zsxm,
							"avatarUrl": data.img_url
						};
						_this.login(provider);
						
						// todo
						uni.reLaunch({
							url:'../home/home',
						})
					}
				});
			}
		},
		onLoad() {
			// this.initPosition();
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 150upx;
	}

	.input-group {
		background-color: #F8F8F8;
		margin-top: 100upx;
		position: relative;
		display: flex;
		justify-content: center;
		width: 100%;
		flex-wrap: wrap;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		width: 60%;
		border-bottom: 1upx solid #888888;
		margin-bottom: 10upx;
		padding: 15upx;
	}

	.input-row .img {
		width: 60upx;
		height: 50upx;
	}

	input {
		margin-left: 15upx;
		text-align: left;
	}

	button {
		margin-top: 60upx;
		width: 75%;
		font-size: 36upx;
		color: #2ea8bd;
		background-color: transparent;
		border-color: #2ea8bd;
	}
</style>


