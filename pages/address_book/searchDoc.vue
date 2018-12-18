<template>
	<view>
		<!-- 搜索栏 -->
		<view class="search-bar">
			<view class="uni-flex uni-row" style="align-items: center;">
				<view class="input-view">
					<uni-icon type="search" size="22" color="#666666"></uni-icon>
					<input confirm-type="搜索" v-model="searchthing" @confirm="search" class="input" type="text" placeholder="输入搜索关键词" />
				</view>
				<view class="btn-search" hover-class="btn-search-hover" @tap="search">搜索</view>
			</view>
		</view>

		<view class="page">
			<scroll-view class="scrollList" scroll-y :scroll-into-view="scrollViewId" :style="{height:winHeight + 'px;'}">
				<view class="uni-list">
					<block v-for="(list,key) in filteredDocs" :key="key" v-if="list.data[0]">
						<view class="uni-list-cell-divider" :id="list.letter">
							{{list.letter}}
						</view>
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list.data" :key="index"
						 :class="list.data.length -1 == index ? 'uni-list-cell-last' : ''">
							<view class="uni-list-cell-navigate">
								{{item}}
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
			<view class="uni-indexed-list-bar" :class="touchmove ? 'active' : ''" @touchstart="touchStart" @touchmove="touchMove"
			 @touchend="touchEnd" @touchcancel="touchCancel" :style="{height:winHeight + 'px;'}">
				<text v-for="(list,key) in filteredDocs" :key="key" class="uni-indexed-list-text" :class="touchmoveIndex == key ? 'active' : ''"
				 :style="{heigth:itemHeight + 'px',lineHeight:itemHeight + 'px'}">{{list.letter}}</text>
			</view>
			<view class="uni-indexed-list-alert" v-if="touchmove">
				{{filteredDocs[touchmoveIndex].letter}}
			</view>
		</view>

	</view>

</template>

<script>
	import uniIcon from '../../components/uni-icon.vue'
	var airportDate = require("../../common/airport.js");
	export default {
		data() {
			return {
				searchthing: "",
				lists: airportDate.list,
				touchmove: false,
				touchmoveIndex: -1,
				itemHeight: 0,
				winHeight: 0,
				scrollViewId: "A"
			};
		},
		components: {
			uniIcon,
		},
		computed: {
			filteredDocs() {
				var doc_list = this.lists,
					searchthing = this.searchthing;
				if (!searchthing) {
					return doc_list;
				}
				searchthing = searchthing.trim();
				// 存在bug
				doc_list = doc_list.filter(function(item) {
// 					item.data.forEach(function(docName) {
// 						if (docName.indexOf(searchthing) !== -1) {
// 							item.data = [docName];
// 							console.log("item:" + JSON.stringify(item));
// 							temp = item;
// 							return item;
// 						}
// 					})
					if (JSON.stringify(item).indexOf(searchthing) !== -1) {
						console.log("item:" + JSON.stringify(item))
						return item;
					}
				})
				console.log("doc_list:" + JSON.stringify(doc_list));
				return doc_list;
			}
		},
		methods: {
			search() {

			},
			touchStart(e) {
				console.log(JSON.stringify(e))
				this.touchmove = true;
				let pageY = e.touches[0].pageY-33;// pageY应该是相对于navigationBar的高度，需要减去搜索栏的高度
				let index = Math.floor(pageY / this.itemHeight);
				console.log("index:"+index)
				this.scrollViewId = this.lists[index].letter;
				this.touchmoveIndex = index;
			},
			touchMove(e) {
				let pageY = e.touches[0].pageY-33;
				let index = Math.floor(pageY / this.itemHeight);
				this.scrollViewId = this.lists[index].letter;
				this.touchmoveIndex = index;
			},
			touchEnd() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			},
			touchCancel() {
				this.touchmove = false;
				this.touchmoveIndex = -1;
			}
		},
		onLoad() {
			let winHeight = uni.getSystemInfoSync().windowHeight-33;// 33为scroll-view上边布局的高度，需要注意
			console.log("winHeight:"+winHeight)
			this.itemHeight = winHeight / 26;
			this.winHeight = winHeight;
		}
	}
</script>

<style>
	.search-bar {
		background-color: #FFFFFF;
		padding: 10upx;
		box-shadow: 0 2upx 4upx rgba(0, 0, 0, 0.3);
	}

	.input-view {
		align-items: center;
		display: flex;
		flex-direction: row;
		background-color: #eee;
		height: 60upx;
		border-radius: 30upx;
		padding: 0 10upx;
		flex: 1;
	}

	.input {
		padding: 0 5upx;
		flex: 1;
	}

	.btn-search {
		height: 60upx;
		border-radius: 30upx;
		padding: 0 30upx;
		background-color: #eee;
		margin-left: 20upx;
		color: #888888;
		text-align: center;
		line-height: 60upx;
	}

	.btn-search-hover {
		background-color: #ccc;
	}

	.page {
		display: flex;
		flex-direction: row;
	}

	.scrollList {
		flex: 1;
		height: 100vh;
	}

	.uni-indexed-list-bar {
		width: 46upx;
		height: 100vh;
		background-color: lightgrey;
		display: flex;
		flex-direction: column;
	}

	.uni-indexed-list-bar.active {
		background-color: rgb(200, 200, 200);
	}

	.uni-indexed-list-text {
		color: #aaa;
		font-size: 22upx;
		text-align: center;
	}

	.uni-indexed-list-bar.active .uni-indexed-list-text {
		color: #333;
	}

	.uni-indexed-list-text.active,
	.uni-indexed-list-bar.active .uni-indexed-list-text.active {
		color: #007AFF;
	}

	.uni-indexed-list-alert {
		position: absolute;
		z-index: 20;
		width: 160upx;
		height: 160upx;
		left: 50%;
		top: 50%;
		margin-left: -80upx;
		margin-top: -80upx;
		border-radius: 80upx;
		text-align: center;
		line-height: 160upx;
		font-size: 70upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>
