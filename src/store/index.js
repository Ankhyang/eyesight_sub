import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		config: {}
	},
	mutations: {
		//设置用户信息
		setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            wx.setStorageSync('userInfo', userInfo);
		},
		setConfig(state, config) {
			state.config = config;
			wx.setStorageSync('config', config);
		}
	},
	actions: {

	}
})

export default store
