import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import { SET_NEW_PWD } from '@service/api'
import api from '@service/ask'
import './index.scss'

export default class ForgetSetPwd extends Component {
	config = {
    navigationBarTitleText: '找回密码',
  }
	state = {
		pwd:'',
		confirmPwd:''
	}
	handleInput (key,e) {
		let value = e.target.value
		this.setState({[key]:value})
	}
	checkPwd () {
		let pwd = this.state.pwd
		let confirmPwd = this.state.confirmPwd
		if (pwd !== confirmPwd) {
			Taro.showToast({title:'两次输入的密码不一致',icon:'none'})
		}
	}
	setPwd () {
		let data = {
			new_passwd:this.state.pwd,
			new_passwd2:this.state.confirmPwd
		}
		if (pwd) {
			if (confirmPwd) {
				api.api(SET_NEW_PWD,data).then(res => {
					Taro.showToast({title:res.data.msg,icon:'none'})
				}) 
			} else {
				Taro.showToast({title:'请再次输入新的密码',icon:'none'})
			}
		} else {
			Taro.showToast({title:'请输入新的密码',icon:'none'})
		}
	}
	render () {
		const { pwd, confirmPwd } = this.state
		return ( 
			<View className='set-pwd'>
				<View className='item-wrap'>
					<Text className='l-name'>新密码</Text>
					<Input 
						type='password'
						className='input' 
						placeholder='请输入新密码' 
						value={pwd}
						onInput={this.handleInput.bind(this,'pwd')}
						/>
				</View>
				<View className='item-wrap'>
					<Text className='l-name'>确认密码</Text>
					<Input 
						type='password' 
						className='input' 
						placeholder='请再次输入新密码' 
						value={confirmPwd}
						onBlur={this.checkPwd}
						onInput={this.handleInput.bind(this,'confirmPwd')}
						/>
				</View>
				<View className='confirm' onClick={this.setPwd}>确认</View>
			</View>
		)
	}
}