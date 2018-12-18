import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		avatarUrl: ""
	},
	mutations: {
		login(state, provider) {
			console.log(state)
			console.log(provider)
			state.userName = provider.userName || '新用户';
			state.avatarUrl = provider.avatarUrl || "";
			state.hasLogin = true;

		},
		logout(state) {
			state.userName = "";
			state.avatarUrl = "";
			state.hasLogin = false;
		}
	}
})

export default store
