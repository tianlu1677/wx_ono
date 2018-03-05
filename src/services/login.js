import wepy from 'wepy'
import { host } from '../config'

const loginInterface = {
  async getUserInfo () {
    const loginData = await wepy.login()
    const userinfo = await wepy.getUserInfo()
    console.log('userinfo', userinfo)
    userinfo.code = loginData.code
    return userinfo
  },

  async login (options = {}) {
    let userinfoRaw = {}
    let userinfo = {}
    const parent_id = 1 //options.query.parent_id
    console.log('logins', options)

    try {
      userinfoRaw = await loginInterface.getUserInfo()
      // console.log(userinfoRaw)
      userinfo = await wepy.request({
        url: host + '/api/coin/v1/accounts',
        method: 'POST',        
        dataType: 'json',
        data: {
          userinfo: userinfoRaw.userInfo,
          code: userinfoRaw.code,
          parent_id: parent_id
        }
      })
      const scopes = await wepy.getSetting()
      // console.log('scopes', scopes)
      // if (scopes.authSetting['scope.userInfo']) {
        // wepy.reLaunch({url: '/pages/index'})                
      // }      
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

      // wepy.showModal({
      //     title: '友情提示',
      //     content: '获取用户信息失败，您不授权无法进入'
      // }).then(function(res) {
      //   if (res.confirm) {
      //     console.log('confirm')
      //     wepy.openSetting() 
      //     await this.login()
      //     // await loginInterface.login()
      //   }
      // })
    }
  }
}

export default loginInterface
