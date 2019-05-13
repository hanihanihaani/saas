import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import goIndexImg from '@assets/go-index.png'
import goBackImg from '@assets/go-back.png'

export default class Navigation extends Component {
  goBack() {
    Taro.navigateBack({delta:1})
  }
  goIndex() {
    Taro.switchTab({url:'/pages/index/index'})
  }
  render () {
    const statusHeight = Taro.getSystemInfoSync().statusBarHeight
    let navHeight
    let isIos = Taro.getSystemInfoSync().system.indexOf('ios') > -1
    if (!isIos) {
      navHeight = 48
    } else {
      navHeight = 44
    }
    return (
      <View className='navigation' style={{height:`${statusHeight + navHeight }Px`}}>
        <View style={{height:`${statusHeight}Px`}}></View>
        <View className='navigation-box'>
          <Image src={goBackImg} className='back img' onClick={this.goBack} />
          <Image src={goIndexImg} className='index img' onClick={this.goIndex} />
        </View>
      </View>
    )
  }
}