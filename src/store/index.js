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

export default function () {
  const getters = {
    get_api_url: () => process.env.QILINSTORE_API_URL,
    get_access_token: ({ oauth2 }) => oauth2.access_token
  }

  if (process.env.MODE === 'electron') {
    let { remote } = require('electron')
    getters.get_electron_store = () => remote.getGlobal('$electron_store')
  }

  const Store = new Vuex.Store({
    modules: {
      oauth2,
      user,
      game
    },

    getters,

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.NODE_ENV === 'development'
  })

  return Store
}
