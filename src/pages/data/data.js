import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { NavPurchase } from '@components/nav-purchase'
import api from '@service/ask'
import { BAIDU_CONSUME,CPC_CONSUME,POINT_CONSUME } from '@service/api'
import { AcgData } from './acg-data'
import { CpcData } from './cpc-data'
import { PointData } from './point-data'
import './data.scss'

class DataAll extends Component {
  config = {
    navigationBarTitleText: '数据统计'
  }
  state = {
    list:[{
      name:'订单直通车',
      id:1
    },{
      name:'商机点',
      id:2
    },{
      name:'爱采购',
      id:3
    }],
    page1:1,
    cgtList:[],
    pointList:[],
    cpcList:[],
    showWho:0
  }
  onShowWho (val) {
    this.setState({showWho:val})
  }
  onGetCgtTongji (statType,startSel,endSel) {
    this.setState({cgtList:[]})
    let data = {
      stat_type:statType,
      page:this.state.page1,
      start_day:startSel,
      end_day:endSel
    }
    api.api(BAIDU_CONSUME,data).then(res => {
      let list = this.state.cgtList
      if (res.data.state == 1) {
        Taro.hideLoading()
        this.setState({
          corpus_balance:res.data.data.corpus_balance,
        })
        if (res.data.data.list.result.length !== 0) {
          this.setState({
            cgtList:list.concat(res.data.data.list.result),
          })
        } else {
          Taro.showToast({title:'没有更多了',icon:'none'})
        }
      }
    })
  }
  onGetCpcTongji (statType,startSel,endSel) {
    this.setState({cpcList:[]})
    let data = {
      stat_type:statType,
      page:this.state.pageT,
      start_day:startSel,
      end_day:endSel
    }
    api.api(CPC_CONSUME,data).then(res => {
      let list = this.state.cpcList
      if (res.data.state == 1) {
				this.setState({
					corpus_balance:res.data.data.corpus_balance,
					rebate_balance:res.data.data.rebate_balance
				})
        if (res.data.data.list.result.length !== 0) {
					Taro.hideLoading()
          this.setState({
						cpcList:list.concat(res.data.data.list.result),
					})
        } else {
          Taro.showToast({title:'没有更多了',icon:'none'})
        }
      }
    })
  }
  onGetPointTongji (statType,startSel,endSel) {
    this.setState({pointList:[]})
    let data = {
      stat_type:statType,
      page:this.state.pageT,
      start_day:startSel,
      end_day:endSel
    }
    api.api(POINT_CONSUME,data).then(res => {
      let list = this.state.pointList
      if (res.data.state == 1) {
				this.setState({
					score:res.data.data.score
				})
        if (res.data.data.list.result.length !== 0) {
          this.setState({
						pointList:list.concat(res.data.data.list.result),
					})
        } else {
          Taro.showToast({title:'没有更多了',icon:'none'})
        }
      }
    })
  }
  componentDidShow () {
    // this.onGetCpcTongji()
  }
  render () {
    const { list,showWho } = this.state
    return (
      <View className='data-all'>
        <NavPurchase
          list={list}
          onGetCgtTongji={this.onGetCgtTongji}
          onGetPointTongji={this.onGetPointTongji}
          onShowWho={this.onShowWho}
        />
        {
          showWho === 0
          ? <CpcData
             onGetCpcTongji={this.onGetCpcTongji}
            />
          : ''
        }
        {
          showWho === 1
          ? <PointData />
          : ''
        }
        {
          showWho === 2
          ? <AcgData />
          : ''
        }
      </View>
    )
  }
} 

export default DataAll