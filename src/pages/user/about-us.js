import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import aboutImg from '@assets/qybb.png'
import './about-us.scss'

class AboutUs extends Component {
	config = {
    navigationBarTitleText: '关于我们'
	}
	render () {
		return (
			<View className='about-us'>
				<View className='img-wrap'>
					<Image className='img' src={aboutImg} />
				</View>
				<View className='con-wrap'>
					<View className='title'>什么是企业帮帮</View>
					<View className='con'>
						企业帮帮是帮助中小企业更高效率的获取客户，全面利用AI技术对于全网的流量，用户进行画像分析，把客户需要的产品及服务推荐给客户。从而帮助企业更低成本，更加快速的获得客户，并且帮助企业在获取客户的过程中，协助企业进行销售及获取客户的过程管理，采用先进成熟技术构建而成的一款好用的SAAS产品。
					</View>
				</View>
				<View className='con-wrap'>
					<View className='title'>构建企业营销协同管理平台</View>
					<View className='con'>以标准化、集成化、AI智能化、移动化为发展方向，致力于打造企业低成本获客以及高效的客户管理系统，构建企业协同平台。</View>
				</View>
			</View>
		)
	}
}
export default AboutUs;