import wepy from 'wepy'
import http from './request'
import { env, host } from '../config'

async function createAccount(data = {}) {
  const res = await http({
    url: host + '/api/coin/v1/accounts',
    method: 'POST',
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


module.exports = {
  createAccount,
  getUserInfo

}