import Taro, { Component } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import './index.scss'

export default class PointProtocol extends Component {
	agree () {
		Taro.navigateBack({delta:1})
  }
	render () {
		return (
			<View className='point-protocol'>
				<View>
					我们把用户在马可波罗平台自主发布的求购信息，以及用户在马可波罗平台发布的自主询盘中同意转为求购的需求信息，还有马可波罗网的工作人员采集来的采购需求信息，统称为马可波罗平台的商机。
				</View>
				<View>
					商机点是由马可波罗网发行的一种虚拟货币，用于支付查看马可波罗网商机信息中的联系方式以及留言报价。查看采购人员的联系方式，根据商机种类的不同，需要花费5个或5个以上的商机点。对采购商机信息进行报价和留言，根据商机种类的不同，需要花费3个或3个以上的商机点。
				</View>
				<View>
					商机点的购买、使用以及余额情况，您可以在登录马可波罗网站后在首页-商机库-商机点栏目中查询，同时也可以在会员中心-商机管理-我的商机点栏目中查询。
				</View>
				<View>
					商机点作为一种虚拟货币，一经购买成功，不可退款。商机点余额不能提现，购买的商机点使用没有时间限制。
				</View>
				<View>
					对于购买（非赠送）的商机点，您若查询了某求购信息中的联系方式并消耗了购买的商机点后，如果发现为虚假信息，包括但不限于电话号码为空号、多次拒接、非求购信息等，可以提交投诉信息。相关投诉信息一经核实，我们会返还给用户相应的商机点。
				</View>
				<View>
					感谢您对我们的支持和信任。
				</View>
				<View className='agree' onClick={this.agree}>我已阅读并同意</View>
			</View>
		)
	}
}