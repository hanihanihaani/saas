let login = require('./first-login/login')

const exports = module.exports = {
	requestLogin: login.requestLogin,
	setLoginUrl: login.setLoginUrl
}