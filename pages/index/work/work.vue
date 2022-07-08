<template>
	<view>
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">作业</view>
		</cu-custom>
		<u-cell-group>
			<view v-for="(item,index) in works" :key="index">
				<u-cell :title="item.title" :value="item.from" :label="item.deadline" :isLink="true"
					:url="toDetail(item.id)" center></u-cell>
			</view>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				works: [{
					title: "如何上天",
					from: "如何让刘灿上天",
					deadline: "截止时间"
				}]
			}
		},
		onLoad() {
			this.loadList()
		},
		methods: {
			toDetail(id) {
				return `/pages/index/work/workdetail/workdetail?id=${id}`
			},
			loadList() {
				this.$u.api.getWorks().then(res => {
					this.works = res
				})
			}
		}
	}
</script>

<style>

</style>
