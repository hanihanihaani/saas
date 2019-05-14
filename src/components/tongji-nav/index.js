import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import './index.scss'

export default class TongJiNav extends Component {
  state = {
    toggleFlag:0
  }
  toggleNav (val) {
    this.setState({toggleFlag:val})
    this.props.onChooseDay(val)
  }
  render () {
    return (
      <View className='tongji-nav'>
        <View className='time-nav'>
          <Text className={`item ${toggleFlag === 0 ? 'active' : ''}`} onClick={this.toggleNav.bind(this,0)}>昨日</Text>
          <Text className={`item ${toggleFlag === 1 ? 'active' : ''}`} onClick={this.toggleNav.bind(this,1)}>近7天</Text>
          <Text className={`item ${toggleFlag === 2 ? 'active' : ''}`} onClick={this.toggleNav.bind(this,2)}>近30天</Text>
          <Text className='item'>自定义</Text>
        </View>
        <View className='con-title'>
          <Text className='title-item f'>点击（次）</Text>
          <Text className='title-item s'>消耗</Text>
          <Text className='title-item t'>平均点击价格</Text>
          <Text className='title-item fo'>日期</Text>
        </View>
      </View>
    )
  }
}