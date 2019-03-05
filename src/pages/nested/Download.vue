<template>
<section id="download" class="row cord-padding l-game-info">

  <template v-if="OSName === 'win'">

  </template>

  <template v-else-if="OSName === 'darwin'">

  </template>

  <template v-else-if="OSName === 'linux'">
    op
  </template>

  <p v-else-if="OSName">
    We could not determine your system
  </p>

</section>
</template>

<script>
export default {
  name: 'Download',

  data () {
    return {
      OSName: null
    }
  },

  mounted () {
    this.OSName = this.getOSName()
  },

  methods: {
    getOSName () {
      function check (value) {
        return ~navigator.appVersion.indexOf(value)
      }
      if (check('Win')) return 'win'
      if (check('Mac')) return 'darwin'
      if (check('Linux')) return 'linux'
      return 'unknown'
    }
  }
}
</script>
