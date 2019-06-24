<template lang="pug">
q-page.row.text-white
  .col-12.col-md-10.col-lg-8
    q-form(:id="formId" @submit="handle_submit")

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

      .row.q-col-gutter-md: .col-12.col-md-6
        .row.q-col-gutter-md
          .col-12
            q-select(
                v-model="primary_language"
                :options="languages"
                :label="$trans('labels', 'primary_language')"
                color="white"
                dark
                clearable)
</template>

<script>
import { cloneDeep, map, merge } from 'lodash-es'

export default {
  name: 'UserAccountPage',

  props: {
    user: Object,
    formId: String
  },

  data () {
    let account = this.get_account_data()
    let primary_language = null
    let languages = map(this.$i18n.messages, (_, locale) => ({
      label: this.$trans('locales', locale),
      value: locale
    }))

    if (account.primary_language) {
      let val = account.primary_language
      primary_language = {
        label: languages.find(({ value }) => value === val).label,
        value: val
      }
    }

    return {
      account,
      primary_language,
      languages
    }
  },

  computed: {
    data_for_save () {
      return merge(this.account, {
        primary_language: this.primary_language && this.primary_language.value
      })
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

    handle_submit () {
      this.$emit('save', this.data_for_save)
    }
  }
}
</script>
