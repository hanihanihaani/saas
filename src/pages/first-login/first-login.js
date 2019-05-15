//index.js
var qcloud = require('@utils/index')
var Session = require('@utils/first-login/session')

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: ''
    },

    bindGetUserInfo: function (e) {
      if (this.data.logged) return;
      var that = this;
      var userInfo = e.detail.userInfo;

      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 检查登录是否过期
            wx.checkSession({
              success: function () {
                if (Session.get()) {
                  let corpid = Session.get().corpid
                  if (corpid > 0) {
                    wx.showToast({title:'登录成功',icon:'success'})
                    wx.switchTab({url:'/pages/index/index'})
                  } else {
                    wx.showToast({title:'请绑定马可账户',icon:'none'})
                    setTimeout(function() {
                      wx.navigateTo({url:'/pages/login/login'})
                    },1000)
                  }
                }
                // 登录态未过期
                that.setData({
                  userInfo: userInfo,
                  logged: true
                })
              },

              fail: function () {
                // 登录态已过期，需重新登录
                Session.clear()
                var options = {
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv,
                  userInfo: userInfo
                }
                that.doLogin(options);
              },
            });
          } else {
          }
        }
      });
    },

    doLogin: function(options) {
      var that = this;
      wx.login({
        success: function (loginResult) {
          var loginParams = {
            code: loginResult.code,
            encryptedData: options.encryptedData,
            iv: options.iv,
          }
          qcloud.requestLogin({
            loginParams, success() {
                if (Session.get()) {
                  let corpid = Session.get().corpid
                  if (corpid > 0) {
                    wx.switchTab({url:'/pages/index/index'})
                  } else {
                    wx.showToast({title:'请绑定马可账户',icon:'none'})
                    setTimeout(function() {
                      wx.navigateTo({url:'/pages/login/login'})
                    },1000)
                  }
                } 
                
              that.setData({
                userInfo: options.userInfo,
                logged: true
              })
            },
            fail(error) {
              wx.showToast({title:'fail',icon:'none'})
            }
          });
        },
        fail: function (loginError) {
            wx.showToast({title:'fail',icon:'none'})
        },
      });
    },
    onShow() {
      if (Session.get()) {
        if (Session.get().corpid > 0) {
          wx.showLoading({title:'正在登录'})
          setTimeout(() => {
            wx.switchTab({url:'/pages/index/index'})
          },500)
        }
      }
    }
})
