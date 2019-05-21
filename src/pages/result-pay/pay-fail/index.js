import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { CPC_BUY,POINT_BUY,RE_BUY,BAIDU_BUY } from '@service/api'
import api from '@service/ask'
import waitImg from './assets/wait.png'
import './index.scss'

export default class PayFail extends Component {
	payCpc (id) {
		let data = {order_id:id}
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
 							// Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=0&orderId=${id}`})
 						}
 					})
 				} else {
 					Taro.showToast({title:res.data.msg,icon:'none'})
 				}
 			})
	}
	payCgt (id) {
		let data = {order_id:id}
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
 							// Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=3&orderId=${id}`})
 						}
 					})
 				} else {
 					Taro.showToast({title:res.data.msg,icon:'none'})
 				}
 			})
	}
	payPoint (id) {
		let data = {order_id:id}
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
 							// Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=1&orderId=${id}`})
 						}
 					})
 				} else {
 					Taro.showToast({title:res.data.msg,icon:'none'})
 				}
 			})
 	}
 	goPay (id) {
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
 							// Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&orderId=${id}`})
 						}
 					})
				} else {
					Taro.showToast({title:res.data.msg,icon:'none'})
				}
			}) 
	}
	componentDidMount () {
		//判断是来自cpc或商机点或采购通。0:cpc,1:商机点.2:订单列表，3:采购通
		this.setState({
			typeService:this.props.typeService,
		})
	}
	cancel () {
		let that = this
		Taro.showModal({
			title:'提示',
			content:'您确定要取消该订单吗',
			confirmColor:'#333',
		})
			.then(res => {
				if (res.confirm) {
					if (this.state.typeService == 0) {
						Taro.redirectTo({url:'/pages/purchase/purchase?type=0'})
					} else if (this.state.typeService == 1) {
						Taro.redirectTo({url:'/pages/purchase/purchase?type=1'})
					} else if (this.state.typeService == 2) {
						Taro.redirectTo({url:'/pages/order/order'})
					} else if (this.state.typeService == 3) {
						Taro.redirectTo({url:'/pages/purchase/purchase?type=2'})
					}
				}
			})
	}
	pay () {
		if (this.state.typeService == 0) {
			this.payCpc(this.props.orderId)
		} else if (this.state.typeService == 1) {
			this.payPoint(this.props.orderId)
		} else if (this.state.typeService == 2) {
			this.goPay(this.props.orderId)
		} else if (this.state.typeService == 3) {
			this.payCgt(this.props.orderId)
		}
	}
	render () {
		return (
			<View className='fail'>
				<Image src={waitImg} className='img' />
				<View className='btn-wrap'>
					<Text className='btn' onClick={this.pay}>立即支付</Text>
					<Text className='btn cancel' onClick={this.cancel}>取消订单</Text>
				</View>
			</View>
		)
	}
}
