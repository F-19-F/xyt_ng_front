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
				<view v-if="item.selected">
					<view class="list-subitem">
						<text class="text-bold">{{ item.kc }}</text>
						<text> {{item.teacher}} </text>
					</view>
					<view class="list-subitem margin-top-sm">
						<view class="flex-sub text-left"> 学分：{{ item.xf }} </view>
						<view class="flex-sub text-center"> 地点：{{ item.loc }} </view>
						<view class="flex-sub text-right">
							<button v-if="item.selected" class="cu-btn bg-orange-1 round shadow sm"
								@click="unselectCourse(item.pcs_id,index)">
								退选
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
				<button v-if="emptyType == 'search'" class="cu-btn bg-orange-1 round shadow-blur" @click="getSelect">
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
				coursenamesearch: '',
				allList: []
			};
		},
		components: {
			termPicker,
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
				this.getSelect();
			},
			getSelect: function() {
				uni.$u.api.getSelectCourse(this.xqm, this.xnm).then(res => {
					this.courseList = res.filter(v => v.selected)
					this.allList = res.filter(v => v.selected)
					if (res.length > 0) {
						this.emptyType = "success"
						// 更新空白时的信息
						this.emptyMsg = "加载完成"
					} else {
						this.emptyType = "success"
						this.emptyMsg = "未查询到信息"
						this.courseList = []
					}

				}).catch(res => {
					this.emptyType = "error"
					this.emptyMsg = res[0]
					this.courseList = []
				})
			},
			// 查看详情分数 todo
			unselectCourse: function(jxb_id, index) {
				this.$u.api.unselectCourse(jxb_id).then(res => {
					uni.showToast({
						title: "退选成功!"
					});
					let i = this.allList.indexOf(this.courseList[index]);
					this.allList.splice(i, 1);
					this.courseList[index].selected = false;
					this.courseList.splice(index, 1);

				}).catch(res => {
					// uni.showToast({
					// 	icon: "error",
					// 	title: "退选失败" + res[0]
					// })
					console.log(res)
				})
			},
			// 根据条件过滤显示的课程
			filteCourse() {
				console.log(this.coursenamesearch)
				if (this.coursenamesearch == '') {
					this.courseList = this.allList
				} else {
					this.courseList = this.allList.filter(v => v.kc.indexOf(this.coursenamesearch) >= 0)
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
</style>
