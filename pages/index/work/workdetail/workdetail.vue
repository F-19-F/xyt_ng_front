<template>
	<view>
		<!-- <u-sticky> -->
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">作业详情</view>
		</cu-custom>
		<!-- </u-sticky> -->
		<!-- <u--text type="info" :text="content" class="main"></u--text> -->
		<u-parse :content="defaulthtml" class="main" :selectable="true"></u-parse>
		<u--textarea v-model="answer" placeholder="请输入内容" count></u--textarea>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				content: '啦啦啦啦啦',
				title: '我是标题',
				answer: ''
			}
		},
		computed: {
			defaulthtml() {
				return `<h1>${this.title}</h1><p>${this.content}</p>`
			}
		},
		onLoad(options) {
			// console.log(options)
			this.$u.api.getWorkdetail(options.id).then(res => {
				this.content = res.content
				this.title = res.title

			})
		}
	}
</script>

<style scoped>
	.main {
		height: max-content;
	}
</style>
