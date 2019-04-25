import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import successImg from './assets/success.png'
import './index.scss'

export default class PaySuccess extends Component {
	config = {
		navigationBarTitleText:'操作详情'
	}
	jumpIndex () {
		Taro.switchTab({url:'/pages/index/index'})
	}
	jumpOrder () {
		Taro.navigateTo({url:'/pages/order/order'})
	}
	render () {
		return (
			<View className='success'>
				<View className='top'>
					<Image src={successImg} className='img' />
					<View className='text'>支付成功</View>
				</View>
				<View className='bottom'>
					<Text className='btn' onClick={this.jumpOrder}>订单详情</Text>
					<Text className='btn' onClick={this.jumpIndex}>返回首页</Text>
				</View>
			</View>
		)
	}
}