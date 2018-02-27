import wepy from 'wepy'
import { host } from '../config'

const loginInterface = {
  async getUserInfo () {
    const loginData = await wepy.login()
    const userinfo = await wepy.getUserInfo()
    userinfo.code = loginData.code
    return userinfo
  },

  async login () {
    let userinfoRaw = {}
    let userinfo = {}

    try {
      userinfoRaw = await loginInterface.getUserInfo()
      console.log(userinfoRaw)
      userinfo = await wepy.request({
        url: host + '/api/pic/v1/accounts',
        method: 'POST',        
        dataType: 'json',
        data: {
          userinfo: userinfoRaw.userInfo,
          code: userinfoRaw.code
        }
      })
      const scopes = await wepy.getSetting()
      // console.log('scopes', scopes)
      if (!scopes.authSetting['scope.userInfo']) {
        wepy.reLaunch({url: '/pages/home'})                
      }      
      await wepy.setStorage({
        key: '_token',
        data: userinfo.data.token
      })
      // await wepy.setStorage({
        // key: 'userinfo',
        // data: userinfo.data
      // })
      return userinfo.data
    } catch (e) {      
      wepy.showModal({
        title: '友情提示',
        content: `获取用户信息失败， 请关闭重新进入 ${e.errMsg}`
      })
    }
  }
}

export default loginInterface
