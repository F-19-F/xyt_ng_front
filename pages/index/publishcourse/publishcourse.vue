<template>
	<view>
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">
				返回
			</view>
			<view slot="content">
				创建新课程
			</view>
		</cu-custom>
		<view class='margin-bottom-sm margin-top-sm'>
			<view class="cu-list menu card-menu sm-border">
				<view class="cu-form-group">
					<view class="title">课程创建老师</view>
					<view class="text-center">
						<input disabled="true" :value="userInfo.name"></input>
					</view>
				</view>
				<view class="cu-form-group text-bold">
					<view class="title"><text class="cuIcon-edit"></text>课程名 </text></view>
					<view class="text-center">
						<input type="text" v-model="coursename"></input>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title text-bold"><text class="cuIcon-edit"></text>学分 </view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:''}}
						</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-orange-1 round shadow-blur lg" @click="publishCourse()">创建课程</button>
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
				coursename: '',
				index: 0,
				picker: ['0.5', '1.0', '1.5', '2.0', '2.5', '3.0']
			}
		},
		methods: {
			// ...mapActions([])
			publishCourse() {
				console.log(this.coursename)
				console.log(this.picker[this.index])
				uni.$u.api.pubnewCourse(this.coursename, parseFloat(this.picker[this.index])).then(res => {
					uni.showToast({
						title: "课程创建成功!"
					})
				}).catch(res => {
					console.log(res)
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
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
		}
	}
</script>

<style>

</style>
