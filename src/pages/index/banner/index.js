import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import banner from './assets/banner.png'
import banner2 from './assets/bann.png'
import banner3 from './assets/banns.png'
import './index.scss'

export default class Banner extends Component {
	jumpIntroduce() {
		Taro.navigateTo({url:'/pages/introduce/introduce?type=0'})
	}
	jumpIntroduces() {
		Taro.navigateTo({url:'/pages/introduce/introduce?type=1'})
	}
	jumpAcg () {
		Taro.navigateTo({url:'/pages/introduce/acg'})
	}
	render () {
		return (
			<View className='index-banner'>
				<Swiper
					className='banner-swiper'
					circular
          autoplay
          indicatorDots
          indicatorColor='#fff'
          indicatorActiveColor='#a63533'
				>
				<SwiperItem className='swiper-item'>
						<Image className='swiper-img' src={banner3} onClick={this.jumpAcg} />
					</SwiperItem>
					<SwiperItem className='swiper-item'>
						<Image className='swiper-img' src={banner} onClick={this.jumpIntroduce} />
					</SwiperItem>
					<SwiperItem className='swiper-item'>
						<Image className='swiper-img' src={banner2} onClick={this.jumpIntroduces} />
					</SwiperItem>
				</Swiper>
			</View>
		)
	}
}