import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		loginState: !!uni.getStorageSync('loginState') ? true : true,
		userInfo: !!uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {
			name: '唐霆峰',
			pfs: '信息管理与信息系统',
			cls: '19信管1班',
			num: '222019603193110'
		}
	},
	mutations: {
		userLogin(state, userInfo) {
			state.loginState = true
			state.userInfo = userInfo
			uni.setStorageSync('loginState', 'ok')
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))
		},
		userLogout(state) {
			state.loginState = false
			state.userInfo = {
				name: '未登录用户',
				pfs: '未知专业',
				cls: '未知班级',
				num: '学号未知'
			}
			uni.clearStorageSync('userInfo')
			uni.clearStorageSync('loginState')
			uni.clearStorageSync('token')
		}

	},
	//一些action
	actions: {
		userLoginAction(context, userInfo) {
			context.commit('userLogin', userInfo);
		},
		userLogoutAction(context) {
			context.commit('userLogout');
		}
	}
})
export default store
