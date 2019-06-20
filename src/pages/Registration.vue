<template lang="pug">
q-page.flex.items-center.base-padding
  .row.full-width.justify-center
    .col-lg-6.col-md-6.col-12
      q-form.q-gutter-md.text-center(@submit="handleSubmit")
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
        q-btn(:label="$trans('labels', 'continue')"
              type="submit"
              color="white"
              text-color="black")
</template>

<script>
import { mapActions } from 'vuex'
import { input_validators } from 'src/mixins'

export default {
  name: 'RegistrationPage',

  mixins: [input_validators],

  data () {
    return {
      user_email: null,
      user_name: null
    }
  },

  computed: {
    user_data () {
      return {
        name: this.user_name,
        email: this.user_email
      }
    }
  },

  methods: {
    ...mapActions('user', ['register_user']),

    async handleSubmit () {
      await this.register_user(this.user_data)
    }
  }
}
</script>
