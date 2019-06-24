import Vue from 'vue'
import Vuex from 'vuex'

import { LocalStorage } from 'quasar'

import oauth2 from './oauth2'
import user from './user'
import game from './game'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function () {
  const Store = new Vuex.Store({
    modules: {
      oauth2,
      user,
      game
    },

    getters: {
      get_api_url: () => process.env.QILINSTORE_API_URL,
      get_access_token: () => LocalStorage.getItem('access_token')
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.NODE_ENV === 'development'
  })

  return Store
}
