<template>
	<!-- 监测信息详情页面 -->
	<view class="container">
		<!-- 选项卡头 -->
		<view class="head" v-show="data_type.monitor_detail.length!==1">
			<segmented-control :current="current" :values="data_type.monitor_detail" @clickItem="onClickItem" styleType="button"
			 activeColor="#2996A9" style="padding:20px ;"></segmented-control>
		</view>
		<!-- 选项卡内容 -->
		<view v-for="(item,index) in data_type.monitor_detail" :key="index">
			<view v-show="current === index" class="content">

				<!-- 列表视图 -->
				<view >
					<view class="list-head" style="background-color: #eee;">
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
	</view>
</template>

<script>
	import segmentedControl from '../../../components/segmented-control.vue';

	// 	function setLevelImage(level){
	// 		if(level==0){
	// 			return '../../static/account.png';
	// 		}else if(level==1){
	// 			return '../../static/account_selected.png';
	// 		}else{
	// 			return '../../static/pwd.png';
	// 		}
	// 	}

	function loadMonitorData(url, param, func) {
		
		helper.postRequest(url, param, func);
	}

	export default {
		data() {
			return {
				data_type: {},
				current: 0,// 指定选中哪个分段
				segmented_selected:[0],// 已经选中过的分段
				// 现在是模拟的数据
				monitor_data: {
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
			}
		},
		components: {
			segmentedControl,
		},
		methods: {
			onClickItem(index) {
				console.log(index);
				if (this.current !== index) {
					this.current = index;
				}
				// this.data_type.monitor_detail_code;
				console.log(this.data_type.monitor_detail_code[index]); // 该值为传递到服务器后台url的参数
				if(this.segmented_selected.indexOf(index)==-1){
					this.segmented_selected.push(index);
					// 进行数据加载
					console.log("加载数据");
				}
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
	
	.head {
		padding: 0 20upx;
		margin-top: 20upx;
		height: 100upx;
	}

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
</style>
