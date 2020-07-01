import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		config: {},
		nextFlag: false,
		saveFlag: false
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
		},
		setNextFlag(state, flag) {
			state.nextFlag = flag;
		},
		setSaveFlag(state, flag) {
			state.saveFlag = flag;
		}
	},
	actions: {

	}
})

export default store
