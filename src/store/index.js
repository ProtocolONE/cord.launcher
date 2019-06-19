import Vue from 'vue'
import Vuex from 'vuex'

import oauth2 from './oauth2'
import user from './user'
import game from './game'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      oauth2,
      user,
      game
    },

    getters: {
      get_api_url: () => process.env.API_URL || 'https://qilinstoreapi.tst.protocol.one/api/v1',
      get_access_token: () => localStorage.getItem('access_token')
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
