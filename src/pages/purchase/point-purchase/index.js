import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { POINT_BUY } from '@service/api'
import api from '@service/ask'
import './index.scss'
import checkImg from '@assets/check.png'

export default class PointPurchase extends Component {
  state = {
  	isSelect:10
  }
 	jumpProtocol () {
 		Taro.navigateTo({url:'/pages/protocol/protocol?type=1'})
 	}
 	selectMoney (key) {
 		if (key == '199') {
 			this.setState({
 				selectNum:200,
 				isSelect:199
 			})
 		} else if (key == '499') {
 			this.setState({
 				selectNum:600,
 				isSelect:499
 			})
 		}
 	}
 	pointBuy () {
 		let data = {
 				score_num:this.state.selectNum,
 				score_price:this.state.isSelect,
 				approach:7
 		}
 		api.api(POINT_BUY,data).then(res => {
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
 							Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=1&num=${that.state.selectNum}&price=${that.state.isSelect}`})
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
						className={`item ${isSelect === 199 ? 'active' : ''}`} 
						onClick={this.selectMoney.bind(this,'199')}
					>
						<View className='wrap'>商机点<Text className='blue'>200</Text>个</View>
						<View>售价199元</View>
					</View>
					<View 
						className={`item ${isSelect === 499 ? 'active' : ''}`}  
						onClick={this.selectMoney.bind(this,'499')}
					>
						<View className='wrap'>商机点<Text className='blue'>600</Text>个</View>
						<View>售价499元</View>
					</View>
				</View>
				<View className='purchase-now' onClick={this.pointBuy}>立即购买</View>
				<View className='protocol-wrap'> 
					<Image src={checkImg} className='check-img' />
					<Text>充值即表示你同意</Text>
					<Text className='protocol' onClick={this.jumpProtocol}>《商机和商机点的说明及使用方法》</Text>
				</View>
			</View>
		)
	}
}