import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { CPC_BUY } from '@service/api'
import api from '@service/ask'
import './index.scss'
import checkImg from '@assets/check.png'

export default class CpcPurchase extends Component {
  state = {
  	isSelect:10
  }
 	selectMoney (key) {
 		if (key === 'three') {
 			this.setState({isSelect:3000})
 		} else if (key === 'five') {
 			this.setState({isSelect:5000})
 		} else if (key === 'six') {
 			this.setState({isSelect:6000})
 		}
 	}
 	jumpProtocol () {
 		Taro.navigateTo({url:'/pages/protocol/protocol?type=0'})
 	}
 	cpcBuy () {
 		let data = {
 				money:this.state.isSelect,
 				money_type:7
 		}
 		api.api(CPC_BUY,data).then(res => {
 				let that = this
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
 							Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=0&money=${that.state.isSelect}`})
 						}
 					})
 				} else {
 					Taro.showToast({title:res.data.msg,icon:'none'})
 				}
 			})
 	}
	render () {
		const { isSelect } = this.state
		return (
			<View className='cpc-purchase'>
				<View className='purchase-title'>购买金额</View>
				<View className='cpc-wrap'>
					<View 
						className={`item ${isSelect === 3000 ? 'active' : ''}`} 
						onClick={this.selectMoney.bind(this,'three')}
					>
						3000
					</View>
					<View 
						className={`item ${isSelect === 5000 ? 'active' : ''}`}
						onClick={this.selectMoney.bind(this,'five')}
					>
						5000
					</View>
					<View 
						className={`item ${isSelect === 6000 ? 'active' : ''}`} 
						onClick={this.selectMoney.bind(this,'six')}
					>
						6000
					</View>
				</View>
				<View className='purchase-now' onClick={this.cpcBuy}>立即购买</View>
				<View className='protocol-wrap'> 
					<Image src={checkImg} className='check-img' />
					<Text>充值即表示你同意</Text>
					<Text className='protocol' onClick={this.jumpProtocol}>《订单直通车产品用户服务协议》</Text>
				</View>
			</View>
		)
	}
}