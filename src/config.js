// 全局的配置文件
const env = 'development'
// const env = 'test'
// const env = 'production'
const version = 1.0

const hosts = {
  development: 'http://localhost:4000',
  test:        'https://niubibeta.com:8080',
  production:  'https://niubibeta.com'
}

const host = hosts[env]

module.exports = {
  env, 
  version,
  host
}