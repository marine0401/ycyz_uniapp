<template>
	<view>
		<view class="box">
			<view class="b1"> 
				<picker @change="attribute_change" :range="attribute_array">
					<label>属性:</label>
					<label >{{attribute_array[attribute_index]}}</label>
				</picker>
			</view>
			<view class="b5">
				<picker @change="device_change" :range="device_array">
					<label>设备:</label>
					<label >{{device_array[device_index]}}</label>
				</picker>	
			</view>
		</view>
		
		<view class="charts-box">
		  <scroll-view scroll-x="true">
			<qiun-data-charts type="mix" :opts="opts" :chartData="chartsDataLine" />  
		  </scroll-view>
		  <!-- 这里的type="demotype"演示了自定义图表类型的demo，您可以根据需求自己定义一种额外的图表类型 -->
		  
		  <!-- 如果不定义"demotype"这个图表类型，可以通过传递opts来覆盖line下的默认配置，如下 -->
		  <!-- <qiun-data-charts type="line" :opts="{extra:{line:{type:'curve'}}}" :chartData="chartsData.Line2"/> -->
		</view>
		 
		<view class="box">
			
			<view :class="[ selected == 0 ? 'b4' : 'b2']">
				<picker @change="day_change" :range="day_array">
					<label>距今：</label>
					<label >{{day_array[day_index]}}</label>
					<label>天</label>
				</picker>	
			</view>
			<view :class="[ selected == 1 ? 'b4' : 'b2']" @click="b3">周平均</view>
			<view :class="[ selected == 2 ? 'b4' : 'b2']" @click="b4">月平均</view>
		</view>
		<view class="box1">
			<view class = "j1"><image class=icon src="../../../static/水温 (1).png"></image></view>
			<view class="j2" >{{text}}{{attribute}}最高数值</view>
			<view class="j3">{{max}}</view>
		</view>
		<view class="box1">
			<view class = "j1"><image class=icon src="../../../static/水温 (2).png"></image></view>
			<view class="j2" >{{text}}{{attribute}}最低数值</view>
			<view class="j3">{{min}}</view>
		</view>
		<view class="box1">
			<view class = "j1"><image class=icon src="../../../static/水温 (3).png"></image></view>
			<view class="j2" >{{text}}{{attribute}}平均数值</view>
			<view class="j3">{{average}}</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts.js';
	import{
		_hTemper,
		_lTemper,
		_hPh,
		_lPh,
		_hOxygen,
		_lOxygen,
	}from"@/global.js"
