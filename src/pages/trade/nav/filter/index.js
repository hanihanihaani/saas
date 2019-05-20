import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import './index.scss'
import filterImg from '@assets/filter-img.png'

export default class Filter extends Component {
	state = {
		isChoose:'',
		chooseWho:'a',
		filterCon:[{
			id:1,
			name:'已分配'
		},{
			id:2,
			name:'未分配'
		}],
	}
	componentDidMount () {
		this.setState({isChoose:this.props.choose})
		if (this.props.choose == 1) {
			this.setState({chooseWho:'un'})
		}
	}
	onChooseItem (e) {
		let id = e.currentTarget.id
		this.setState({
			isChoose:id,
		})
		if (id == 0) {
			this.setState({chooseWho:'a'})
		} else if (id == 1) {
			this.setState({chooseWho:'un'})
		}
	}
	filerDone () {
		this.props.onChooseWho(this.state.chooseWho)
		this.props.onAlreadyMatch(this.state.chooseWho)
	}
	render () {
		const { isChoose, filterCon } = this.state
		return (
			<View className='filter'>
				<View className='filter-mask' onClick={this.props.onShowFilters.bind(this)}></View>
				<View className='filter-con'>
					<View className='con-left'>
						<Text className='left-item'>筛选场景</Text>
					</View>
					<View className='con-right'>
					{
						filterCon.map((filter,i) => {
							return <View className='item-wrap' key={i}>
												{
													isChoose == i ? <Image src={filterImg} className='r-l' /> : ''
												}
												<Text 
													className={`right-item ${isChoose == i ? 'active' : ''}`} 
													id={i} 
													onClick={this.onChooseItem.bind(this)}
												>
													{filter.name}
												</Text>
											</View>
						})
					}
						<Text className='done' onClick={this.filerDone.bind(this)}>完成</Text>
					</View>
				</View>
			</View>
		)
	}
}