
const mqtt = require('uni_modules/mqtt/dist/mqtt.min.js');

import {
	MQTT_IP,
	MQTT_OPTIONS
} from '@/mqttConfig.js';

import {v4} from 'uuid'
function connect(){	
		MQTT_OPTIONS.clientId = v4()
		var that = this
		var message
		var client 
		var data
		// #ifdef H5
		client = mqtt.connect('ws://' + MQTT_IP, MQTT_OPTIONS)
		console.log(MQTT_OPTIONS)
		// #endif
		// #ifdef MP-WEIXIN||APP-PLUS
		client = mqtt.connect('wx://' + MQTT_IP, MQTT_OPTIONS)
		// #endif
		client.on('connect', function() {
		console.log('连接成功')
		client.subscribe("/device/property", function(err) {
			if (!err) {
				console.log('订阅成功')
				}
			})
		}).on('reconnect', function(error) {
		console.log('正在重连...', "/device/property")
		}).on('error', function(error) {
				console.log('连接失败...', error)
		}).on('end', function() {
				console.log('连接断开')
		}).on('message', function(topic, message) {
				data = JSON.parse(message.toString())
				console.log(data)
				getApp().globalData.id= data.id
				getApp().globalData.g_ph = data.params.ph/100.0
				getApp().globalData.g_oxygen = data.params.oxygen/100.0
				getApp().globalData.g_temperature = data.params.temperature/10.0				
				console.log(getApp().globalData.g_temperature)
		})
}
//导出
module.exports = {
	connect,
	
}