import Taro, { Component } from '@tarojs/taro'
import { View,Text,Picker } from '@tarojs/components'
import { BUSINESS_ALREADY,BUSINESS_LIST } from '@service/api'
import api from '@service/ask'
import TimeSelect from './time-select'
import Filter from './filter'
import areaImg from '@assets/area.png'
import timeImg from '@assets/time.png'
import timesImg from '@assets/times.png'
import filterImg from '@assets/filter.png'
import filtersImg from '@assets/filters.png'
import './index.scss'

export default class Nav extends Component {
	static defaultProps = {
    sjMes: {}
  }
	config = {
    navigationBarTitleText: '商机'
	}
	state = {
		 isShowTime:false,
		 isShowFilter:false,
		 startSel:'',
		 endSel:'',
		 areaIndex:[0,0],
		 areaRange:[],
		 filterCon:'筛选',
		 page:1,
		 businessSj:[],
		 isChooseWho:0,
		 isFirstShow:1
	}
	onChange (e) {
		this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
	}
	onShowTimes () {
		this.setState({
			isShowFilter:false,
			isShowTime:!this.state.isShowTime,
		})
	}
	onShowFilters () {
		this.setState({
			isShowTime:false,
			isShowFilter:!this.state.isShowFilter,
		})
	}
	getMatchBusiness (url) {
		let data = {
			startdate:this.state.startSel,
			enddate:this.state.endSel,
			provinceid:this.state.chooseProvinceId,
			city:this.state.chooseCityId,
			page:1
		}
		api.api(url,data).then((res) => {
			if (res.data.state == 1) {
				this.props.onNewBusiness(res.data.data)
			} else {
				Taro.showToast({title:res.data.msg,icon:'none'})
			}
		})
	}
	getBusiness () {
		let data = {
			startdate:this.state.startSel,
			enddate:this.state.endSel,
			provinceid:this.state.chooseProvinceId,
			city:this.state.chooseCityId
		}
		api.api(BUSINESS_LIST,data).then((res) => {
			if (res.data.state == 1) {
				this.props.onRiqi(res.data.data,this.state.startSel,this.state.endSel)
				if (res.data.data.clue.result.length == 0) {
					Taro.showToast({title:'没有更多数据',icon:'none'})
				} 
			} else {
				Taro.showToast({title:res.data.msg,icon:'none'})
			}
		})
	}
	getAreaBusiness (chooseProvinceId,chooseCityId) {
		let data = {
				startdate:this.state.startSel,
				enddate:this.state.endSel,
				provinceid:chooseProvinceId,
				city:chooseCityId,
				page:this.state.page
		}
		api.api(BUSINESS_LIST,data).then((res) => {
			if (res.data.state == 1) {
				this.props.onArea(res.data.data,chooseProvinceId,chooseCityId)
				if (res.data.data.clue.result.length == 0) {
					Taro.showToast({title:'没有更多数据',icon:'none'})
				} 
			} else {
				Taro.showToast({title:res.data.msg,icon:'none'})
			}
		})
	}
	onChooseWho (val) {
		let c = this.state.filterCon
		if (val == 'a') {
			c = '已分配'
			this.getMatchBusiness(BUSINESS_ALREADY,1)
			this.props.onAlreadyMatch()
			this.setState({isChooseWho:0})
		} else if (val == 'un') {
			c = '未分配'
			this.setState({isChooseWho:1})
			this.getMatchBusiness(BUSINESS_LIST,1)
		}
		this.setState({
			filterCon:c,
			isShowFilter:false
		})
	} 
	onDateSel (start,end) {
		this.setState({
			startSel:start,
			endSel:end,
			isShowTime:false
		},() => this.getBusiness())
	}
	columnChange (e) {
		let chooseColumn = e.detail.column
		let areaRange = this.state.areaRange
		let chooseVal = e.detail.value
		let areaIndex = this.state.areaIndex
		let cityArray = this.state.cityArray
		if (chooseVal >= 1) {
			let cityChooseList = Object.values(cityArray[chooseVal-1])
			let cityChooseListId
			areaIndex[chooseColumn] = e.detail.value
			if (chooseColumn == 0) {
				cityChooseListId = Object.keys(cityArray[chooseVal-1])
				areaRange.pop()
				areaRange.push(cityChooseList)
				this.setState({
					areaRange:areaRange,
					cityChooseListId:cityChooseListId
				})
			}
			if (chooseColumn == 1) {
				cityChooseListId = Object.keys(cityArray[areaIndex[0]])
				this.setState({
					cityChooseListId:cityChooseListId
				})
			}
		} else if (chooseVal == 0) {
			areaRange.pop()
			areaRange.push(['全国'])
			this.setState({
				areaRange:areaRange,
				cityChooseListId:[]
			})
		}
	}
	onAreaChange (e) {
		if (this.state.cityChooseListId) {
			let chooseProvinceId = this.state.provinceListId[e.detail.value[0]-1]
			let chooseCityId = this.state.cityChooseListId[e.detail.value[1]]
			this.setState({
				areaIndex:e.detail.value,
				chooseProvinceId:chooseProvinceId,
				chooseCityId:chooseCityId,
			})
			this.getAreaBusiness(chooseProvinceId,chooseCityId)
		} else {
			this.getAreaBusiness('','')
		}
	}
	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.sjMes).length !== 0) {
			const provinceList = Object.values(nextProps.sjMes.province)
			const provinceListId = Object.keys(nextProps.sjMes.province)
			let cityArray = Object.values(nextProps.sjMes.city)
			// this.setState({areaRange:[]})
			if (this.state.areaRange.length !== 0) {
				if (this.state.areaRange[0][0] == '暂无') {
					this.setState({
						areaRange:[]
					})
				}
			}
			if (this.state.areaRange.length < 2) {
				let areaRange = this.state.areaRange
				provinceList.unshift('全国')
				areaRange.push(provinceList)
				areaRange.push(['全国'])
				// areaRange.push(cityChooseList)
				this.setState({
					provinceListId:provinceListId,
					cityArray:cityArray,
					areaRange:areaRange
				})
			}
		} else {
			this.setState({
				areaRange:[['暂无'],['暂无']]
			})
		}
	}
	render () {
		const { isShowTime, isShowFilter, areaIndex, areaRange, filterCon, isChooseWho } = this.state
		const { roleType } = this.props
		return (
			<View className='nav-wrap'>
				<View className='nav'>
				<View className={`item area ${roleType == '10' ? 'staff' : ''}`}>
						<Picker 
							mode='multiSelector' 
							value={areaIndex} 
							range={areaRange} 
							onColumnChange={this.columnChange}
							onChange={this.onAreaChange}
						>
						{
							areaRange[0][0] == '暂无'
							? <View>
									地点
									<Image src={areaImg} className='img' />
								</View>
							: <View>
									{areaRange[0][areaIndex[0]]}-{areaRange[1][areaIndex[1]]}
									<Image src={areaImg} className='img' />
								</View>
						}
						</Picker>
					</View>
					<View 
						className={`item time ${isShowTime ? 'active1' : null} ${roleType == '10' ? 'staff' : ''}`} 
						onClick={this.onShowTimes.bind(this)}
					>
						时间
						<Image src={ isShowTime ? timesImg : timeImg } className='img' />
					</View>
					{
						roleType !== '10'
						? <View 
								className={`item filter ${isShowFilter ? 'active' : null}`} 
								onClick={this.onShowFilters.bind(this)}
							>
								{filterCon}
								<Image src={ isShowFilter ? filtersImg : filterImg } className='img' />
							</View>
						: ''
					}
					
				</View>
				{
					isShowTime ? <TimeSelect 
													onShowTimes={this.onShowTimes} 
													onDateSel={this.onDateSel} 
												/> 
											: '' 
				}
				{
					isShowFilter ? <Filter 
														onShowFilters={this.onShowFilters}														
														onChooseWho={this.onChooseWho}
														onAlreadyMatch={this.props.onAlreadyMatch} 
														choose={isChooseWho}
													/> 
												: ''
				}
			</View>
		)
	}
}