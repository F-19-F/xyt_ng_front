<template>
	<view>
		<!-- <u-sticky> -->
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">作业详情</view>
		</cu-custom>
		<!-- </u-sticky> -->
		<!-- <u--text type="info" :text="content" class="main"></u--text> -->
		<!-- <u-parse :content="defaulthtml" class="main" :selectable="true"></u-parse> -->
		<view class="solids-bottom padding-xs flex align-center">
			<!-- <view class="padding">18</view> -->
			<view class="flex-sub">
				<view class="solid-bottom text-xl padding text-center">
					<input v-if="create" v-model="title" placeholder="标题" />
					<text v-else class="text-black text-bold ">{{title}}</text>
				</view>
				<view class="padding" v-if="!create">
					<u-parse :content="content" class="main" :selectable="true"></u-parse>
				</view>
				<u--textarea v-model="answer" placeholder="请输入你的回答内容" count :disabled="submited||check"></u--textarea>
				<view class="text-center" v-if="!create">
					<button :disabled="submited||check" class="cu-btn bg-orange-1 shadow-blur round" @click="submit()">
						<view v-if="submited">
							已经提交
						</view>
						<view v-else>提交</view>

					</button>
				</view>
				<view class="text-center" v-else>
					<button class="cu-btn bg-orange-1 shadow-blur round" @click="submit()">
						<view>创建</view>

					</button>
				</view>

			</view>
		</view>


	</view>

</template>

<script>
	export default {
		data() {
			return {
				content: '',
				title: '',
				answer: '',
				id: '',
				submited: false,
				create: false,
				eduid: -1,
				check: false
			}
		},
		methods: {
			submit() {
				if (!this.create) {
					this.$u.api.submitAnswer(this.id, this.answer).then(res => {
						uni.showToast({
							title: "提交成功"
						})
						this.submited = true
					}).catch(res => {
						uni.showToast({
							title: res[0],
							icon: "error"
						})
					})
				} else {
					this.$u.api.createWork(this.eduid, this.title, this.answer).then(res => {
						uni.showToast({
							title: "创建成功"
						})
					}).catch(res => {
						uni.showToast({
							title: res[0],
							icon: "error"
						})
					})
				}
			}
		},
		computed: {
			defaulthtml() {
				return `<h1>${this.title}</h1><p>${this.content}</p>`
			}
		},
		onLoad(options) {
			// console.log(options)
			if (options.create) {
				this.create = true
				this.eduid = options.eduid
			} else {
				if (options.check) {
					this.check = true
				}
				this.$u.api.getWorkdetail(options.id).then(res => {
					this.content = res.content
					this.title = res.title
					this.id = options.id
				})
				this.$u.api.getMyansewerbywid(options.id).then(res => {
					if (res.count > 0) {
						this.answer = res.results[0].content
						this.submited = true
					}
					// console.log(this.submited + '')
				}).catch(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped>
	.main {
		height: max-content;
	}
</style>
