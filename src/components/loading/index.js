import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Loading extends Component {
  render () {
    return (
      <View className='loading'>
        加载中...
      </View>
    )
  }
}