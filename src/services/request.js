import wepy from 'wepy'
import loginInterface from './login'

export default async function request (options, url) {
  if (options.header) {
    options.header['wechat-token'] = wepy.getStorageSync('_token')
  } else {
    options.header = { 'wechat-token': wepy.getStorageSync('_token') }    
  }
  
  let response = await wepy.request({
    url: options.url || url,
    method: options.method || 'GET',
    data: options.data || {},
    header: options.header
  })

  if (response.statusCode === 403) {    
    const scopes = await wepy.getSetting()    
    if (!scopes.authSetting['scope.userInfo']) {
      await wepy.openSetting()  
      await loginInterface.login()
    } else {
      await loginInterface.login()  
    }
    
    // return await request(options)    
  } else if (response.statusCode === 500) {
    wepy.showModal({
      title: '提示',
      content: `错误提示 ${response.data.msg}`
    })
    return response
  } else {
    return response
  }
}