import { parse } from 'uuid';
	export default {
		data() {
			return {
				text:"24小时",
				average:0,
				max:0,
				min:0,
				selected:0,
				 opts : {
					xAxis: {
				        labelCount:5, //x轴显示的数量
						
				  },
				  yAxis:{
					showTitle:true,
					data:[
					 	{	
							
							titleFontSize:15,
							titleOffsetY:-5,
							titleOffsetX:160,
						}
					   ], 
					 
					   
				  },
				
				
				},
				chartsDataLine:{
						
						"categories": [],
						"series": [{
							"type":"line",
							"name": "温度",
							"data": [],
							"color":"#00aaff"
						},
							{
								"name": "异常点",
								
								"data": [],
								"type": "point",
								"color": "#f04864"
							}	
						],
						
					
				},
				attribute:"温度",
				devicename:"simulation",
				attribute_array:["温度","PH","溶解氧浓度"],
				attribute_index:0,
				device_array:["simulation","xianxiang"],
				device_index:0,
				day_array:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
				day_index:0,
				day_shift:0,
			}
		},
		onReady() {
			this.getdata(this.attribute,this.devicename,"day",this.day_shift)
		},
		methods: {
			setColor(value){
				if(value > 20){
					return "red";
				}
			},
			resolve(data){
				
				this.chartsDataLine["series"][0]["name"] = this.attribute
				var categories = [];
				var exception_categories = [];
				categories = JSON.parse(JSON.stringify(data.data.submission_date))
				this.chartsDataLine["categories"] = categories
				var value = [];
				var exception_value=[];
				
				value = JSON.parse(JSON.stringify(data.data.value))
				var temp = 0;
				var len = 0;

				for (let var1 in value) {
					temp = temp + value[var1]
					len = len + 1

 					if(this.attribute == "温度"){
						if(value[var1]> _hTemper | value[var1] < _lTemper){
							exception_value.push(value[var1])
						}else{
							exception_value.push(null)
						}
						
					}
					else if(this.attribute == "溶解氧浓度"){
						if(value[var1]> _hOxygen | value[var1] < _lOxygen){
							exception_value.push(value[var1])
						}else{
							exception_value.push(null)
						}
						
					}else if(this.attribute == "PH"){
						if(value[var1]> _hPh | value[var1] < _lPh){
							exception_value.push(value[var1])
						}else{
							exception_value.push(null)
						}
					}
					
				}
				this.average = parseFloat(temp/len).toFixed(1);
				this.max = Math.max(...value).toFixed(1);
				this.min = Math.min(...value).toFixed(1);
				
				this.chartsDataLine["series"][0]["data"]=value
				this.chartsDataLine["series"][1]["data"]=exception_value
			},
			getdata(attribute,devicename,interval,shift_day){
				if(interval == "day"){
					this.opts["yAxis"]["data"][0]["title"] = "24小时"+attribute+"走势图"
				}else if(interval == "week"){
					this.opts["yAxis"]["data"][0]["title"] = "最近一周"+attribute+"走势"
				}else if(interval == "month"){
					this.opts["yAxis"]["data"][0]["title"] = "最近30天"+attribute+"走势"
				}
				uni.request({
					url: 'http://47.100.200.181:8000/get_data', // 路径
					method: 'POST', // 请求方法
				
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					} ,
					data: {
						get_attribute: attribute,
						deviceName: devicename,
						time_interval: interval,
						day_shift:shift_day
					},
				
						success: (res) => {
							this.resolve(res)
						}
				
			})
		},
		b4(){
			this.text = "历史"
			this.selected = 2
			this.getdata(this.attribute,this.devicename,"month")
		},
		b3(){
			this.text = "历史"
			this.selected = 1
			this.getdata(this.attribute,this.devicename,"week")
		},
		attribute_change:function(e){
			this.text = "24小时"
			this.selected = 0
			this.attribute_index = e.target.value
			this.attribute=this.attribute_array[this.attribute_index]
			this.getdata(this.attribute,this.devicename,"day",this.day_shift)
		},
		device_change:function(e){
			this.text = "24小时"
			this.selected = 0
			this.device_index = e.target.value
			this.devicename=this.device_array[this.device_index]
			this.getdata(this.attribute,this.devicename,"day",this.day_shift)
		},
		day_change:function(e){
			this.text = "24小时"
			this.selected = 0
			this.day_index = e.target.value
			this.day_shift=this.day_array[this.day_index]
			this.getdata(this.attribute,this.devicename,"day",this.day_shift)
		}   
		
	}
}
</script>

<style>
	.charts-box{
		
		margin-top: 100rpx;
		margin-bottom: 5rpx;
	}
	.box{
		height: 100rpx;
		display: flex;
		flex-direction: row;
		background-color: aliceblue;
	}
	.box1{
		width: 100%;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		margin-top: 5rpx;
		margin-bottom: 5rpx;
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
	.b1{
		width: 50%;
		height: 100rpx;
		color: black;
		background-color: aqua;
		text-align: center;
		line-height: 100rpx;
		margin-right: 1rpx;
		
	}
	
	.b5{
		width: 50%;
		height: 100rpx;
		color: black;
		background-color: aqua;
		text-align: center;
		line-height: 100rpx;
	}
	
	.b4{
		width: 33%;
		height: 100rpx;
		color: black;
		line-height: 100rpx;
		background-color: skyblue;
		text-align: center;
		margin-right: 1rpx;
		margin-left: 1rpx;
	}
	.b2{
		width: 33%;
		line-height: 100rpx;
		height: 100rpx;
		color: black;
		background-color: grey;
		text-align: center;
		margin-right: 1rpx;
		margin-left: 1rpx;
		
	}
	.icon{
		width: 80rpx;
		height: 80rpx;
	}
	
</style>
