<template lang="pug">
q-page.page
  q-form(@submit="handleSubmit")
    q-input(v-model="game_id"
            label="Enter a game id"
            clearable
            standout
            dark)
    br
    q-btn(label="Submit" type="submit" color="primary")
</template>

<script>
export default {
  name: 'ShopPage',

  data () {
    return {
      game_id: null
    }
  },

  async created () {
    // let url = 'https://qilinstoreapi.tst.protocol.one/api/v1/games/cb6711fb-40dd-47d0-8f90-40e84256a63a'
    // let { data } = await this.$axios(url)
    // console.log(data)
  },

  methods: {
    handleSubmit () {
      this.$router.push({
        name: 'game',
        params: {
          game_id: this.game_id
        }
      })
    }
  }
}
</script>
