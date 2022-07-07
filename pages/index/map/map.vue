<template>
	<view>
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">校园地图</view>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav" :style="'width:100%;'" scroll-with-animation
			:scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item, index) in tabList"
				:key='index' @click="tabSelect(index)">
				{{item}}
			</view>
		</scroll-view>
		<map id="myMap" style="width: 100%;height:93vh;" :latitude="latitude" :longitude="longitude" :markers="markers"
			:include-points="markers" show-location='true' scale='18' bindmarkertap='getInfo' show-compass='true'>
		</map>
	</view>
</template>

<script>
	const locList = require('@/libs/locList.js')
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				latitude: 29.395969, //105.578956,29.395969
				longitude: 105.578956,
				markers: [],
				includepoints: [],

				TabCur: 0,

				scrollLeft: 0,
				tabList: ['宿舍楼', '食堂', '教学楼', 'ATM/快递', '校车站点'],
				tabName: ['ssl', 'st', 'jxl', 'atmkd', 'xczd'],
			};
		},
		created() {
			this.mapCtx = uni.createMapContext('myMap')
			this.markers = locList.ssl
		},
		methods: {
			tabSelect(index) {
				var temp = this.tabName[index]
				this.TabCur = index
				this.scrollLeft = (index - 1) * 60
				this.markers = locList[temp]
			},
			back: function() {
				uni.redirectTo({
					url: '/pages/index/index?PageCur=home',
					success: res => {
						console.log(res)
					},
					fail: err => {
						console.log(err)
					}
				})
			}
		},
		computed: {
			style() {
				let StatusBar = this.StatusBar;
				let CustomBar = this.CustomBar;
				let value = StatusBar + CustomBar
				let style = `height:${CustomBar}px;`;
				return style
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cu-custom {
		width: 100vw;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		// align-items: ;

		// 顶部左侧打开抽屉
		.cu-left {
			width: 25vw;
			display: flex;
			flex-direction: row;
			// justify-content: center;
			align-items: center;
			padding-left: 20rpx;
			position: relative;

			.left-text {
				position: absolute;
				bottom: 14rpx;
			}
		}

		.cu-center {
			width: 50vw;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			position: relative;

			.center-text {
				position: absolute;
				bottom: 14rpx;
			}
		}

		.cu-right {
			width: 25vw;
		}
	}
</style>
