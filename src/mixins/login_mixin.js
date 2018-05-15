import wepy from 'wepy'
import api from '../services/api'
import loginInterface from '../services/login_request'
export default class LoginMixin extends wepy.mixin {
  data = {
    canIUse: wepy.canIUse('button.open-type.getUserInfo'),
    modal_showModal: false,
    modal_showConfirm: true,
    modal_showCancel: false,
    modal_title: '提示',
    modal_cancalText: '取消',
    logined: false,
    phone: false
  }
  computed = {}
  _goIntro(){
    wepy.navigateTo({url: '/pages/intro'})
  }

  async _bindGetUserInfo(e) {
    console.log('用户登录')
    if (e.detail.errMsg.indexOf("getUserInfo:fail") >= 0) {
      wepy.showToast({
        title: '授权失败,请授权后尝试操作',
        icon: "none",
        duration: 2000
      })
    } else {
       wepy.showToast({
        title: '授权成功, 请继续操作',
        icon: "none",
        duration: 2000
      })

      this.logined = true
      const userInfo = await loginInterface.login()
      this.userInfo = userInfo
      await api.setInvite({
        share: ''
      })
      this.$apply()
    }
  }
  async _getPhoneNumber(e) {
    console.log('e', e.detail)
    if (e.detail.errMsg.indexOf("getPhoneNumber:fail") >= 0) {
      wepy.showToast({
        title: '授权手机号失败',
        icon: "none",
        duration: 2000
      })      
      this.phone = false
      this.modal_showModal = false
    } else {
      wepy.showToast({
        title: '授权手机号成功',
        icon: "none",
        duration: 2000
      })
      
      this.modal_showModal = false
      this.phone = true
      const phoneData = e.detail
      const loginData = await wepy.login()
      api.updatePhone({
        code: loginData.code,
        iv: phoneData.iv,
        encryptedData: phoneData.encryptedData,
      })      
    }
  }
  _handleModelView(e) {
      this.modal_showModal = true
      this.$apply()
  }
    _handleBackground(status = false) {
      console.log('xxxxxx')
      this.modal_showModal = false
      this.$apply()
    }

  sleep(s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s * 1000)
    })
  }
  onShow() {
    // this.userInfo = await wepy.$instance.globalData.userInfo //this.$parent.globalData.userInfo  
    // this.$apply()
  }
  async onLoad() {}
}