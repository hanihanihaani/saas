import Taro, { Component } from '@tarojs/taro'
import { View,Text,Input,Picker } from '@tarojs/components'
import { GET_PROVINCE,GET_CITY,CREATE_USER,CHECK_PHONE } from '@service/api'
import api from '@service/ask'
import arrowBimg from '@assets/arrow-b.png'
import './create-agent.scss'

class CreateAgent extends Component {
	config = {
    navigationBarTitleText: '创建代理商'
  }
  state = {
  	roleCheck:'',
  	provinceCheck:'选择省',
  	cityCheck:'选择市',
  	corpname:'',
  	username:'',
  	passwd:'',
  	passwd2:''
  }
  onRoleChange (e) {
  	let roleId
  	if (e.detail.value == 0) {
  		this.setState({
  			roleId:1
  		})
  	} else if (e.detail.value == 1){
  		this.setState({
  			roleId:10
  		})
  	}
  	this.setState({
  		roleCheck:this.state.role[e.detail.value]
  	})
  }
  onAreaChange (e) {
  	let provinceId = this.state.provinceIdList[e.detail.value]
  	this.getCityList(provinceId)
  	this.setState({
  		provinceCheck:this.state.provinceList[e.detail.value],
  		provinceId:provinceId
  	})
  }
  onCityChange (e) {
  	let cityId = this.state.cityIdList[e.detail.value]
  	this.setState({
  		cityCheck:this.state.cityList[e.detail.value],
  		cityId:cityId
  	})
  }
  getProvinceList () {
    api.api(GET_PROVINCE).then(res => {
  			if (res.data.state == 1) {
  				let provinceList = Object.values(res.data.data)
  				let provinceIdList = Object.keys(res.data.data)
  				this.setState({
  					provinceList:provinceList,
  					provinceIdList:provinceIdList
  				})
  			}
  		})
  }
  getCityList (id) {
    let data = {
        provinceid:id
    }
    api.api(GET_CITY,data).then(res => {
  			if (res.data.state == 1) {
  				let cityList = Object.values(res.data.data)
  				let cityIdList = Object.keys(res.data.data)
  				this.setState({
  					cityList:cityList,
  					cityIdList:cityIdList
  				})
  			}
  		})
  }
  handleInput (key,e) {
  	let value = e.target.value
  	this.setState({
  		[key]:value
  	})
  }
  onCheckPwd () {
  	if (this.state.passwd !== this.state.passwd2) {
  		Taro.showToast({title:'两次输入的密码不一样',icon:'none'})
  	}
	}
	checkPassword (e) {
		let pwd = e.target.value
		let reg = /^\d*$/;
		let reg1 = /^[a-zA-Z]+$/;
		if (pwd.length < 6 || pwd.length > 20) {
			Taro.showToast({title:'请输入6-20位数字和字母的组合',icon:'none'})
		} else {
			if (reg.test(pwd) || reg1.test(pwd)) {
				Taro.showToast({title:'请输入6-20位数字和字母的组合',icon:'none'})
			} 
		}
	}
  onCheckPhone (e) {
  	let p = e.target.value
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		let data = {mobile:p}
		if (p.length == 0) {
      Taro.showToast({title: '请输入手机号',icon: 'none',duration: 1500})
    } else if (p.length !== 11) {
      Taro.showToast({title: '手机号长度有误',icon: 'none',duration: 1500})
    } else if (!myreg.test(p)) {
      Taro.showToast({title: '手机号有误', icon: 'none',duration: 1500})
		}
		api.api(CHECK_PHONE,data).then(res => {
			if (res.data.state == 11) {
				Taro.showToast({title:'该手机号已注册',icon:'none'})
			}
		})
    return true
  }
  
