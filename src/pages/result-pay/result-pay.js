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
		//获取支付结果。type:0：成功，1：失败.typeService:来自cpc或商机点或者采购通.0:cpc,1:商机点,2:订单列表,3:采购通
		let type = this.$router.params.type
		let typeService = this.$router.params.typeService
		let id = this.$router.params.orderId
		if (typeService == 0) {
			this.setState({
				money:this.$router.params.money,
				id:id
			})
		} else if (typeService == 1) {
			this.setState({
				price:this.$router.params.price,
				num:this.$router.params.num,
				id:id
			})
		} else if (typeService == 2) {
			this.setState({id:id})
		} else if (typeService == 3) {
			this.setState({
				money:this.$router.params.money,
				id:id
			})
		}
		this.setState({
			type:type,
			typeService:typeService
		})
	}
	render () {
		const { type, typeService, id, money, num, price } = this.state
		let showPage
		if (type == 0) {
			showPage = <PaySuccess />
		} else if (type == 1) {
			showPage = <PayFail 
										typeService={typeService} 
										money={money} 
										num={num}  
										price={price}
										orderId={id}
									/>
		}
		return (
			<View>
				{showPage}
			</View>
		)
	}
}
export default ResultPay