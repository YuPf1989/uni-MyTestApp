// 该js主要存一些常量值

// 首页存储的监测指标，用于配合详情页
const monitorTypes = [{
	segmentCounts: 1,
	monitorName: "体温",
	monitor_detail:["体温"],
	monitor_detail_code:["tw"],
}, {
	segmentCounts: 1,
	monitorName: "脉搏",
	monitor_detail:["脉搏"],
	monitor_detail_code:["mb"],
}, {
	segmentCounts: 1,
	monitorName: "血压",
	monitor_detail:["舒张压","收缩压"],
	monitor_detail_code:["szy","ssy"],
}, {
	segmentCounts: 1,
	monitorName: "尿酸",
	monitor_detail:["尿酸"],
	monitor_detail_code:["ns"],
}, {
	segmentCounts: 1,
	monitorName: "血钾",
	monitor_detail:["血钾"],
	monitor_detail_code:["xj"],
}, {
	segmentCounts: 3,
	monitorName: "血脂",
	monitor_detail:["甘油三脂","高密度胆固醇","低密度胆固醇"],
	monitor_detail_code:["gysz","gmddgc","dmddgc"],
}, {
	segmentCounts: 1,
	monitorName: "血糖",
	monitor_detail:["血糖"],
	monitor_detail_code:["xt"],
}, {
	segmentCounts: 2,
	monitorName: "肌酐",
	monitor_detail:["血肌酐","尿肌酐"],
	monitor_detail_code:["xjg","njg"],
}, ]

// 首页banner列表
const bannerUrls = [
	"../../static/banner/banner_01.jpg",
	"../../static/banner/banner_02.jpg",
	"../../static/banner/banner_03.jpg",
]


// 首页监测grids
const homeGrids = [{
		img: "../../static/index/tiwen.png",
		text: "体温"
	},
	{
		img: "../../static/index/maibo.png",
		text: "脉搏",
	},
	{
		img: "../../static/index/xueya.png",
		text: "血压",
	},
	{
		img: "../../static/index/niaosuan.png",
		text: "尿酸"
	},
	{
		img: "../../static/index/niaosuan.png",
		text: "血钾"
	},
	{
		img: "../../static/index/niaosuan.png",
		text: "血脂",
	},
	{
		img: "../../static/index/xuetang.png",
		"text": "血糖"
	},
	{
		img: "../../static/index/jigan.png",
		text: "肌酐",
	},
]

export default {
	monitorTypes,
	bannerUrls,
	homeGrids,
}
