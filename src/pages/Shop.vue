<template lang="pug">
q-page.base-padding
  q-form(@submit="handle_submit")
    q-input(
        v-model="game_id"
        label="Enter a game id"
        clearable
        standout
        dark)
    br
    q-btn(
        label="Submit"
        type="submit"
        color="white"
        text-color="black")
</template>

<script>
export default {
  name: 'ShopPage',

  data () {
    return {
      game_id: null
    }
  },

  methods: {
    handle_submit () {
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
