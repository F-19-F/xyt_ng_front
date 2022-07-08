// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	const http = uni.$u.http
	let api = {}
	api.getCsrfToken = () => http.get("getCsrftoken/")
	api.login = (username, password) => {
		// 插入csrftoken -> 发送登录post -> 获取token->请求用户信息
		return api.getCsrfToken().then(res => {
				let csrf_token = res.csrftoken;
				return http.post('auth/login/', {
					username,
					password
				}, {
					header: {
						'X-CSRFToken': csrf_token
					}
				})
			})
			.then(res => {
				// 更新全局token
				vm.$store.commit('updateToken', res.key);
				return http.get('auth/user/')
				// 通过token拿到用户id，再请求restful的后端接口,存储为userInfo
			}).then(res => http.get(`user/${res.pk}/`))
			.then(res => {
				let isteacher = false;
				if (res.identity == 1) {
					isteacher = true;
				}
				userInfo = {
					name: res.name,
					pfs: res.pls,
					cls: res.cls,
					num: res.username,
					phone: res.phone,
					isTeacher: isteacher
				}
				vm.$store.commit('userLogin', userInfo);
			});
	}
	api.getAllCourse = () => http.get("course/mycourse/")
	api.getAllScore = () => http.get("score/myscore/")
	api.getAllExam = () => http.get("exam/myexam/")
	api.getAllWork = () => http.get("work/")
	api.getAllAnswer = () => http.get("answer/")
	api.getAllPeopleClass = () => http.get("peopleclass/")
	uni.$u.api = api;
}
