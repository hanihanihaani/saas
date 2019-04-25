import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import { GET_CODE } from '@service/api'
import api from '@service/ask'
import lock from '../../assets/lock.png'
import phoneImg from '../../assets/phone-icon.png'
import './forget-pwdy.scss'


class ForgetPwd extends Component {
	config = {
    navigationBarTitleText: '找回密码',
  }
	state = {
		phone:'',
		iCode:''
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
	getCode () {
		let data = {
				mobile:this.state.phone,
				login_from:0,
				forget_passwd:1
		}
		if (phone) {
			api.api(GET_CODE,data).then(res => {
				Taro.showToast({title:res.data.msg,icon:'none'})
			})
		} else {
      Taro.showToast({title:'请输入手机号',icon:'none'})
		}
	}
	nextTip () {
		let phone = this.state.phone
		let iCode = this.state.iCode
		if (phone) {
			if (iCode) {
				Taro.navigateTo({url:'/pages/set-pwd/set-pwd?type=0'})
			} else {
				Taro.showToast({title:'请填写验证码',icon:'none'})
			}
		} else {
			Taro.showToast({title:'请填写手机号',icon:'none'})
		}
	}
	render () {
		return (
			<View className='forget-pwdy'>
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
            style={{width:'70%'}}  
						type='text'
						value={iCode} 
						placeholder='请输入手机验证码'
						onInput={this.handleInput.bind(this,'iCode')}
						/>
          <Text className='i-code' onClick={this.getCode}>获取验证码</Text>
				</View>
				<Text className='next-btn' onClick={this.nextTip}>下一步</Text>
			</View>
		)
	}
}
export default ForgetPwd