export const MQTT_IP = '47.100.200.181:8083/mqtt'//mqtt地址端口
const MQTT_USERNAME = 'admin'//mqtt用户名
const MQTT_PASSWORD = 'sl707_'//密码
 
export const MQTT_OPTIONS = {
	
    connectTimeout: 5000,
    clientId:'',
	clean: false,
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    
}