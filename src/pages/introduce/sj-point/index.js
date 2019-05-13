import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import topImg from '@pages/index/banner/assets/bann.png'
import iconImg1 from '../assets/icon1.png'
import iconImg2 from '../assets/icon2.png'
import './index.scss'

export default class SjPoint extends Component {
	jumpPoint () {
  	Taro.navigateTo({url:'/pages/purchase/purchase?type=1'})
	}
	render () {
		return (
			<View className='sj-point'>
				<View className='img-wrap'>
					<Image className='img' src={topImg} onClick={this.jumpPoint} />
				</View>
				<View className='title'>— 产品介绍 —</View>
				<View className='con-wrap'>
					<View className='title-wrap'>
						<Image className='img' src={iconImg1} />
						<Text className='con-title'>什么是商机</Text>
					</View>
					<View className='con'>
						商机：在马可波罗平台上，用户自主发布的求购信息，用户在自主询盘中同意转为求购的需求信息，以及马可波罗网的工作人员采集来的采购需求信息。统称为马可波罗平台的商机。
					</View>
				</View>
				<View className='con-wrap con-wrap2'>
					<View className='title-wrap'>
						<Image className='img' src={iconImg2} />
						<Text className='con-title'>什么是商机点</Text>
					</View>
					<View className='con'>
						商机点：由马可波罗网发行的一种虚拟货币，用于支付查看马可波罗网商机信息中的联系方式以及留言报价。
					</View>
				</View>
				<View className='now-purchase' onClick={this.jumpPoint}>立刻购买</View>
			</View>
		)
	}
}