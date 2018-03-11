import wepy from 'wepy'
import http from './request'
import { env, host } from '../config'
import { Base64 } from 'js-base64'

function isLogin(){
  const token = wepy.getStorageSync('_token')  
  return (token ? true : false)
}

async function createAccount(data = {}) {
  const res = await http({
    url: host + '/api/coin/v1/accounts',
    method: 'POST',
    data: data
  })
  return res.data
}

async function updateAccount(data = {}) {
  const res = await http({
    url: host + '/api/coin/v1/accounts/update_info',
    method: 'PUT',
    data: data
  })
  return res.data 
}

async function getUserInfo() {
  const res = await http({
    url: host + '/api/coin/v1/accounts/info',
    method: 'GET'
  })
  return res.data
}

async function getSiteConfigs() {
  const res = await http({
    url: host + '/api/coin/v1/site_configs',
    method: 'GET'
  })
  return res.data
}

async function setWallet(data = {}) {
  const res = await http({
    url: host + '/api/coin/v1/accounts/wallet',
    method: 'PUT',
    data: data
  })
  return res.data
}

async function setInvite(data = {}) {
  const res = await http({
    url: host + '/api/coin/v1/accounts/invite',
    method: 'POST',
    data: data
  })
  return res.data
}

async function setDrawLog(data={}){
  const res = await http({
    url: host + '/api/coin/v1/bt_draw_logs',
    method: 'POST',
    data: data
  })
  return res.data 
}

async function getDrawLogs(data={}){
  const res = await http({
    url: host + '/api/coin/v1/bt_draw_logs',
    method: 'GET',
    data: data
  })
  return res.data 
}

async function getInviteLogs(data={}){
  const res = await http({
    url: host + '/api/coin/v1/bt_invite_logs',
    method: 'GET',
    data: data
  })
  return res.data 
}

function getVerifyImg(key = 1 ) {  
  if(key == 1)
    return host + '/rucaptcha'   
  else {
    return host + '/api/verify_code'
  }
}

async function activeInviteLog(data={}) {
  const res = await http({
    url: host + '/api/coin/v1/bt_invite_logs/active',
    method: 'POST',
    data: data
  })
  return res.data 
}

module.exports = {
  createAccount,
  getUserInfo,
  getSiteConfigs,
  setWallet,
  setDrawLog,
  getDrawLogs,
  getInviteLogs,
  isLogin,
  setInvite,
  getVerifyImg,
  updateAccount,
  activeInviteLog,

}