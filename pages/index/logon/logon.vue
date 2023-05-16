<template>
	<view>
		<view class="logon-content">
			<view class="logon-title">
				注册
			</view>
			<view class="user">
				<uni-icons class ="i1" type="person" color="#808080" size="25" ></uni-icons>
				<input type="text" placeholder="请输入帐号" :value="account" @input="clearInput" />
				<uni-icons class ="i2" type="closeempty" color="#808080" size="25" v-if="showClearIcon" @click="clearIcon"></uni-icons>
			</view>
			<view class="password">
				<uni-icons class ="i1" type="locked" color="#808080" size="25" ></uni-icons>
				<input type="eye-filled" placeholder="请输入密码"  v-model="passwordValue1" :password="showPassword" @input="isEyeIcon" />
				<uni-icons class ="i2" :type="iconType" color="#808080" size="25" v-if="showEyeIcon" @click="changePassword"></uni-icons>
			</view>	
			<view class="password">
				<uni-icons class ="i1" type="locked" color="#808080" size="25" ></uni-icons>
				<input type="eye-filled" placeholder="再次输入密码确认"  v-model="passwordValue2" :password="showPassword" @input="isEyeIcon"/>
				<uni-icons class ="i2" :type="iconType" color="#808080" size="25" v-if="showEyeIcon" @click="changePassword"></uni-icons>
			</view>	
			
			<view class="code-img-wrapper">
				<uni-icons class ="i1" type="checkbox" color="#808080" size="25" ></uni-icons>
				<input type="text" placeholder="请输入图形验证码" :value="validate" @input="clearInput1" />
				<canvas style="width:350rpx;height:86rpx;" canvas-id="canvas" @click="updateImageCode"></canvas>
			</view>
			<button class="logon-btn" @click="submit">确认</button>
			
		
		</view>
	</view>
</template>

<script>
	import { Mcaptcha  } from '@/src/utils/mcaptcha'
	export default {
		data() {
			return {
				account:"",
				passwordValue1:"",
				passwordValue2:"",
				showPassword: true, //是否显示密码
				showClearIcon: false, //是否显示清除按钮	
				validate:"",
				iconType:"eye-slash",
				showEyeIcon:false,
			}
		},
		onReady() {
			 this.mcaptcha = new Mcaptcha({
			     el: 'canvas',
			     width: 80,
			     height: 35,
			     createCodeImg: ""
			   });
		},
		methods: {
			// 刷新验证码
			updateImageCode() {
			  this.mcaptcha.refresh()
			},
			isEyeIcon:function(event){
				if (event.detail.value.length > 0) {
					this.showEyeIcon = true;
				} else {
					this.showEyeIcon = false;
				}
			},
			changePassword: function() {
				if(this.showPassword){
					this.iconType ="eye";
				}else{
					this.iconType = "eye-slash"
				}
				this.showPassword = !this.showPassword;
				
			},
			// 判断是否显示清除按钮
			clearInput: function(event) {
				this.account = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearInput1: function(event) {
				this.validate = event.detail.value;
			},
			// 清除内容/隐藏按钮
			clearIcon: function() {
				this.account = '';
				this.showClearIcon = false;
			},
			// 提交前校验图形验证码
			submit() {
				if(this.account == ""){
					return uni.showToast({ title: '请输入账号' })
				}
				if(this.passwordValue1=="" || this.passwordValue2=="" ){
					return uni.showToast({ title: '请输入密码' })
				}
				
				if(this.validate == ""){
					return uni.showToast({ title: '请输入图形验证码' })
				}
				 
				let valid = this.mcaptcha.validate(this.validate)
				if(!valid) {
					return uni.showToast({ title: '图形验证码错误' })
				}
				if(this.passwordValue1 != this.passwordValue2){
					return uni.showToast({ title: '两次密码输入不一致' })
				}
				uni.request({
					url: 'http://47.100.200.181:8000/logon', // 路径
					method: 'POST', // 请求方法
					
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					} ,
					data: {
						account: this.account,
						password: this.passwordValue1
					}, //发送的数据
					success: (res) => {
						
							//存储token
							if(res.data == 1){
								uni.showToast({
									title: '注册成功',
									icon: 'none'
								})
								setTimeout(uni.navigateTo({
									url:"/pages/index/login/login"
								}),100000,"")
								
							}
							else {
								uni.showToast({
									title: '注册失败，账户已存在',
									icon: 'none'
								})
							}
					}
				})
			  
			}
		}
	}
</script>

<style>
	.logon-content {
		padding: 70px 10px 35px;
		text-align: center;
		color: #333333;
		
	}
	.logon-title {
		font-size: 26px;
		font-weight: bold;
		margin-bottom: 31px;	
	}
	.user{
		display: flex;
		flex-direction: row;
		align-self: center;
	}
	.password{
		display: flex;
		flex-direction: row;
		
	}
	.i1{
		position: relative;
		top: 20rpx;
		
	}
	.i2 {
		position: relative;
		top: 20rpx;
		right: 30rpx;
	}
	.logon-content input {
		position: relative;
		height:100rpx;
		width: 800rpx;
		background: #F8F8F8;
		border-radius: 50rpx;
		text-align: left;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 15px;
		margin-left: auto;
		margin-right: auto;
	}
	.code-img-wrapper{
		display: flex;
		flex-direction: row;
	}
	.logon-btn {
		width: 400rpx;
		height: 60rpx;
		background: #00ff7f;
		border-radius: 36rpx;
		color: #fff;
		font-size: 45rpx;
		text-align: center;
		line-height: 60rpx;
		align-self: center;
		bottom: 60rpx;
		margin-top: 200rpx;
	}
</style>
