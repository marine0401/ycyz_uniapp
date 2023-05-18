<template>
	
		<view>
			 
			<navigator  class = "first_page">基本环境参数</navigator>
			<view class="box4">
			<view class="box3">
		
				<view class= "box3_i1"><image class=icon src="../../static/温度.png">
				<text class= "box3_text1">{{temperature}}</text>
				</image></view>
				<view class= "box3_i1"><image class=icon src="../../static/酸值软测量.png"></image>
				<text class= "box3_text1">{{ph}}</text>
				</view>
		
				<view class= "box3_i1"><image class=icon src="../../static/溶氧.png"></image>
				<text class= "box3_text1">{{oxygen}}</text>
				</view>	
				
			</view>
			<view class="box3">
				
				<view class= "box3_i1">
				<text class= "box3_text2">温度( °C )</text>
				</view>
				<view class= "box3_i1">
				<text class= "box3_text2">酸   碱   度</text>
				</view>
					
				<view class= "box3_i1">
				<text class= "box3_text2">溶解氧(mg/L)</text>
				</view>	
				
			</view>
			</view>
			
			<view class="box1" @click="n1">
				<view class="icon1"><image class=icon src="../../static/走势.png"></image></view>
				<view class="i2">历史参数走势表</view>
			</view>
			
			<view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
						@scrolltolower="lower" @scroll="scroll">
					<view class="box2">
						<view class = "j1"><image class=icon src="../../static/高温报警.png"></image></view>
						<view class="j2">温度报警</view>
						<view class="j3"><switch></switch></view>
					</view>
					<view class="box1">
						<view class = "j1"><image class=icon src="../../static/上箭头.png"></image></view>
						<view class="j2" @click="alarm_set('hTemper','温度报警','高温预警值设定')" >高温报警设定</view>
						<view class="j3">{{hTemper}}°C</view>
					</view>
					<view class="box1">
						<view class = "j1"><image class=icon src="../../static/下箭头.png"></image></view>
						<view class="j2" @click="alarm_set('lTemper','温度报警','低温预警值设定')">低温报警设定</view>
						<view class="j3">{{lTemper}}°C</view>
					</view>
					<view class="box2">
						<view class = "j1"><image class=icon src="../../static/报警,警报,报警灯,危险.png"></image></view>
						<view class="j2" >PH数值报警</view>
						<view class="j3"><switch></switch></view>
					</view>
					<view class="box1">
						<view class = "j1"><image class=icon src="../../static/上箭头.png"></image></view>
						<view class="j2" @click="alarm_set('hPh','PH数值报警','高位预警值设定')">PH数值高位报警设定</view>
						<view class="j3">{{hPh}}</view>
					</view>
					<view class="box1">
						<view class = "j1"><image class=icon src="../../static/下箭头.png"></image></view>
						<view class="j2" @click="alarm_set('lPh','PH数值报警','低位预警值设定')">PH数值低位报警设定</view>
						<view class="j3">{{lPh}}</view>
					</view>
					
					<view class="box2">
						<view class = "j1"><image class=icon src="../../static/感叹号-圈.png"></image></view>
						<view class="j2">溶解氧浓度报警</view>
						<view class="j3"><switch></switch></view>
					</view>
					<view class="box1">
						<view class = "j1"><image class=icon src="../../static/上箭头.png"></image></view>
						<view class="j2" @click="alarm_set('hOxygen','溶解氧浓度报警','高位预警值设定')">溶解氧浓度高位报警设定</view>
						<view class="j3">{{hOxygen}}mg/L</view>
					</view>
					<view class="box1">
						<view class = "j1"><image class=icon src="../../static/下箭头.png"></image></view>
						<view class="j2" @click="alarm_set('lOxygen','溶解氧浓度报警','低位预警值设定')">溶解氧浓度低位报警设定</view>
						<view class="j3">{{lOxygen}}mg/L</view>
					</view>
					<view class="copyright_text" >
						<view class = "text1"><text>版权所属</text></view>
						<view class = "text1"><text>浙大宁波理工学院</text></view>
						<view class = "text1"><text>智能检测研究所</text></view>
					</view>
				</scroll-view>
			</view>
			
			
				
		</view>	
		
				
			
			
			
		
		
	
</template>

