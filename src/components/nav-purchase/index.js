import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class NavPurchase extends Component {
  static defaultProps = {
    list:[{
      name:'充值记录',
      id:1
    },{
      name:'变化记录',
      id:2
    },{
      name:'购买记录',
      id:3
    }],
  }
  state = {
    toggleFlag:0
  }
  toggleNav (key) {
    this.props.onShowWho(key)
    this.setState({
      toggleFlag:key
    })
  }
  render () {
    const { list } = this.props
    const { toggleFlag } = this.state 
    return (
      <View className='nav-purchase'>
        <View className='nav-purchase-wrap'>
        {
          list.map((nav,i) => {
            return  <Text 
                      className={`nav-item ${toggleFlag === i ? 'active' : ''}`} 
                      id={i} 
                      onClick={this.toggleNav.bind(this,i)} 
                      key={i}
                    >
                      {nav.name}
                    </Text>
          })
        }
        </View>
      </View>
    )
  }
}