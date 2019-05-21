import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image,ScrollView } from '@tarojs/components'
import { CPC_BUY,ORDER_LIST,CPC_CONSUME } from '@service/api'
import { NavPurchase } from '@components/nav-purchase'
import { OrderItem } from '@components/order-item'
import { TongJiNav } from '@components/tongji-nav'
import { RecordNoData } from '@components/record-no-data'
import api from '@service/ask'
import './index.scss'
import checkImg from '@assets/check.png'

export default class CpcPurchase extends Component {
  state = {
		isSelect:3000,
		showWho:0,
		showDay:0,
		page:1,
		orderList:[],
		cpcList:[],
		rebate_balance:'',
		corpus_balance:''
	}
	onShowWho (val) {
		this.setState({showWho:val})
	}
	onChooseDay(val,startSel,endSel) {
    this.setState({showDay:val})
    this.onGetCpcTongji(val,startSel,endSel)
  }
 	selectMoney (key) {
 		if (key === 'three') {
 			this.setState({isSelect:3000})
 		} else if (key === 'five') {
 			this.setState({isSelect:5000})
 		} else if (key === 'six') {
 			this.setState({isSelect:6000})
 		}
	 }
	 getOrderList () {
    let data = {
      page:this.state.page,
      aid:10062
    }
    api.api(ORDER_LIST,data).then(res => {
      if (res.data.state == 0) {
        if (res.data.data.result) {
          if (res.data.data.length !== 0) {
            Taro.hideLoading()
            let orderArray = this.state.orderList
            this.setState({orderList:orderArray.concat(res.data.data.result)})
          } 
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
 	jumpProtocol () {
 		Taro.navigateTo({url:'/pages/protocol/protocol?type=0'})
 	}
 	cpcBuy () {
 		let data = {
 				money:this.state.isSelect,
 				money_type:7
 		}
 		api.api(CPC_BUY,data).then(res => {
 				let that = this
 				if (res.data.state == 0) {
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
 							Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=0&money=${that.state.isSelect}&orderId=${orderId}`})
 						}
 					})
 				} else {
 					Taro.showToast({title:res.data.msg,icon:'none'})
 				}
 			})
	 }
	componentDidShow () {
		this.getOrderList()
		this.onGetCpcTongji(this.state.showDay)
	}
	onScrollToLower () {
		Taro.showLoading({title:'加载中'})
		this.setState({
			page:this.state.page + 1
		},() => {
			this.getOrderList()
		})
	}
	onScrollToLowers () {
		Taro.showLoading()
		this.setState({
			pageT:this.state.pageT + 1
		},() => {
			this.onGetCpcTongji(this.state.showDay,startSel,endSel)
		})
	}
	purchase () {
		this.setState({showWho:0})
	}
	render () {
		const { isSelect,showWho,orderList,cpcList,corpus_balance,rebate_balance } = this.state
    let height = Taro.getSystemInfoSync().windowHeight - 59
		return (
			<View className='cpc-purchase'>
				<NavPurchase 
					onShowWho={this.onShowWho}
					showWho={showWho}
				/>
				{
					showWho === 0
					? <View className='cpc-purchase-list'>
							<View className='yu-wrap'>
								<Text className='item'>现金余额：{corpus_balance}元</Text>
								<Text className='item'>优惠余额：{rebate_balance}元</Text>
							</View>
							<View className='purchase-title'>购买金额</View>
							<View className='cpc-wrap'>
								<View 
									className={`item ${isSelect === 3000 ? 'active' : ''}`} 
									onClick={this.selectMoney.bind(this,'three')}
								>
									3000
								</View>
								<View 
									className={`item ${isSelect === 5000 ? 'active' : ''}`}
									onClick={this.selectMoney.bind(this,'five')}
								>
									5000
								</View>
								<View 
									className={`item ${isSelect === 6000 ? 'active' : ''}`} 
									onClick={this.selectMoney.bind(this,'six')}
								>
									6000
								</View>
							</View>
							<View className='purchase-now' onClick={this.cpcBuy}>立即购买</View>
							<View className='protocol-wrap'> 
								<Image src={checkImg} className='check-img' />
								<Text>充值即表示你同意</Text>
								<Text className='protocol' onClick={this.jumpProtocol}>《订单直通车产品用户服务协议》</Text>
							</View>
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
					: ''
				}
				{
					showWho === 2
					? <ScrollView
							className='scroll-box'
							scrollY
							style={{height:`${height}px`}}
							onScrollToLower={this.onScrollToLower}
						>
							<OrderItem 
								list={orderList}
							/>
						</ScrollView>
					: ''
				}
			</View>
		)
	}
}