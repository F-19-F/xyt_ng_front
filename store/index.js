import config from 'uview-ui/libs/config/config';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		loginState: !!uni.getStorageSync('loginState') ? true : false,
		userInfo: !!uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {
			name: '未登录用户',
			pfs: '未知专业',
			cls: '未知班级',
			num: '学号未知',
			token: '',
			isTeacher: false
		},

	},
	mutations: {
		userLogin(state, userInfo) {
			state.loginState = true
			state.userInfo = userInfo
			uni.setStorageSync('loginState', 'true')
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))

		},
		updateToken(state, token) {
			state.userInfo.token = token;
			uni.setStorageSync('token', token)
			console.log("token " + token)
		},
		userLogout(state) {
			state.loginState = false
			state.userInfo = {
				name: '未登录用户',
				pfs: '未知专业',
				cls: '未知班级',
				num: '学号未知',
				token: '',
				isTeacher: false
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
		},
		updateToken(context, token) {
			console.log(token)
			context.commit('updateToken', token)
		}
	}
})
export default store
