import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import { REGISTER,GET_CODE } from '@service/api'
import api from '@service/ask'
import lock from '@assets/lock.png'
import phoneImg from '@assets/phone-icon.png'
import './register.scss'

class Register extends Component {
	config = {
    navigationBarTitleText: '注册',
  }
	state = {
		phone:'',
		iCode:'',
		time:'发送验证码',
		currentTime:61,
		isActive:false
	}
	handleBlur (e) {
		let p = e.target.value
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (p.length == 0) {
      Taro.showToast({title: '请输入手机号',icon: 'none',duration: 1500})
    } else if (p.length !== 11) {
      Taro.showToast({title: '手机号长度有误',icon: 'none',duration: 1500})
    } else if (!myreg.test(p)) {
      Taro.showToast({title: '手机号有误', icon: 'none',duration: 1500})
    }
    return true
	}
	handleInput (key,e) {
		let value = e.target.value
		this.setState({[key]:value})
	}
	getCodes () {
		let currentTime = this.state.currentTime
		let data = {
				mobile:this.state.phone,
				login_from:0,
				forget_passwd:1
		}
		if (this.state.phone) {
			api.api(GET_CODE,data).then(res => {
				let interval = setInterval(() => {
					currentTime--
					this.setState({
						isActive:true,
						time:`${currentTime}秒`
					})
					if (currentTime <= 0) {
						clearInterval(interval)
						this.setState({
							time:'从新发送',
							currentTime:61
						})
					}
				},1000)
				Taro.showToast({title:res.data.msg,icon:'none'})
			})
		} else {
      Taro.showToast({title:'请输入手机号',icon:'none'})
		}
	}
	register () {
		let data = {
				mobile:this.state.phone,
				yzcode:this.state.iCode
		}
		api.api(REGISTER,data).then(res => {
			if (res.data.state == 1) {
				Taro.showToast({title:'注册成功',icon:'none'})
				setTimeout(function() {
					Taro.switchTab({url:'/pages/index/index'})
				},1500)
			} else {
				Taro.showToast({title:res.data.msg,icon:'none'})
			}
		})
	}
	render () {
		const { phone, iCode, time, isActive } = this.state.phone
		return (
			<View className='register'>
				<View className='input-wrap'>
          <Image src={phoneImg} className='icon-img phone-img' />
					<Input 
						className='input'
						type='text' 
						placeholder='请输入手机号码'
						value={phone}
						onBlur={this.handleBlur.bind(this)}
						onInput={this.handleInput.bind(this,'phone')}
						/>
				</View>
				<View className='input-wrap'>
          <Image src={lock} className='icon-img lock' />
					<Input 
						className='input'
						type='text'
						style={{width:'70%'}}
						value={iCode} 
						placeholder='请输入手机验证码'
						onInput={this.handleInput.bind(this,'iCode')}
						/>
          <Text className={`i-code ${isActive ? 'active' : ''}`} onClick={this.getCodes}>{time}</Text>
				</View>
				<Text className='r-btn' onClick={this.register}>注册</Text>
			</View>
		)
	}
}
export default Register