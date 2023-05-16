<template>
	<view>
		<view class="box1" @click="n1">
			<view class="icon1"><image class=icon src="../../../static/logo.png"></image></view>
			<view class="i2">咸祥渔场</view>
		</view>
		<view class="box1" @click="n2">
			<view class="icon1"><image class=icon src="../../../static/logo.png"></image></view>
			<view class="i2">待开发</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			n1(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			},
			n2(){
				uni.navigateTo({
					url:"/pages/index/index1/index1"
				})
			}
			
		}
	}
</script>

<style>
	.box1{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
	}
	.icon{
		width: 80rpx;
		height: 80rpx;
	}
	.i1{
		width:10%;
		height: 80rpx;
	}
	.i2{
		width: 40%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;	
	}
</style>
