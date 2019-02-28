<template>
<transition name="fade" mode="out-in">

  <app-layout v-if="loaded" id="q-app">
    <keep-alive>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </keep-alive>
  </app-layout>

  <app-loader v-else/>

</transition>
</template>

<script>
import AppLayout from '@/layouts/app/AppLayout'
import AppLoader from '@/layouts/app/AppLoader'

import { mapState, mapMutations } from 'vuex'

if (process.env.NODE_ENV === 'production') {
  const Vue = require('vue').default
  const Raven = require('raven-js')
  const RavenVue = require('raven-js/plugins/vue')

  try {
    Raven
      .config('https://19b75f3e25324623991e29c1d87da0cd@sentry.tst.protocol.one/8')
      .addPlugin(RavenVue, Vue)
      .install()
    console.log('Raven is successfully installed.')
  }
  catch (error) {
    console.error(`Raven is dropped with error: ${ error }`)
  }
}

// --- TODO: вынести куда-то в более адекватное место
function calculateViewportHeight (percent = 0.01) {
  let vh = (window.innerHeight * percent)
  document.documentElement.style.setProperty('--vh', `${ vh }px`)
}

export default {
  name: 'App',

  components: { AppLayout, AppLoader },

  computed: {
    ...mapState('initial', ['loaded'])
  },

  // --- TODO: вынести куда-то в более адекватное место
  async mounted () {
    let toggleState = new Promise(async resolve => {
      await setTimeout(() => {
        this.toggleLoadedState(true)
        void resolve()
      }, 1500)
    })
    toggleState.then(() => {
      console.log(this.loaded)
      void calculateViewportHeight()
    })
    window.addEventListener('resize', calculateViewportHeight, false)
  },

  methods: {
    ...mapMutations('initial', ['toggleLoadedState'])
  }
}
</script>
