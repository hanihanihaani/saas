import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { set as setGlobalData, get as getGlobalData } from '@utils/global_data.js'
import './per-data.scss'
let Session = require('@utils/first-login/session')

class PerData extends Component {
	config = {
    navigationBarTitleText: '个人资料'
	}
	render () {
		let info = getGlobalData('info')
		let avatarUrl = getGlobalData('avatarUrl')
		return (
			<View className='per-data'>
				<View className='user-top'>
					<View className='user-avatar'>
						<Image className='avatar-img' src={avatarUrl} />
					</View>
					<View className='user-con'>
						<View className='info-wrap'>
							<Text className='text'>{info.corpname}</Text>
						</View>
					</View>
				</View>
				<View className='item-wrap'>
					<View className='item'>
						<Text className='title'>联系电话</Text>
						<View className='input'>{info.username}</View>
					</View>
					<View className='item'>
						<Text className='title'>公司名称</Text>
						<View className='input'>{info.corpname}</View>
					</View>
					<View className='item'>
						<Text className='title'>联系地址</Text>
						<View className='input'>{info.province || '暂无'}{info.city || '暂无'}</View>
					</View>
				</View>
			</View>
		)
	}
}
export default PerData