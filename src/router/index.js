import Vue from 'vue'
import VueRouter from 'vue-router'

import { get } from 'lodash-es'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    let requires_auth = get(to, ['meta', 'requires_auth'], true)
    let access_token = get(store, ['state', 'access_token'], null)

    if (to.name === 'logout') {
      await store.dispatch('logout')
      return next({ name: 'auth' })
    }

    if (requires_auth && !access_token) {
      sessionStorage.setItem('route', JSON.stringify(to))
      return next({ name: 'auth' })
    }
    else if (to.name === 'auth' && access_token) {
      return next({ name: 'home' })
    }

    return next()
  })

  return Router
}
