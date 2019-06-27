import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import { MODIFY_PWD } from '@service/api'
import api from '@service/ask'
import './index.scss'

export default class ModifyPwd extends Component {
	state = {
		pwd:'',
		confirmPwd:'',
		pwdy:''
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
				opassword:this.state.pwdy,
				password:this.state.pwd,
				repassword:this.state.confirmPwd
		}
		if (this.state.pwdy) {
			if (this.state.pwd) {
					if (this.state.confirmPwd) {
						api.api(MODIFY_PWD,data).then(res => {
							Taro.showToast({title:res.data.msg,icon:'none'})
						}) 
					} else {
						Taro.showToast({title:'请再次输入新的密码',icon:'none'})
					}
				} else {
					Taro.showToast({title:'请输入新的密码',icon:'none'})
			}
		} else {
				Taro.showToast({title:'请再次输入原来的密码',icon:'none'})
		}
	}
	render () {
		const { pwd, confirmPwd, pwdy } = this.state
		return (
			<View className='set-pwd'>
				<View className='item-wrap'>
					<Text className='l-name'>原密码</Text>
					<Input 
						type='text'
						className='input' 
						placeholder='请输入原密码' 
						value={pwdy}
						onInput={this.handleInput.bind(this,'pwdy')}
						/>
				</View>
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
						placeholder='请再次输入新密码(数字和字母的组合)' 
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