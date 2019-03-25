<template lang="pug">
q-page.security
  base-title.q-mb-lg.text-white(level="5") {{ $trans('titles', 'password') }}
  base-button.q-mb-xl {{ $trans('labels', 'changePassword') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { cloneDeep } from 'lodash'
import { UserSecurity } from 'interfaces'

@Component
export default class Security extends Vue {
  @namespace('user').State(state => cloneDeep(state.security)) security: UserSecurity
}
</script>
