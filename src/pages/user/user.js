import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { PERSON_INFO } from '@service/api'
import api from '@service/ask'
import { set as setGlobalData, get as getGlobalData } from '@utils/global_data.js'
import phoneImg from './assets/phone.png'
import companyImg from './assets/company.png'
import arrowImg from '@assets/arrow.png'
import setImg from './assets/setting.png'
import orderImg from './assets/order.png'
import aboutImg from './assets/about.png'
import './user.scss'
let Session = require('@utils/first-login/session')

class User extends Component {
	config = {
    navigationBarTitleText: '用户中心'
	}
	state = {
		page:1
	}
	jumpAboutUs () {
		Taro.navigateTo({url:'/pages/user/about-us'})
	}
	jumpAccount () {
		Taro.navigateTo({url:'/pages/account/account'})
	}
	jumpPerData () {
		Taro.navigateTo({url:'/pages/account/per-data'})
	}
	jumpOrder () {
		Taro.navigateTo({url:'/pages/order/order'})
	}
	getPersonInfo () {
		api.api(PERSON_INFO).then(res => {
				if (res.data.state == 1) {
					setGlobalData('info',res.data.data.info)
					setGlobalData('avatarUrl',res.data.data.avatarUrl)
					this.setState({
						info:res.data.data.info,
						avatarUrl:res.data.data.avatarUrl
					})
				}
			})
	}
	componentDidShow () {
		this.getPersonInfo()
	}
  onShareAppMessage(obj) {}
	render () {
		const { info, avatarUrl } = this.state
		return (
			<View className='user'>
				<View className='user-top' onClick={this.jumpPerData}>
					<View className='user-avatar'>
						<Image className='avatar-img' src={avatarUrl} />
					</View>
					<View className='user-con'>
						<View className='info-wrap'>
							<Image className='img' src={companyImg} />
							<Text className='text'>{info.corpname}</Text>
						</View>
						<View className='info-wrap wrap2'>
							<Image className='img img-phone' src={phoneImg} />
							<Text className='text'>{info.username}</Text>
						</View>
					</View>
					<View>
						<Image src={arrowImg} className='arrow-img' />
					</View>
				</View>
				<View className='item-wrap'>
					<View className='item' onClick={this.jumpAccount}>
						<Image className='imgs' src={setImg} />
						<Text className='title'>帐号管理</Text>
						<Image className='img' src={arrowImg} />
					</View>
					<View className='item' onClick={this.jumpAboutUs}>
						<Image className='imgs' src={aboutImg} />
						<Text className='title'>关于我们</Text>
						<Image className='img' src={arrowImg} />
					</View>
					<View className='item' onClick={this.jumpOrder}>
						<Image className='imgs' src={orderImg} />
						<Text className='title'>我的订单</Text>
						<Image className='img' src={arrowImg} />
					</View>
				</View>
			</View>
		)
	}
}
export default User