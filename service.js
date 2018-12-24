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
	setUserId(info.user_id);
	setIsLogin(true);
    uni.setStorageSync(USERS_INFO, JSON.stringify(userInfo));
}

// 更新用户部分信息，注意要要与原先的键保持一致
function updateUserInfo(partUserInfo){
	console.log(JSON.stringify(partUserInfo))
	let defaultUserInfo = getUserInfo();
	
	for(let x in partUserInfo){
		if(partUserInfo[x]){
			if(defaultUserInfo[x]){
				defaultUserInfo[x] = partUserInfo[x];
			}else{
				console.log("userInfo不存在属性："+x)
			}
		}
	}
	
	uni.setStorageSync(USERS_INFO, JSON.stringify(defaultUserInfo));
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

function add(a){
	console.log(JSON.stringify(a))
}

export default {
    getUserInfo,
    setUserInfo,
	updateUserInfo,
	clearUserInfo,
	setIsLogin,
	isLogin,
	setUserId,
	getUserId,
	
	add,
}








