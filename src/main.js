import Vue from 'vue'
import App from './App'
import store from './store'
import API from './utils/API/api'
import './style/common.css'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$service = API
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