  confirm () {
  	if (this.state.corpname) {
  		if (this.state.username) {
  			if (this.state.passwd) {
  				if (this.state.passwd2) {
  					if (this.state.roleId) {
  						if (this.state.provinceId) {
  							if (this.state.cityId) {
                  let data = {
                      corpname:this.state.corpname,
                      username:this.state.username,
                      passwd:this.state.passwd,
                      passwd2:this.state.passwd2,
                      role_type:this.state.roleId,
                      provinceid:this.state.provinceId,
                      cityid:this.state.cityId
                  }
                  api.api(CREATE_USER,data).then(res => {
                        if (res.data.state == 1) {
													Taro.showToast({title:'创建成功',icon:'none'})
													Taro.navigateBack({delta:1})
                        } else {
                          Taro.showToast({title:res.data.msg,icon:'none'})
                        }
				  						})
  							} else {
				  				Taro.showToast({title:'请选择城市',icon:'none'})
  							}
  						} else {
			  				Taro.showToast({title:'请选择省份',icon:'none'})
  						}
  					} else {
		  				Taro.showToast({title:'请选择角色',icon:'none'})
  					}
  				} else {
	  				Taro.showToast({title:'请再次输入密码',icon:'none'})
  				}
  			} else {
  				Taro.showToast({title:'请输入密码',icon:'none'})
  			}
  		} else {
  			Taro.showToast({title:'请输入手机号',icon:'none'})
  		}
  	} else {
  		Taro.showToast({title:'请输入姓名',icon:'none'})
  	}
	}
	componentWillMount () {
		//判断是来自哪里。1：代理商，10：销售
		let roleType = this.$router.params.roleType;
		this.setState({roleType:roleType})
		if (roleType == 1) {
			this.setState({
				roleCheck:'代理商',
				roleId:1,
				roleType:roleType
			})
		} else if (roleType == 10) {
			this.setState({
				roleCheck:'销售',
				roleId:10,
				roleType:roleType
			})
		}
	}
  componentDidMount () {
		this.getProvinceList()
		if (this.state.roleType == 1) {
  		Taro.setNavigationBarTitle({title:'创建代理商'})
  	} else if (this.state.roleType == 10) {
  		Taro.setNavigationBarTitle({title:'创建销售'})
  	}
  }
	render () {
		const { role,roleCheck,provinceList,provinceCheck,cityCheck,cityList,roleType } = this.state
		return (
			<View className='create-wrap'>
				<View className='item'>
					<Text className='l-letter'>姓名</Text>
					<View className='input-wrap'>
						<Input 
							type='text' 
							className='input'
							placeholder='请输入姓名'
							value={corpname}
							onInput={this.handleInput.bind(this,'corpname')}
						/>
					</View>
				</View>
				<View className='item'>
					<Text className='l-letter'>手机号</Text>
					{roleType == 10 ? <Text className='warn'>（登录帐号）</Text> : ''}
					<View className='input-wrap'>
						<Input 
							type='number' 
							className='input'
							placeholder='请输入手机号'
							value={username}
							onInput={this.handleInput.bind(this,'username')}
							onBlur={this.onCheckPhone}
						/>
					</View>
				</View>
				<View className='item'>
					<Text className='l-letter'>密码</Text>
					<View className='input-wrap'>
						<Input 
							type='password' 
							className='input'
							placeholder='请输入6-20位数字和字母的组合'
							value={passwd}
							onInput={this.handleInput.bind(this,'passwd')}
							onBlur={this.checkPassword}
						/>
					</View>
				</View>
				<View className='item'>
					<Text className='l-letter'>确认密码</Text>
					<View className='input-wrap'>
						<Input 
							type='password' 
							className='input'
							placeholder='请输入6-20位数字和字母的组合'
							value={passwd2}
							onInput={this.handleInput.bind(this,'passwd2')}
							onBlur={this.onCheckPwd}
						/>
					</View>
				</View>
				<View className='item'>
					<Text className='l-letter'>所在地</Text>
					<View className='picker-box'>
						<Picker mode='selector' range={provinceList} onChange={this.onAreaChange}>
							<View className='role'>{provinceCheck}<Image src={arrowBimg} className='b' /></View>
						</Picker>
					</View>
					<View className='picker-box'>
						<Picker mode='selector' range={cityList} onChange={this.onCityChange}>
							<View className='role'>{cityCheck}<Image src={arrowBimg} className='b' /></View>
						</Picker>
					</View>
				</View>
				<View className='item'>
					<Text className='l-letter'>角色</Text>
					<View className='role'>{roleCheck}</View>
				</View>
				<View className='confirm-create' onClick={this.confirm}>确认创建</View>
			</View>
		)
	}
}
export default CreateAgent