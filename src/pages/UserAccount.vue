<template lang="pug">
q-page.row.text-white
  .col-12.col-md-10.col-lg-8
    q-form(:id="formId" @submit="handleSubmit")

      h6.base-title.text-bold.q-mt-none {{ $trans('labels', 'account_name') }}

      .row.q-col-gutter-md
        .col-12.col-md-6
          q-input(
              v-model="account.nickname"
              :label="$trans('labels', 'account_nickname')"
              color="white"
              dark
              clearable)

      h6.base-title.text-bold.q-mt-lg {{ $trans('labels', 'language') }}

      .row: .col-12.col-md-6
        .row.q-col-gutter-md
          .col-12
            q-select(
                v-model="account.primary_language"
                :options="languages"
                :label="$trans('labels', 'primary_language')"
                color="white"
                dark
                clearable)
</template>

<script>
import { cloneDeep, map } from 'lodash-es'

export default {
  name: 'UserAccountPage',

  props: {
    user: Object,
    formId: String
  },

  data () {
    return {
      account: this.get_account_data(),
      languages: map(this.$i18n.messages, (_, locale) => ({
        label: this.$trans('locales', locale),
        value: locale
      }))
    }
  },

  computed: {
    data_for_save () {
      let { nickname, primary_language } = this.account
      return {
        account: {
          nickname,
          primary_language: primary_language && primary_language.value
        }
      }
    }
  },

  watch: {
    user: {
      immediate: true,
      deep: true,
      handler (user) {
        this.account = this.get_account_data(user)
      }
    }
  },

  methods: {
    get_account_data (user = this.user) {
      return cloneDeep(user.account)
    },

    handleSubmit () {
      this.$emit('save', this.data_for_save)
    }
  }
}
</script>
