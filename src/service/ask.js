import Taro from '@tarojs/taro'
let Session = require('@utils/first-login/session')

export default {
	api:function (url,data) {
		if (Session.get()) {
			return Taro.request({
				url:url,
				method:'POST',
				header:{'x-wx-skey':Session.get().skey},
				data:data
			})
		} else {
			Taro.navigateTo({url:'/pages/first-login/first-login'})
		}
	}
}