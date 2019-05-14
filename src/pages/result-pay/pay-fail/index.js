import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { CPC_BUY,POINT_BUY,RE_BUY,BAIDU_BUY } from '@service/api'
import api from '@service/ask'
import waitImg from './assets/wait.png'
import './index.scss'
import { toASCII } from 'punycode';

export default class PayFail extends Component {
	cancel () {
		Taro.showModal({
			title:'提示',
			content:'您确定要取消该订单吗',
			confirmColor:'#333',
		})
			.then(res => {
				if (res.confirm) {
					Taro.navigateBack({delta:1})
				}
			})
	}
	payCpc (money) {
		let data = {
			money:money,
 			money_type:7
		}
		api.api(CPC_BUY,data).then(res => {
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
 							Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=0&money=${money}`})
 						}
 					})
 				} else {
 					Taro.showToast({title:res.data.msg,icon:'none'})
 				}
 			})
	}
	payCgt (money) {
		let data = {
			money:parseInt(money),
			approach:7
		}
		api.api(BAIDU_BUY,data).then(res => {
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
 							Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=3&money=${money}`})
 						}
 					})
 				} else {
 					Taro.showToast({title:res.data.msg,icon:'none'})
 				}
 			})
	}
	payPoint (num,price) {
		let data = {
			score_num:num,
 			score_price:price,
 			approach:7
		}
		api.api(POINT_BUY,data).then(res => {
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
 							Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=1&num=${num}&price=${price}`})
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
 							Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&id=${id}`})
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
	pay () {
		if (this.state.typeService == 0) {
			this.payCpc(this.props.money)
		} else if (this.state.typeService == 1) {
			this.payPoint(this.props.num,this.props.price)
		} else if (this.state.typeService == 2) {
			this.goPay(this.props.orderId)
		} else if (this.state.typeService == 3) {
			this.payCgt(this.props.money)
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
