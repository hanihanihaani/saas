import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image,Input } from '@tarojs/components'
import { AGENT_LIST } from '@service/api'
import api from '@service/ask'
import searchImg from '@assets/search.png'
import tenImg from '@assets/ten.png'
import './agent.scss'

let Session = require('@utils/first-login/session')

class Agent extends Component {
  state = {
  	agentList:[],
  	page:1,
  	sure:'',
  	roleType:'',
  }
  getAgentList (roleType,corpname) {
    let data = {
        page:this.state.page,
        role_type:roleType,
        corpname:corpname
    }
    api.api(AGENT_LIST,data).then((res) => {
  			if (res.data.state == 1) {
  				let agentArr = this.state.agentList
  				if (res.data.data.list.result !== 0) {
						Taro.hideLoading()
  					res.data.data.list.result.map((agent,i) => {
  						agentArr.push(agent)
  					})
  					this.setState({
  						agentList:agentArr,
  						agentMes:res.data.data
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
			this.getAgentList(this.state.roleType)
		},500)
  }
  onSure (key,e) {
  	this.setState({agentList:[]})
  	this.getAgentList(this.state.roleType,e.detail.value)
  }
  jumpCreate () {
		let roleType = this.state.roleType
		Taro.navigateTo({url:`/pages/agent/create-agent?roleType=${roleType}`})
  }
	jumpDetail (e) {
		let id = e.currentTarget.id
		Taro.navigateTo({url:`/pages/agent/agent-detail?id=${id}&pageType=${this.state.pageType}`})
  }
  componentWillMount () {
  	let page_type = this.$router.params.id
  	this.setState({
  		pageType:page_type
  	})
  	//判断是来自哪个页面,5:代理商管理，10：销售管理，1代理商，10：销售
  	if (page_type == 5) {
  		this.setState({
  			roleType:1
  		})
  	} else if (page_type == 6) {
  		this.setState({
  			roleType:10
  		})
  	}
  }
  componentDidShow () {
  	//判断用户角色
  	this.setState({
			roleTypes:Session.get().role_type,
			agentList:[]
  	})
  	this.getAgentList(this.state.roleType)
  	// 设置页面标题
  	if (this.state.roleType == 1) {
  		Taro.setNavigationBarTitle({title:'代理商管理'})
  	} else if (this.state.roleType == 10) {
  		Taro.setNavigationBarTitle({title:'员工管理'})
  	}
  }
	render () {
		const { roleTypes,agentList,roleType } = this.state
  	let placeholder
  	let roleLetter
  	if (roleType == 1) {
  		placeholder='搜索姓名'
 			roleLetter='创建代理商'
  	} else if (roleType == 10) {
  		placeholder='搜索姓名'
  		roleLetter='创建销售'
  	}
		return (
			<View className='agent'>
				<View className='ser-and-crea'>
					<View className='search-wrap all'>
						<Image src={searchImg} className='img s-img' />
						<Input 
							type='text' 
							placeholder={placeholder}  
							className='input' 
							onConfirm={this.onSure.bind(this,'sure')}
						/>
					</View>
					{
						roleTypes == 0 || roleTypes == 1
						? <View className='creat-agent all' onClick={this.jumpCreate}>
								<Image src={tenImg} className='img s-img' />
								{
									roleLetter
								}
							</View>
						: ''
					}
				</View>
				<View className='con-nav'>
					<Text className='name'>姓名</Text>
					<Text className='item area'>地点</Text>
					<Text className='phone'>电话</Text>
					<Text className='item time'>创建时间</Text>
				</View>
				{
					agentList.length !== 0
					? agentList.map((agent,i) => {
						return <View className='con-wrap' id={agent.corpid} key={i} onClick={this.jumpDetail}>
										<Text className='c'>{agent.corpname}</Text>
										<Text className='i'>{agent.city}</Text>
										<Text className='u'>{agent.username}</Text>
										<Text className='i'>{agent.createdate}</Text>
									</View>
						})
					: <View>
							<View className='no-agent'>没有更多的数据！</View>
							{
								roleType == 1
								? <View className='jumpCreate' onClick={this.jumpCreate}>创建代理商</View>
								: <View className='jumpCreate' onClick={this.jumpCreate}>创建销售</View>
							}
						</View>
				}
			</View>
		)
	}
}
export default Agent