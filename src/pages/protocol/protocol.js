import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import ProtocolCpc from './protocol-cpc'
import PointProtocol from './point-protocol'
import './protocol.scss'

class Protocol extends Component {
  componentWillMount () {
  	let type = this.$router.params.type
  	this.setState({type:type})
  }
  componentDidMount () {
  	if (this.state.type == 0) {
  		Taro.setNavigationBarTitle({title:'订单直通车产品用户服务协议'})
  	} else if (this.state.type == 1) {
  		Taro.setNavigationBarTitle({title:'商机和商机点的说明及使用方法'})
  	}
  }
	render () {
		const { type } = this.state
		let showPage
		if (type == 0) {
			showPage = <ProtocolCpc  />
		} else if (type == 1) {
			showPage = <PointProtocol />
		}
		return (
			<View className='protocol'>
				{showPage}
			</View>
		)
	}
}
export default Protocol