<script>
	
	import {
		g_id,
		g_ph,
		g_oxygen,
		g_temperature
	} from "../../m_Common/m_common.js"
	export default {
		
		data() {
			return {
				
				hTemper:0,
				lTemper:0,
				hPh:0,
				lPh:0,
				hOxygen:0,
				lOxygen:0,
				data:"",
				id:"",
				ph:"",
				temperature:"",
				oxygen:"",
				wh:'',
				show:false,
				scrollTop: 0,
				old: {
					scrollTop: 0,
				}
			}
		},
	
		onLoad() {
			this.hTemper=getApp().globalData._hTemper;
			this.lTemper=getApp().globalData._lTemper;
			this.hPh=getApp().globalData._hPh;
			this.lPh=getApp().globalData._lPh;
			this.hOxygen=getApp().globalData._hOxygen;
			this.lOxygen=getApp().globalData._lOxygen;
			getApp().watch(this.getTemperature,'g_temperature')
			getApp().watch(this.getId,'g_id')
			getApp().watch(this.getOxygen,'g_oxygen')
			getApp().watch(this.getPh,'g_ph')
		},
		
		methods: {
		    getTemperature(val){
		        this.temperature = val
		    },
			getId(val){
			    this.id = val
			},
			getPh(val){
			    this.ph = val
			},
			getOxygen(val){
			    this.oxygen = val
			},
			alarm_set(attribute,titletext,placeholdertext){
				var that = this
				uni.showModal({
					title: titletext,
					cancelColor: "#FF0606",
					placeholderText: placeholdertext,
					content: '',
					editable: true,
					success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						if(attribute == "hTemper"){
							that.hTemper = res.content;
							getApp().globalData._hTemper = res.content;
						}else if(attribute=="lTemper"){
							that.lTemper = res.content;
							getApp().globalData._lTemper = res.content;
						}else if(attribute == "hPh"){
							that.hPh = res.content;
							getApp().globalData._hPh = res.content;
						}else if(attribute == "lPh"){
							that.lPh = res.content
							getApp().globalData._lPh = res.content;
						}else if(attribute == "hOxygen"){
							that.hOxygen = res.content
							getApp().globalData._hOxygen = res.content;
						}else if(attribute == "lOxygen"){
							that.lOxygen = res.content
							getApp().globalData._lOxygen = res.content;
						}
						
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
					
				})
			},
			n1(){
				uni.navigateTo({
					url:"/pages/index/chart_xianxiang/chart_xianxiang"
				})
			},
			
			upper: function(e) {
							console.log(e)
							
						},
			lower: function(e) {
							console.log(e)
						},
			scroll: function(e) {
							console.log(e)
							this.old.scrollTop = e.detail.scrollTop
						},
			goTop: function(e) {
							// 解决view层不同步的问题
							this.scrollTop = this.old.scrollTop
							this.$nextTick(function() {
								this.scrollTop = 0
							});
							uni.showToast({
								icon: "none",
								title: "纵向滚动 scrollTop 值已被修改为 0"
							})
						},
		}
	}
</script>

<style>
	
	.first_page{
		width: 100%;
		height: 80rpx;
		background-color: aqua;
		line-height: 80rpx;
		text-align: center;
		
		
	}
	.box1{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
	}
	.box2{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		background-color: #c2fffd;
		margin-top: 5rpx;
	}
	.box3{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
	}
	.box4{
		width: 100%;
		height: 160rpx;
		background-color: azure;
		border-color: deepskyblue;
		border-style: solid;
		border-width: 1rpx;
		-moz-box-shadow: inset 0 0 20px #00ffff;
		-webkit-box-shadow: inset 0 0 20px #00ffff;
		box-shadow: inset 0 0 20px #aaffff;
	}
	.box3_i1{
		width:30%;
		height: 80rpx;
		line-height: 80rpx;
		margin-left: 3%;
		display: flex; 
		flex-direction: row;
		text-align: center;
		align-items: center;
		
	}
	.box3_text2{
		color: #af9a7a;
		font-weight: bold;
		line-height: 80rpx;
		font-size: 35rpx;
	}
	.box3_text1{
		color: black;
		font-size: 45rpx;
		line-height: 80rpx;
		font-weight: bold;
	}
	.scroll-Y {
			height: 720rpx;
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
	.j1{
		width:10%;
		height: 80rpx;
	}
	.j2{
		width: 70%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: left;
		margin-left: 30rpx;
	}
	.j3{
		width:20%;
		height: 80rpx;
		line-height: 70rpx;
		text-align: center;
		
	}
	.text1{
		height: 32rpx;
		width: 100%;
		text-align: center;
		line-height: 32rpx;
		font-size: 32rpx;
		
	}
	.copyright_text{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;
	}

	

	
</style>
