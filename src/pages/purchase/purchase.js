import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import CpcPurchase from './cpc-purchase'
import PointPurchase from './point-purchase'
import Cgt from './cgt-purchase'
import './purchase.scss'

class Purchase extends Component {
  componentWillMount () {
  	let type = this.$router.params.type
  	this.setState({type:type})
  }
  componentDidMount () {
  	if (this.state.type == 0) {
  		Taro.setNavigationBarTitle({title:'订单直通车购买'})
  	} else if (this.state.type == 1) {
  		Taro.setNavigationBarTitle({title:'商机点购买'})
  	} else if (this.state.type == 2) {
  		Taro.setNavigationBarTitle({title:'采购通'})
		}
  }
	render () {
		const { type } = this.state
		let showPage
		if (type == 0) {
			showPage = <CpcPurchase />
		} else if (type == 1) {
			showPage = <PointPurchase />
		} else if (type == 2) {
			showPage = <Cgt />
		}
		return (
			<View className='cpc-purchase'>
				{showPage}
			</View>
		)
	}
}
export default Purchase