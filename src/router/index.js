import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { get } from 'lodash-es'

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
    if (to.name === 'logout') {
      await store.dispatch('oauth2/logout')
      return next({ name: 'oauth2' })
    }

    let access_token = store.state.oauth2.access_token
    let requires_auth = get(to, ['meta', 'requires_auth'], true)

    if (!access_token && requires_auth) {
      sessionStorage.setItem('route', JSON.stringify(to))
      return next({ name: 'oauth2' })
    }
    else if (access_token && to.name === 'oauth2') {
      return next({ name: 'home' })
    }

    return next()
  })

  return Router
}
