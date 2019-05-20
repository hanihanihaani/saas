import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image,Picker } from '@tarojs/components'
import util from '@utils/util.js'
import './index.scss'

export default class TongJiNav extends Component {
  static defaultProps = {
    showNav:false 
  }
  state = {
    toggleFlag:0,
    isShowDateModal:false,
    startSel:util.getFormatDates(),
		endSel:util.getFormatDate()
  }
  toggleNav (val) {
    this.setState({toggleFlag:val})
    if (val == 3) {
      this.showDateModal()
    } else {
      this.props.onChooseDay(val,'','')
    }
  }
  showDateModal () {
    this.setState({isShowDateModal:true})
  }
  hideDateModal () {
    this.setState({isShowDateModal:false})
  }
  hideDateModals () {
    this.setState({isShowDateModal:false})
    this.props.onChooseDay(3,this.state.startSel,this.state.endSel)
  }
  onStartChange (e) {
		this.setState({
			startSel:e.detail.value
		})
	}
	onEndChange (e) {
		this.setState({
			endSel:e.detail.value
		})
	}
  render () {
    const { isShowDateModal } = this.state
    const { showNav } = this.props
    return (
      <View className='tongji-nav'>
        <View className='time-nav'>
          <Text className={`item ${toggleFlag === 0 ? 'active' : ''}`} onClick={this.toggleNav.bind(this,0)}>昨日</Text>
          <Text className={`item ${toggleFlag === 1 ? 'active' : ''}`} onClick={this.toggleNav.bind(this,1)}>近7天</Text>
          <Text className={`item ${toggleFlag === 2 ? 'active' : ''}`} onClick={this.toggleNav.bind(this,2)}>近30天</Text>
          <Text className={`item ${toggleFlag === 3 ? 'active' : ''}`} onClick={this.toggleNav.bind(this,3)}>自定义</Text>
        </View>
        {
          showNav
          ? <View className='con-titles'>
              <Text className='title-item change'>变化</Text>
              <Text className='title-item xian'>现总量</Text>
              <Text className='title-item reason'>变化原因</Text>
              <Text className='title-item time'>时间</Text>
            </View>
          : <View className='con-title'>
              <Text className='title-item f'>点击（次）</Text>
              <Text className='title-item s'>消耗</Text>
              <Text className='title-item t'>平均点击价格</Text>
              <Text className='title-item fo'>日期</Text>
            </View>
        }
        {
          isShowDateModal 
          ? <View className='date-select-wrap'>
              <View className='mask' onClick={this.hideDateModal}></View>
              <View className='date-select'>
                <View className='select-con'>
                  <View className='start'>
                    <Text className='start-name'>起始</Text>
                    <Picker mode='date' onChange={this.onStartChange}>
                      <View className='d'>{this.state.startSel}</View>
                    </Picker>
                  </View>
                  <Text className='zhi'>至</Text>
                  <View className='end'>
                    <Text className='end-name'>截止</Text>
                    <Picker mode='date' onChange={this.onEndChange}>
                      <View className='d'>{this.state.endSel}</View>
                    </Picker>
                  </View>
                </View>
                <Text 
                  className='confirm'
                  onClick={this.hideDateModals}
                >确定</Text>
              </View>
            </View>
          : ''
        }
      </View>
    )
  }
}