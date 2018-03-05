import wepy from 'wepy'
import { host } from '../config'
import api from './api'

const loginInterface = {
  async getUserInfo () {
    const loginData = await wepy.login()
    const userinfo = await wepy.getUserInfo()
    // console.log('userinfo', userinfo)
    userinfo.code = loginData.code
    return userinfo
  },

  async saveUserInfo () {
    let userinfoRaw = {}
    let userinfo = {}
    // const parent_id = 1
    userinfoRaw = await loginInterface.getUserInfo()
    // console.log(userinfoRaw)
    userinfo = await api.createAccount({userinfo: userinfoRaw.userInfo,
        code: userinfoRaw.code,        
      })
    console.log('saveUserInfo', userinfo)    
    await wepy.setStorage({
      key: '_token',
      data: userinfo.token
    })
    return userinfo
  },

  async login (options = {}) {   
    try {      
      const token = wepy.getStorageSync('_token')
      if(!token) {
        const userinfo = await loginInterface.saveUserInfo()  
        wepy.reLaunch({url: '/pages/index'})
        return userinfo
      }                  
    } catch (e) {
      console.log('error Userlog', e)
      if(!(e.errMsg.indexOf('getUserInfo:fail') >= 0) ){
          wepy.showModal({
            title: '友情提示',
            content: `获取用户信息失败， 请关闭重新进入`,
          }) 
          return
      }
      const res = await wepy.showModal({
        title: '友情提示',
        content: `登录失败，点击确定重新授权`,
      })
      if(res.confirm == true) {
        const scopes = await wepy.openSetting()  
        // const scopes = wepy.getSetting()
        if (scopes.authSetting['scope.userInfo'] == true) {                    
          const userinfo = await loginInterface.saveUserInfo()                
          console.log('授权成功')
          wepy.reLaunch({url: '/pages/index'})
          return userinfo            
        } else {
          console.log('授权失败')
          wepy.reLaunch({url: '/pages/index'})
        }
      } else {
        console.log('confirm false')
        wepy.reLaunch({url: '/pages/index'})
      }      
    }
  }
}

export default loginInterface
