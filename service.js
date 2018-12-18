// 管理账号信息
const USERS_INFO = 'USERS_INFO';

const getUserInfo = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_INFO);
    if (!ret) {
        ret = '{}';
    }
    return JSON.parse(ret);
}

const setUserInfo = function (info) {
    let userInfo = getUserInfo();
	userInfo = {
		"img_url": info.img_url,
		"birthday": info.birthday,
		"sex": info.sex,
		"address": info.address,
		"status": info.status,
		"age": info.age,
		"sjhm": info.sjhm,
		"idcard": info.idcard,
		"zsxm": info.zsxm,
		"jsessionid": info.jsessionid,
		"user_id": info.user_id,
		"msg": info.msg,
		"address_detail": info.address_detail,
	};
    uni.setStorageSync(USERS_INFO, JSON.stringify(userInfo));
	
}

const clearUserInfo = function(){
	uni.clearStorageSync(USERS_INFO);
}

function getUserId() {
	let user_id = "";
	user_id = uni.getStorageSync("user_id");
	return user_id;
}

function setUserId(id) {
	uni.setStorageSync("user_id", id);
}

function setIsLogin(isLogin) {
	uni.setStorageSync("is_login", isLogin);
	return isLogin;
}

function isLogin(){
	let isLogin = false;
	isLogin = uni.getStorageSync("is_login");
	return isLogin;
}

export default {
    getUserInfo,
    setUserInfo,
	clearUserInfo,
	setIsLogin,
	isLogin,
	setUserId,
	getUserId,
}








