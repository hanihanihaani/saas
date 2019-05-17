import Taro, { Component } from '@tarojs/taro'
import { View,Text,ScrollView } from '@tarojs/components'
import { TongJiNav } from '@components/tongji-nav'
import { RecordNoData } from '@components/record-no-data'
import api from '@service/ask'
import { BAIDU_CONSUME,CPC_CONSUME,POINT_CONSUME } from '@service/api'
import './index.scss'

export default class CpcData extends Component {
  static defaultProps = {
    cpcList:[]
  }
  state = {
    showDay:0
  }
  onChooseDay(val,startSel,endSel) {
    this.setState({showDay:val})
    this.props.onGetCpcTongji(val,startSel,endSel)
  }
  onScrollToLowers () {
    
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
  componentDidShow () {
   this.onGetCpcTongji() 
  }
  render () {
    const { cpcList } = this.props 
    return (
      <View className='acg-data'>
        <View className='cpc-box'>
          <TongJiNav 
            onChooseDay={this.onChooseDay}
          />
          <ScrollView
            scrollY
            onScrollToLower={this.onScrollToLowers}
          >
          {
            cpcList.length == 0
            ? <View className='no-data-box'>
                <RecordNoData />
                <View className='purchase' onClick={this.purchase}>点击购买</View>
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
      </View>
    )
  }
}