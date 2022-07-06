<template>
	<view>
		<!-- <cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">
				返回
			</view>
			<view slot="content">
				登录
			</view>
		</cu-custom> -->
		<view class="margin padding-sm bg-white" style="border-radius:20rpx;">
			<view class="cu-card case no-card">
				<view class="cu-item shadow">
					<view class="image" style='padding:30rpx 30rpx;'>
						<image src="/static/swu.jpeg" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="margin padding-sm">
				<view class="cu-form-group text-right">
					<view class="title">账号</view>
					<input placeholder="学号/工号" v-model="form.username"></input>
					<text class="cuIcon-myfill text-blue"></text>
				</view>
				<view class="cu-form-group text-right">
					<view class="title">密码</view>
					<input placeholder="统一认证密码" type='password' v-model="form.password"></input>
					<text class="cuIcon-emojifill text-orange"></text>
				</view>
			</view>
			<view v-if="captcha_path" class="margin padding-sm">
				<view class="cu-form-group text-right">
					<image :src="captcha_path" style="width:72px;height:32px;" mode='aspectFit'></image>
					<input placeholder="验证码" v-model='captcha'></input>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-orange-1 round shadow-blur lg" open-type="getUserInfo"
					@click="login">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		req,
		rootUrl
	} from '../../utils/util.js'
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
				},
				cookies: "",
				captcha_path: "",
				captcha: '',
				showDialog: false,
				res: {}
			}
		},
		methods: {
			login() {
				if (!this.form.username || !this.form.password) {
					uni.showModal({
						content: "请输入账号或密码！",
						showCancel: false
					})

				} else {
					uni.$u.api.login(this.form.username, this.form.password).then(res => {
						uni.navigateBack({
							success: (res) => {
								console.log(res)
							}
						})
					});
				}
			}
		}
	}
</script>

<style>

</style>
