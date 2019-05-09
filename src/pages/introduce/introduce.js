import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Cpc from './cpc'
import SjPoint from './sj-point'

class Introduce extends Component {
	config = {
    navigationBarTitleText: '服务超市',
  }
 	componentWillMount () {
 		let type = this.$router.params.type
 		this.setState({
 			type:type
 		})
	 }
	onShareAppMessage(obj) {}
	render () {
		const { type } = this.state
		let showPage
		if (type == 0) {
			showPage = <Cpc />
		} else if (type == 1) {
			showPage = <SjPoint />
		} 
		return (
			<View className='cpc'>
				{showPage}
			</View>
		)
	}
}
export default Introduce