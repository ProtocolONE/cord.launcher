<template lang="pug">
q-page.row.gutter-sm.account

  .col-lg-6.col-md-6.col-sm-12.col-xs-12
    .row: .col-lg-8.col-12
      base-title.q-mb-xl.text-white.text-bold(level="5") {{ $trans('titles', 'accountName') }}
      base-input.q-mb-xl(v-model="account.name" readonly)
      base-button.q-mb-xl {{ $trans('buttons', 'change') }}

    .row: .col-lg-6.col-12
      base-title.q-mb-xl.text-white.text-bold(level="5") {{ $trans('labels', 'language') }}
      base-select.q-mb-xl(
        v-model="account.primaryLanguage"
        :label="$trans('labels', 'primaryLanguage')"
        :options="languagesList"
      )
      base-select.q-mb-xl(
        v-for="(locale, i) in account.additionalLanguages"
        v-model="account.additionalLanguages[i]"
        :key="locale"
        :label="$trans('labels', 'additionalLanguage')"
        :options="languagesList"
      )
      base-button.q-mb-xl {{ $trans('buttons', 'add') }}

  .col-lg-6.col-md-6.col-sm-12.col-xs-12
    base-title.text-white(level="5") {{ $trans('titles', 'linkedAccounts') }}

    .row.gutter-sm.q-mb-lg.items-center(
      v-for="({ icon, label }, i) in account.linkedAccounts"
      :key="label + i"
    )
      .col-auto
        q-btn.q-pa-none
          box-icon(size="64" :icon="`${ icon } fa-2x`" background="#343434")
      .col-auto {{ label }}
      .col-auto.q-ml-auto
        base-button.q-mr-sm(icon="fas fa-pen" flat round dark)
        base-button(icon="far fa-times-circle" flat round dark)

    .row: base-button.q-ml-auto {{ $trans('buttons', 'add') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'
import { cloneDeep } from 'lodash'
import { UserAccount } from 'interfaces'

import BoxIcon from 'components/BoxIcon'

@Component({
  components: { BoxIcon }
})
export default class Account extends Vue {
  @State('locales') locales: Array<string>
  @namespace('user').State(state => cloneDeep(state.account)) account: UserAccount

  get languagesList () {
    return this.locales.map(locale => ({
      label: this.$trans('locales', locale),
      value: locale
    }))
  }
}
</script>
