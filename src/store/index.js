import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		config: {},
		nextFlag: false,
		saveFlag: false,
		preFlag: true
	},
	mutations: {
		//设置用户信息
		setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            wx.setStorageSync('userInfo', userInfo);
		},
		// 保存设置信息
		setConfig(state, config) {
			state.config = config;
			wx.setStorageSync('config', config);
		},
		// 设置身高的下一步按钮
		setNextFlag(state, flag) {
			state.nextFlag = flag;
		},
		// 设置首页的保存
		setSaveFlag(state, flag) {
			state.saveFlag = flag;
		},
		// 设置准备界面的显示或隐藏
		setPreFlag(state, flag) {
			state.preFlag = flag;
		}
	},
	actions: {

	}
})

export default store
