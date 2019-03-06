<template>
<section id="download" class="row cord-padding l-game-info">

  <!-- TODO: localize and translate -->
  <a v-show="OSName" :href="linkToLauncher">
    Download for {{ title }}
  </a>

</section>
</template>

<script>
import pjson from '@/../package.json'

export default {
  name: 'Download',

  data () {
    return {
      OSName: null,
      title: null,
      ext: null,
      version: pjson.version
    }
  },

  computed: {
    linkToLauncher () {
      let { GITHUB_URL, LAUNCHER_NAME } = process.env
      let { version, ext } = this
      let url = `${ GITHUB_URL }v${ version }/`
      let launcher = `${ LAUNCHER_NAME }-${ version }.${ ext }`
      return url + launcher
    }
  },

  mounted () {
    this.OSName = this.getOSName()
    switch (this.OSName) {
      case 'win':
        this.title = 'Windows'
        this.ext = 'exe'
        break
      case 'darwin':
        this.title = 'MacOS'
        this.ext = 'dmg'
        break
      case 'linux':
        this.title = 'Debian'
        this.ext = 'deb'
        break
      default: break
    }
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
