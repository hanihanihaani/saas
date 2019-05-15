import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { BAIDU_CONSUME_DETAIL } from '@service/api'
import api from '@service/ask' 
import './cgt-detail.scss'

class CgtDetail extends Component {
  config = {
    navigationBarTitleText: '效果统计'
  }
  state = {
    sdate:'',
    consumeDetailList:[]
  }
  getConsumeDetail () {
    let data = {
      sdate:this.state.sdate,
      page:1
    }
    api.api(BAIDU_CONSUME_DETAIL,data).then(res => {
      if (res.data.state == 1) {
        if (res.data.data.list.result.length !== 0) {
          let list = this.state.consumeDetailList
          this.setState({consumeDetailList:list.concat(res.data.data.list.result)})
        } else {
          Taro.showToast({title:'没有更多数据',icon:'none'})
        }
      }
    })
  }
  componentWillMount () {
    let sdate = this.$router.params.sdate
    this.setState({sdate:sdate})
  }
  componentDidShow () {
    this.getConsumeDetail()
  }
  render () {
    const { consumeDetailList } = this.state
    return (
      <View className='cgt-detail'>
        <View className='detail-nav'>
          <Text className='item'>产品标题</Text>
          <Text className='item'>搜索关键词</Text>
          <Text className='item'>IP地区</Text>
          <Text className='item'>访问时间</Text>
        </View>
        {
          consumeDetailList.map((detail,i) => {
            return <View className='detail-con' key={i}>
                    <Text className='con-item title'>{detail.title}</Text>
                    <Text className='con-item word'>{detail.word}</Text>
                    <Text className='con-item country'>{detail.country}</Text>
                    <Text className='con-item time'>{detail.click_time}</Text>
                  </View>
          })
        }
      </View>
    )
  }
}

export default CgtDetail