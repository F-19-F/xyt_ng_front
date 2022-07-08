<template>
	<view>
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">
				返回
			</view>
			<view slot="content">
				个人信息
			</view>
		</cu-custom>
		<view class='margin-bottom-sm margin-top-sm'>
			<view class="cu-list menu card-menu sm-border">
				<view class="cu-form-group">
					<view class="title">姓名</view>
					<input disabled="true" :value="userInfo.name"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">学号</view>
					<input disabled="true" :value="userInfo.num"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">专业</view>
					<input disabled="true" :value="userInfo.pfs"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">身份</view>
					<input disabled="true" :value="identity"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input type="number" v-model="userInfo.phone"></input>
					<text class="cuIcon-edit"></text>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-orange-1 round shadow-blur lg" @click="updateInfo()">修改信息</button>
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
			}
		},
		methods: {
			// ...mapActions([])
			updateInfo() {
				// console.log(this.userInfo)
				uni.$u.api.updateUserinfo(this.userInfo).then(res => {
					uni.showToast({
						title: "用户信息修改成功!"
					})
				}).catch(res => {
					uni.showToast({
						title: "用户信息修改失败!"
					})
				})
			}
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
