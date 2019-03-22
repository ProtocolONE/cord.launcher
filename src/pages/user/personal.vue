<template lang="pug">
q-page.personal

  base-title.text-white(level="5") {{ $trans('titles', 'userNameDate') }}

  .row.gutter-sm
    .col-lg-4.col-md-6.col-12
      base-input(v-model="user.name" :label="$trans('labels', 'firstName')")
    .col-lg-4.col-md-6.col-12
      base-input(v-model="user.lastName" :label="$trans('labels', 'lastName')")

  base-title.text-bold.q-mt-lg.q-mb-lg(level="6")
    | {{ $trans('labels', 'dateBirth') }}

  .row.gutter-sm
    .col-lg-1.col-md-4.col-sm-4.col-xs-12
      base-select(
        v-model="user.dateBirth.day"
        :label="$trans('labels', 'day')"
        :options="days"
        :disable="!user.dateBirth.month"
      )
    .col-lg-3.col-md-4.col-sm-4.col-xs-12
      base-select(
        v-model="user.dateBirth.month"
        :label="$trans('labels', 'month')"
        :options="months"
      )
    .col-lg-1.col-md-4.col-sm-4.col-xs-12
      base-select(
        v-model="user.dateBirth.year"
        :label="$trans('labels', 'year')"
        :options="years"
      )

  br
  base-title.text-bold.text-white.q-mt-lg.q-mb-lg(level="5")
    | {{ $trans('labels', 'address') }}

  .row.gutter-sm.q-mb-lg: .col-lg-4.col-md-6.col-12
    base-select(v-model="user.address.country" :label="$trans('labels', 'country')")

  .row.gutter-sm.q-mb-lg: .col-lg-4.col-md-6.col-12
    base-select(v-model="user.address.city" :label="$trans('labels', 'city')")

  .row.gutter-sm.q-mb-lg
    .col-lg-1.col-md-3.col-sm-6.col-xs-12
      base-input(v-model="user.address.postalCode" :label="$trans('labels', 'postalCode')")
    .col-lg-3.col-md-3.col-sm-6.col-xs-12
      base-select(v-model="user.address.region" :label="$trans('labels', 'region')")

  .row.gutter-sm.q-mb-lg: .col-lg-4.col-md-6.col-12
    base-input(
      v-model="user.address.addressLine1"
      :label="$trans('labels', 'addressLine') + ' 1'"
    )

  .row.gutter-sm.q-mb-lg: .col-lg-4.col-md-6.col-12
    base-input(
      v-model="user.address.addressLine2"
      :label="$trans('labels', 'addressLine') + ' 2'"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { User } from 'interfaces'

@Component
export default class UserPersonal extends Vue {
  @Prop(Object) user: User

  fieldBinding = { color: 'white', dark: true }

  get days () {
    let n = this.$moment().month(this.user.dateBirth.month).daysInMonth()

    let days = []
    while (n--) {
      days.push({ label: n.toString(), value: n.toString() })
    }

    return days
  }

  get months () {
    return this.$moment.months().map(month => ({
      label: month,
      value: month
    }))
  }

  get years () {
    let [startYear, endYear] = [1920, this.$moment().year() - 10]
    let startDate = this.$moment().year(startYear)

    let endDate = this.$moment().year(endYear)
    let n = endDate.diff(startDate, 'year', false)

    let years = []
    while (n--) {
      let value = (endYear--).toString()
      years.push({ label: value, value })
    }

    return years
  }
}
</script>
