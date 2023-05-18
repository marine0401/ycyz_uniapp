<script>
	import 'mqttConfig.js'
	import common from "m_Common/m_common.js"
	export default {
		
		onLaunch: function() {
			console.log('App Launch')
			common.connect()
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		globalData:{
			_hTemper : 40,
			_lTemper : 10,
			_hPh : 8,
			_lPh : 5,
			_hOxygen : 10,
			_lOxygen : 8,
			g_id:0,
			g_ph:0,
			g_oxygen:0,
			g_temperature:0
		},
		methods:{
			watch:function(method,istr){
			                var obj=this.globalData
			                console.log(obj)
			                Object.defineProperty(obj,istr,{
			                configurable:true,
			                enumerable:true,
			                set:function(value){
			                    this._consumerGoodsStatus=value
			                    method(value)
			                },
			                get:function(value){
			                            return this._consumerGoodsStatus
			                        }
			                    })
			                }
		}
		
		    
	}
</script>

<style>
	/*每个页面公共css */
</style>
