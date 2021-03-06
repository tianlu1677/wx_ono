// 全局的配置文件
// const env = 'development'
const env = 'production'
// const env = 'test'
const version = 1.0

const hosts = {
  test: 'https://test.niubibeta.com',
  development: 'http://localhost:4000',
  production: 'https://niubibeta.com'
}

const host = hosts[env]

module.exports = {
  env,
  version,
  host
}
