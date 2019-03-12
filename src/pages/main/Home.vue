<template>
<article id="home" class="cord-padding">
  <h1 class="text-center">{{ message }}</h1>
</article>
</template>

<script>
import { remote } from 'electron'

export default {
  name: 'Home',

  data () {
    return {
      message: `You have ${ remote.process.platform } platform`
    }
  }
}
</script>
