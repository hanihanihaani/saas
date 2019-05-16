import Taro, { Component, showTabBar } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import './index.scss'

export default class RecordNoData extends Component {
  render () {
    return (
      <View className='record-no-data'>
        <View>您还没有数据！</View>
        <View className='connect'>如果想要推广您的产品，或者有任何疑问，</View>
        <View>请拨打电话<Text className='phone'>4006501997</Text></View>
      </View>
    )
  }
}