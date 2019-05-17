import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import proIssue from './assets/pro_issue.png'
import sj from './assets/sj.png'
import xuanc from './assets/xuanc.png'
import market1 from './assets/market1.png'
import zhida from './assets/zhida.png'
import data from './assets/data.png'
import comment from './assets/comment.png'
import agentG from './assets/agent_g.png'
import custom from './assets/custom.png'
import yuang from './assets/yuang.png'
import './index.scss'

let Session = require('@utils/first-login/session')

const navList = [{
  id:1,
  img:sj,
  name:'商机分配'
},{
  id:2,
  img:xuanc,
  name:'企业宣传'
},{
  id:3,
  img:market1,
  name:'服务超市'
},{
  id:4,
  img:comment,
  name:'评价管理'
},{
  id:5,
  img:agentG,
  name:'代理商管理'
},{
  id:6,
  img:yuang,
  name:'员工管理'
},{
  id:7,
  img:data,
  name:'数据统计'
}]
export default class Nav extends Component {
  componentDidMount () {
    let roleType = Session.get().role_type
    this.setState({roleType:roleType})
  }
	jumpPage (id) {
		if (id == 1) {
			Taro.switchTab({url:'/pages/trade/trade'})
		} else if (id == 5) {
      Taro.navigateTo({url:'/pages/agent/agent?id=5'})
		} else if (id == 6) {
			Taro.navigateTo({url:'/pages/agent/agent?id=6'})
		} else if (id == 3) {
			Taro.navigateTo({url:'/pages/market/market'})
		} else if (id == 4) {
      Taro.navigateTo({url:'/pages/comment/comment'})
    } else if (id == 2) {
      Taro.navigateTo({url:'/pages/spread/spread'})
    } else if (id == 7) {
      Taro.navigateTo({url:'/pages/data/data'})
    }
	}
	render () {
    if (this.state.roleType == '1') {
      navList.splice(4,1)
    } else if (this.state.roleType == '10') {
      navList.splice(4,2)
      navList[0].name = '商机管理'
    }
		const navItem = navList.map((nav,i) => {
      return <View className='nav-item' key={i} onClick={this.jumpPage.bind(this,nav.id)}>
              <Image className='nav-img' src={nav.img} />
              <Text className='nav-name'>{nav.name}</Text>
        </View>
    })
		return (
			<View className='nav-wrap'>
        {navItem}
      </View>
		)
	}
}