import Taro from '@tarojs/taro'
let Session = require('@utils/first-login/session')

export default {
	api:function (url,data) {
		return Taro.request({
			url:url,
			method:'POST',
			header:{'x-wx-skey':Session.get().skey},
			data:data
		})
	}
}