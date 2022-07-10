// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	const http = uni.$u.http
	let api = {}
	api.getCsrfToken = () => http.get("getCsrftoken/")
	api.login = (username, password) => {
		// 插入csrftoken -> 发送登录post -> 获取token->请求用户信息
		let id = 0;
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
			}).then(res => {
				id = res.pk;
				return http.get(`user/${res.pk}/`)
			})
			.then(res => {
				let isteacher = false;
				if (res.identity == 1) {
					isteacher = true;
				}
				userInfo = {
					id: id,
					name: res.name,
					pfs: res.pls,
					cls: res.cls,
					num: res.username,
					phone: res.phone,
					isTeacher: isteacher
				}
				console.log("id:" + id)
				vm.$store.commit('userLogin', userInfo);
			});
	}
	api.updateUserinfo = userInfo => {
		newUserinfo = {
			'name': userInfo.name,
			'username': userInfo.num,
			...userInfo
		};
		return api.getCsrfToken().then(res => {
			// console.log(newUserinfo)
			let csrf_token = res.csrftoken;
			return http.put(`user/${userInfo.id}/`, {
				...newUserinfo
			}, {
				header: {
					'X-CSRFToken': csrf_token
				}
			}).then(res => {
				// 更新客户端用户信息
				vm.$store.commit('userLogin', userInfo);
			})
		})

	}
	api.getAllCourse = () => http.get("course/mycourse/")
	// 学年是int，而学期是string
	api.getSelectCourse = (xqm, xnm) => http.get("educlass/courseselect/", {
		params: {
			xnm,
			xqm
		}
	})
	api.selectCourse = (jxb_id) => {
		return api.getCsrfToken().then(res => {
			let csrf_token = res.csrftoken;
			// console.log(csrf_token)
			return http.post("peopleclass/", {
				student: vm.$store.state.userInfo.id,
				educlass: jxb_id
			}, {
				header: {
					'X-CSRFToken': csrf_token
				}
			})
		})

	}
	api.unselectCourse = (jxb_id) => {
		return api.getCsrfToken().then(res => {
			let csrf_token = res.csrftoken;
			return http.delete(`peopleclass/${jxb_id}/`, {}, {
				header: {
					'X-CSRFToken': csrf_token
				}
			})
		})
		// return http.
	}
	api.getWorks = () => http.get("work/mywork/")
	api.getWorkdetail = id => http.get(`work/${id}/`)
	api.submitAnswer = (id, answer) => {
		return api.getCsrfToken().then(res => {
			let csrf_token = res.csrftoken;
			// console.log(csrf_token)
			return http.post("answer/", {
				work: id,
				content: answer,
				people: vm.$store.state.userInfo.id
			}, {
				header: {
					'X-CSRFToken': csrf_token
				}
			})
		})
	}
	api.createWork = (educlass, title, content) => {
		return api.getCsrfToken().then(res => {
			let csrf_token = res.csrftoken;
			// console.log(csrf_token)
			return http.post("work/", {
				educlass,
				title,
				content
			}, {
				header: {
					'X-CSRFToken': csrf_token
				}
			})
		})
	}
	api.submitScore = (people, educlass, score_normal, score_final, score) => {
		return api.getCsrfToken().then(res => {
			let csrf_token = res.csrftoken;
			// console.log(csrf_token)
			return http.post("score/", {
				people,
				educlass,
				score,
				score_normal,
				score_final
			}, {
				header: {
					'X-CSRFToken': csrf_token
				}
			})
		})
	}
	api.getMyansewerbywid = id => {
		return http.get('answer/', {
			params: {
				work: id
			}
		})
	}
	api.getEduclassbycourse = (course, xn, xq) => {
		return http.get('educlass/', {
			params: {
				course,
				xn,
				xq
			}
		})
	}
	api.getPeoplebyeduclass = (educlass) => {
		return http.get('peopleclass/', {
			params: {
				educlass
			}
		})
	}

	api.pubnewCourse = (name, credit) => {
		return api.getCsrfToken().then(res => {
			let csrf_token = res.csrftoken;
			// console.log(csrf_token)
			return http.post("course/", {
				name,
				credit,
				create_teacher: vm.$store.state.userInfo.id
			}, {
				header: {
					'X-CSRFToken': csrf_token
				}
			})
		})
	}
	api.getCoursebyme = () => {
		return http.get('course/getcoursebyme/')
	}
	api.getClassroom = () => {
		return http.get('classroom/')
	}
	api.pubnewEduclass = (educlass) => {
		return api.getCsrfToken().then(res => {
			let csrf_token = res.csrftoken;
			// console.log(csrf_token)
			return http.post("educlass/", {
				...educlass
			}, {
				header: {
					'X-CSRFToken': csrf_token
				}
			})
		})
	}
	api.delEduclass = id => {
		return api.getCsrfToken().then(res => {
			let csrf_token = res.csrftoken;
			// console.log(csrf_token)
			return http.delete(`educlass/${id}/`, {}, {
				header: {
					'X-CSRFToken': csrf_token
				}
			})
		})
	}
	api.getAllScore = () => http.get("score/myscore/")
	api.getAllExam = () => http.get("exam/myexam/")
	api.getAllWork = () => http.get("work/")
	api.getAllAnswer = () => http.get("answer/")
	api.getAllPeopleClass = () => http.get("peopleclass/")
	uni.$u.api = api;
}
