import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { NavPurchase } from '@components/nav-purchase'
import { TongJiNav } from '@components/tongji-nav'
import { RecordNoData } from '@components/record-no-data'
import api from '@service/ask'
import { BAIDU_CONSUME,CPC_CONSUME,POINT_CONSUME } from '@service/api'
import './data.scss'

class DataAll extends Component {
  config = {
    navigationBarTitleText: '数据统计'
  }
  state = {
    list:[{
      name:'爱采购',
      id:1
    },{
      name:'订单直通车',
      id:2
    },{
      name:'商机点',
      id:3
    }],
    pageCpc:1,
    pagePoint:1,
    pageAcg:1,
    cgtList:[],
    pointList:[],
    cpcList:[],
    showWho:0,
    startSel:'',
    endSel:''
  }
  onShowWho (val) {
    this.setState({showWho:val})
  }
  onChooseDay(val,startSel,endSel) {
    this.setState({
      showDay:val,
      startSel:startSel,
      endSel:endSel
    })
    if (this.state.showWho === 0) {
      this.onGetCgtTongji(val,startSel,endSel)
    } else if (this.state.showWho === 1) {
      this.onGetCpcTongji(val,startSel,endSel)
    } else if (this.state.showWho === 2) {
      this.onGetPointTongji(val,startSel,endSel)
    }
  }
  onGetCpcTongji (statType,startSel,endSel) {
    this.setState({cpcList:[]})
    let data = {
      stat_type:statType,
      page:this.state.pageCpc,
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
          // Taro.showToast({title:'没有更多了',icon:'none'})
        }
      }
    })
  }
  onScrollToLowerCpc () {
    let that = this
    Taro.showLoading({title:'加载中'})
    this.setState({
      pageCpc:this.state.pageCpc + 1
    },() => {
      this.onGetCpcTongji(that.state.showDay,that.state.startSel,that.state.endSel)
    })
  }
  onGetPointTongji (statType,startSel,endSel) {
    this.setState({pointList:[]})
    let data = {
      stat_type:statType,
      page:this.state.pagePoint,
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
          // Taro.showToast({title:'没有更多了',icon:'none'})
        }
      }
    })
  }
  onScrollToLowerPoint () {
    let that = this
    Taro.showLoading({title:'加载中'})
    this.setState({
      pageCpc:this.state.pagePoint + 1
    },() => {
      this.onGetPointTongji(that.state.showDay,that.state.startSel,that.state.endSel)
    })
  }
  onGetCgtTongji (statType,startSel,endSel) {
    this.setState({cgtList:[]})
    let data = {
      stat_type:statType,
      page:this.state.pageAcg,
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
          // Taro.showToast({title:'没有更多了',icon:'none'})
        }
      }
    })
  }
  onScrollToLowerAcg () {
    let that = this
    Taro.showLoading({title:'加载中'})
    this.setState({
      pageCpc:this.state.pageAcg + 1
    },() => {
      this.onGetCgtTongji(that.state.showDay,that.state.startSel,that.state.endSel)
    })
  }
  componentDidShow () {
    this.onGetCgtTongji(0,'','')
  }
  jumpDetail (e) {
    let id = e.currentTarget.id
    let sdate = this.state.cgtList[id].sdate
    Taro.navigateTo({url:`/pages/purchase/cgt-detail?sdate=${sdate}`})
  }
  purchase (val) {
    if (val === 0) {
      Taro.navigateTo({url:'/pages/purchase/purchase?type=2'})
    } else if (val === 1) {
      Taro.navigateTo({url:'/pages/purchase/purchase?type=0'})
    } else if (val === 2) {
      Taro.navigateTo({url:'/pages/purchase/purchase?type=1'})
    }
  }

  render () {
    const { list,showWho,cpcList,pointList,cgtList } = this.state
    return (
      <View className='data-all'>
        <NavPurchase
          list={list}
          onGetCgtTongji={this.onGetCgtTongji}
          onGetCpcTongji={this.onGetCpcTongji}
          onGetPointTongji={this.onGetPointTongji}
          onShowWho={this.onShowWho}
        />
        {
          showWho === 0
          ? <View className='tongji-wrap'>
              <TongJiNav
                onChooseDay={this.onChooseDay}
              />
              <ScrollView
                scrollY
                onScrollToLower={this.onScrollToLowerAcg}
              >
              {
                cgtList.length == 0
                ? <View className='no-data-box'>
                    <RecordNoData />
                    <View className='purchase' onClick={this.purchase.bind(this,0)}>点击购买</View>
                  </View>
                : cgtList.map((cgt,i) => {
                  return <View className='con' key={i} id={i} onClick={this.jumpDetail}>
                          <Text className='con-item f'>{cgt.hit_num}</Text>
                          <Text className='con-item s'>{cgt.consume}</Text>
                          <Text className='con-item t'>{cgt.per_hit_price}</Text>
                          <Text className='con-item fo'>{cgt.sdate}</Text>
                        </View>
                })
              }
              </ScrollView>
            </View>
          : ''
        }
        {
          showWho === 1
          ? <View className='cpc-box'>
              <TongJiNav 
                onChooseDay={this.onChooseDay}
              />
              <ScrollView
                scrollY
                onScrollToLower={this.onScrollToLowerCpc}
              >
              {
                cpcList.length == 0
                ? <View className='no-data-box'>
                    <RecordNoData />
                    <View className='purchase' onClick={this.purchase.bind(this,1)}>点击购买</View>
                  </View>
                : cpcList.map((cgt,i) => {
                    return <View className='con' key={i} id={i}>
                            <Text className='con-item f'>{cgt.hit_num}</Text>
                            <Text className='con-item s'>{cgt.consume}</Text>
                            <Text className='con-item t'>{cgt.per_hit_price}</Text>
                            <Text className='con-item fo'>{cgt.sdate}</Text>
                          </View>
                  })
              }
              </ScrollView>
            </View>
          : ''
        }
        {
          showWho === 2
          ? <View className='point-box'>
              <TongJiNav 
                onChooseDay={this.onChooseDay}
                showNav={true}
                onScrollToLower={this.onScrollToLowerPoint}
              />
              <ScrollView>
                {
                  pointList.length == 0
                  ? <View className='no-data-box'>
                      <RecordNoData />
                      <View className='purchase' onClick={this.purchase.bind(this,2)}>点击购买</View>
                    </View>
                  : pointList.map((point,i) => {
                      return <View className='con' key={i}>
                                <Text className='con-item f'>{point.used_score}</Text>
                                <Text className='con-item s'>{point.used_totle}</Text>
                                <Text className='con-item t'>{point.remake}</Text>
                                <Text className='con-item fo'>{point.createdate}</Text>
                              </View>
                  })
                }
              </ScrollView>
            </View>
          : ''
        }
      </View>
    )
  }
} 

export default DataAll