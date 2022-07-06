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
//http拦截器， 此为需要加入的内容， 如果不是写在common目录， 请自行修改引入路径
// import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
// Vue.use(httpInterceptor, app)
require('@/common/http.interceptor.js')(app);
require('@/common/http.apiv1.js')(app);

// http接口API集中管理引入部分
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
