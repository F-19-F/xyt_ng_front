<template>
	<view>
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">
				返回
			</view>
			<view slot="content">
				选课信息
			</view>
		</cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索课程" v-model="coursenamesearch" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-orange-1 shadow-blur round" @click="filteCourse">查询</button>
			</view>
		</view>
		<view class="bg-blue-1">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>选择学期
				</view>
				<view class="action">
					<term-picker @xnm="xnmClick" @xqm="xqmClick" @confirm="confirmClick"></term-picker>
				</view>
			</view>
		</view>
		<!-- 主体展示页面 -->
		<view class="animation-slide-bottom margin list-container" v-if="courseList.length">
			<view class="list-head bg-blue-1">
				<view class=""> 课程名</view>
			</view>
			<view class="list-item text-black" v-for="(item, index) in courseList" :key="index"
				:class="index % 2 ? 'bg-gray' : 'bg-white'">
				<view class="list-subitem">
					<text class="text-bold">{{ item.kc }}</text>
					<text> 任课老师 </text>
				</view>
				<view class="list-subitem margin-top-sm">
					<view class="flex-sub text-left"> 学分：{{ item.xf }} </view>
					<view class="flex-sub text-center"> 地点：{{ item.cdmc }} </view>
					<view class="flex-sub text-right">
						<button class="cu-btn bg-orange-1 round shadow sm"
							@click="detailGrade(item.jxb_id, item.xnm, item.xqm, item.kc)">
							退选
						</button>
					</view>
				</view>
			</view>
			<view class="list-head bg-blue-1"> </view>
		</view>
		<!-- 提示区域 -->
		<cu-empty :type="emptyType">
			<view slot="text" class="">
				<view class="margin-bottom-sm">{{ emptyMsg }}</view>
				<button v-if="emptyType == 'search'" class="cu-btn bg-orange-1 round shadow-blur" @click="getGrade">
					查询
				</button>
			</view>
		</cu-empty>
	</view>
</template>

<script>
	import termPicker from "@/components/term-picker/term-picker";
	export default {
		data() {
			return {
				xqm: "",
				xnm: "",
				courseList: [],
				emptyType: "search",
				emptyMsg: "点击最上方按钮切换学期，或点击下方按钮直接查询。",
				coursenamesearch: ''
			};
		},
		components: {
			termPicker,
		},
		mounted() {
			this.getGrade();
		},
		methods: {
			xqmClick(e) {
				this.xqm = e;
			},
			xnmClick(e) {
				this.xnm = e;
			},
			confirmClick: function() {
				this.getGrade();
			},
			// 获取分数 todo
			getGrade: function() {
				uni.$u.api.getAllScore().then(res => {
					this.courseList = res;
					// 更新提示信息
					this.emptyType = "success";
					// 更新空白时的信息
					this.emptyMsg = "加载完成";
					this.calcu();
				})
				// console.log("getGrade");



				// let postData = {
				// 	username: uni.getStorageSync('user_info').username,
				// 	password: uni.getStorageSync('user_info').password,
				// 	xnm: this.xnm,
				// 	xqm: this.xqm,
				// }
				// this.$req("api/study/grade/", "post", postData, res => {
				// 	if (res.code === 10000) {
				// 		const gradeLength = res.data.grade_list.length
				// 		if (gradeLength) {
				// 			this.courseList = res.data.grade_list
				// 			// 选中情况
				// 			this.choFlag = new Array(gradeLength).fill(true)
				// 			// 更新提示信息
				// 			this.emptyType = "success"
				// 			// 更新空白时的信息
				// 			this.emptyMsg = "加载完成"
				// 			this.calcu()
				// 		} else {
				// 			this.emptyType = "success"
				// 			this.emptyMsg = "未查询到信息"
				// 			this.courseList = []
				// 		}
				// 	} else {
				// 		this.emptyType = "error"
				// 		this.emptyMsg = res.msg
				// 		this.courseList = []
				// 	}
				// })
			},
			// 查看详情分数 todo
			detailGrade: function(jxb_id, xnm, xqm, kc) {
				//   uni.showModal({
				//     title: kc,
				//     content: "平时成绩: 99\n期末成绩: 80",
				//     showCancel: false,
				//   });
				let showDetail = function(res) {
					if (res.code === 10000) {
						let str = "";
						for (let i in res.data.detail_grade) {
							str +=
								res.data.detail_grade[i].xmblmc +
								"：" +
								res.data.detail_grade[i].xmcj +
								"\n";
						}
						uni.showModal({
							title: kc,
							content: str.substring(0, str.length - 1),
							showCancel: false,
						});
					} else {
						uni.showModal({
							title: "提示",
							content: res.msg,
							showCancel: false,
						});
					}
				};
				showDetail({
					code: 10000,
					data: {
						detail_grade: [{
							xmblmc: '平时成绩',
							xmcj: '90'
						}, {
							xmblmc: '期末成绩',
							xmcj: '88'
						}]
					}
				})
				//   this.$req(
				//     "api/study/detail_grade/",
				//     "post",
				//     {
				//       username: wx.getStorageSync("user_info").username,
				//       password: wx.getStorageSync("user_info").password,
				//       jxb_id: jxb_id,
				//       xnm: xnm,
				//       xqm: xqm === "3" ? "1" : "2",
				//     },
				//     function (res) {
				//       if (res.code === 10000) {
				//         let str = "";
				//         for (let i in res.data.detail_grade) {
				//           str +=
				//             res.data.detail_grade[i].xmblmc +
				//             "：" +
				//             res.data.detail_grade[i].xmcj +
				//             "\n";
				//         }
				//         uni.showModal({
				//           title: kc,
				//           content: str.substring(0, str.length - 1),
				//           showCancel: false,
				//         });
				//       } else {
				//         uni.showModal({
				//           title: "提示",
				//           content: res.msg,
				//           showCancel: false,
				//         });
				//       }
				//     }
				//   );
			},
			// 根据条件过滤显示的课程
			filteCourse() {
				console.log(this.coursenamesearch)
			}
		},
	};
</script>

<style lang="scss" scoped>
</style>
