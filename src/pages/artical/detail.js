import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
import { ARTICAL_DETAIL } from '@service/api'
import api from '@service/ask'
import './detail.scss'

class Detail extends Component {
  config = {
		navigationBarTitleText:'文章详情'
  }
  componentWillMount () {
    let id = this.$router.params.id
    console.log('id',id)
    let data = {id:id}
    api.api(ARTICAL_DETAIL,data).then(res => {
      if (res.data.state == 0) {
        this.setState({
          artical:res.data.data
        })
      } else {
        Taro.showToast({title:res.data.msg,icon:'none'})
      }
    })
  }
  onShareAppMessage(obj) {}
  render () {
    const { artical } = this.state
    return (
      <View className='detail'>
        <View className='title'>{artical.title}</View>
        <View className='author'>
          <Text>{artical.author}</Text>
          <Text className='time'>{artical.createtime}</Text>
        </View>
        <View><Image className='img' src={artical.cover} /></View>
        <View className='content'>{artical.content}</View>
      </View>
    )
  }
}
export default Detail