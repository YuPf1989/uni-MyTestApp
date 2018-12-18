<template>
	<view>
		<!-- 轮播图 -->
		<swiper autoplay="true" indicator-dots="true" circular="true" style="height: 400upx;">
			<swiper-item v-for="(img,key) in imgUrls" :key="key">
				<image :src="img" style="height: 400upx;width: 100%;" />
			</swiper-item>
		</swiper>

		<!-- 生理监测 -->
		<view class="uni-grid-9">
			<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in grids" :key="index" :class="index % 4 === 3 ? 'no-border-right' : ''"
			 @tap="goToDetail(index)">
				<image class="uni-grid-9-image" :src="item.img"></image>
				<text class="uni-grid-9-text" v-text="item.text"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import constant from '../../common/constant.js'
	export default {
		data() {
			return {
				imgUrls: constant.bannerUrls,
				grids: constant.homeGrids,
			};
		},
		methods:{
			goToDetail(index){
				uni.navigateTo({
					url:"./data_detail/dataDetail2?data_type="+JSON.stringify(constant.monitorTypes[index]),
				})
			},
		},
		onLoad() {
			if (!service.isLogin()) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login',
							})
						}
					}
				})
			}
			console.log(this.baseUrl);
		}
	}
</script>

<style>
	/* 九宫格 */
	.uni-grid-9 {
		background: #f2f2f2;
		width: 750upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-top: 2upx solid #F8F8F8;
	}

	.uni-grid-9-item {
		width: 187.5upx;
		height: 187.5upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-bottom: 2upx solid;
		border-right: 2upx solid;
		border-color: #fff;
		box-sizing: border-box;
	}

	.no-border-right {
		border-right: none;
	}

	.uni-grid-9-image {
		width: 60upx;
		height: 60upx;
	}

	.uni-grid-9-text {
		width: 187.5upx;
		line-height: 40upx;
		height: 40upx;
		text-align: center;
		font-size: 30upx;
		color: #888888;
	}

	.uni-grid-9-item-hover {
		background: rgba(0, 0, 0, 0.1);
	}
</style>
