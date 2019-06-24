<template lang="pug">
q-page.row.text-white
  .col-12.col-md-10.col-lg-8
    q-form(:id="formId" @submit="handleSubmit")

      h6.base-title.text-bold.q-mt-none {{ page_title }}

      .row.q-col-gutter-md
        .col-12.col-md-6
          q-input(
              v-model="personal.first_name"
              :label="$trans('labels', 'first_name')"
              color="white"
              dark
              clearable)
        .col-12.col-md-6
          q-input(
              v-model="personal.last_name"
              :label="$trans('labels', 'last_name')"
              color="white"
              dark
              clearable)

        .col-12
          span.subtitle.text-grey-7.text-bold {{ $trans('labels', 'date_of_birth') }}

        .col-4.col-md-4
          q-select(
              v-model="birth_date.month"
              :options="months"
              :label="$trans('labels', 'month')"
              color="white"
              dark
              clearable
              @input="birth_date.day = null")

        .col-4.col-md-2
          q-select(
              v-model="birth_date.day"
              :options="days"
              :label="$trans('labels', 'day')"
              :disable="!birth_date.month"
              color="white"
              dark
              clearable)

        .col-4.col-md-3
          q-select(
              v-model="birth_date.year"
              :options="years"
              :label="$trans('labels', 'year')"
              color="white"
              dark
              clearable)

      h6.base-title.text-bold.q-mt-lg {{ $trans('labels', 'address') }}

      .row: .col-12.col-md-6
        .row.q-col-gutter-md
          .col-12
            q-select(
                v-model="personal.address.country"
                :options="countries"
                :label="$trans('labels', 'country')"
                color="white"
                use-input
                dark
                clearable
                @filter="search_country"
                @input="personal.address.city = null")

          .col-12
            q-select(
                v-model="personal.address.city"
                :options="cities"
                :label="$trans('labels', 'city')"
                :disable="!personal.address.country"
                color="white"
                use-input
                dark
                clearable
                @filter="search_city")

          .col-md-4.col-lg-4.col-12
            q-input(
                v-model="personal.address.postal_code"
                :label="$trans('labels', 'postal_code')"
                color="white"
                dark
                clearable)

          .col-md-8.col-lg-8.col-12
            q-select(
                v-model="personal.address.region"
                :options="cities"
                :label="$trans('labels', 'region')"
                :disable="!personal.address.city"
                color="white"
                use-input
                dark
                clearable
                @filter="search_city")

          .col-12
            q-input(
                v-model="personal.address.line_1"
                :label="`${$trans('labels', 'address_line')} 1`"
                color="white"
                dark
                clearable)

          .col-12
            q-input(
                v-model="personal.address.line_2"
                :label="`${$trans('labels', 'address_line')} 2`"
                color="white"
                dark
                clearable)
</template>

<script>
import moment from 'moment'
import { cloneDeep, map } from 'lodash-es'

import countries from 'src/statics/countries'

const countries_list = map(countries, (_, country) => country)

function get_cities_list (country) {
  return countries[country]
}

export default {
  name: 'UserPersonalPage',

  props: {
    user: Object,
    formId: String
  },

  data () {
    return {
      personal: this.get_personal_data(),
      birth_date: {
        month: null,
        day: null,
        year: null
      },
      countries: countries_list,
      cities: []
    }
  },

  computed: {
    page_title () {
      let name = this.$trans('labels', 'name')
      let date_of_birth = this.$trans('labels', 'date_of_birth')
      return `${name} & ${date_of_birth}`
    },

    months () {
      let months = this.$q.lang.date.months
      return months.map((month, i) => ({
        label: month,
        value: i
      }))
    },

    days () {
      let currentMonth = this.birth_date.month && this.birth_date.month.label
      if (!currentMonth) return []

      let days = moment().month(currentMonth).daysInMonth()
      return Array
        .apply(null, { length: days })
        .map(() => days--)
    },

    years () {
      let start_year = new Date().getFullYear() - 10
      let years = 90
      return Array
        .apply(null, { length: years })
        .map(() => start_year--)
    },

    data_for_save () {
      return {
        personal: this.personal
      }
    }
  },

  watch: {
    user: {
      immediate: true,
      deep: true,
      handler (user) {
        this.personal = this.get_personal_data(user)
      }
    },

    'personal.address.country' (country) {
      this.cities = get_cities_list(country)
    }
  },

  methods: {
    get_personal_data (user = this.user) {
      return cloneDeep(user.personal)
    },

    search_country (val, update) {
      setTimeout(() => {
        update(() => {
          if (!val) {
            this.countries = countries_list
          }
          else {
            let query = val.toLowerCase()
            this.countries = countries_list.filter(v => Boolean(~v.toLowerCase().indexOf(query)))
          }
        })
      }, 300)
    },

    search_city (val, update) {
      setTimeout(() => {
        update(() => {
          let cities_list = get_cities_list(this.personal.address.country)
          if (!val) {
            this.cities = cities_list
          }
          else {
            let query = val.toLowerCase()
            this.cities = cities_list.filter(v => Boolean(~v.toLowerCase().indexOf(query)))
          }
        })
      }, 300)
    },

    handleSubmit () {
      this.$emit('save', this.data_for_save)
    }
  }
}
</script>
