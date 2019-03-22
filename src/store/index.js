import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'

import shop from './shop'
import game from './game'
import user from './user'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state,
    mutations,
    modules: {
      shop,
      game,
      user
    }
  })

  return Store
}
