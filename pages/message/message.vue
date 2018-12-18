<template>
	<view >
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in messageList.friendsMessages" :key="index" @tap="goToChat(item)">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.imgUrl"></image>
					<view class="uni-media-list-body">
						<view class="uni-flex uni-row" style="justify-content:space-between ;align-items: center;">
							<view class="uni-media-list-text-top">{{item.name}}</view>
							<view class="uni-media-list-text-small">{{item.lastTime}}</view>
						</view >
						<view class="uni-flex uni-row" style="justify-content:space-between ;align-items: center;">
							<view class="uni-media-list-text-bottom uni-ellipsis">{{item.lastMessage}}</view>
							
							<view style="position: absolute;right: 30upx;">
								<uni-badge :text="item.messageCount" type="danger" ></uni-badge>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<input style="" @focus="focus" placeholder="请输入内容"/>
		
	</view>
</template>

<script>
	import uniBadge from "../../components/uni-badge.vue";
	export default {
		data() {
			return {
				messageList:{
					groupMessages:[{
						imgUrl:'../../static/account.png',
						name:'android讨论组',
						id:'1',
						lastTime:'下午 15：20',
						messageCount:20,
						lastMessage:'hello world',
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
					}
					],
					friendsMessages:[{
						imgUrl:'../../static/account.png',
						name:'小米',
						id:'1',
						lastTime:'下午 15：25',
						messageCount:20,
						lastMessage:'嗨',
					},
					{
						imgUrl:'../../static/account.png',
						name:'魅族',
						id:'2',
						lastTime:'下午 15：30',
						messageCount:20,
						lastMessage:'你好',
					},
					{
						imgUrl:'../../static/account.png',
						name:'华为',
						id:'3',
						lastTime:'下午 15：32',
						messageCount:20,
						lastMessage:'兄弟们好',
					}
					]
				}
			};
		},
		methods: {
			goToChat(item){
				uni.navigateTo({
					url: '../chat/chat?from='+JSON.stringify(item),
				});
			},
			focus(e){
				console.log("e:"+JSON.stringify(e.detail))
			},
		},
		components:{
			uniBadge,
		},
		onLoad() {
			console.log(this.baseUrl);
		}
	}
</script>
	
<style>
	.uni-media-list-text-top{
		line-height: 36upx;
		font-size: 34upx;
	}
	
	.uni-media-list-text-small{
		line-height: 30upx;
		font-size: 28upx;
		color: #8f8f94;
		position: absolute;
		right: 30upx;
	} 
</style>
