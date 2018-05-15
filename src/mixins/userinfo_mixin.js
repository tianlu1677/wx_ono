import wepy from 'wepy'
import api from '../services/api'

export default class UserInfoMixin extends wepy.mixin {
  data = {
    userInfo: {
      id: null,
      nickname: '未登录',
      avatar_url: '',
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
  }

  async loadUserInfo () {
    if (wepy.getStorageSync('_token')) {
      try {
        this.userInfo = await api.getUserInfo()
        this.$apply()
      } catch (e) {

      }

    }
  }

  async loadSiteConfigs () {
    this.site_configs = wepy.getStorageSync('site_configs')
    if (!!this.site_configs) {
      this.site_configs = await api.getSiteConfigs()
    }
    this.$apply()
  }

  async onLoad() {
  }
}
