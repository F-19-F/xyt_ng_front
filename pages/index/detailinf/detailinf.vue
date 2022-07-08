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
				<view class="cu-item">
					<view class="content">
						<text class="text-black">姓名</text>
					</view>
					<view class="action text-right" style="overflow:hidden;width:60vw;">
						<text class="text-black">{{userInfo.name}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black">学号</text>
					</view>
					<view class="action">
						<text class="text-black">{{userInfo.num}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black">专业</text>
					</view>
					<view class="action">
						<text class="text-black">{{userInfo.pfs}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black">身份</text>
					</view>
					<view class="action">
						<text class="text-black">{{identity}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black">手机号</text>
					</view>
					<view class="action">
						<text class="text-black">{{userInfo.phone}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-orange-1 round shadow-blur lg" open-type="getUserInfo">修改信息</button>
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

			}
		},
		methods: {
			// ...mapActions([])
		},
		computed: {
			...mapState(['userInfo']),
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
