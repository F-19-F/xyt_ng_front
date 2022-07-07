<script>
	export default {
		methods: {
			dateMinus: function(whichDay) {
				var sdate = new Date(whichDay);
				var now = new Date();
				var days = now.getTime() - sdate.getTime();
				var day = parseInt(days / (1000 * 60 * 60 * 24));
				return day;
			},
			getDay: function() {
				var date = new Date();
				switch (date.getDay()) {
					case 0:
						return 7;
					default:
						return date.getDay()
				}
			},
			getYearArray: function() {
				let year_array = []
				let this_year = new Date().getFullYear()
				for (let i = this_year - 3; i < this_year + 1; i++) {
					let temp_year = parseInt(i) + '-' + parseInt(i + 1)
					year_array.push(temp_year)
				}
				year_array.push('全部学年')
				return year_array.reverse()
			},
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// 获取状态栏高度
					Vue.prototype.StatusBar = e.statusBarHeight;
					// 自定义顶栏的高度
					Vue.prototype.CustomBar = 70;
					// Vue.prototype.Custom = custom;
					// Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// console.log(e.statusBarHeight)
					// console.log(Vue.prototype.Custom)
					// console.log(Vue.prototype.CustomBar)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// 组件库依赖
	@import "uview-ui/index.scss";
	// colorui库
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* 引入动画 */
	@import "colorui/animation.css";
	@import "custom/color.css";

	/* 列表展示 */
	.list-container {
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0rpx 0rpx 10rpx rgba(26, 26, 26, 0.2);

		.list-head,
		.list-subitem {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.list-head,
		.list-item {
			padding: 10rpx;
		}
	}
</style>
