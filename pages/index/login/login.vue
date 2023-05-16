<template>
	<view class="login-content" >
		<view class="login-title">
			登录
		</view>
		
		<view class="account">
			<uni-icons class ="i1" type="person" color="#808080" size="25" ></uni-icons>
			<input type="text" placeholder="请输入帐号" color="white" :value="account" @input="clearInput" />
			<uni-icons class ="i2" type="closeempty" color="#808080" size="25" v-if="showClearIcon" @click="clearIcon"></uni-icons>
		</view>
		
		<view class="password" >
			<uni-icons class ="i1" type="locked" color="#808080" size="25" ></uni-icons>
			<!-- <input type="password" placeholder="输入密码" /> 要显示密码就不要设置type="password"-->
			<input placeholder="请输入密码" v-model="passwordValue" :password="showPassword" @input="isEyeIcon"/>
			<uni-icons class ="i2" :type="iconType" color="#808080" size="25"  v-if="showEyeIcon"  @click="changePassword"></uni-icons>
		</view>
		
		<button class="login-btn" @click="Login">登录</button>
		<button class="logon-btn" @click="logon">注册</button>
	
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				account: '', //账户号码
				passwordValue: '', //密码
				showPassword: true, //是否显示密码
				showClearIcon: false, //是否显示清除按钮	
				iconType:"eye-slash",
				showEyeIcon:false,
			}
		},
 
		methods: {
			// 显示隐藏密码
			isEyeIcon:function(event){
				if (event.detail.value.length > 0) {
					this.showEyeIcon = true;
				} else {
					this.showEyeIcon = false;
				}
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
				if(this.showPassword){
					this.iconType ="eye-slash";
				}else{
					this.iconType = "eye"
				}		
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
			// 清除内容/隐藏按钮
			clearIcon: function() {
				this.account = '';
				this.showClearIcon = false;
			},
			
			
			Login() {
				
				uni.request({
					url: 'http://47.100.200.181:8000/login', // 路径
					method: 'POST', // 请求方法
					
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					} ,
					data: {
						account: this.account,
						password: this.passwordValue
					}, //发送的数据
					success: (res) => {
						console.log(res.data)
						if (res.data > 0) {
							//存储token
							if(res.data == 1){
								uni.navigateTo({
									url:"/pages/index/index"
								})
							}
							else if(res.data ==2){
								uni.navigateTo({
									url:"/pages/index/index1/index1"
								})
							}
							else if(res.data == 10){
								uni.navigateTo({
									url:"/pages/index/Navigator/Navigator"
								})
							}
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '登录失败',
								icon: 'none'
							})
						}
					}
				})
			},
			
			logon(){
				uni.navigateTo({
					url:"/pages/index/logon/logon"
				})
			}
		
		}
	}
</script>
 
<style scoped>
	//#ifdef H5
		.login-content {
			padding: 70px 10px 35px;
			text-align: center;
			color: #333333;
			height: 1800rpx;
			background-image: url("https://img.tt98.com/d/file/pic/2019010912031455/5c35620f5d07c.jpg");
			background-size: cover;
			box-sizing: border-box;
			align-items: center;
		}
		 
		.login-title {
			font-size: 26px;
			font-weight: bold;
			margin-bottom: 31px;
			margin-top: 350rpx;
			
			color: black;
		}
		 
		.account{
			margin-left: 1400rpx;
			display: flex;
			flex-direction: row;
			
			border-bottom: black;
			width: 20%;
			border-color: black;
			border-style: solid;
			border-width: 1rpx;
			border-top: 0;
			border-right: 0;
			border-left: 0;
		},
		.password{
			margin-left: 1400rpx;
			
			display: flex;
			flex-direction: row;
			
			width: 20%;
			border-width: 2rpx;
			border-color: black;
			border-style: solid;
			border-width: 1rpx;
			border-top: 0;
			border-right: 0;
			border-left: 0;
		},
		
		.i1{
			position: relative;
			top: 20rpx;
			
		}
		.i2 {
			position: relative;
			top: 20rpx;
			right: 30rpx;
		}
		
		
		
		.password-btn {
			color: #ff8b33;
			font-size: 15px;
			text-align: right;
		}
		.logon-btn{
			width: 400rpx;
			height: 60rpx;
			background: #0055ff;
			border-radius: 36rpx;
			color: #fff;
			font-size: 45rpx;
			text-align: center;
			line-height: 60rpx;
			align-self: center;
			bottom: 60rpx;
			margin-top: 100rpx;
		}
		.login-content input {
			position: relative;
			height:100rpx;
			width: 800rpx;
			background-color: transparent;
			border-radius: 50rpx;
			text-align: left;
			padding: 30rpx;
			box-sizing: border-box;
			font-size: 15px;
			color: white;
			margin-left: auto;
			margin-right: auto;
		}
		.login-btn {
			width: 400rpx;
			height: 60rpx;
			background: #0055ff;
			border-radius: 36rpx;
			color: #fff;
			font-size: 45rpx;
			text-align: center;
			line-height: 60rpx;
			align-self: center;
			bottom: 60rpx;
			margin-top: 250rpx;
		}
		
	//#endif
//#ifdef MP-WEIXIN
.login-content {
		padding: 70px 10px 35px;
		text-align: center;
		color: #333333;
		height: 1280rpx;
		background-image: url("https://ts1.cn.mm.bing.net/th/id/R-C.6ef6b865d5315954ab33c47d0ac7e031?rik=M2VpFdjBpXMA1Q&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f0157955848b69ea801219c77902534.jpg%401280w_1l_2o_100sh.png&ehk=PLTRRxiQ94ZzpTNWxsERO43xyBZSaE79k7plB3rv6a0%3d&risl=&pid=ImgRaw&r=0");
		background-size: cover;
		box-sizing: border-box;
	}
 
	.login-title {
		font-size: 26px;
		font-weight: bold;
		margin-bottom: 31px;
		margin-top: 150rpx;
	}
 
	.account{
		align-self: center;
		display: flex;
		flex-direction: row;
		
		border-bottom: black;
		
		border-color: black;
		border-style: solid;
		border-width: 1rpx;
		border-top: 0;
		border-right: 0;
		border-left: 0;
		
	},
	.password{
		align-self: center;
		display: flex;
		flex-direction: row;
		border-width: 2rpx;
		border-color: black;
		border-style: solid;
		border-width: 1rpx;
		border-top: 0;
		border-right: 0;
		border-left: 0;
	},
	
	.i1{
		position: relative;
		top: 20rpx;
		
	}
	.i2 {
		position: relative;
		top: 20rpx;
		right: 30rpx;
	}
	
	

	.password-btn {
		color: #ff8b33;
		font-size: 15px;
		text-align: right;
	}
	.logon-btn{
		width: 400rpx;
		height: 60rpx;
		background: #0055ff;
		border-radius: 36rpx;
		color: #fff;
		font-size: 45rpx;
		text-align: center;
		line-height: 60rpx;
		align-self: center;
		bottom: 60rpx;
		margin-top: 100rpx;
	}
	.login-content input {
		position: relative;
		height:100rpx;
		width: 800rpx;
		background-color: transparent;
		
		border-radius: 50rpx;
		text-align: left;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 15px;
		margin-left: auto;
		margin-right: auto;
	}
	.login-btn {
		width: 400rpx;
		height: 60rpx;
		background: #0055ff;
		border-radius: 36rpx;
		color: #fff;
		font-size: 45rpx;
		text-align: center;
		line-height: 60rpx;
		align-self: center;
		bottom: 60rpx;
		margin-top: 250rpx;
	}
//#endif


</style>
