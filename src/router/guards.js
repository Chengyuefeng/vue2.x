// import { hasAuthority } from '@/utils/authority-utils'
import NProgress from 'nprogress'
// import storage from 'store'
// import store from '@/store'

NProgress.configure({ showSpinner: false })

const loginIgnore = {
  names: ['404', '403'], //根据路由名称匹配
  paths: ['/home', '/config'], //根据路由fullPath匹配

  // 用户访问app页面
  appPaths: [],
  /**
   * 判断路由是否包含在该配置中
   * @param route vue-router 的 route 对象
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path)
  },
  appIncludes(route) {
    // console.log('app include', route.name, this.appPaths.includes(route.path))
    return this.appPaths.includes(route.path)
  }
}

// const checkAuthorization = function () {
//   return storage.get('Authorization')
// }

/**
 * 进度条开始
 * @param to
 * @param form
 * @param next
 */
const progressStart = (to, from, next) => {
  // start progress bar
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
}

// 验证当前页面是否可以访问
// const checkUsrRole = function (to) {
//   if (loginIgnore.includes(to)) {
//     return true
//   }
//   const menu = storage.get('nrrmenu')
//   if (menu) {
//     try {
//       return menu.some((first, l1Index) =>
//         first.list.some((second) =>
//           second.list.some((third, index) => {
//             const flag = (to.path + '/').toLowerCase().includes(third.jump.toLowerCase())
//             if (flag) {
//               store.commit('setting/setOpenedMenuIndex', `${l1Index}-${index}`)
//             }
//             return flag
//           })
//         )
//       )
//     } catch (err) {
//       return false
//     }
//   } else {
//     return false
//   }
// }

/**
 * 登录守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
// import { message } from 'ant-design-vue'

const loginGuard = (to, from, next) => {
  // if (!loginIgnore.includes(to) && !checkAuthorization()) {
  //   message.warning('登录已失效，请重新登录')
  //   next({ path: '/login' })
  // } else
  if (loginIgnore.appIncludes(to)) {
    next()
  }
  // else if (!checkUsrRole(to)) {
  //   message.warning(`对不起，您无权访问页面: ${to.fullPath}，请联系管理员`)
  //   next({ path: '/403' })
  // }
  else {
    next()
  }
}

/**
 * 权限守卫
 * @param to
 * @param form
 * @param next
 * @param options
 */
// const authorityGuard = (to, from, next, options) => {
//   const { store, message } = options
//   const permissions = store.getters['account/permissions']
//   const roles = store.getters['account/roles']
//   if (!hasAuthority(to, permissions, roles)) {
//     message.warning(`对不起，您无权访问页面: ${to.fullPath}，请联系管理员`)
//     next({ path: '/403' })
//     // NProgress.done()
//   } else {
//     next()
//   }
// }

/**
 * 混合导航模式下一级菜单跳转重定向
 * @param to
 * @param from
 * @param next
 * @param options
 * @returns {*}
 */
// const redirectGuard = (to, from, next, options) => {
//   const { store } = options
//   const getFirstChild = (routes) => {
//     const route = routes[0]
//     if (!route.children || route.children.length === 0) {
//       return route
//     }
//     return getFirstChild(route.children)
//   }
//   if (store.state.setting.layout === 'mix') {
//     const firstMenu = store.getters['setting/firstMenu']
//     if (firstMenu.find((item) => item.fullPath === to.fullPath)) {
//       store.commit('setting/setActivatedFirst', to.fullPath)
//       const subMenu = store.getters['setting/subMenu']
//       if (subMenu.length > 0) {
//         const redirect = getFirstChild(subMenu)
//         return next({ path: redirect.fullPath })
//       }
//     }
//   }
//   next()
// }

/**
 * 进度条结束
 * @param to
 * @param form
 * @param options
 */
const progressDone = () => {
  // finish progress bar
  NProgress.done()
}

export default {
  beforeEach: [progressStart, loginGuard],
  afterEach: [progressDone]
}
