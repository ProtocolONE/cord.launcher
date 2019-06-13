<template lang="pug">
q-page {{ $route.name }}
</template>

<script>
export default {
  name: 'HomePage',

  async created () {
    let url = 'https://qilinstoreapi.tst.protocol.one/api/v1/games/cb6711fb-40dd-47d0-8f90-40e84256a63a'
    let { data } = await this.$axios(url)
    console.log(data)
  }
}
</script>
