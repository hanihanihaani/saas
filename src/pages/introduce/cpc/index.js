import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import cpcImg from '@pages/index/banner/assets/banner.png' 
import one from '../assets/1.png'
import two from '../assets/2.png'
import three from '../assets/3.png'
import four from '../assets/4.png'
import five from '../assets/5.png'
import six from '../assets/6.png'
import seven from '../assets/7.png'
import eight from '../assets/8.png'
import './index.scss'

const navList = [{
	id:1,
	img:one,
	name:'商品竞价'
},{
	id:2,
	img:two,
	name:'专属标志'
},{
	id:3,
	img:three,
	name:'黄金展位'
},{
	id:4,
	img:four,
	name:'站外引流'
},{
	id:5,
	img:five,
	name:'优化排名'
},{
	id:6,
	img:six,
	name:'置顶推广'
},{
	id:7,
	img:seven,
	name:'精美模版'
},{
	id:8,
	img:eight,
	name:'专属顾问'
}]

export default class Cpc extends Component {
  jumpCpcPurchase () {
  	Taro.navigateTo({url:'/pages/purchase/purchase?type=0'})
  }
	render () {
		return (
			<View className='cpc'>
				<View className='img-wrap'>
					<Image className='cpc-img' src={cpcImg} onClick={this.jumpCpcPurchase} />
				</View>
				<View className='title'>— 产品优势 —</View>
				<View className='nav-wrap'>
				{
					navList.map((nav,i) => {
						return <View className='item-wrap' key={i}>
									<Image src={nav.img} className='nav-img' />
									<Text className='nav-title'>{nav.name}</Text>
							</View>
					})
				}
				</View>
				<View className='b-title'>置顶显示为免费，只为精准商机买单</View>
				<View className='btn-join' onClick={this.jumpCpcPurchase}>立即购买</View>
			</View>
		)
	}
}