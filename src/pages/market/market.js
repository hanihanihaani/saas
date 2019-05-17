import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import './market.scss'

class Market extends Component {
	config = {
    navigationBarTitleText: '服务超市',
  }
  jumpCpc () {
  	Taro.navigateTo({url:'/pages/introduce/introduce?type=0'})
  }
  jumpPoint () {
  	Taro.navigateTo({url:'/pages/introduce/introduce?type=1'})
	}
	jumpAcg () {
		Taro.navigateTo({url:'/pages/introduce/acg'})
	}
	render () {
		return (
			<View className='market'>
				<View className='title'>企业营销产品</View>
				<View className='btn-wrap'>
					<View className='btn' onClick={this.jumpCpc}>订单直通车</View>
					<View className='btn' onClick={this.jumpPoint}>商机点</View>
					<View className='btn' onClick={this.jumpAcg}>爱采购</View>
				</View>
				<View className='wran'>更多模式正在接入中</View>
			</View>
		)
	}
}
export default Market