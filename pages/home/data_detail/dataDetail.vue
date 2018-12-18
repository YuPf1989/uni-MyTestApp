<template>
	<!-- 监测信息详情页面 -->
	<view class="container">
		<!-- 选项卡头 -->
		<view class="head" v-show="data_type.monitor_detail.length!==1">
			<segmented-control :current="current" :values="data_type.monitor_detail" @clickItem="onClickItem" styleType="button"
			 activeColor="#2996A9"></segmented-control>
		</view>
		<!-- 选项卡内容 -->
		<view v-for="(item,index) in data_type.monitor_detail" :key="index" >
			<view v-show="current === index" class="content">

				<!-- 视图切换 -->
				<view class="layout-bar">
					<text class="layout-bar-text">视图切换</text>
					<view class="layout-bar-icon">
						<!-- 数据视图 -->
						<image class="layout-bar-img" :src="layout=='total'?'../../../static/account_selected.png':'../../../static/account.png'"
						 @tap="layout = 'total'"></image>
						<!-- 列表视图 -->
						<image class="layout-bar-img" :src="layout=='total'?'../../../static/message.png':'../../../static/message_selected.png'"
						 @tap="layout = 'list'"></image>
					</view>
				</view>

				<!-- 数据视图 -->
				<view v-show="layout=='total'"  style="width: 100%;height: 1200px;display: flex;flex-direction: column;">
					<view class="canvasView" >
						<view class="title">数据分布</view>
						<mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" throttleTouch="true" />
					</view>
					<view class="canvasView" style="flex: 1;">
						<view class="title">折线图</view>
						<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" throttleTouch="true" />
					</view>
				</view>

				<!-- 列表视图 -->
				<view v-show="layout=='list'">
					<view class="list-head">
						<text class="list-head-text1">{{monitor_data.monitorName}}</text>
						<text class="list-head-text2">单位:{{monitor_data.unit}}</text>
					</view>
					<view v-for="(item,i) in monitor_data.listData" :key="i">
						<view class="list-item">
							<view style="display:flex;flex-direction:row;">
								<text style="text-align:center;flex-grow:4;">{{item.value}}</text>
								<text style="text-align:center;flex-grow:6;width:50upx;">{{item.time}}</text>
							</view>
						</view>
					</view>
				</view>
				{{item}}
			</view>
		</view>

	<!-- 	<view class="canvasView">
			<view class="title">数据分布</view>
			<mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" throttleTouch="true" />
		</view>
		<view class="canvasView">
			<view class="title">折线图</view>
			<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" throttleTouch="true" />
		</view> -->
		
	</view>
</template>

<script>
	import segmentedControl from '../../../components/segmented-control.vue';
	import * as echarts from '../../../components/echarts/echarts.simple.min.js';
	import mpvueEcharts from '../../../components/mpvue-echarts/src/echarts.vue';

	// 	function setLevelImage(level){
	// 		if(level==0){
	// 			return '../../static/account.png';
	// 		}else if(level==1){
	// 			return '../../static/account_selected.png';
	// 		}else{
	// 			return '../../static/pwd.png';
	// 		}
	// 	}

	function getPieOption() {
		return {
			animation: false,
			backgroundColor: '#F8F8F8',
			color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
			series: [{
				label: {
					normal: {
						fontSize: 14
					}
				},
				type: 'pie',
				center: ['50%', '50%'],
				radius: [0, '60%'],
				data: [{
					value: 55,
					name: '北京'
				}, {
					value: 20,
					name: '武汉'
				}, {
					value: 10,
					name: '杭州'
				}, {
					value: 20,
					name: '广州'
				}, {
					value: 38,
					name: '上海'
				}],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 2, 2, 0.3)'
					}
				}
			}]
		}
	}

	function getLineOption() {
		return {
			animation: false,
			color: ['#37A2DA', '#9FE6B8'],
			legend: {
				data: ['蒸发量', '降水量']
			},
			grid: {
				x: 35,
				x2: 10,
				y: 30,
				y2: 25
			},
			calculable: false,
			xAxis: [{
				type: 'category',
				data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
			}],
			yAxis: [{
				type: 'value',
				splitArea: {
					show: true
				}
			}],
			series: [{
				name: '蒸发量',
				type: 'line',
				data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
			}, {
				name: '降水量',
				type: 'line',
				data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			}]
		}
	}

	function loadMonitorData(url, param, func) {
		helper.postRequest(url, param, func);
	}

	export default {
		data() {
			return {
				layout: "total",
				data_type: {},
				current: 0,
				// 现在是模拟的数据
				monitor_data: {
					circlePie: {
						normal: 60,
						little: 30,
						hight: 10
					},
					monitorType: "maibo",
					monitorName: "脉搏",
					unit: "次/min",
					listData: [
						// level:"0" 0正常，1偏高，2风险
						{
							value: 80,
							level: "0",
							time: "2018-12-08"
						},
						{
							value: 80,
							level: "1",
							time: "2018-12-08"
						},
						{
							value: 80,
							level: "2",
							time: "2018-12-08"
						},
					]
				},
				echarts,
				pieInit: function(canvas, width, height) {
					let pieChart = echarts.init(canvas, null, {
						width: width,
						height: height
					})
					canvas.setChart(pieChart)
					pieChart.setOption(getPieOption())
					return pieChart
				},
				lineInit: function(canvas, width, height) {
					let lineChart = echarts.init(canvas, null, {
						width: width,
						height: height
					})
					canvas.setChart(lineChart)
					lineChart.setOption(getLineOption())
					return lineChart
				},
			}
		},
		components: {
			segmentedControl,
			mpvueEcharts
		},
		methods: {
			onClickItem(index) {
				console.log(index);
				if (this.current !== index) {
					this.current = index;
				}
				// this.data_type.monitor_detail_code;
				console.log(this.data_type.monitor_detail_code[index]); // 该值为传递到服务器后台url的参数
			},
			setLevelImage(level) {
				if (level == 0) {
					return '../../static/account.png';
				} else if (level == 1) {
					return '../../static/account_selected.png';
				} else {
					return '../../static/pwd.png';
				}
			},
		},
		onLoad(e) {
			console.log("data_type:" + e.data_type);
			this.data_type = JSON.parse(e.data_type);
			// todo需要详细考虑
			const param = {
				monitorType: "szy",
				page: 0,

			}
			// loadMonitorData();
		},
	}
</script>

<style>
/* 	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 1500upx;
	} */

	.list-head {
		display: flex;
		flex-direction: row;
		padding: 20upx;
	}

	.list-head-text1 {
		flex-grow: 5;
		text-align: center;
	}

	.list-head-text2 {
		flex-grow: 6;
		text-align: center;
	}

	.list-item {
		display: flex;
		flex-direction: column;
		background: #fff;
		position: relative;
		box-shadow: 0 2upx 4upx rgba(0, 0, 0, 0.3);
		padding: 20upx;
	}

	.list-item:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.canvasView {
		flex: 1;
		flex-direction: column;
	}

	.layout-bar {
		display: flex;
		background-color: #EEEEEE;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx;
	}

	.layout-bar-icon {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.layout-bar-img {
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}

	.layout-bar-text {
		width: auto;
		text-align: right;
	}

	.title {
		margin-left: 30upx;
		color: #888888;
	}
</style>
