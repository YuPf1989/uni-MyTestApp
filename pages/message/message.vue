<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in messageList.friendsMessages"
			 :key="index" @tap="goToChat(item)" @longpress="show(index)">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.imgUrl"></image>
					<view class="uni-media-list-body">
						<view class="uni-flex uni-row" style="justify-content:space-between ;align-items: center;">
							<view class="uni-media-list-text-top">{{item.name}}</view>
							<view class="uni-media-list-text-small">{{item.lastTime}}</view>
						</view>
						<view class="uni-flex uni-row" style="justify-content:space-between ;align-items: center;">
							<view class="uni-media-list-text-bottom uni-ellipsis">{{item.lastMessage}}</view>

							<view style="position: absolute;right: 30upx;">
								<uni-badge :text="item.messageCount" type="danger"></uni-badge>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 弹出的popup -->
		<view class="popup popup-middle" v-show="showPopup">
			<view v-for="(item,index) in popupList" :key="index" hover-class="uni-list-cell-hover" @tap="itemOptions(item)">
				<view class="popup-item">{{item}}</view>
			</view>
		</view>
		<view class="mask" v-show="showPopup" @tap="hide()"></view>

	</view>
</template>

<script>
	import uniBadge from "../../components/uni-badge.vue";
	export default {
		data() {
			return {
				selectedItem: 0, // 长按选择的默认条目
				popupList: ["置顶", "删除"],
				showPopup: false,
				messageList: {
					groupMessages: [{
						imgUrl: '../../static/account.png',
						name: 'android讨论组',
						id: '1',
						lastTime: '下午 15：20',
						messageCount: 20,
						lastMessage: 'hello world',
						// 						messages:[{
						// 							userImg:'../../static/password.png',
						// 							time:'15:10',
						// 							content:'快下班了',
						// 							type:0   // 表示别人发言
						// 						},
						// 						{
						// 							userImg:'../../static/home.png',
						// 							time:'15:12',
						// 							content:'en',
						// 							type:1   // 表示别人发言
						// 						},
						// 						{
						// 							userImg:'../../static/password.png',
						// 							time:'15:10',
						// 							content:'Yes',
						// 							type:0   // 表示别人发言
						// 						},
						// 						]
					}],
					friendsMessages: [{
							imgUrl: '../../static/account.png',
							name: '小米',
							id: '1',
							lastTime: '下午 15:25',
							messageCount: 20,
							lastMessage: '嗨',
						},
						{
							imgUrl: '../../static/account.png',
							name: '魅族',
							id: '2',
							lastTime: '下午 15：30',
							messageCount: 20,
							lastMessage: '你好',
						},
						{
							imgUrl: '../../static/account.png',
							name: '华为',
							id: '3',
							lastTime: '下午 15：32',
							messageCount: 20,
							lastMessage: '兄弟们好',
						},
						{
							imgUrl: '../../static/account.png',
							name: '华为',
							id: '3',
							lastTime: '下午 15：34',
							messageCount: 20,
							lastMessage: '兄弟们好',
						},
						{
							imgUrl: '../../static/account.png',
							name: '华为',
							id: '3',
							lastTime: '下午 15：36',
							messageCount: 20,
							lastMessage: '兄弟们好',
						},
						{
							imgUrl: '../../static/account.png',
							name: '华为',
							id: '3',
							lastTime: '下午 15：38',
							messageCount: 20,
							lastMessage: '兄弟们好',
						}
					]
				}
			};
		},
		onBackPress() {
			if (this.showPopup) {
				this.showPopup = false;
				return true;
			}
		},
		methods: {
			goToChat(item) {
				console.log("click")
				uni.navigateTo({
					url: '../chat/chat?from=' + JSON.stringify(item),
				});
			},
			hide() {
				this.showPopup = false;
			},
			show(index) {
				this.selectedItem = index;
				this.showPopup = true;
			},
			itemOptions(item) {
				console.log("selectedItem:" + this.selectedItem)
				if ("置顶" === item) {
					let str = this.messageList.friendsMessages.splice(this.selectedItem, 1);
					this.messageList.friendsMessages.unshift(str[0]);
				} else if ("删除" === item) {
					this.messageList.friendsMessages.splice(this.selectedItem, 1);
				}
				this.hide();
			},

		},
		components: {
			uniBadge,
		},
		onLoad() {
			console.log(this.baseUrl);
		}
	}
</script>

<style>
	.uni-media-list-text-top {
		line-height: 36upx;
		font-size: 34upx;
	}

	.uni-media-list-text-small {
		line-height: 30upx;
		font-size: 28upx;
		color: #8f8f94;
		position: absolute;
		right: 30upx;
	}

	.mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.popup {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.popup-middle {
		width: 500upx;
		height: 200upx;
		border-radius: 10upx;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
	}

	.popup-item {
		width: 100%;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		color: #888888;
		position: relative;
	}


	.popup-item:after {
		position: absolute;
		z-index: 1000;
		right: 0;
		bottom: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
</style>
