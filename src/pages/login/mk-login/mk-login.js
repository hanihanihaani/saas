import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input } from '@tarojs/components'
import { MK_LOGIN } from '@service/api'
import api from '@service/ask'
import lock from '../../../assets/lock.png'
import phoneImg from '../../../assets/phone-icon.png'
import './mk-login.scss'

class MkLogin extends Component {
  state = {
    username:'',
    passpwd:'',
  }

  handleInput (key,e) {
    let value = e.target.value
    this.setState({[key]: value}) 
  }

  handleLogin () {
    let username = this.state.username
    let passpwd = this.state.passpwd
    if (username) {
      if (passpwd) {
        let data = {
            username:username,
            passwd:passpwd,
            ver_type:0,
            login_from:0,
        }
        api.api(MK_LOGIN,data).then(res => {
          if (res.data.state == 1) {
            Taro.switchTab({url:'/pages/index/index'})
          } else {
            Taro.showToast({title:res.data.msg,icon:'none'})
          }
        })
      } else {
        Taro.showToast({title:'请输入密码',icon:'none'})
      }
    } else {
      Taro.showToast({title:'请填写用户名',icon:'none'})
    }
  }
  render () {
    const { username, password } = this.state
    return (
      <View className='login-warp'>
        <View className='input-wrap'>
          <Image src={phoneImg} className='icon-img phone-img' />
          <Input 
            className='input'
            placeholder='请输入用户名' 
            type='text' 
            onInput={this.handleInput.bind(this,'username')} 
            value={username}
            />
        </View>
        <View className='input-wrap'>
          <Image src={lock} className='icon-img lock' />
          <Input 
            className='input'
            placeholder='请输入密码' 
            type='password'  
            onInput={this.handleInput.bind(this,'passpwd')}
            value={password} 
            />
        </View>
        <Text className='btn' onClick={this.handleLogin}>登录</Text>
      </View>
    )
  }
}

export default MkLogin