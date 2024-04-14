import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import guards from './guards'
const { beforeEach, afterEach } = guards

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

beforeEach.forEach(guard => {
  if (guard && typeof guard === 'function') {
    router.beforeEach((to, from, next) => guard(to, from, next))
  }
})
afterEach.forEach(guard => {
  if (guard && typeof guard === 'function') {
    router.afterEach((to, from) => guard(to, from))
  }
})

export default router
