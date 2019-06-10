import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      language: localStorage.getItem('language') || 'en-us',
      access_token: localStorage.getItem('access_token') || null
    },

    actions: {
      async logout ({ commit }) {
        commit('remove_token')
        await axios('http://localhost:3000/logout', { withCredentials: true })
          // getting rid of 500
          .catch(() => null)
      }
    },

    mutations: {
      set_token (state, access_token) {
        localStorage.setItem('access_token', access_token)
        state.access_token = access_token
      },

      remove_token (state) {
        localStorage.removeItem('access_token')
        state.access_token = null
      }
    },

    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
