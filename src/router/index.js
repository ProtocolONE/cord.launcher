import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // Router.beforeEach((to, from, next) => {
  //   let access_token = localStorage.getItem('accessToken')
  //   if (!access_token) {
  //     next({  })
  //     // window.location = 'http://localhost/oauth2/auth?response_type=code&client_id=5cf52565f549611e2d12802a&scope=openid&redirect_uri=http%3A//localhost%3A8080/auth&state=ly7ddc4i36o'
  //   }
  //   else next()
  // })

  return Router
}
