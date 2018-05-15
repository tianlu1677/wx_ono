import wepy from 'wepy'
import {
  host
} from '../config'
import api from './api'
const loginInterface = {
  async getUserInfo() {
    const loginData = await wepy.login()
    console.log('loginData', loginData)
    const userinfo = await wepy.getUserInfo()
    userinfo.code = loginData.code
    return userinfo
  },
  async saveUserInfo() {
    let userinfoRaw = {}
    let userinfo = {}
    // const parent_id = 1
    userinfoRaw = await loginInterface.getUserInfo()

    userinfo = await api.createAccount({
      userinfo: userinfoRaw.userInfo,
      code: userinfoRaw.code,
    })
    await wepy.setStorage({
      key: '_token',
      data: userinfo.token
    })
    return userinfo
  },
  async login(options = {}) {
    try {
      const token = wepy.getStorageSync('_token')
      console.log('token', token)
      // return
      const userinfo = await loginInterface.saveUserInfo()
      return userinfo
    } catch (e) {
      console.log('error Userlog', e)
      if (!(e.errMsg.indexOf('getUserInfo:fail') >= 0)) {
        wepy.showModal({
          title: '友情提示',
          content: `获取用户信息失败， 请关闭重新进入`,
        })
        return
      }
      return
      // 以下不运行
      const res = await wepy.showModal({
        title: '友情提示',
        content: `登录失败，点击确定重新授权`,
      })
      if (res.confirm === true) {
        const scopes = await wepy.getSetting()
        if (scopes.authSetting['scope.userInfo'] && scopes.authSetting['scope.userInfo'] == true) {
          const scopes = await wepy.openSetting()
          if (scopes.authSetting['scope.userInfo'] == true) {
            const userinfo = await loginInterface.saveUserInfo()
            console.log('授权成功')
            wepy.reLaunch({
              url: '/pages/index'
            })
            return userinfo
          } else {
            console.log('授权失败')
            wepy.reLaunch({
              url: '/pages/index'
            })
          }
          // 重新判断
        } else {
          // 从来没授权过
        }
      } else {
        console.log('confirm false')
        wepy.reLaunch({
          url: '/pages/index'
        })
      }
    }
  }
}
export default loginInterface
