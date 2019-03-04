import Vue from 'vue'
import Vuex from 'vuex'

import defaultStore from './default-store'

// --- modules
import initial from './initial'
import game from './game'
import shop from './shop'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    ...defaultStore,
    modules: {
      initial,
      game,
      shop
    }
  })

  return Store
}
