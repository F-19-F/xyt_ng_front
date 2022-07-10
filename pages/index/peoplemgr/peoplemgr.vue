<template>
	<view>
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">
				返回
			</view>
			<view slot="content">
				班级管理
			</view>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>课程
			</view>
			<view class="action">
				<button :disabled="!courseByme.length>0" class="cu-btn bg-orange-1 shadow"
					@click="modalName = 'KcModal'">
					<text v-if="courseByme.length>0">{{ courseByme[courseIndex].name }}</text>
					<text v-else>没创建课程</text>
				</button>
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
		<view class="bg-blue-1">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text>选择教学班
				</view>
				<view class="action">
					<view class="action">
						<button :disabled="!eduClass.length>0" class="cu-btn bg-orange-1 shadow"
							@click="modalName = 'CsModal'">
							<text v-if="eduClass.length>0">{{ eduClassname(eduClass[eduClassIndex])}}</text>
							<text v-else>无教学班</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 主体展示页面 -->
		<view class="animation-slide-bottom margin list-container" v-if="peopleList.length">
			<view class="list-head bg-blue-1">
				<view class=""> 学生</view>
			</view>
			<view class="list-item text-black" v-for="(item, index) in peopleList" :key="index+'1'"
				:class="index % 2 ? 'bg-gray' : 'bg-white'">
				<view>
					<view class="list-subitem">
						<text class="text-bold">{{ item.name }}</text>
						<!-- <text> {{item.teacher}} </text> -->
					</view>
					<view class="list-subitem margin-top-sm">
						<!-- <view class="flex-sub text-left"> 开始：第{{ item.begin_in_day }}节 </view> -->
						<!-- <view class="flex-sub text-center"> 结束周：{{ item.week_end }} </view> -->
						<view class="flex-sub text-right">
							<button class="cu-btn bg-orange-1 round shadow sm" @click="delPeopleinclass(item.id,index)">
								退出
							</button>
							<button class="cu-btn bg-orange-1 round shadow sm" @click="tosubmit(item.student)">
								提交成绩
							</button>
							<button class="cu-btn bg-orange-1 round shadow sm" @click="towork(item.id)">
								查看作业
							</button>
						</view>
					</view>
				</view>
			</view>
			<view class="list-head bg-blue-1"> </view>
		</view>
		<!-- 提示区域 -->
		<cu-empty :type="emptyType">
			<view slot="text" class="">
				<view class="margin-bottom-sm">{{ emptyMsg }}</view>
				<button v-if="emptyType == 'search'" class="cu-btn bg-orange-1 round shadow-blur"
					@click="confirmClick()">
					查询
				</button>
			</view>
		</cu-empty>
		<view class="cu-modal bottom-modal" :class="modalName == 'KcModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @click="modalName = null">单选</view>
					<view class="action text-green" @click="modalName = null">确定</view>
				</view>
				<view class="grid col-3 padding-sm bg-gray">
					<view v-for="(item, index) in courseByme" class="padding-xs" :key="index">
						<button class="cu-btn blue block" :class="index == courseIndex ? 'bg-blue' : 'line-blue'"
							@click="
		        curCourseId = item.id;
		        courseIndex = index;
		      ">
							{{ item.name }}
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName == 'CsModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @click="modalName = null">单选</view>
					<view class="action text-green" @click="modalName = null">确定</view>
				</view>
				<view class="grid col-3 padding-sm bg-gray">
					<view v-for="(item, index) in eduClass" class="padding-xs" :key="index">
						<button class="cu-btn blue block" :class="index == eduClassIndex ? 'bg-blue' : 'line-blue'"
							@click="
		        eduClassId = item.id;
		        eduClassIndex = index;
				confirmClick();
		      ">
							{{ eduClassname(item) }}
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import termPicker from "@/components/term-picker/term-picker";
	export default {
		data() {
			return {
				xqm: "",
				xnm: "",
				peopleList: [],
				emptyType: "search",
				emptyMsg: "点击上方筛选，或点击下方按钮直接查询。",
				coursenamesearch: '',
				allList: [],
				courseByme: [],
				eduClass: [],
				curCourseId: 0,
				courseIndex: 0,
				eduClassIndex: 0,
				eduClassId: -1,
				modalName: ''
			};
		},
		components: {
			termPicker,
		},
		created() {
			this.$u.api.getCoursebyme().then(res => {
				this.courseByme = res;
				if (this.courseByme.length > 0) {
					this.curCourseId = this.courseByme[0].id;
				}

			})
		},
		mounted() {},
		methods: {
			xqmClick(e) {
				this.xqm = e;
			},
			xnmClick(e) {
				this.xnm = e;
			},
			confirmClick: function() {
				this.getEduclass().then(res => {
					// console.log("called")
					this.getPeopleinclass();
				}).catch(res => {
					this.emptyType = "error"
					this.emptyMsg = res[0]
					this.eduClass = []
				})
				// if(eduClass.)

			},
			getEduclass: function() {
				return uni.$u.api.getEduclassbycourse(this.curCourseId, this.xnm, this.xqm).then(res => {
					this.eduClass = res.results;
					this.eduClassId = this.eduClass[0].id;
					// this.allList = res.filter(v => v.selected)
					if (res.count > 0) {
						this.emptyType = "success"
						// 更新空白时的信息
						this.emptyMsg = "加载完成"
					} else {
						this.emptyType = "success"
						this.emptyMsg = "未查询到信息"
						this.eduClass = []
					}
				})
			},
			eduClassname(item) {
				return `第${item.week_begin}-${item.week_end}周-周${item.whichday}-${item.begin_in_day}-${item.end_in_day}节`
			},
			getPeopleinclass() {
				console.log(this.eduClassId)
				if (this.eduClass.length > 0 && this.eduClassId != -1) {
					console.log(this.eduClassId)
					this.$u.api.getPeoplebyeduclass(this.eduClassId).then(res => {
						this.peopleList = res.results;
						console.log(res)
					})
				}
			},
			// 查看详情分数 todo
			delPeopleinclass: function(id, index) {
				this.$u.api.unselectCourse(id).then(res => {
					uni.showToast({
						title: "退出成功!"
					});
					// let i = this.allList.indexOf(this.peopleList[index]);
					// this.allList.splice(i, 1);
					// this.peopleList[index].selected = false;
					this.peopleList.splice(index, 1);

				}).catch(res => {
					// uni.showToast({
					// 	icon: "error",
					// 	title: "退选失败" + res[0]
					// })
					console.log(res)
				})
			},
			tosubmit(studentid) {
				console.log("sid:" + studentid)
				uni.navigateTo({
					url: `/pages/index/submitScore/submitScore?studentid=${studentid}&educlassid=${this.eduClassId}`
				})
			},
			towork(studentid) {
				console.log("sid:" + studentid)
				uni.navigateTo({
					url: `/pages/index/work/work?sid=${studentid}&check=true`
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
</style>
