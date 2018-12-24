import Vue from 'vue'
import Vuex from 'vuex'
import service from '../service.js'
const userInfo = service.getUserInfo()

Vue.use(Vuex)

const store = new Vuex.Store({
	// 	"img_url": info.img_url,
	// 	"birthday": info.birthday,
	// 	"sex": info.sex,
	// 	"address": info.address,
	// 	"age": info.age,
	// 	"sjhm": info.sjhm,
	// 	"idcard": info.idcard,
	// 	"zsxm": info.zsxm,
	// 	"user_id": info.user_id,
	// 	"address_detail": info.address_detail,

	state: {
		forcedLogin: false,
		hasLogin: false,
		userName: userInfo.zsxm,
		avatarUrl: userInfo.img_url,
		birthday: userInfo.birthday,
		address: userInfo.address,
		sex:userInfo.sex,// 1表示男，0表示女
		phoneNum:userInfo.sjhm,
	},
	mutations: {
		login(state, provider) {
			console.log(JSON.stringify(provider))
			state.userName = provider.userName || '新用户';
			state.avatarUrl = provider.avatarUrl || "";
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.avatarUrl = "";
			state.hasLogin = false;
		},

		// 用户修改部分信息
		updateUserInfo(state, partInfo) {
			// console.log(JSON.stringify(partInfo))
			for (let key in partInfo) {
				// console.log(`${key}:${partInfo[key]}`)
				if (state[key]) {
					state[key] = partInfo[key]
				} else {
					console.log("userInfo不存在属性：" + key)
				}
			}
		},
	}
})

export default store
