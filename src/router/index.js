import Vue from 'vue'
import VueRouter from 'vue-router'

import { get, pick } from 'lodash-es'

import routes from './routes'

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
  let electron_is_redirected = false

  Router.beforeEach(async (to, from, next) => {
    // --- check token expires and clear token if its exist
    let token_expires = store.state.oauth2.token_expires
    if (token_expires && Number(token_expires) <= Date.now()) {
      // --- TODO: check user is logged in auth1
      return next({ name: 'logout' })
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
      let user_exist = await store.dispatch('user/login')
      if (user_exist) {
        return next({ name: 'home' })
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

    // --- update route url for electron storage
    if (process.env.MODE === 'electron') {
      let { ipcRenderer } = require('electron')

      if (!electron_is_redirected) {
        let electron_store = store.getters.get_electron_store
        let electron_last_route = electron_store.get('route')

        electron_is_redirected = true

        if (electron_last_route) {
          return next(electron_last_route)
        }
      }

      let dummy_routes = ['login', 'logout', 'registration', 'oauth2']
      if (dummy_routes.includes(to.name)) {
        ipcRenderer.send('update-route-url', null)
      }
      else {
        let route = pick(to, ['name', 'path', 'query', 'params', 'meta'])
        ipcRenderer.send('update-route-url', route)
      }
    }

    return next()
  })

  return Router
}
