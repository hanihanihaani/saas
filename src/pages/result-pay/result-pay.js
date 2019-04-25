import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import PaySuccess from './pay-success'
import PayFail from './pay-fail'
import './result-pay.scss'

class ResultPay extends Component {
	config = {
		navigationBarTitleText:'操作详情'
	}
	componentWillMount () {
		//获取支付结果。type:0：成功，1：失败.typeService:来自cpc或商机点.0:cpc,1:商机点,2:订单列表
		let type = this.$router.params.type
		let typeService = this.$router.params.typeService
		let id = this.$router.params.orderId
		if (typeService == 0) {
			this.setState({
				money:this.$router.params.money
			})
		} else if (typeService == 1) {
			this.setState({
				price:this.$router.params.price,
				num:this.$router.params.num
			})
		} else if (typeService == 2) {
			this.setState({id:id})
		}
		this.setState({
			type:type,
			typeService:typeService
		})
	}
	render () {
		const { type, typeService,id } = this.state
		let showPage
		if (type == 0) {
			showPage = <PaySuccess />
		} else if (type == 1) {
			showPage = <PayFail />
		}
		return (
			<View>
				<PayFail 
					typeService={typeService} 
					money={this.state.money} 
					num={this.state.num}  
					price={this.state.price}
					orderId={id}
				/>
			</View>
		)
	}
}
export default ResultPay