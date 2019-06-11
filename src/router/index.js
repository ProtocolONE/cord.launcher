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
    // --- logout
    if (to.name === 'logout') {
      await store.dispatch('oauth2/logout')
      return next({ name: 'oauth2' })
    }

    // --- check token expires
    let token_expires = store.state.oauth2.token_expires
    if (token_expires) {
      token_expires = Number(token_expires)
      if (token_expires <= Date.now()) {
        store.commit('oauth2/remove_token')
        store.commit('oauth2/remove_token_expires')
      }
      // --- refresh token if prod
      if (process.env.PROD) {
        await store.dispatch('oauth2/refresh_token')
      }
    }

    // --- check token and requires auth for routes
    let access_token = store.state.oauth2.access_token
    let requires_auth = get(to, ['meta', 'requires_auth'], true)
    if (requires_auth && !access_token) {
      sessionStorage.setItem('route', JSON.stringify(to))
      return next({ name: 'oauth2' })
    }
    else if (to.name === 'oauth2' && access_token) {
      return next({ name: 'home' })
    }

    return next()
  })

  return Router
}
