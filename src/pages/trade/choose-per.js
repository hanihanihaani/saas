import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image,ScrollView } from '@tarojs/components'
import { AGENT_LIST } from '@service/api'
import api from '@service/ask'
import { set as setGlobalData, get as getGlobalData } from '@utils/global_data.js'
import unChooseImg from '@assets/un-choose.png'
import chooseImg from '@assets/choose.png'
import './choose-per.scss' 

let Session = require('@utils/first-login/session')

class ChoosePer extends Component {
	config = {
    navigationBarTitleText: '选择分配人'
	}
	state = {
		isChoose:'',
		page:1,
		choosePerList:[]
	}
	componentDidMount () {
		this.setState({roleType:Session.get().role_type})
	}
	componentDidShow () {
		Taro.setStorageSync('choose',1)
		this.getAgentList()
	}
	selectPer (key,e) {
		this.setState({
			isChoose:key
		})
	}
	getAgentList () {
    let data = {
        page:this.state.page,
    }
    api.api(AGENT_LIST,data).then((res) => {
  			if (res.data.state == 1) {
  				let agentArr = this.state.choosePerList
  				if (res.data.data.list.result !== 0) {
						Taro.hideLoading()
  					res.data.data.list.result.map((agent,i) => {
  						agentArr.push(agent)
  					})
  					this.setState({
  						choosePerList:agentArr,
  					})
  				} else {
            Taro.showToast({url:'没有更多了',icon:'none'})
          }
  			} else {
  				Taro.showToast({title:res.data.msg,icon:'none'})
  			}
  		})
	}
	onReachBottom () {
		Taro.showLoading({title:'加载中...'})
		setTimeout(() => {
			this.setState({
				page:this.state.page+1,
			})
			this.getAgentList()
		},500)
  }
	onGetChoosePerId () {
		let toCorpId = ''
		let toCorpName = ''
		this.state.choosePerList.map((c,i) => {
			if (i == this.state.isChoose) {
				toCorpId = c.corpid
				toCorpName = c.corpname
			}
		})
		if (toCorpId) {
			Taro.navigateBack({delta:1})
			setGlobalData('toCorpName',toCorpName)
			setGlobalData('toCorpId',toCorpId)
		} else {
			Taro.showToast({title:'请选择要分配的人',icon:'none'})
		}
	}
	jumpCreate (e) {
		//id:1代理商，10:销售
		let id = e.currentTarget.id
		if (id == 1) {
			Taro.navigateTo({url:'/pages/agent/create-agent?roleType=1'})
		} else if (id == 10) {
			Taro.navigateTo({url:'/pages/agent/create-agent?roleType=10'})
		}
	}
	render () {
		const { choosePerList,isChoose,roleType } = this.state
		let  height = `${Taro.getSystemInfoSync().windowHeight-90}px`

		let perItem = choosePerList.map((per,i) => {
			return <View className='per-item' key={i} id={i} onClick={this.selectPer.bind(this,i)}>
							<View className='item choose-img'>
								<Image className='c-img' src={isChoose === i ? chooseImg : unChooseImg} />
							</View>
							<Text className='item name'>{per.corpname}</Text>
							<Text className='item area'>{per.city}</Text>
							<Text className='item phone'>{per.username}</Text>
						</View>
		})
		return (
			<View className='choose-per'>
				<ScrollView 
					scrollY 
					className='scroll-wrap' 
					style={{maxHeight:height}}
					onScrollToLower={this.onReachBottom}
				>
					{
						choosePerList.length == 0
						? <View className='no-data-wrap'>
								<View className='now-no'>暂时没有分配人！</View>
								<View className='no-data'>
								{
									roleType == 0
									? <View className='btn' id='1' onClick={this.jumpCreate}>创建代理商</View>
									: ''
								}
									<View className='btn' id='10' onClick={this.jumpCreate}>创建销售</View>
								</View>
							</View>
						: perItem
					}
				</ScrollView>
				{
					choosePerList.length !== 0
					? <View className='sure' onClick={this.onGetChoosePerId}>确定</View>
					: ''
				}
			</View>
		)
	}
}
export default ChoosePer