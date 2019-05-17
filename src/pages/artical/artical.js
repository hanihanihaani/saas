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
	// 判断汉字长度
	getByLen (val) {
		let len = 0
		for (var i = 0; i < val.length; i++) {
			let length = val.charCodeAt(i)
			if (length >= 0 && length <= 128) {
				len += 1
			} else {
				len += 2
			}
		}
		return len
	}
	handleInput(key,e) {
 		let value = e.target.value
    this.setState({[key]: value}) 
	}
	handleBlur (e) {
		let val = e.detail.value
		let len = this.getByLen(val)
		if (len < 16) {
			let letter = Math.floor((16-len)/2)
			Taro.showToast({title:`标题最少8个字，您还差${letter}个字`,icon:'none'})
		} else if (len > 60) {
			let letter = Math.floor((len - 60)/2)
			Taro.showToast({title:`标题最多30个字，您超出${letter}个字`,icon:'none'})
		}
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
		if (this.state.title) {
			if (this.state.author) {
				if (this.state.content) {
					if (this.state.imgUrl) {
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
					} else {
						Taro.showToast({title:'请选择封面',icon:'none'})
					}
				} else {
					Taro.showToast({title:'请输入内容',icon:'none'})
				}
			} else {
				Taro.showToast({title:'请输入作者',icon:'none'})
			}
		} else {
			Taro.showToast({title:'请输入标题',icon:'none'})
		}
	}
	update () {
		let len = this.getByLen(this.state.title)
		if (len >= 16 && len <= 60 ) {
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
		} else {
			Taro.showToast({title:'标题最少为8个字，最多为30个字',icon:'none'})
		}
		
	}
	getOneArtical (id) {
		let data = {id:id}
		api.api(ARTICAL_DETAIL,data).then(res => {
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
	preview () {
		if (this.state.title) {
			if (this.state.author) {
				if (this.state.content) {
					if (this.state.imgUrl) {
						let data = {
							title:this.state.title,
							content:this.state.content,
							author:this.state.author,
							cover:this.state.imgUrl
						}
						api.api(ISSUE_ARTICAL,data).then(res => {
							if (res.data.state == 0) {
								let id = res.data.data.id
								Taro.navigateTo({url:`/pages/artical/detail?id=${id}&showBtn=1`})
							} else {
								Taro.showToast({title:res.data.msg,icon:'none'})
							}
						})
					} else {
						Taro.showToast({title:'请选择封面',icon:'none'})
					}
				} else {
					Taro.showToast({title:'请输入内容',icon:'none'})
				}
			} else {
				Taro.showToast({title:'请输入作者',icon:'none'})
			}
		} else {
			Taro.showToast({title:'请输入标题',icon:'none'})
		}
	}
	render () {
		const { isShowImg, isShowBtn, imgUrl, title, content, author } = this.state
		return (
			<View className='artical'>
				<View className='wrap'>
					<View className='item'>
						<Input 
							type='text' 
							className='input' 
							value={title}
							onInput={this.handleInput.bind(this,'title')}
							onBlur={this.handleBlur}
							placeholder='请输入文章标题（8-30字)'
						/>
					</View>
					<View className='item'>
						<Input 
							type='text' 
							className='input inputs'
							value={author} 
							onInput={this.handleInput.bind(this,'author')}
							placeholder='输入作者'
						/>
					</View>
					<View className='item items'>
						<Textarea 
							className='textarea'
							value={content}
							onInput={this.handleInput.bind(this,'content')}
							placeholder='请输入正文'
						/>
					</View>
					<View className='item items'>
						<View className='img-wrap'>
							<Text className='choose-cover'>添加封面</Text>
						{
							!isShowBtn
							?	!isShowImg 
								?		<View className='upload' onClick={this.upImg}>
											<Image src={uploadImg} className='up-img' />
										</View>
								: <Image src={imgUrl} className='show-img' />
							: <Image src={imgUrl} className='show-img' onClick={this.upImg} />
						}
						</View>
					</View>
				</View>
				{
					!isShowBtn
					?	<View className='issues-btn'>
							<View className='issues pre' onClick={this.preview}>预览</View>
							<View className='issues sss' onClick={this.issue}>快速发布</View>
						</View>
					:	<View className='issue' onClick={this.update}>提交修改</View>
				}
			</View>
		)
	}
}
export default Artical