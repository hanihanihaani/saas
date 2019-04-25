import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import editImg from '@assets/edit-img.png'
import './index.scss'

export default class Edit extends Component {
	jumpEdit (e) {
    e.stopPropagation()
		Taro.navigateTo({url:'/pages/artical/artical'})
	}
	render () {
		return (
			<View 
				className='edit' 
				onClick={this.jumpEdit.bind(this)}
			>
				<Image src={editImg} className='img' />
			</View>
		)
	}
}