<template lang="pug">
q-page.login
  form
    .row.gutter-sm.justify-center
      .col-lg-4.col-md-6.col-12.row

        .col-12: base-title {{ $trans('titles', 'registration') }}
        .col-12.q-mb-md
          base-input(v-model="email" type="email" :label="$trans('labels', 'email')")

        .col-12.row.q-mb-md
          .col-lg-2.col-md-4.col-sm-4.col-xs-12.q-pr-md
            base-select(
              v-model="birth.day"
              :label="$trans('labels', 'day')"
              :options="days"
              :disable="!birth.month"
            )
          .col-lg-2.col-md-4.col-sm-4.col-xs-12.q-pr-md
            base-select(
              v-model="birth.month"
              :label="$trans('labels', 'month')"
              :options="months"
            )
          .col-lg-2.col-md-4.col-sm-4.col-xs-12
            base-select(
              v-model="birth.year"
              :label="$trans('labels', 'year')"
              :options="years"
            )

        .col-12.q-mb-md
          base-input(v-model="pwd" type="password" :label="$trans('titles', 'password')")
        .col-12.q-mb-md
          base-input(v-model="pwdRepeat" type="password" :label="$trans('labels', 'passwordRetype')")

        .col-12.row.q-mt-lg.items-center
          .col-6
            base-checkbox.dark(v-model="accept" label="I accept <a href='#0' style='color:#4B4B4B'>terms & conditions</a>")
          .col-6.flex.justify-end
            q-btn.capitalize(type="submit" color="white" text-color="primary") {{ $trans('labels', 'signUp') }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  data () {
    return {
      email: null,
      birth: {
        day: null,
        month: null,
        year: null
      },
      pwd: null,
      pwdRepeat: null,
      accept: false
    }
  }
})
export default class Sign extends Vue {
  get days () {
    if (this.birth.month === null) {
      return []
    }
    let n = this.$moment().month(this.birth.month).daysInMonth()
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

<style lang="stylus" scoped>
.sign
  padding: $base-padding

.dark
  color: #4B4B4B
</style>
