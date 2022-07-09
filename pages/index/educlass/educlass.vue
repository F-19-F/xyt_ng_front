<template>
	<view>
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">
				返回
			</view>
			<view slot="content">
				教学班
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
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>选择学期
			</view>
			<view class="action">
				<term-picker @xnm="xnmClick" @xqm="xqmClick"></term-picker>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>开始周
			</view>
			<view class="action">
				<button class="cu-btn bg-orange-1 shadow" @click="modalName = 'WeekModal';curWeek=0">
					第{{ beginWeek }}周
				</button>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>结束周
			</view>
			<view class="action">
				<button class="cu-btn bg-orange-1 shadow" @click="modalName = 'WeekModal';curWeek=1">
					第{{ endWeek }}周
				</button>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>星期几
			</view>
			<view class="action">
				<button class="cu-btn bg-orange-1 shadow" @click="modalName = 'DayModal'">
					星期{{ title[thisDay] }}
				</button>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>上课开始节数
			</view>
			<view class="action">
				<button class="cu-btn bg-orange-1 shadow" @click="modalName = 'JcModal';curCs = 0 ">
					第{{ beginCs+1 }}节
				</button>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>上课结束节数
			</view>
			<view class="action">
				<button class="cu-btn bg-orange-1 shadow" @click="modalName = 'JcModal';curCs = 1">
					第{{ endCs+1 }}节
				</button>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>教学地点
			</view>
			<view class="action">
				<button class="cu-btn bg-orange-1 shadow" @click="modalName = 'LocalModal'">
					{{ classRooms[curRoomindex].buildingname+classRooms[curRoomindex].roomname }}
				</button>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-orange-1 round shadow-blur lg" @click="createEduclass">
				创建教学班
			</button>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName == 'WeekModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @click="modalName = null">单选</view>
					<view class="action text-green" @click="modalName = null">确定</view>
				</view>
				<view class="grid col-4 padding-sm bg-gray">
					<view v-for="(item, index) in 20" class="padding-xs" :key="index">
						<button class="cu-btn blue block"
							:class="index + 1 == whichWeekchoose() ? 'bg-blue' : 'line-blue'"
							@click="chooseWeek(index + 1)">
							第{{ index + 1 }}周
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName == 'DayModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @click="modalName = null">单选</view>
					<view class="action text-green" @click="modalName = null">确定</view>
				</view>
				<view class="grid col-4 padding-sm bg-gray">
					<view v-for="(item, index) in 7" class="padding-xs" :key="index">
						<button class="cu-btn blue block" :class="index == thisDay ? 'bg-blue' : 'line-blue'"
							@click="thisDay = index">
							星期{{ title[index] }}
						</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 通过监听LocalModal的变化来来决定是否展示从下方弹起的对话框 -->
		<view class="cu-modal bottom-modal" :class="modalName == 'LocalModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @click="modalName = null">单选</view>
					<view class="action text-green" @click="modalName = null">确定</view>
				</view>
				<view class="grid col-3 padding-sm bg-gray">
					<view v-for="(item, index) in classRooms" class="padding-xs" :key="index">
						<button class="cu-btn blue block" :class="index == curRoomindex ? 'bg-blue' : 'line-blue'"
							@click="
                curRoomindex = index;
              ">
							{{ item.buildingname + item.roomname}}
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName == 'JcModal' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @click="modalName = null">单选</view>
					<view class="action text-green" @click="modalName = null">确定</view>
				</view>
				<view class="grid col-3 padding-sm bg-gray">
					<view v-for="index in 14" class="padding-xs" :key="index">
						<button class="cu-btn blue lg block"
							:class="(index-1) == whichCscheck() ? 'bg-blue' : 'line-blue'" @click="csCheck(index-1)">
							第{{ index }}节
						</button>
					</view>
				</view>
			</view>
		</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xqm: "",
				xnm: "",
				title: ["日", "一", "二", "三", "四", "五", "六"],
				thisWeek: 1,
				beginWeek: 1,
				endWeek: 2,
				// 拉起选项框时选择第是哪一个，开始节还是结束节
				beginCs: 1,
				endCs: 2,
				curCs: 0,
				// 当前选的是哪一个，开始周还是结束周
				curWeek: 0,
				thisDay: new Date().getDay(),
				courseByme: [],
				courseIndex: 0,
				curCourseId: -1,
				modalName: "",
				classRooms: [{
					id: 1,
					buildingname: "默认",
					roomname: "教室"
				}, ],
				curRoomindex: 0,
			};
		},
		created() {
			const value = wx.getStorageSync("start_day");
			let subWeek = parseInt(this.dateMinus(value) / 7) + 1;
			if (!(subWeek >= 1 && subWeek <= 20)) {
				subWeek = 1;
			}
			// 获取自己创建的课程列表
			// 获取教室列表

			this.thisWeek = subWeek;
			this.$u.api.getCoursebyme().then(res => {
				this.courseByme = res;
				if (this.courseByme.length > 0) {
					this.curCourseId = this.courseByme[0].id;
				}

			})
			this.$u.api.getClassroom().then(res => {
				this.classRooms = res.results;
			})
			// this.courseByme = [{
			// 	id: 1,
			// 	name: "测试课程1"
			// }, {
			// 	id: 2,
			// 	name: "测试课程2"
			// }]

		},
		methods: {
			xqmClick: function(e) {
				this.xqm = e;
			},
			xnmClick: function(e) {
				this.xnm = e;
			},
			// 获取今天距离某天相差天数
			dateMinus: function(whichDay) {
				let sdate = new Date(whichDay);
				let now = new Date();
				let days = now.getTime() - sdate.getTime();
				let day = parseInt(days / (1000 * 60 * 60 * 24));
				return day;
			},
			// 节次变化
			csCheck(index) {
				// console.log(index)
				if (this.curCs == 0) {
					this.beginCs = index
				} else {
					this.endCs = index
				}
			},
			whichCscheck() {
				if (this.curCs == 0) {
					return this.beginCs
				} else {
					return this.endCs
				}
			},
			chooseWeek(index) {
				if (this.curWeek == 0) {
					this.beginWeek = index
				} else {
					this.endWeek = index
				}
			},
			whichWeekchoose() {
				if (this.curWeek == 0) {
					return this.beginWeek
				} else {
					return this.endWeek
				}
			},
			createEduclass: function() {
				let week_begin = this.beginWeek;
				let week_end = this.endWeek;
				let begin_in_day = this.beginCs + 1;
				let end_in_day = this.endCs + 1;
				let xq = parseFloat(this.xqm);
				let xn = parseFloat(this.xnm);
				let course = this.curCourseId;
				let classroom = this.classRooms[this.curRoomindex].id;
				let whichday = 0;
				if (this.thisDay == 0) {
					whichday = 7;
				} else {
					whichday = this.thisDay;
				}

				let eduClass = {
					week_begin,
					week_end,
					begin_in_day,
					end_in_day,
					xq,
					xn,
					course,
					classroom,
					whichday
				};
				// console.log(eduClass)
				this.$u.api.pubnewEduclass(eduClass).then(res => {
					uni.showToast({
						title: "创建成功"
					})
				}).catch(res => {
					console.log(res)
				})
			},
		},
	};
</script>

<style lang="scss">
</style>
