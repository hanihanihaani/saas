import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import './index.scss'

export default class CgtPurchaseList extends Component {
  state = {
    isSelect:10,
    money:''
  }
 	selectMoney (key) {
 		if (key === 'four') {
 			this.setState({isSelect:4000})
 		} else if (key === 'six') {
 			this.setState({isSelect:6000})
 		}
 	}
   handleInput (val,e) {
    this.setState({[val]:e.target.value})
   }
   handleBlur (e) {
    let val = e.target.value
    if (val < 1000) {
      Taro.showToast({title:'充值金额不能低于1000元',icon:'none'})
    } else if (!Number.isInteger(val)) {
      Taro.showToast({title:'充值金额必须为整数',icon:'none'})
    }
   }
   render () {
		const { isSelect } = this.state
    return (
      <View className='cgt-purchase-list'>
        <View className='purchase-title'>购买金额</View>
				<View className='cpc-wrap'>
					<View 
						className={`item ${isSelect === 4000 ? 'active' : ''}`} 
						onClick={this.selectMoney.bind(this,'four')}
					>
						3000
					</View>
					<View 
						className={`item ${isSelect === 6000 ? 'active' : ''}`}
						onClick={this.selectMoney.bind(this,'six')}
					>
						5000
					</View>
          <Input 
            type='text' 
            className='input item'
            onInput={this.handleInput.bind(this,'money')}
            onBlur={this.handleBlur}
          />
				</View>
				<View className='purchase-now' onClick={this.cpcBuy}>立即购买</View>
				<View className='protocol-wrap'> 
					<Text className='wran'>(充值金额不能低于1000元，充值金额必须为整数)</Text>
				</View>
      </View>
    )
  }
}