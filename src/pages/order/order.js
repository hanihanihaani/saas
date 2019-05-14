import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { ORDER_LIST,RE_BUY } from '@service/api'
import api from '@service/ask'
import { OrderItem } from '@components/order-item'
import orderLogo from '@assets/order-logo.png'
import './order.scss'

class Order extends Component {
	config = {
		navigationBarTitleText:'订单列表'
	}
	state = {
		page:1,
		orderList:[],
		loaded:true,
		aid:''
	}
	getOrderList () {
		let data = {
				page:this.state.page,
				aid:''
		}
		api.api(ORDER_LIST,data).then(res => {
				let list = this.state.orderList
				if (res.data.state == 0) {
					if (res.data.data.result) {
						if (res.data.data.result.length !== 0) {
							if (this.state.page == 1) {
								this.setState({
									orderList:res.data.data.result,
									aid:res.data.data.result[0].aid
								})
							} else {
								Taro.hideLoading()
								this.setState({
									orderList:list.concat(res.data.data.result),
									aid:res.data.data.result[0].aid
								})
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
		const { orderList, loaded, aid } = this.state
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
						? <OrderItem
								list={orderList}
								aid={aid}
							/>
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