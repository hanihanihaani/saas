import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { ORDER_LIST,RE_BUY } from '@service/api'
import api from '@service/ask'
import orderLogo from '@assets/order-logo.png'
import './order.scss'

class Order extends Component {
	config = {
		navigationBarTitleText:'订单列表'
	}
	state = {
		page:1,
		orderList:[],
		loaded:true
	}
	getOrderList () {
		let data = {
				page:this.state.page
		}
		api.api(ORDER_LIST,data).then(res => {
				let list = this.state.orderList
				if (res.data.state == 0) {
					if (res.data.data.result) {
						if (res.data.data.result.length !== 0) {
							if (this.state.page == 1) {
								this.setState({orderList:res.data.data.result})
							} else {
								Taro.hideLoading()
								this.setState({orderList:list.concat(res.data.data.result)})
							}
						}
					}else {
						Taro.showToast({title:'没有更多了',icon:'none'})
					}
				}
			})
	}
	componentDidShow () {
		this.setState({orderList:[]})
		this.getOrderList()
		setTimeout(() => {
			this.setState({loaded:false})
		},500)
	}
	goPay (e) {
		let index = e.currentTarget.id
		let id = this.state.orderList[index].id
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
	onReachBottom () {
		Taro.showLoading({title:'加载中...'})
		setTimeout(() => {
			this.setState({
				page:this.state.page + 1
			}, () => {
				this.getOrderList()
			})
		},500)
	}
	jumpMarket () {
		Taro.navigateTo({url:'/pages/market/market'})
	}
	render () {
		const { orderList, loaded } = this.state
		const list = orderList.map((order,i) => {
						return <View className='wrap-item' key={i}>
										<View className='top-wrap'>
											<View className='l'>
												<Image src={orderLogo} className='img' />
												<Text className='text'>推广服务</Text>
											</View>
											<View className='r'>{order.pay_str}</View>
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
		return (
			<View className='order'>
				<View className='nav-wrap'>
					<View className='item'>全部订单</View>
				</View>
				<View className='list'>
				{
					loaded 
					? <View className='loaded'>加载中...</View>
					: orderList.length !== 0
						? list
						: <View className='no-order'>
								<View className='no-order-text'>您还没有订单</View>
								<View className='go-order' onClick={this.jumpMarket}>去下单</View>
							</View>
				}
				</View>
			</View>
		)
	}
}
export default Order