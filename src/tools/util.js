import wepy from 'wepy'

function isPhoneNum(phoneNum) {
  const reg = /^1[0-9]{10}$/;
  return reg.test(phoneNum) 
}

module.exports = {
  isPhoneNum
}