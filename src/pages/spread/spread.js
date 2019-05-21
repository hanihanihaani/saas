import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image,Button } from '@tarojs/components'
import { Loading } from '@components/loading'
import { ARTICAL_LIST, DEL_ARTICAL } from '@service/api'
import api from '@service/ask'
import Edit from './edit'
import editImg from './assets/edit.png'
import previewImg from './assets/preview.png'
import delateImg from './assets/delate.png'
import shareImg from './assets/share.png'
import './spread.scss'

class Spread extends Component {
	config = {
    navigationBarTitleText: '企业宣传'
	}
	state = {
		page:1,
		articalList:[],
		loaded:true
	}
	getArticalList () {
		let data = {page:this.state.page}
		let that = this
		let list = this.state.articalList
		api.api(ARTICAL_LIST,data).then(res => {
			if (res.data.state == 0) {
				if (res.data.data.result) {
					if (res.data.data.result.length !== 0) {
						Taro.hideLoading()
						that.setState({articalList:list.concat(res.data.data.result)})
					} else {
						Taro.showToast({title:'没有更多了',icon:'none'})
					}
				} 
			}
		})
	}
	onReachBottom () {
		Taro.showLoading({title:'加载中...'})
		setTimeout(() => {
			this.setState({
				page:this.state.page + 1
			}, () => {
				this.getArticalList()
			})
		},500)
	}
	jumpArtical (e) {
		let id = this.state.articalList[e.currentTarget.id].id
		Taro.navigateTo({url:`/pages/artical/artical?id=${id}`})
	}
	// jumpDetail (e) {
	// 	let id = this.state.articalList[e.currentTarget.id].id
	// 	Taro.navigateTo({url:`/pages/artical/detail?id=${id}`})
	// }
	jumpArticals () {
		Taro.navigateTo({url:'/pages/artical/artical'})
	}
	delArtical (e) {
		let id = this.state.articalList[e.currentTarget.id].id
		let that = this
		Taro.showModal({
			title:'温馨提示',
			content:'您确认要删除该条信息吗',
			success:function (res) {
				if (res.confirm) {
					let data = {id:id}
					api.api(DEL_ARTICAL,data).then(res => {
						if (res.data.state == 1) {
							Taro.showToast({title:'删除成功',icon:'none'})
							that.getArticalList()
						} else {
							Taro.showToast({title:res.data.msg,icon:'none'})
						}
					})
				}
			}
		})
	}
	componentDidShow () {
		this.getArticalList()
		setTimeout(() => {
			this.setState({loaded:false})
		},500)
	}
	onShareAppMessage(res) {
		if (res.from === 'button') {
			let id = this.state.articalList[res.target.id].id
			let title = this.state.articalList[res.target.id].title
			let imgUrl = this.state.articalList[res.target.id].cover
			return {
				title:title,
				path:`/pages/artical/detail?id=${id}`,
				imageUrl:imgUrl
			}
		}
	}
	render () {
		const { articalList, loaded } = this.state
		return (
			<View className='spread'>
			{
				loaded 
				? <Loading />
				: articalList.length == 0
					? <View className='no-artical'>
							<Text className='wran'>您还没有创作任何作品！</Text>
							<Text className='wran'>去创作内容吧</Text>
							<View className='write' onClick={this.jumpArticals}>写文章</View>
						</View>
					: <View className='wrap'>
					{
						articalList.map((artical,i) => {
							return <View className='item-wrap' key={i}>
											<View className='top' id={i} onClick={this.jumpArtical}> 
												<View className='con'>{artical.content}</View>
												<View className='img-wrap'>
													<Image className='con-img' src={artical.cover} />
												</View>
											</View>
											<View className='bottom'>
												<View className='b-i' id={i} onClick={this.jumpArtical}>
													<Image src={editImg} className='img img-edit' />
													<Text className='title'>编辑</Text>
												</View>
												<Button className='b-i share' id={i} openType='share'>
													<Image src={shareImg} className='img img-share' />
													<Text className='title'>转发</Text>
												</Button>
												<View className='b-i' id={i} onClick={this.delArtical}>
													<Image src={delateImg} className='img img-preview' />
													<Text className='title'>删除</Text>
												</View>
											</View>
										</View>
						})
					}
						<Edit />
					</View>
			}
			</View>
		)
	}
} 
export default Spread