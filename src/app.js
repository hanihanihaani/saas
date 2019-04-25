import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import { LOGIN } from './service/api' 
let qcloud = require('./utils/index')

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/first-login/first-login',
      'pages/register/register',
      'pages/login/login',
      'pages/index/index',
      'pages/protocol/protocol',
      'pages/purchase/purchase',
      'pages/introduce/introduce',
      'pages/agent/agent-detail',
      'pages/agent/agent',
      'pages/agent/create-agent',
      'pages/set-pwd/set-pwd',
      'pages/forget-pwd/forget-pwdy',
      'pages/trade/trade',
      'pages/trade/choose-per',
      'pages/user/user',
      'pages/user/about-us',
      'pages/account/account',
      'pages/account/per-data',
      'pages/comment/comment',
      'pages/market/market',
      'pages/result-pay/result-pay',
      'pages/order/order',
      'pages/artical/artical',
      'pages/artical/detail',
      'pages/spread/spread'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#3ba9db',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor:'#3ba9db',
      list: [{
        pagePath: "pages/index/index",
        iconPath: "./assets/tab-bar/index.png",
        selectedIconPath: "./assets/tab-bar/indexs.png",
        text: "首页"
      },{
        pagePath: "pages/trade/trade",
        iconPath: "./assets/tab-bar/sj.png",
        selectedIconPath: "./assets/tab-bar/sjs.png",
        text: "商机"
      },{
        pagePath: "pages/user/user",
        iconPath: "./assets/tab-bar/my.png",
        selectedIconPath: "./assets/tab-bar/mys.png",
        text: "我的"
      }]
    }
  }
  componentWillMount () {
    qcloud.setLoginUrl(LOGIN)
  }
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
        <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
