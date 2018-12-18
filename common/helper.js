const baseURL = 'http://47.93.136.56:7011/appInterface/patient/'

function requestData(url, method, data, seccessFunc) {
	let user_id = uni.getStorageSync("user_id");
	let data2 = { ...data,
		"user_id": user_id
	};
	uni.request({
		url: baseURL + url,
		method: method,
		data: data2, // data为添加user_id后的参数
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		success: (res) => {
			console.log("res.data:" + JSON.stringify(res.data))
			if (res.data.error_code != "0") {
				uni.showToast({
					title: res.data.message,
					icon: "none"
				});
				return;
			}
			seccessFunc(res.data.data);
		},
		fail: () => {},
		complete: () => {}
	});
}

function getRequest(url, data, success) {
	requestData(url, 'GET', data, success)
}

function postRequest(url, data, success) {
	requestData(url, 'POST', data, success)
}

function showToast(msg) {
	uni.showToast({
		title: msg,
		icon: "none",
	});
}

export default {
	getRequest,
	postRequest,
	showToast,
}

