const config = {
  development: {
    env: 'development',
    path: 'http://192.168.1.54:8001',
    Expath: 'http://192.168.1.80:9527',
    user: {
      userId: '52',
      userName: '00181'
    }
  },
  test: {
    env: 'test',
    path: 'http://192.168.1.54:8001',
    Expath: 'http://192.168.1.80:9527',
    user: ''
  },
  production: {
    env: 'production',
    path: '',
    Expath: '',
    user: ''
  }
}

function setConfig() {
  // dev
  if (process && process.env && process.env.NODE_ENV === 'development') {
    return config.development
  }
  if (process && process.env && process.env.NODE_ENV === 'test') {
    return config.test
  }
  // build
  return config.production
}
exports.install = (Vue, options) => {
  Vue.prototype.globalConfig = setConfig()
}
exports.config = setConfig()
