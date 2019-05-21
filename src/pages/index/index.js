import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Nav from './nav'
import Banner from './banner'
import banner from './assets/qybb.png'
import './index.scss'
let Session = require('@utils/first-login/session')

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  onShareAppMessage(obj) {}
  render () {
    return (
      <View className="index">
        <View className='top-a'>
          <Image className='top-img' src={banner} />
        </View>
        <Nav />
        <Banner />
      </View>
    )
  }
}