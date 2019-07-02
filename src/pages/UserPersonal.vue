<template lang="pug">
q-page.row.text-white
  .col-12.col-md-10.col-lg-8
    q-form(:id="formId" @submit="handle_submit")

      h6.base-title.text-bold.q-mt-none {{ page_title }}

      .row.q-col-gutter-md
        .col-12.col-md-6
          q-input(
              v-model="personal.first_name"
              :label="$trans('labels', 'first_name')"
              color="white"
              dark)
        .col-12.col-md-6
          q-input(
              v-model="personal.last_name"
              :label="$trans('labels', 'last_name')"
              color="white"
              dark)

        .col-12
          span.subtitle.text-grey-7.text-bold {{ $trans('labels', 'date_of_birth') }}

        .col-4.col-md-4
          q-select(
              v-model="birth_date.month"
              :options="months"
              :label="$trans('labels', 'month')"
              color="white"
              dark
              @input="birth_date.day = null")

        .col-4.col-md-2
          q-select(
              v-model="birth_date.day"
              :options="days"
              :label="$trans('labels', 'day')"
              :disable="!birth_date.month"
              color="white"
              dark)

        .col-4.col-md-3
          q-select(
              v-model="birth_date.year"
              :options="years"
              :label="$trans('labels', 'year')"
              color="white"
              dark)

      h6.base-title.text-bold.q-mt-lg {{ $trans('labels', 'address') }}

      .row.q-col-gutter-md: .col-12.col-md-6
        .row.q-col-gutter-md
          .col-12
            q-select(
                v-model="personal.address.country"
                :options="countries"
                :label="$trans('labels', 'country')"
                color="white"
                use-input
                dark
                @filter="search_country")

          .col-12
            q-select(
                v-model="personal.address.city"
                :options="cities"
                :label="$trans('labels', 'city')"
                :disable="!personal.address.country"
                color="white"
                use-input
                dark
                @filter="search_city")

          .col-md-4.col-lg-4.col-12
            q-input(
                v-model="personal.address.postal_code"
                :label="$trans('labels', 'postal_code')"
                mask="######"
                color="white"
                dark)

          .col-md-8.col-lg-8.col-12
            q-select(
                v-model="personal.address.region"
                :options="regions"
                :label="$trans('labels', 'region')"
                :disable="!personal.address.country"
                color="white"
                use-input
                dark
                @filter="search_region")

          .col-12
            q-input(
                v-model="personal.address.line_1"
                :label="`${$trans('labels', 'address_line')} 1`"
                color="white"
                dark)

          .col-12
            q-input(
                v-model="personal.address.line_2"
                :label="`${$trans('labels', 'address_line')} 2`"
                color="white"
                dark)
</template>

<script>
import moment from 'moment'
import { cloneDeep, map, merge } from 'lodash-es'

// --- TODO: перенести на какое-нибудь api
import countries from 'src/statics/countries'
import regions from 'src/statics/regions'

const countries_list = map(countries, (_, country) => country)

function get_cities_list (country) {
  return countries[country]
}

function get_regions_list (country) {
  let _regions = regions.filter(({ countryName }) => countryName === country)
  if (_regions.length) {
    return _regions[0].regions.map(region => region.name)
  }
  return []
}

export default {
  name: 'UserPersonalPage',

  props: {
    user: Object,
    formId: String
  },

  data () {
    let personal = this.get_personal_data()
    let birth_date = personal.birth_date
    let [month, day, year] = [null, null, null]

    if (birth_date) {
      birth_date = moment(birth_date)
      day = birth_date.get('date')
      year = birth_date.get('year')
      month = {
        label: birth_date.format('MMMM'),
        value: birth_date.get('month')
      }
    }

    return {
      personal,
      birth_date: {
        month,
        day,
        year
      },
      countries: countries_list,
      cities: [],
      regions: []
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
        personal: merge(this.personal, {
          birth_date: (() => {
            let { year, month, day } = this.birth_date
            if (year && month && day) {
              return new Date(year, month.value, day).toISOString()
            }
            return null
          })()
        })
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
      this.regions = get_regions_list(country)
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

    search_region (val, update) {
      setTimeout(() => {
        update(() => {
          let regions_list = get_regions_list(this.personal.address.country)
          if (!val) {
            this.regions = regions_list
          }
          else {
            let query = val.toLowerCase()
            this.regions = regions_list.filter(v => Boolean(~v.toLowerCase().indexOf(query)))
          }
        })
      }, 300)
    },

    handle_submit () {
      this.$emit('save', this.data_for_save)
    }
  }
}
</script>
