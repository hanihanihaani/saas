import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import { GET_CODE,MK_LOGIN } from '@service/api'
import api from '@service/ask'
import lock from '../../../assets/lock.png'
import phoneImg from '../../../assets/phone-icon.png'
import './phone-login.scss'


class PhoneLogin extends Component {
  // 项目配置
  state = {
    phone:'',
    iCode:'',
    currentTime:61,
    time:'获取验证码',
    isActive:false
  }

  handleInput (key,e) {
    let value = e.target.value
    this.setState({[key]: value}) 
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
  getCode () {
    let phone = this.state.phone
    let currentTime = this.state.currentTime
    let data = {
        mobile:phone,
        ver_type:1,
        login_from:0
    }
    if (phone) {
      api.api(GET_CODE,data).then(res => {
        if (res.data.state == 1) {
          let interval = setInterval(() => {
            currentTime--
            this.setState({
              time:`${currentTime}秒`,
              isActive:true
            })
            if (currentTime <= 0) {
              clearInterval(interval)
              this.setState({
                time:'从新发送',
                currentTime:61,
              })
            }
          },1000)
        }
        Taro.showToast({title:res.data.msg,icon:'none'})
      })
    } else {
      Taro.showToast({title:'请输入手机号',icon:'none'})
    }
  }
  handleLogin () {
   let data = {
      mobile:this.state.phone,
      yzcode:this.state.iCode,
      ver_type:1,
      login_from:0
   }
   if (this.state.iCode) {
    api.api(MK_LOGIN,data).then(res => {
        if (res.data.state == 1) {
          Taro.switchTab({url:'/pages/index/index'})
        } else {
          Taro.showToast({title:res.data.msg,icon:'none'})
        }
      })
   } else {
    Taro.showToast({title: '请输入验证码', icon: 'none',duration: 1500})
   } 
  }
  render () {
    const { phone, iCode, time, isActive } = this.state
    return (
      <View className='phone-login'>
        <View className='input-wrap'>
          <Image src={phoneImg} className='icon-img phone-img' />
          <Input 
            className='input'
            placeholder='请输入手机号' 
            type='text' 
            onInput={this.handleInput.bind(this,'phone')} 
            value={phone}
            onBlur={this.handleBlur.bind(this)}
            />
        </View>
        <View className='input-wrap'>
          <Image src={lock} className='icon-img lock' />
          <Input 
            className='input'
            type='text'
            style={{width:'70%'}}  
            placeholder='短信验证码'
            onInput={this.handleInput.bind(this,'iCode')}
            value={iCode} 
            />
          <Text className={`i-code ${isActive ? 'active' : ''}`} onClick={this.getCode}>{time}</Text>
        </View>
        <Text className='btn' onClick={this.handleLogin}>直接绑定</Text>
      </View>
    )
  }
}
