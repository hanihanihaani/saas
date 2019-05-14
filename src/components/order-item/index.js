import Taro, { Component, showTabBar } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import api from '@service/ask'
import { RE_BUY } from '@service/api'
import './index.scss'
import orderLogo from '@assets/order-logo.png'


export default class OrderItem extends Component {
  static defaultProps = {
    list:[],
    aid:''
  }
  goPay (e) {
		let index = e.currentTarget.id
		let id = this.props.list[index].id
		let data = {
			order_id:id
		}
		api.api(RE_BUY,data).then(res => {
				if (res.data.state == 0) {
					Taro.requestPayment({
 						timeStamp:res.data.data.timeStamp,
 						nonceStr:res.data.data.nonceStr,
 						package:res.data.data.package,
 						signType:res.data.data.signType,
 						paySign:res.data.data.paySign,
 						success(res) {
 							Taro.navigateTo({url:'/pages/result-pay/result-pay?type=0'})
 						},
 						fail(res) {
 							Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=2&orderId=${id}`})
 						}
 					})
				} else {
					Taro.showToast({title:res.data.msg,icon:'none'})
				}
			}) 
	}
  render () {
    const { list,aid } = this.props
    let showText
    if (aid == '10078') {
      showText = <Text className='text'>采购通</Text>
    } else if (aid == '1022') {
      showText = <Text className='text'>商机点</Text>
    } else if (aid == '10062') {
      showText = <Text className='text'>CPC</Text>
    }
    return (
      <View className='order-item'>
      {
        list.map((order,i) => {
          return<View className='wrap-item' key={i}>
                  <View className='top-wrap'>
                    <View className='l'>
                      <Image src={orderLogo} className='img' />
                      {showText}
                    </View>
                    <View className='r'>{order.pay_str} </View>
                  </View>
                  <View className='m-wrap'>
                    <Text className='type'>{order.title}</Text>
                    <Text className='price'>￥{order.req_consume}</Text>
                  </View>
                  <View className='b-wrap'>
                    <View className='time'>下单时间：{order.create_time}</View>
                    {order.pay_str == '未支付' ? <View id={i} className='go-pay' onClick={this.goPay}>去支付</View> : ''}
                  </View>
                </View>
        })
      }
      </View>
    )
  }
}
