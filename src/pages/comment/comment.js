import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import { EVALUATE_LIST,EVALUATE_REPLY,EVALUATE_DELETE } from '@service/api'
import api from '@service/ask'
import './comment.scss'
let Session = require('@utils/first-login/session')

class Comment extends Component {
	config = {
    navigationBarTitleText: '评价管理'
	}
	state = {
		page:1,
		isShowReplyInput:false,
		isShowReply:false,
		commentList:[],
		replyCon:''
	}
	getCommentList () {
		let data = {
				page:this.state.page
		}
		api.api(EVALUATE_LIST,data).then(res => {
				let list = this.state.commentList
				if (res.data.state == 0) {
					if (res.data.data.result) {
						if (res.data.data.result.length !== 0) {
							if (this.state.page == 1) {
								this.setState({commentList:res.data.data.result})
							} else {
								Taro.hideLoading()
								this.setState({commentList:list.concat(res.data.data.result)})
							}
						}
					}else {
						Taro.showToast({title:'没有更多了',icon:'none'})
					}
				}
			})
	}
	onReachBottom () {
		Taro.showLoading()
		setTimeout(() => {
			this.setState({
				page:this.state.page + 1
			}, () => {
				this.getCommentList()
			})
		},500)
	}
	componentDidMount () {
		this.getCommentList()
	}
	showReply (e) {
		let index = e.currentTarget.id
		this.setState({
			isShowReplyInput:!this.state.isShowReplyInput,
			listIndex:index
		})
	}
	replyRquest (uid,pid,title) {
		let data = {
				uid:uid,
				p_id:pid,
				title:title
		}
		api.api(EVALUATE_REPLY,data).then(res => {
				if (res.data.state == 0) {
					Taro.showToast({title:res.data.msg,icon:'none'})
					this.setState({
						isShowReplyInput:false
					})
				} else {
					Taro.showToast({title:res.data.msg,icon:'none'})
				}
			})
	}
	reply () {
		let commentList = this.state.commentList
		let listIndex = this.state.listIndex
		let uId = commentList[listIndex].f_uid
		let pId = commentList[listIndex].id
		let con = this.state.reply
		this.replyRquest(uId,pId,con)
	}
	handleInput (key,e) {
		let value = e.target.value
    this.setState({[key]: value}) 
	}
	deleteComment (e) {
		let pid = this.state.commentList[e.currentTarget.id].id
		let data = {id:pid}
		api.api(EVALUATE_DELETE,data)
		.then(res => {
			if (res.data.state == 0) {
				Taro.showToast({title:'删除成功',icon:'none'})
			} else {
				Taro.showToast({title:res.data.msg,icon:'none'})
			}
		})
	}
	onShareAppMessage(obj) {}
	render () {
		const { isShowReplyInput, commentList } = this.state
		return (
			<View className='comment'>
			{
				commentList.length !== 0
				?	commentList.map((comment,i) => {
						return <View className='c-item' key={i}>
										<View className='c-con'>{comment.title}</View>
										<View className='btn-wrap'>
											<Text className='btn' id={i} onClick={this.deleteComment}>删除</Text>
											<Text className='btn' id={i} onClick={this.showReply}>回复</Text>
										</View>
									</View>
					})
				: <View className='no-comment'>
						还没有评论
					</View>
			}
			{
				isShowReplyInput 
				? <View className='reply-wrap'>
						<Input 
							className='input'
							type='text' 
							placeholder='请输入评论'
							onInput={this.handleInput.bind(this,'reply')} 
							focus
						/>
						<Text 
							className='fabu' 
							onClick={this.reply}
						>
							发布
						</Text>
					</View>
				: ''
			}
			</View>
		)
	}
}
export default Comment