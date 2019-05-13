import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { NavPurchase } from '@components/nav-purchase'
import { CgtPurchaseList } from './cgt-purchase-list'
import './index.scss'

export default class Cgt extends Component {
  state = {
    navList:[{
      name:'充值记录',
      id:1
    },{
      name:'效果统计',
      id:2
    },{
      name:'购买记录',
      id:3
    }],
    showWho:0
  }
  onShowWho(val) {
    this.setState({showWho:val})
  }
  render () {
    const { navList, showWho } = this.state
    return (
      <View className='cgt-wrap'>
        <NavPurchase
          list={navList}
          onShowWho={this.onShowWho}
        />
        {
          showWho === 0 
          ? <CgtPurchaseList />
          : ''
        }
        {
          showWho === 1
          ? <View>效果统计</View>
          : ''
        }
        {
          showWho === 2 
          ? <View>购买记录</View>
          : ''
        }
      </View>
    )
  }
} 