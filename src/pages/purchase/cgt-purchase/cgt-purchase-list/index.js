import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import { BAIDU_BUY } from '@service/api'
import api from '@service/ask'
import './index.scss'

export default class CgtPurchaseList extends Component {
  static defaultProps = {
    corpus_balance:''
  }
  state = {
    isSelect:4000,
    showWran:false
  }
 	selectMoney (key) {
 		if (key === 'four') {
 			this.setState({isSelect:4000})
 		} else if (key === 'six') {
 			this.setState({isSelect:6000})
 		}
 	}
  handleInput (val,e) {
    this.setState({[val]:parseFloat(e.target.value)})
  }
  handleBlur (e) {
    let val =parseFloat(e.target.value)
    if (val < 1000 || !Number.isInteger(val)) {
      this.setState({showWran:true})
    } else {
      this.setState({showWran:false})
    }
  }
  handleFocus () {
    this.setState({isSelect:0})
  }
  cgtBuy() {
    let data = {
      money:this.state.isSelect,
      approach:7
    }
    let that = this
    if (parseFloat(this.state.isSelect) > 1000 && Number.isInteger(parseFloat(this.state.isSelect))) {
      api.api(BAIDU_BUY,data).then(res => {
        if (res.data.state == 1) {
          let orderId = res.data.data.water_id
          Taro.requestPayment({
            timeStamp:res.data.data.timeStamp,
            nonceStr:res.data.data.nonceStr,
            package:res.data.data.package,
            signType:res.data.data.signType,
            paySign:res.data.data.paySign,
            success(res) {
              Taro.navigateTo({url:'/pages/result-pay/result-pay?type=0'})
            },
            fail(res) {
              Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=3&orderId=${orderId}`})
            }
          })
        }
      })
    }
  }
  render () {
    const { isSelect,showWran } = this.state
    const { corpus_balance } = this.props
    return (
      <View className='cgt-purchase-list'>
        <View className='yu'>现金余额：{corpus_balance}元</View>
        <View className='purchase-title'>购买金额</View>
				<View className='cpc-wrap'>
					<View 
						className={`item ${isSelect === 4000 ? 'active' : ''}`} 
						onClick={this.selectMoney.bind(this,'four')}
					>
						4000
					</View>
					<View 
						className={`item ${isSelect === 6000 ? 'active' : ''}`}
						onClick={this.selectMoney.bind(this,'six')}
					>
						6000
					</View>
          <Input 
            type='text' 
            className='input item'
            onInput={this.handleInput.bind(this,'isSelect')}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
				</View>
				<View className='purchase-now' onClick={this.cgtBuy}>立即购买</View>
				{
          showWran
          ? <View className='protocol-wrap'> 
              <Text className='wran'>(充值金额不能低于1000元，充值金额必须为整数)</Text>
            </View>
          : ''
        }
      </View>
    )
  }
}