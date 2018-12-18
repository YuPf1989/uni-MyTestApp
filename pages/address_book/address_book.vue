<template>
	<view>
		<view class="btn-layout text-color">
			<view class="btn" hover-class="btn-hover" @tap="addDoc">+ 添加好友</view>
		</view>

		<view class="head1 text-color">
			<text>医生好友</text>
		</view>

		<view v-for="(item,index) in docList" :key="index" >
			<view class="item" hover-class="item-hover">
				<image class="item-img" :src="item.imgUrl" ></image>
				<view class="item-right">
					<text class="item-text">{{item.docName}}</text>
					<!-- <image class="item-img2" src="../../static/arrow-right.png"></image> -->
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				docList: [{
						imgUrl: '../../static/account.png',
						docName: 'doc1',
					},
					{
						imgUrl: '../../static/account.png',
						docName: 'doc2',
					},

					{
						imgUrl: '../../static/account.png',
						docName: 'doc3',
					},

					{
						imgUrl: '../../static/account.png',
						docName: 'doc4',
					},
				]
			};
		},
		methods: {
			addDoc() {
				uni.navigateTo({
					url: './searchDoc',
					
				});
			},
		},
	}
</script>

<style>
	.text-color{
		color: #888888;
	}
	
	.head1 {
		background-color: #eee;
		height: 60upx;
		display: flex;
		align-items: center;
		padding: 20upx;
		margin-top: 20upx;
	}

	.btn-layout {
		padding: 20upx;
		background-color: #fff;
	}

	.btn {
		/* border: #000 solid 1upx; */
		border-radius: 12upx;
		background-color: #EEEEEE;
		height: 80upx;
		text-align: center;
		line-height: 80upx;

	}

	.btn-hover {
		background: #ccc;
	}

	.item {
		display: flex;
		flex-direction: row;
		background-color: #FFFFFF;
		align-items: center;
		min-height: 120upx;
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
		background-color: #EEEEEE
	}

	.item-img {
		width: 60upx;
		height: 60upx;
		margin-left: 40upx;
	}

	.item-text {
		color: #888888;
		margin-right: 18upx;
		margin-left: 18upx;
	}
</style>
