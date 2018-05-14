import wepy from 'wepy'
import api from '../services/api'

export default class UserInfoMixin extends wepy.mixin {
  data = {
    userInfo: {
      id: null,
      nickname: '未登录',
      avatar_url: '/images/unlogin.png', 
      all_amount: 0,
      draw_amount: 0,
      unactive_amount: 0           
    },
    site_configs: {}

  }
  methods = {
    
  }

  sleep (s) {
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

  async loadUserInfo () {           
    if(api.isLogin()) {
      this.userInfo = await api.getUserInfo()  
      this.$apply()
    }    
  }

  async loadSiteConfigs () {
    this.site_configs = wepy.getStorageSync('site_configs')
    // this.site_configs = await api.getSiteConfigs()    
    this.$apply()
  }

  async onLoad() {
  }
}
