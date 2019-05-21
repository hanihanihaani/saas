import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input,Image } from '@tarojs/components'
import MkLogin from './mk-login/mk-login'
import PhoneLogin from './phone-login/phone-login'
import logo from '../../assets/logo.png'
import './login.scss'

class Login extends Component {
  // 项目配置
  config = {
    navigationBarTitleText: '登录',
  }
  state = {
    current:1,
    tabTitle:[{
      tabItem:'动态密码登录',
      id:1
    },{
      tabItem:'密码登录',
      id:2
    }],
  }
  toggleNav (id) {
    this.setState({
      current:id
    })
  }
  jumpForget () {
    Taro.navigateTo({url:'/pages/forget-pwd/forget-pwdy'})
  }
  jumpNew () {
    Taro.navigateTo({url:'/pages/register/register'})
  }
  render () {
    const { current,tabTitle } = this.state
    let tabList = tabTitle.map((item,i) => {
      let tabStyle = current === item.id ? 'active' : 'nActive'
      return <Text 
                key={i} 
                onClick={this.toggleNav.bind(this,item.id)} 
                className={tabStyle}
              >
                {item.tabItem}</Text>
    })
    let tabCon
    if (current === 1) {
      tabCon = <PhoneLogin />
    } else if (current === 2) {
      tabCon = <MkLogin />
    }
    return (
      <View className='login'>
        <View className='nav-title'>{tabList}</View>
        <View className='logo-wrap'>
          <Image src={logo} className='logo' />
        </View>
        {tabCon}
        <View className='zw-wrap'>
          <Text className='new-user' onClick={this.jumpForget}>忘记密码</Text>
          {/* <Text className='new-user' onClick={this.jumpNew}>注册</Text> */}
        </View>
      </View>
    )
  }
}
export default Login