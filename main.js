import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// 使用vuex作为运行时的内容存储
import store from '@/store/index.js'
Vue.config.productionTip = false
App.mpType = 'app'
// 导入组件库
import uView from "uview-ui";
Vue.prototype.$store = store
Vue.use(uView);
// 导入工具库
import {
	req,
	formatNumber
} from "utils/util.js"
Vue.prototype.$req = req
Vue.prototype.$formatNumber = formatNumber
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
