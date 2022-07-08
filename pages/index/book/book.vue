<template>
	<view>
		<cu-custom bgColor="bg-blue-11" :isBack="true">
			<view slot="backText">
				返回
			</view>
			<view slot="content">
				馆藏信息
			</view>
		</cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" v-model="bookTitle" placeholder="请输入书籍名称" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-orange-1 shadow-blur round" @click="search">查询</button>
			</view>
		</view>
		<view class='margin-bottom-sm margin-top-sm' v-for="(item, index) in bookList" :key='index'
			@click="detail(item.book_recordId,item.book_title)">
			<view class="cu-list menu card-menu sm-border">
				<view class="cu-item">
					<view class="content">
						<text class="cuIcon-titles text-green"></text>
						<!-- book_title  book_author  book_publisher book_isbn -->
						<text v-if='item.book_onShelfCountI>0'
							class="text-bold text-green">{{item.book_title}}--可借</text>
						<text v-else class="text-bold text-grey">{{item.book_title}}--不可借</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black">作者</text>
					</view>
					<view class="action text-right" style="overflow:hidden;width:60vw;">
						<text class="text-black">{{item.book_author}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black">出版社</text>
					</view>
					<view class="action">
						<text class="text-black">{{item.book_publisher}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-black">isbn</text>
					</view>
					<view class="action">
						<text class="text-black">{{item.book_isbn}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示区域 -->
		<cu-empty :type="emptyType">
			<view slot="text" class="">
				<view class="margin-bottom-sm">{{emptyMsg}}</view>
			</view>
		</cu-empty>
		<view class='cu-tabbar-height'></view>
		<view class="cu-bar bg-white tabbar border shop" style='position:fixed;bottom:0;width:100%;'>
			<view v-if='pageIndex>1' class="bg-blue submit" @click="pageChange('last')">上一页</view>
			<view v-if='pageIndex<pageCount' class="bg-green submit" @click="pageChange('next')">下一页</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookTitle: '',
				bookList: [],
				pageCount: 0,
				pageIndex: 1,
				emptyType: "search",
				emptyMsg: "点击最上方按钮进行查询。",
			};
		},
		methods: {
			search: function() {
				if (!this.bookTitle) {
					wx.showModal({
						title: '提示',
						content: '请填写书名！',
						showCancel: false
					})
				} else {
					// <!-- book_title  book_author  book_publisher book_isbn -->
					this.bookList = [{
						book_title: '如何变骚',
						book_onShelfCountI: 1,
						book_author: '刘灿&袁成章',
						book_publisher: 'swu出版社',
						book_isbn: '6666'
					}]
					// 	this.$req('api/library/search/', 'post', {
					// 		book_title: this.bookTitle,
					// 		page: this.pageIndex
					// 	}, res => {
					// 		if (res.code == 20000) {
					// 			if (res.data.results.length) {
					// 				this.bookList = res.data.results
					// 				this.pageCount = res.data.count
					// 				this.emptyType = "success"
					// 				this.emptyMsg = "加载完成"
					// 			} else {
					// 				this.emptyType = "success"
					// 				this.emptyMsg = "未查询到信息"
					// 			}
					// 		} else {
					// 			this.emptyType = "error"
					// 			this.emptyMsg = res.msg
					// 		}
					// 	})
				}
			},
			detail: function(id, title) {
				uni.navigateTo({
					url: 'bookdetail/bookdetail?id=' + id + '&title=' + title
				})
			},
			pageChange: function(statu) {
				if (!this.bookList) {
					uni.showModal({
						title: '提示',
						content: '请搜索后再换页',
						showCancel: false
					})
				} else {
					if (statu === 'last') {
						this.pageIndex = this.pageIndex - 1
					} else {
						this.pageIndex = this.pageIndex + 1
					}
					this.search()
				}
			},
		},
	}
</script>

<style lang="scss">
</style>
