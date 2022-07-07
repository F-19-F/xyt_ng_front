<template>
	<view>
		<view class="top-container">
			<image src="@/static/bg_img/bg.png" mode="scaleToFill" class="top-bg"></image>
			<view class="info-container animation-slide-left" :style="style">
				<image :src="loginState?'/static/logo.jpg':'/static/logo.jpg'" class="wxavatar round solids"
					mode="scaleToFill"></image>
				<view class="info">
					<view>
						<text class="text-lg">{{ userInfo.name }}</text>
					</view>
					<view class="margin-top-xs">
						{{ loginState?userInfo.num:'未登录' }}
					</view>
				</view>
			</view>
		</view>
		<view class="margin-top-sm">
			<view class="cu-list menu card-menu sm-border">
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-myfill orange-1" style='font-size:20px;'></text>
						<text class="text-black">班级</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{loginState?userInfo.cls:'未登录'}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-emojifill orange-1" style='font-size:20px;'></text>
						<text class="text-black">专业</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{loginState?userInfo.pfs:'未登录'}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="margin-top-sm">
			<view class="cu-list menu card-menu sm-border">
				<view class="cu-item arrow" @click='about'>
					<view class="content">
						<text class="cuIcon-infofill orange-1" style='font-size:20px;'></text>
						<text class="text-black">关于</text>
					</view>
				</view>
				<view class="cu-item arrow" @click='logout'>
					<view class="content">
						<text class="cuIcon-settingsfill orange-1" style='font-size:20px;'></text>
						<text class="text-black">登录/切换账号</text>
					</view>
				</view>
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
		name: "mine",
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				year: new Date().getFullYear()
			}
		},
		computed: {
			style() {
				let StatusBar = this.StatusBar;
				let CustomBar = this.CustomBar;
				let style = `padding-top:${CustomBar}px;`;
				return style
			},
			...mapState(['loginState', 'userInfo'])
		},
		methods: {
			...mapActions(['userLogoutAction']),
			about() {
				uni.navigateTo({
					url: "../mine/about/about",
					fail: res => {
						console.log(res)
					}
				})
			},
			question: function() {

			},
			logout() {
				if (this.loginState) {
					uni.showModal({
						content: "是否切换账号？(此操作会清空信息缓存)",
						success: res => {
							if (res.confirm) {
								this.userLogoutAction()
								uni.navigateTo({
									url: "/pages/login/login"
								})
							}
						}
					})
				} else {
					uni.navigateTo({
						url: "/pages/login/login"
					})
				}
			},
		}
	}
</script>

<style lang="scss">
	.top-container {
		height: 350rpx;
		width: 100vw;
		position: relative;

		.top-bg {
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			z-index: -1;
			// mix-blend-mode: screen;
			height: 350rpx;
		}

		.info-container {
			width: 100vw;
			height: 350rpx;
			color: #fff;

			display: flex;
			flex-direction: row;
			// justify-content: center;
			align-items: center;

			z-index: 10;

			// 头像部分
			.wxavatar {
				width: 150rpx;
				height: 150rpx;
				margin-left: 100rpx;
				z-index: 10;
			}

			.info {
				margin-left: 50rpx;
			}
		}

		// 波浪
		.gif-wave {
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			z-index: 99;
			mix-blend-mode: screen;
			height: 100rpx;
		}

	}
</style>
