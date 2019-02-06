<template>
<app-layout id="q-app">
  <!-- TODO: keep-alive ? -->
  <!-- TODO: transition -->
  <!--<keep-alive>-->
  <router-view/>
</app-layout>
</template>

<script>
import AppLayout from '@layouts/app/AppLayout'

// --- TODO: вынести куда-то в более адекватное место
function calculateViewportHeight (percent = 0.01) {
  let vh = (window.innerHeight * percent)
  document.documentElement.style.setProperty('--vh', `${ vh }px`)
}

export default {
  name: 'App',

  components: { AppLayout },

  // --- TODO: вынести куда-то в более адекватное место
  mounted () {
    window.addEventListener('resize', calculateViewportHeight, false)
    void calculateViewportHeight()
  }
}
</script>
