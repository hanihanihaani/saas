import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import acgImg from './assets/acg.jpg'
import baiduImg from './assets/badiCaig.png'
import './acg.scss'

export default class Acg extends Component {
  config = {
    navigationBarTitleText: '爱采购',
  }
  goPurchase() {
    Taro.navigateTo({url:'/pages/purchase/purchase?type=2'})
  }
  render () {
    return (
      <View className='acg-wrap'>
        <Image src={acgImg} className='acg-img' />
        <Text className='title'>马可波罗网基于百度爱采购结合马可波罗网自身平台优势，推出全新“采购通”产品!</Text>
        <Text className='buy-now' onClick={this.goPurchase}>立即购买</Text>
        <View className='baidu-con'>
          <Image src={baiduImg} className='baidu-logo' />
          <Text className='introduce'>“百度爱采购”介绍</Text>
          <Text className='introduce-con'>“百度爱采购”是在百度阿拉丁的基础上进行升级、整合</Text> 
          <Text className='introduce-con'>而成的百度搜索系列全新产品，它以满足用户体验为前提，</Text>
          <Text className='introduce-con'>将客户优质的产品和服务结构化信息前置，以图文特型样式在</Text>
          <Text className='introduce-con'>自然搜索结果页首页进行展示，让搜索更简单，让效果更直观。</Text>
        </View>
        <Text className='btn-buy' onClick={this.goPurchase}>立即购买</Text>
        <Text className='address'>地址：北京市海淀区学清路科技财富中心A座10层</Text>
        <View className='phone'><Text>电话：010-8285 5117</Text><Text className='r'>400-650-1997</Text></View>
      </View>
    )
  }
}