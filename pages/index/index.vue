<template>
	<view>
		<!-- 轮播 -->
		<view style="padding-top: 80rpx;position: relative;">
			<view class="cu-carousel-bg shadow bg-blue-1"></view>
			<cu-carousel @selected="selectedBanner" :imgList="swiperList"></cu-carousel>
		</view>
		<!-- 功能列表 -->
		<view class="padding-left-sm padding-right-sm padding-bottom-sm text-df">
			<!-- 成绩、考试、空教室、通讯电话   每一个flex为一行功能 -->
			<!-- animation 指定动画 -->
			<!-- flex声明一个容器 -->
			<view class="flex animation-slide-left">
				<!-- 学习分类 -->
				<!-- flex-stub声明上层flex布局的子组件 -->
				<view class="flex-sub margin-xs">
					<view class='padding-sm bg-blue-1 nav-li shadow' style='height:100%;'>
						<view class="nav-title">学习</view>
						<view class="nav-name">Study</view>
						<image class="nav-bg" src="@/static/bg_img/class_study.png"></image>
					</view>
				</view>
				<view class="flex-sub margin-xs">
					<button v-if="!isTeacher"
						class="cu-btn bg-blueLight blue-1 flex justify-between border12 margin-bottom-sm shadow"
						style="height:80rpx;">
						<image class="round  fun-icon" src="@/static/fun_ico/found.png"></image>作业
					</button>
					<button v-else
						class="cu-btn bg-blueLight blue-1 flex justify-between border12 margin-bottom-sm shadow"
						style="height:80rpx;">
						<image class="round  fun-icon" src="@/static/fun_ico/found.png"></image>发布作业
					</button>
					<button v-if="!isTeacher" class="cu-btn bg-blueLight blue-1 flex justify-between border12 shadow"
						style="height:80rpx;">
						<image class="round  fun-icon" src="@/static/fun_ico/found.png"></image>选课
					</button>
					<button v-else class="cu-btn bg-blueLight blue-1 flex justify-between border12 shadow"
						style="height:80rpx;">
						<image class="round  fun-icon" src="@/static/fun_ico/found.png"></image>管理选课
					</button>
				</view>
				<view class="flex-sub margin-xs">
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 margin-bottom-sm shadow"
						@click="navigate('classroom',false)" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/study.png'></image>空教室
					</button>
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 shadow"
						@click="navigate('book')" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/library.png'></image>馆藏查询
					</button>
				</view>
			</view>
			<!-- 公有功能 -->
			<view class="flex animation-slide-right margin-top-xl">
				<view class="flex-sub margin-xs">
					<!-- xs -> sm -> ' ' -> lg -> xl -->
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 margin-bottom-sm shadow"
						@click="navigate('map')" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/map.png'></image>校园地图
					</button>
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 shadow"
						@click="navigate('phone')" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/phone.png'></image>通讯电话
					</button>
				</view>
				<view class="flex-sub margin-xs">
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 margin-bottom-sm shadow"
						@click="tips('bus')" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/bus.png'></image>校车时刻
					</button>
					<!-- cu-btn 将<button>里的图片以及文字合并成一个按钮 -->
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 shadow"
						@click="tips('calendar')" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/calendar.png'></image>校历时间
					</button>
				</view>
				<!-- 生活功能块 -->
				<view class="flex-sub margin-xs">
					<view class='padding-sm bg-blue-1 nav-li shadow' style='height:100%;'>
						<view class="nav-title">学校</view>
						<view class="nav-name">life</view>
						<image class="nav-bg" src="@/static/bg_img/class_live.png"></image>
					</view>
				</view>
			</view>
			<!-- 学生相关 -->
			<view v-if="!isTeacher" class="flex animation-slide-right margin-top-xl">
				<view class="flex-sub margin-xs">
					<view class='padding-sm bg-blue-1 nav-li shadow' style='height:100%;'>
						<view class="nav-title">查询</view>
						<view class="nav-name">query</view>
						<image class="nav-bg" src="@/static/bg_img/class_more.png"></image>
					</view>
				</view>
				<view class="flex-sub margin-xs">
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 margin-bottom-sm shadow"
						@click="navigate('exam',false)" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/exam.png'></image>考试考场
					</button>
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 shadow"
						@click="navigate('grade',false)" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/grade.png'></image>考试成绩
					</button>
				</view>
				<view class="flex-sub margin-xs">
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 margin-bottom-sm shadow"
						style="height:80rpx;">
						<image class="round  fun-icon" src="@/static/fun_ico/found.png"></image>选课信息
					</button>
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 shadow"
						style="height:80rpx;">
						<image class="round  fun-icon" src="@/static/fun_ico/found.png"></image>个人信息
					</button>
				</view>
			</view>
			<!-- 教师相关 -->
			<view v-if="isTeacher" class="flex animation-slide-right margin-top-xl">
				<view class="flex-sub margin-xs">
					<view class='padding-sm bg-blue-1 nav-li shadow' style='height:100%;'>
						<view class="nav-title">教学</view>
						<view class="nav-name">query</view>
						<image class="nav-bg" src="@/static/bg_img/class_more.png"></image>
					</view>
				</view>
				<view class="flex-sub margin-xs">
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 margin-bottom-sm shadow"
						@click="navigate('exam',false)" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/exam.png'></image>发布课程
					</button>
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 shadow"
						@click="navigate('grade',false)" style="height:80rpx;">
						<image class='round fun-icon' src='@/static/fun_ico/grade.png'></image>教学班
					</button>
				</view>
				<view class="flex-sub margin-xs">
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 margin-bottom-sm shadow"
						style="height:80rpx;">
						<image class="round  fun-icon" src="@/static/fun_ico/found.png"></image>教学班
					</button>
					<button class="cu-btn bg-blueLight blue-1 flex justify-between border12 shadow"
						style="height:80rpx;">
						<image class="round  fun-icon" src="@/static/fun_ico/found.png"></image>个人信息
					</button>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import cuCarousel from "../../components/cu-carousel/cu-carousel.vue"
	export default {
		name: "home",
		data() {
			return {
				// url: "https://dry-api.zyuanlee.cn/api/",
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				swiperList: [],
				animation: '',
				yearArray: getApp().globalData.yearArray
			}
		},
		components: {
			cuCarousel
		},
		created() {},
		methods: {
			// 获取轮播图信息
			// init: function() {
			// 	if (!this.swiperList.length) {
			// 		this.$req('api/config/carousel/', "get", {}, res => {
			// 			this.swiperList = res.data.results
			// 		})
			// 	}

			// },
			// 点击轮播图图片
			selectedBanner(item, index) {},
			navigate(nav, required = false) {
				// required为true表明需要登录
				if (required) {
					const value = uni.getStorageSync("user_info")
					if (!value) {
						uni.showModal({
							content: "请登录后再使用！",
							showCancel: false,
						})
						return;
					}
				}
				// 登录并注册
				if (nav === 'dry') {
					// const user = uni.getStorageSync("user_info")
					// this.username = user["username"]
					// this.password = user["password"]
					// uni.showLoading()
					// uni.request({
					// 	url: this.url + "user/register/",
					// 	method: "POST",
					// 	data: {
					// 		username: this.username,
					// 		password: this.password,
					// 	},
					// 	success: () => {
					// 		uni.request({
					// 			url: this.url + "user/login/",
					// 			method: "POST",
					// 			data: {
					// 				username: this.username,
					// 				password: this.password,
					// 			},
					// 			success: (res) => {
					// 				uni.hideLoading()
					// 				res = res.data
					// 				uni.setStorageSync('token', "Bearer " + res.data.token)
					// 				uni.navigateTo({
					// 					url: "/pages/home/" + nav + "/" + nav,
					// 					fail: res => {
					// 						console.log(res)
					// 					}
					// 				})
					// 			}
					// 		})
					// 	}
					// })
				} else {
					uni.navigateTo({
						url: "/pages/index/" + nav + "/" + nav,
						fail: res => {
							console.log(res)
						}
					})
				}

			},
			// tips(nav) {
			// 	this.$req('api/config/tips/', "get", {
			// 		search: nav,
			// 	}, res => {
			// 		console.log(res)
			// 		if (res.code === 20000) {
			// 			uni.previewImage({
			// 				urls: [res.data[0].image],
			// 			})
			// 		}
			// 	})
			// },
			// more: function() {
			// 	wx.showModal({
			// 		title: '提示',
			// 		content: '期待下次更新~~',
			// 		showCancel: false,
			// 	})
			// },
			// wait: function() {
			// 	wx.showModal({
			// 		title: '提示',
			// 		content: '敬请期待~~',
			// 		showCancel: false,
			// 	})
			// },
			// 公教地图
		},
		computed: {
			style() {
				let StatusBar = this.StatusBar;
				let CustomBar = this.CustomBar;
				let style = `padding-top:${CustomBar}px;`;
				return style
			},
			isTeacher() {
				return this.$store.state.userInfo.isTeacher;
			}
		},
	}
</script>

<style lang="scss">
	.cu-carousel-bg {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 250rpx;
		// background-color: #1798D9;
	}

	.border12 {
		border-radius: 12rpx;
	}

	.nav-li {
		border-radius: 12rpx;
		position: relative;
		z-index: 1;

		&:after {
			content: "";
			position: absolute;
			z-index: -1;
			background-color: bisque;
			width: 95%;
			height: 95%;

			right: 0;
			bottom: 0;
			border-radius: 10rpx;
			opacity: 0.2;
			/* transform: scale(0.9, 0.9); */
		}

		.nav-title {
			position: absolute;
			top: 20rpx;
			font-size: 36rpx;
			z-index: 1;
		}

		.nav-name {
			font-size: 28rpx;
			text-transform: Capitalize;
			position: absolute;
			bottom: 40rpx;
			z-index: 1;
		}

		.nav-bg {
			position: absolute;
			right: 10rpx;
			top: 30rpx;
			width: 140rpx;
			height: 140rpx;
			z-index: -1;
		}
	}

	.fun-icon {
		width: 40rpx;
		height: 40rpx;
	}
</style>
