import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import arrowImg from '@assets/arrow.png'
import personImg from '@assets/person-account.png'
import modifyImg from '@assets/modify-pwd.png'
import './account.scss' 

class Account extends Component {
	config = {
    navigationBarTitleText: '帐号管理'
	}
	jumpSetPwd () {
		Taro.navigateTo({url:'/pages/set-pwd/set-pwd?type=1'})
	}
	jumpPerData () {
		Taro.navigateTo({url:'/pages/account/per-data'})
	}
	render () {
		return (
			<View className='account'>
				<View className='item item1' onClick={this.jumpPerData}>
					<Image className='imgs' src={personImg}/>
					<Text className='title'>个人资料</Text>
					<Image className='img' src={arrowImg} />
				</View>
				<View className='item'  onClick={this.jumpSetPwd}>
					<Image className='imgs pwd' src={modifyImg} />
					<Text className='title'>修改密码</Text>
					<Image className='img' src={arrowImg} />
				</View>
			</View>
		)
	}
}
export default Account;