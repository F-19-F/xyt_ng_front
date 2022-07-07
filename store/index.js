import config from 'uview-ui/libs/config/config';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		// 登录的用户信息
		userInfo: !!uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : {
			name: '未登录用户',
			pfs: '未知专业',
			cls: '未知班级',
			num: '学号未知',
			isTeacher: false
		},
		courseList: !!uni.getStorageSync('courseList') ? getStorageSync('courseList') : [],
		// 是否登录
		loginState: !!uni.getStorageSync('loginState') ? true : false,
		// 登录的token
		loginToken: !!uni.getStorageSync('token') ? uni.getStorageSync('token') : ''
	},
	mutations: {
		userLogin(state, userInfo) {
			state.loginState = true
			state.userInfo = userInfo
			uni.setStorageSync('loginState', 'true')
			uni.setStorageSync('userInfo', JSON.stringify(userInfo))

		},
		updateToken(state, token) {
			state.loginToken = token;
			uni.setStorageSync('token', token)
		},
		userLogout(state) {
			state.loginState = false
			state.userInfo = {
				name: '未登录用户',
				pfs: '未知专业',
				cls: '未知班级',
				num: '学号未知',
				isTeacher: false
			}
			state.loginToken = ''
			uni.clearStorageSync('userInfo')
			uni.clearStorageSync('loginState')
			uni.clearStorageSync('token')
		},
		updateCourseAction(state, courseList) {
			state.courseList = courseList;
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
			context.commit('updateToken', token)
		},
		updateCourseAction(context, courseList) {
			context.commit('updateCourseAction', courseList)
		}
	}
})
export default store
