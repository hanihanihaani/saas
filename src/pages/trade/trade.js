import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image,Swiper,SwiperItem,ScrollView } from '@tarojs/components'
import { BUSINESS_LIST, BUSINESS_MATCH, BUSINESS_ALREADY } from '@service/api'
import { set as setGlobalData, get as getGlobalData } from '@utils/global_data.js'
import api from '@service/ask'
import Nav from './nav'
import unChooseImg from '@assets/un-choose.png'
import chooseImg from '@assets/choose.png'
import './trade.scss'
let Session = require('@utils/first-login/session')

class Trade extends Component {
	config = {
    navigationBarTitleText: '商机'
	}
	state = {
		isAllChoose:false,
		businessSj:[],
		business:{},
		chooseClientId:[],
		page:1,
		isAlreadyMatch:'',
		isAlreadyMatchs:'',
		roleType:'',
		loaded:false,
		pageMatch:1
	}
	getBusinessList (page) {
		let data = {page:page}
		api.api(BUSINESS_LIST,data).then((res) => {
			if (res.data.state == 1) {
				let businessArr = this.state.businessSj
				if (res.data.data.clue.result.length !== 0) {
					Taro.hideLoading()
					res.data.data.clue.result.map((c,i) => {
						c.isChoose = false
						businessArr.push(c)
					})
					this.setState({
						businessSj:businessArr,
						business:res.data.data,
					})
				} else {
				}
			} else {
				// Taro.showToast({title:res.data.msg,icon:'none'})
				Taro.showToast({title:'没有更多数据',icon:'none'})
			}
		})
	}
	businessMatch (toCorpId,clinentId) {
		if (toCorpId) {
			if (clinentId.length !== 0) {
				let data = {to_corpid:toCorpId,client:clinentId}
				api.api(BUSINESS_MATCH,data).then((res) => {
					if (res.data.state == 1) {
						Taro.showToast({title:'分配成功',icon:'none'})
					} else {
						Taro.showToast({title:res.data.msg,icon:'none'})
					}
				})
			} else {
				Taro.showToast({title:'请选者要分配的商机',icon:'none'})
			}
		} else {
			Taro.showToast({title:'请选者分配人',icon:'none'})
		}
		
	}
	getMatchBusiness (start,end,chooseProvinceId,chooseCityId,page) {
		let data = {
			startdate:start,
			enddate:end,
			provinceid:chooseProvinceId,
			city:chooseCityId,
			page:page
		}
		api.api(BUSINESS_ALREADY,data).then((res) => {
			if (res.data.state == 1) {
				Taro.hideLoading()
				let list = this.state.businessSj
				this.setState({businessSj:list.concat(res.data.data.clue.result)})
			} else {
				Taro.showToast({title:res.data.msg,icon:'none'})
			}
		})
	}
	ditributSj () {
		let toCorpName = getGlobalData('toCorpName')
		let toCorpId = getGlobalData('toCorpId')
		if (this.state.chooseClientId.length !== 0) {
			if (toCorpId) {
					Taro.showModal({
					title:'确认要分配吗？',
					content:`${this.state.chooseClientId.length}条商机——>${toCorpName}`,
					confirmColor:'#333',
					cancelColor:'#999'
				})
					.then((res) => {
						if (res.confirm) {
							this.businessMatch(toCorpId,this.state.chooseClientId)
							this.setState({
								businessSj:[],
								chooseClientId:[]
							})
							this.getBusinessList()
						}
					})
			} else {
				Taro.showToast({title:'请选者分配人',icon:'none'})
			}
		} else {
				Taro.showToast({title:'请选者要分配的商机',icon:'none'})
		}
	
	}
	componentDidShow () {
		let toCorpName = getGlobalData('toCorpName')
		let choose = Taro.getStorageSync('choose')
		let isLogout = getGlobalData('isLogout')
		console.log('isLougt',isLogout)
		console.log('start',this.state.start)
		setTimeout(() => {
			this.setState({
				loaded:true,
				page:1,
				pageMatch:1
			})
		})
		if (!choose && !this.state.start && !this.state.chooseProvinceId) {
			this.setState({
				businessSj:[]
			})
			this.getBusinessList(this.state.page);
		}
		this.setState({toCorpName:toCorpName})
		let roleType = Session.get().role_type
		if (roleType == '10') {
			this.setState({
				isAlreadyMatch:'a',
				roleType:roleType
			})
		}
	}
	componentDidHide () {
			Taro.removeStorageSync('choose')
	}
	allSelects () {
		let isAllChoose = this.state.isAllChoose
		let chooseItem = this.state.chooseClientId
		isAllChoose = !isAllChoose
		let bs = this.state.businessSj
		for (let i=0;i < bs.length;i++) {
			bs[i].isChoose = isAllChoose
		}
		this.setState({
			isAllChoose:isAllChoose,
			businessSj:bs,
		})
		if (isAllChoose) {
			chooseItem = []
			for (let i=0;i < this.state.businessSj.length;i++) {
				chooseItem.push(this.state.businessSj[i].clientid)
			}
		}
		this.setState({
			chooseClientId:chooseItem
		})

	}
	selectSingle (e) {
		let chooseItem = this.state.chooseClientId
		let id = e.currentTarget.id
		let bs = this.state.businessSj
		let isChoose = bs[id].isChoose
		bs[id].isChoose = !isChoose
		chooseItem.push(bs[id].clientid)
		this.setState({
			businessSj:bs,
			chooseClientId:chooseItem,
		})
		this.judementAll()
	}
	judementAll () {
		let bs = this.state.businessSj
		let lenIndex = 0
		for (let i=0;i < bs.length;i++) {
			!bs[i].isChoose && lenIndex++
		}
		this.setState({
			isAllChoose:lenIndex === bs.length
		})
	}
	onScrollToLowerMore () {
		Taro.showLoading({title:'加载中...'})
			if (this.state.isAlreadyMatchs == 'a') {
				this.setState({
					pageMatch:this.state.pageMatch + 1
				},() => {
					this.getMatchBusiness(
						this.state.start,
						this.state.end,
						this.state.chooseCityId,
						this.state.chooseProvinceId,
						this.state.pageMatch
						)
				})
			} else {
			setTimeout(() => {
				this.setState({
					page:this.state.page + 1
				})
				this.getBusinessList(this.state.page)
			},500)
		}
	}
	//调用子组件的方法。筛选已分配
	// onMatchBusiness () {
	// 	this.nav.onChooseWho()
	// }
	//筛选分配与未分配商机
	onNewBusiness (val) {
		this.setState({
			businessSj:val.clue.result
		})
	}
	//选择时间
	onRiqi (val,start,end) {
		this.setState({
			businessSj:val.clue.result,
			start:start,
			end:end
		})
	}
	//区域选择
	onArea (val,chooseProvinceId,chooseCityId) {	
		this.setState({
			businessSj:val.clue.result,
			chooseCityId:chooseCityId,
			chooseProvinceId:chooseProvinceId
		})
	}
	//判断是否是筛选已分配
	onAlreadyMatch (val) {
		this.setState({
			isAlreadyMatch:val,
			isAlreadyMatchs:val
		})
	}
	jumpChoosePer () {
		Taro.navigateTo({url:'/pages/trade/choose-per'})	
	}
  onShareAppMessage(obj) {}
	render () {
		const { business, isAllChoose, businessSj, isAlreadyMatch, roleType, toCorpName, loaded } = this.state
		let  height = isAlreadyMatch == 'a' ?`${Taro.getSystemInfoSync().windowHeight-100}px` : ''
		const con = businessSj.map((c,i) => {
									return <View className='sj-item' key={i} id={i} onClick={this.selectSingle.bind(this)}>
														{
															isAlreadyMatch !== 'a'
															? <View className='item choose'>
																	<Image className='choose-img' src={c.isChoose ? chooseImg : unChooseImg} />
																</View>
															: ''
														}
														<Text className={isAlreadyMatch == 'a' ? 'item-n' : 'name'}>{c.contact_person}</Text>
														<Text className={isAlreadyMatch == 'a' ? 'item' : 'area'}>{c.city}</Text>
														<Text className={isAlreadyMatch == 'a' ? 'item-p' : 'phone'}>{c.telephone}</Text>
														<Text className={isAlreadyMatch == 'a' ? 'item' : 'time'}>{c.createdate}</Text>
													</View>
								})

		return (
			<View className='sj'>
				<Nav 
					onNewBusiness={this.onNewBusiness.bind(this)}
					onRiqi={this.onRiqi.bind(this)}
					sjMes={business}
					onArea={this.onArea.bind(this)}
					onAlreadyMatch={this.onAlreadyMatch.bind(this)}
					roleType={roleType}
				/>
				<View className='con-wrap'>
					<View className='nav-con'>
					{
						isAlreadyMatch !== 'a'
						?	<Text className='item choose'>选择</Text>
						: ''
					}
						<Text className={isAlreadyMatch == 'a' ? 'item-n' : 'name'}>姓名</Text>
						<Text className={isAlreadyMatch == 'a' ? 'item' : 'area'}>地点</Text>
						<Text className={isAlreadyMatch == 'a' ? 'item-p' : 'phone'}>电话</Text>
						<Text className={isAlreadyMatch == 'a' ? 'item' : 'time'}>创建时间</Text>
					</View>
					<View className='sj-con' style={{height:height}}>
						<Swiper className='sj-swiper' style={{height:height}}>
							<SwiperItem>
								<ScrollView 
									className='scroll-wrap' 
									onScrollToLower={this.onScrollToLowerMore} 
									scrollY
									style={{height:height}}
								>
									{
										!loaded
										? <View className='loaded'>加载中...</View>
										:	businessSj.length == 0
											? <View className='no-data'>暂时没有商机！</View>
											: con
									}
								</ScrollView>
							</SwiperItem>
						</Swiper>
					</View>
					{
						isAlreadyMatch !== 'a' 
						? <View>
								<View className='choose-wrap'>
									<View className='choose-btn' onClick={this.allSelects}>
										<Image className='c-img' src={isAllChoose ? chooseImg : unChooseImg} />
										{ isAllChoose ? '取消全选' : '全选'}
									</View>
									<View className='choose-per' onClick={this.jumpChoosePer}>{toCorpName || '+选择分配人'}</View>
								</View>
								<View className='distribut' onClick={this.ditributSj}>分配</View>
							</View>
						: ''
					}
				</View>
			</View>
		)
	}
}
export default Trade