<template lang="pug">
q-page.flex.items-center.base-padding
  .row.full-width.justify-center
    .col-lg-6.col-md-6.col-12
      q-form.q-gutter-sm.text-center.text-white(@submit="handleSubmit")
        q-input(v-model="user_email"
                :label="$trans('labels', 'user_email')"
                :rules="not_empty"
                type="email"
                clearable
                standout
                dark)
        q-input(v-model="user_name"
                :label="$trans('labels', 'user_name')"
                :rules="not_empty"
                clearable
                standout
                dark)
        .flex.justify-between
          q-checkbox.q-checkbox(v-model="remember_user"
                                :label="$trans('labels', 'remember_me')"
                                text-color="teal"
                                dark)
          q-btn(:label="$trans('labels', 'continue')"
                type="submit"
                color="white"
                text-color="black")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { input_validators } from 'src/mixins'

export default {
  name: 'RegistrationPage',

  mixins: [input_validators],

  data () {
    return {
      user_email: null,
      user_name: null,
      remember_user: false
    }
  },

  computed: {
    ...mapState('oauth2', ['user_info']),

    user_data () {
      return {
        name: this.user_name,
        email: this.user_email
      }
    }
  },

  created () {
    if (this.user_info) {
      this.user_email = this.user_info.email
      try {
        // --- get user name like anything until "@"
        this.user_name = this.user_info.email.match(/[^@]*/i)[0]
      }
      catch (err) {
        console.error(err)
      }
    }
  },

  methods: {
    ...mapActions('user', ['register']),

    async handleSubmit () {
      await this.register(this.user_data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-checkbox
  position: relative
  right: 10px
</style>
