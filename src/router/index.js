import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { get } from 'lodash-es'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

// --- TODO: api/me
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

  // --- TODO: разбить на более мелкие куски кода, а то уже простыня...
  // --- возможно стоит перенести в роуты как beforeEnter
  // --- добавить проверку на логин/регу/логаут, чтобы не дергать методы лишний раз

  Router.beforeEach(async (to, from, next) => {
    // --- TODO: check user is logged in auth1
    // --- check token expires and refresh token if its needed
    let token_expires = store.state.oauth2.token_expires
    if (token_expires && Number(token_expires) <= Date.now()) {
      try {
        await store.dispatch('oauth2/refresh_token')
      }
      catch (err) {
        console.error(err)
      }
    }

    // --- check token and requires auth for routes
    let access_token = store.state.oauth2.access_token
    let requires_auth = get(to, ['meta', 'requires_auth'], true)
    if (requires_auth && !access_token) {
      return next({ name: 'oauth2' })
    }
    else if (to.name === 'oauth2' && access_token) {
      return next({ name: 'home' })
    }

    // --- registration
    if (to.name === 'registration') {
      let user_is_registered = await store.dispatch('user/check_is_registered')
      if (user_is_registered) {
        return next({ name: 'login' })
      }
      return next()
    }

    // --- login
    if (to.name === 'login') {
      await store.dispatch('user/login')
      return next({ name: 'home' })
    }

    // --- logout
    if (to.name === 'logout') {
      await store.dispatch('oauth2/logout')
      await store.dispatch('user/logout')
      return next({ name: 'oauth2' })
    }

    return next()
  })

  return Router
}
