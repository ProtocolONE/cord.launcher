<template>
<app-layout id="q-app">
  <keep-alive>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </keep-alive>
</app-layout>
</template>

<script>
import AppLayout from '@/layouts/app/AppLayout'

if (process.env.NODE_ENV === 'production') {
  const Vue = require('vue').default
  const Raven = require('raven-js')
  const RavenVue = require('raven-js/plugins/vue')

  try {
    Raven
      .config('https://19b75f3e25324623991e29c1d87da0cd@sentry.tst.protocol.one/8')
      .addPlugin(RavenVue, Vue)
      .install()
    console.info('Raven is successfully installed.')
  }
  catch (error) {
    console.error(`Raven is dropped with error: ${ error }`)
  }
}

// --- TODO: вынести куда-то в более адекватное место
function calculateViewportHeight (percent = 0.01) {
  try {
    let vh = (window.innerHeight * percent)
    document.documentElement.style.setProperty('--vh', `${ vh }px`)
  }
  catch (error) {
    console.error(error)
  }
}

export default {
  name: 'App',

  components: { AppLayout },

  // --- TODO: вынести куда-то в более адекватное место
  mounted () {
    try {
      window.addEventListener('resize', calculateViewportHeight, false)
      calculateViewportHeight()
    }
    catch (error) {
      console.error(error)
    }
  }
}
</script>
