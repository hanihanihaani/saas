import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image,ScrollView } from '@tarojs/components'
import { POINT_BUY,POINT_CONSUME,ORDER_LIST} from '@service/api'
import { NavPurchase } from '@components/nav-purchase'
import { OrderItem } from '@components/order-item'
import { TongJiNav } from '@components/tongji-nav'
import { RecordNoData } from '@components/record-no-data'
import api from '@service/ask'
import './index.scss'
import checkImg from '@assets/check.png'

export default class PointPurchase extends Component {
  state = {
		isSelect:199,
		selectNum:200,
		showWho:0,
		showDay:0,
		page:1,
		orderList:[],
		pointList:[],
		score:{}
	}
	onShowWho (val) {
		this.setState({showWho:val})
	}
	onChooseDay(val,startSel,endSel) {
    this.setState({showDay:val})
    this.onGetPointTongji(val,startSel,endSel)
  }
 	jumpProtocol () {
 		Taro.navigateTo({url:'/pages/protocol/protocol?type=1'})
 	}
 	selectMoney (key) {
 		if (key == '199') {
 			this.setState({
 				selectNum:200,
 				isSelect:199
 			})
 		} else if (key == '499') {
 			this.setState({
 				selectNum:600,
 				isSelect:499
 			})
 		}
 	}
 	pointBuy () {
 		let data = {
 				score_num:this.state.selectNum,
 				score_price:this.state.isSelect,
 				approach:7
 		}
 		api.api(POINT_BUY,data).then(res => {
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
 							Taro.navigateTo({url:`/pages/result-pay/result-pay?type=1&typeService=1&num=${that.state.selectNum}&price=${that.state.isSelect}&orderId=${orderId}`})
 						}
 					})
 				} else {
 					Taro.showToast({title:res.data.msg,icon:'none'})
 				}
 			})
	 }
	 getOrderList () {
    let data = {
      page:this.state.page,
      aid:1022
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
          // Taro.showToast({title:'没有更多了',icon:'none'})
        }
      }
    })
  }
	componentDidShow () {
		this.getOrderList();
		this.onGetPointTongji(this.state.showDay)
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
		Taro.showLoading({title:'加载中'})
		this.setState({
			pageT:this.state.pageT + 1
		},() => {
			this.onGetPointTongji(this.state.showDay)
		})
	}
	purchase () {
		this.setState({showWho:0})
	}
	render () {
		const { isSelect,showWho,pointList,orderList,score } = this.state
		let height = Taro.getSystemInfoSync().windowHeight - 59
		return (
			<View className='point'>
				<NavPurchase 
					onShowWho={this.onShowWho}
					showWho={showWho}
				/>
				{
					showWho === 0
					? <View className='point-purchase'>
							<View className='yu-wrap'>
								<Text className='item'>商机点余额：{score.total}个</Text>
								<Text className='item'>消耗商机点数：{score.balance}个</Text>
							</View>
							<View className='purchase-title'>购买金额</View>
								<View className='cpc-wrap'>
									<View 
										className={`item ${isSelect === 199 ? 'active' : ''}`} 
										onClick={this.selectMoney.bind(this,'199')}
									>
										<View className='wrap'>商机点<Text className='blue'>200</Text>个</View>
										<View>售价199元</View>
									</View>
									<View 
										className={`item ${isSelect === 499 ? 'active' : ''}`}  
										onClick={this.selectMoney.bind(this,'499')}
									>
										<View className='wrap'>商机点<Text className='blue'>600</Text>个</View>
										<View>售价499元</View>
									</View>
								</View>
								<View className='purchase-now' onClick={this.pointBuy}>立即购买</View>
								<View className='protocol-wrap'> 
									<Image src={checkImg} className='check-img' />
									<Text>充值即表示你同意</Text>
									<Text className='protocol' onClick={this.jumpProtocol}>《商机和商机点的说明及使用方法》</Text>
								</View>
						</View>
					: ''
				}
				{
					showWho === 1
					? <View className='point-box'>
							<TongJiNav 
								onChooseDay={this.onChooseDay}
								showNav={true}
								onScrollToLower={this.onScrollToLowers}
							/>
							<ScrollView>
								{
									pointList.length == 0
									? <View className='no-data-box'>
											<RecordNoData />
											<View className='purchase' onClick={this.purchase}>点击购买</View>
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
				{
					showWho === 2
					?  <ScrollView
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