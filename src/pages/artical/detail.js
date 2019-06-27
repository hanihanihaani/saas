import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image,Button } from '@tarojs/components'
import { ARTICAL_DETAIL } from '@service/api'
import { Navigation } from '@components/nav'
import WxParse from '@utils/wxParse/wxParse'
import api from '@service/ask'
import './detail.scss'


class Detail extends Component {
  config = {
    navigationBarTitleText:'文章详情',
    navigationStyle:'custom'
  }
  state = {
    id:'',
    showBtn:''
  }
  componentDidMount () {
    let id = this.$router.params.id
    let showBtn = this.$router.params.showBtn
    let data = {id:id}
    this.setState({
      id:id,
      showBtn:showBtn
    })
    api.api(ARTICAL_DETAIL,data).then(res => {
      if (res.data.state == 0) {
        const article = res.data.data.content
        WxParse.wxParse('article','html',article,this.$scope,15)
        this.setState({
          artical:res.data.data
        })
      } else {
        Taro.showToast({title:res.data.msg,icon:'none'})
      }
    })
  }
  jumpModify () {
    let id = this.state.id
    Taro.navigateTo({url:`/pages/artical/artical?id=${id}`})
  }
  onShareAppMessage(res) {
    if (res.from === 'button') {
			let title = this.state.artical.title
			let imgUrl = this.state.artical.cover
			return {
				title:title,
				path:`/pages/artical/detail`,
				imageUrl:imgUrl
			}
		}
  }
  render () {
    const { artical,showBtn } = this.state
    const statusHeight = Taro.getSystemInfoSync().statusBarHeight
    let navHeight
    let isIos = Taro.getSystemInfoSync().system.indexOf('ios') > -1
    if (!isIos) {
      navHeight = 48
    } else {
      navHeight = 44
    }
    return (
      <View className='detail' style={{paddingTop:`${statusHeight + navHeight}Px`}}>
        <Navigation />
        <View className='detail-box'>
          <View className='title'>{artical.title}</View>
          <View className='author'>
            <Text>{artical.author}</Text>
            <Text className='time'>{artical.createtime}</Text>
          </View>
          <View className='parse-wrap'>
            <import src='../../utils/wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}' />
          </View>
        </View>
        {
          showBtn == 1
          ? <View className='btn-wrap'>
              <Text className='item modify' onClick={this.jumpModify}>返回修改</Text>
              <Button open-type='share' className='item issue'>立即发布</Button>
            </View>
          : ''
        }
      </View>
    )
  }
}
export default Detail