import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input,Textarea } from '@tarojs/components'
import { UP_IMG,ISSUE_ARTICAL,ARTICAL_DETAIL,EDIT_ARTICAL } from '@service/api'
import api from '@service/ask'
import uploadImg from '@assets/upload.png'
import './artical.scss'
let Session = require('@utils/first-login/session')

class Artical extends Component {
	config = {
		navigationBarTitleText:'写文章'
	}
	state = {
		isShowImg:false,
		isShowBtn:false,
		title:'',
		content:'',
		author:'',
		imgUrl:''
	}
	handleInput(key,e) {
 		let value = e.target.value
    this.setState({[key]: value}) 
	}
	upImg () {
	  var that = this;
    Taro.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
						let tempFilePaths = res.tempFilePaths;
						let tempFileSize = res.tempFiles[0].size
						if (tempFileSize <= 1000000) {
							Taro.uploadFile({
                url: UP_IMG,
                filePath: tempFilePaths[0],
                name: 'file',
								header:{'x-wx-skey':Session.get().skey},
                success: function(res) {
                  res = JSON.parse(res.data)
                	if (res.data.state == 1) {
                		that.setState({
                			imgUrl:res.data.img_url,
                			isShowImg:true
                		})
                	} else {
                		Taro.showToast({title:res.msg,icon:'none'})
                	}
                }
            	})
						} else {
							Taro.showToast({title:'图片大小不得超过1M',icon:'none'})
						}
        },
    })
	}
	issue () {
		let data = {
			title:this.state.title,
			content:this.state.content,
			author:this.state.author,
			cover:this.state.imgUrl
		}
		api.api(ISSUE_ARTICAL,data).then(res => {
			if (res.data.state == 0) {
				Taro.showToast({title:'发布成功',icon:'none'})
				setTimeout(() => {
					Taro.redirectTo({url:'/pages/spread/spread'})
				},1000)
			} else {
				Taro.showToast({title:res.data.msg,icon:'none'})
			}
		})
	}
	update () {
		let data = {
			title:this.state.title,
			content:this.state.content,
			author:this.state.author,
			cover:this.state.imgUrl,
			id:this.state.id
		}
		api.api(EDIT_ARTICAL,data).then(res => {
			if (res.data.state == 0) {
				Taro.showToast({title:'修改成功',icon:'none'})
				setTimeout(() => {
					Taro.redirectTo({url:'/pages/spread/spread'})
				},1000)
			} else {
				Taro.showToast({title:res.data.msg,icon:'none'})
			}
		})
	}
	getOneArtical (id) {
		let data = {id:id}
		api.api(ARTICAL_DETAIL,data).then(res => {
			console.log('res',res)
			if (res.data.state == 0) {
				this.setState({
					title:res.data.data.title,
					author:res.data.data.author,
					content:res.data.data.content,
					imgUrl:res.data.data.cover,
					isShowImg:true,
					isShowBtn:true
				})
			} else {
				Taro.showToast({title:res.data.msg,icon:'none'})
			}
		})
	}
	componentWillMount () {
		let id = this.$router.params.id
		if (id) {
			Taro.setNavigationBarTitle({title:'编辑文章'})
			this.setState({id:id})
			this.getOneArtical(id)
		}
	}
	render () {
		const { isShowImg, isShowBtn, imgUrl, title, content, author } = this.state
		return (
			<View className='artical'>
				<View className='wrap'>
					<View className='item'>
						<Text className='item-name'>文章标题：</Text>
						<Input 
							type='text' 
							className='input' 
							value={title}
							onInput={this.handleInput.bind(this,'title')}
						/>
					</View>
					<View className='item'>
						<Text className='item-name'>文章作者：</Text>
						<Input 
							type='text' 
							className='input'
							value={author} 
							onInput={this.handleInput.bind(this,'author')}
						/>
					</View>
					<View className='item items'>
						<Text className='item-name'>文章详情：</Text>
						<Textarea 
							className='textarea'
							value={content}
							onInput={this.handleInput.bind(this,'content')}
						/>
					</View>
					<View className='item items'>
						<Text className='item-name'>封面：</Text>
						<View className='img-wrap'>
						{
							!isShowBtn
							?	!isShowImg 
								?		<View className='upload' onClick={this.upImg}>
											<Image src={uploadImg} className='up-img' />
											<View className='choose-up'>选择封面</View>
										</View>
								: <Image src={imgUrl} className='show-img' />
							: <Image src={imgUrl} className='show-img' onClick={this.upImg} />
						}
						</View>
					</View>
				</View>
				{
					!isShowBtn
					?	<View className='issue' onClick={this.issue}>快速发布</View>
					:	<View className='issue' onClick={this.update}>提交修改</View>
				}
			</View>
		)
	}
}
export default Artical