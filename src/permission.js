import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message, MessageBox } from 'element-ui'
import { getToken, getUser, removeToken } from '@/utils/auth' // 验权
import { config } from '@/config'
import { getUserUrlList } from '@/api/power-url'
const whiteList = ['/login'] // 不重定向白名单
function Validate(next) {
  // 拉取用户信息
  if (store.getters.user !== '' && store.getters.userInfo === '') {
    store.dispatch('GetInfo').then(res => {
      next()
    }).catch((err) => {
      if (config.user) return
      store.dispatch('FedLogOut').then(() => {
        Message.error(err || 'Verification failed, please login again')
        next({ path: '/' })
      })
    })
  } else {
    next()
  }
  // 拉去用户url
  if (store.getters.user !== '' && store.getters.userUrl === '') {
    getUserUrlList({
      userid: store.getters.user.userId,
      menutype: 0
    }).then(res => {
      if (!res.data.data || res.data.data.length === 0) {
        MessageBox.alert('对不起，您的权限不足，无法登陆，请确认账号或与管理员联系', '提示', {
          confirmButtonText: '确定',
          type: 'error'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
          next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
          next()
        })
      } else if (res.data.errno <= 0) {
        Message.error(res.data.msg)
        return
      } else {
        store.dispatch('UserUrl', res.data.data)
        next()
      }
    }).catch(() => {
      next()
    })
  } else {
    next()
  }
  next()
}
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (config.user || getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      Validate(next)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
