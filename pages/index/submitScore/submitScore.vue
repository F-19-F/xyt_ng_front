<template>
	<view>
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">
				返回
			</view>
			<view slot="content">
				提交分数
			</view>
		</cu-custom>
		<view class='margin-bottom-sm margin-top-sm'>
			<view class="cu-list menu card-menu sm-border">
				<view class="cu-form-group text-bold">
					<view class="title"><text class="cuIcon-edit"></text>期末分 </text></view>
					<view class="text-center">
						<input type="digit" v-model="score_final"></input>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold"><text class="cuIcon-edit"></text>平时分 </view>
					<view class="text-center">
						<input type="digit" v-model="score_normal"></input>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold"><text class="cuIcon-edit"></text>最终分 </view>
					<view class="text-center">
						<input type="digit" v-model="score"></input>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-orange-1 round shadow-blur lg" @click="publishCourse()">提交分数</button>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				userInfo: this.$store.state.userInfo,
				score_normal: 60,
				score_final: 60,
				score: 60,
				studentid: -1,
				educlassid: -1
			}
		},
		methods: {
			// ...mapActions([])
			publishCourse() {
				uni.$u.api.submitScore(this.studentid, this.educlassid, this.score_normal, this.score_final, this.score)
					.then(res => {
						uni.showToast({
							title: "提交成功!"
						})
					})
				// uni.$u.api.pubnewCourse(this.coursename, parseFloat(this.picker[this.index])).then(res => {
				// 	uni.showToast({
				// 		title: "课程创建成功!"
				// 	})
				// }).catch(res => {
				// 	console.log(res)
				// })
			},
		},
		computed: {
			// ...mapState(['userInfo']),
			identity() {
				if (this.userInfo.isTeacher) {
					return "老师"
				} else {
					return "学生"
				}
			}
		},
		onLoad(options) {
			this.studentid = options.studentid
			this.educlassid = options.educlassid
			console.log(options)
			// console.log(this.studentid)
			// console.log(this.educlassid)
		}
	}
</script>

<style>

</style>
