import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import ForgetSetPwd from './foget-set'
import ModifyPwd from './modify-pwd'
import './set-pwd.scss'

class SetPwd extends Component {
	componentWillMount () {
		//判断是来自修改密码还是忘记密码。0：忘记密码。1：修改密码
		let pageType = this.$router.params.type
		this.setState({
			pageType:pageType
		})		
	}
	componentDidMount () {
		if (this.state.pageType == 0) {
			Taro.setNavigationBarTitle({title:'找回密码'})
		} else if (this.state.pageType == 1) {
			Taro.setNavigationBarTitle({title:'修改密码'})
		}
	}
	render () {
		const { pageType } =this.state
		let showPage
		if (pageType == 0) {
			showPage = <ForgetSetPwd />
		} else if (pageType == 1) {
			showPage = <ModifyPwd />
		}
		return ( 
			<View className='set-pwd'>
				{showPage}
			</View>
		)
	}
}
export default SetPwd