// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	const http = uni.$u.http
	let api = {}
	api.login = (username, password) => {
		return http.post('auth/login/', {
			username,
			password
		}).then(res => {
			// 更新token
			let token = res.key;
			vm.$store.commit('updateToken', res.key);
			// 获取用户信息
			http.get('auth/user/').then(res => {
				http.get('user/' + res.pk + '/').then(res => {
					// console.log(res)
					let isteacher = false;
					if (res.identity == 1) {
						isteacher = true;
					}
					userInfo = {
						name: res.name,
						pfs: res.pls,
						cls: res.cls,
						num: res.username,
						token: token,
						isTeacher: isteacher
					}
					vm.$store.commit('userLogin', userInfo);
					uni.showToast({
						title: "登录成功!"
					})
				})
			})
			// http.get('user/').then(res => {
			// 	console.log(res);
			// })


		})
	}
	api.getCsrfToken = () => http.get("getCsrftoken/")
	api.getAllCourse = () => http.get("course/")
	api.getAllScore = () => http.get("score/")
	api.getAllWork = () => http.get("work")
	api.getAllAnswer = () => http.get("answer/")
	api.getAllPeopleClass = () => http.get("peopleclass/")
	uni.$u.api = api;
}
