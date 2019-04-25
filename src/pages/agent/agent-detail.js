import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { AGENT_DETAIL } from '@service/api'
import api from '@service/ask'
import './agent-detail.scss'

class AgentDetail extends Component {
  state = {
  	list:{}
  }
  getDetailMes (corpid) {
    let data = {
        corpid:corpid
    }
    api.api(AGENT_DETAIL,data).then(res => {
  			if (res.data.state == 1) {
  				this.setState({
  					list:res.data.data.list
  				})
  			} else {
  				Taro.showToast({title:res.data.msg,icon:'none'})
  			}
  		})
  }
  componentWillMount () {
  	let id = this.$router.params.id
  	let pageType = this.$router.params.pageType
  	this.setState({
  		corpid:id,
  		pageType:pageType
		})
  	this.getDetailMes(id)
  }
  componentDidMount () {
  	// 设置页面标题
  	if (this.state.pageType == 5) {
  		Taro.setNavigationBarTitle({title:'代理商详情'})
  	} else if (this.state.pageType == 6) {
  		Taro.setNavigationBarTitle({title:'员工详情'})
  	}
	}
  onShareAppMessage(obj) {}
	render () {
		return (
			<View className='detail'>
				<View className='item'>姓名：{list.corpname}</View>
				<View className='item'>电话：{list.username}</View>
				<View className='item'>所在地点：{list.city}</View>
				<View className='item'>创建时间：{list.createdate}</View>
			</View>
		)
	}
}
export default AgentDetail