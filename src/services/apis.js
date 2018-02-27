import wepy from 'wepy'
import http from './request'
import { env, host } from '../config'

async function createAccount(data = {}) {
  const res = await http({
    url: host + '/api/pic/v1/accounts',
    method: 'POST',
    data: data
  })
  return res.data
}


module.exports = {
  createAccount,
  
}