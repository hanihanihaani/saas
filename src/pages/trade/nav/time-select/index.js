import Taro, { Component } from '@tarojs/taro'
import { View,Text,Picker } from '@tarojs/components'
import './index.scss'

export default class TimeSelect extends Component {
	state = {
		startSel:'2018-12-12',
		endSel:'2019-12-22'
	}
	onStartChange (e) {
		this.setState({
			startSel:e.detail.value
		})
	}
	onEndChange (e) {
		this.setState({
			endSel:e.detail.value
		})
	}
	render () {
		const { startSel, endSel } = this.state
		return (
			<View className='time-wrap'>
				<View className='time-select' onClick={this.props.onShowTimes}></View>
				<View className='select-wrap'>
					<View className='select-con'>
						<View className='start'>
							<Text className='start-name'>起始</Text>
							<Picker mode='date' onChange={this.onStartChange}>
								<View>{this.state.startSel}</View>
							</Picker>
						</View>
						<Text className='zhi'>至</Text>
						<View className='end'>
							<Text className='end-name'>截止</Text>
							<Picker mode='date' onChange={this.onEndChange}>
								<View>{this.state.endSel}</View>
							</Picker>
						</View>
					</View>
					<Text 
						className='confirm' 
						onClick={() => {this.props.onShowTimes.bind(this);this.props.onDateSel(startSel,endSel)}}
					>确定</Text>
				</View>
			</View>
		)
	}
}