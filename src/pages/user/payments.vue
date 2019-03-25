<template lang="pug">
q-page.row.gutter-sm.payments

  .col-lg-5.col-md-5.col-sm-12.col-xs-12
    .row: .col-lg-10.col-12

      header.payments__header
        base-title.q-mb-none.text-white(level="5") {{ $trans('titles', 'paymentMethods') }}

      .row.gutter-sm(v-for="({ card }, i) in methods" :key="card + i")
        .col-10.q-mb-md
          base-button.full-width.roboto.flex.items-center.payment-card
            q-icon.q-mr-auto(name="fab fa-cc-mastercard")
            b.q-mr-auto {{ card }}
        .col-2: base-button(icon="far fa-times-circle" flat round dark)

      base-button.q-mt-lg {{ $trans('buttons', 'add') }}

  .col-lg-7.col-md-7.col-sm-12.col-xs-12
    header.row.justify-between.payments__header
      .col-auto.flex
        base-title.q-mb-none.text-white(level="5") {{ $trans('titles', 'ordersHistory') }}
      .col-auto.q-mr-auto.q-ml-auto
        base-search(v-model="query")
      .col-auto.flex.items-center
        span.q-mr-sm(style="opacity:.5") {{ $trans('labels', 'view') }}:
        base-select(value="all" :options="[{ label: 'All orders', value: 'all' }]")

    .orders-list
      q-card.order(v-for="{ name, type, date, sum, games } in orders" :key="name")
        q-card-title.order__header: .row
          .col-auto
            base-title.q-mb-none.roboto.text-bold.order__title(level="6") {{ name }}
            span.order__label {{ date }}
          .col-auto.q-ml-auto.text-right
            base-title.q-mb-none.roboto.text-bold(level="6" color="white") {{ sum }}
            span.order__label {{ type }}
        q-card-separator
        q-card-main.order__content
          .row.gutter-sm.game(v-for="game in games" :key="game.name")
            .col-3: img.game__img(:src="game.preview" alt="preview")
            .col-6: base-title.roboto.text-white(level="6") {{ game.name }}
            .col-3.text-right $ {{ game.price }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { cloneDeep } from 'lodash'
import { UserPayments } from 'interfaces'

@Component
export default class Payments extends Vue {
  @namespace('user').State(state => cloneDeep(state.payments)) payments: UserPayments

  query = ''

  get methods () {
    return this.payments.methods
  }

  get orders () {
    return this.payments.orders.map(order => {
      order.name = `${ this.$trans('labels', 'order') } ${ order.name }`
      order.type = `${ this.$trans('labels', 'paidWith') } ${ order.type }`
      order.sum = '$ ' + order.games.reduce((sum, { price }) => {
        sum += price
        return Math.trunc(sum)
      }, 0)
      return order
    })
  }

  created () {
    console.log(this.payments)
  }
}
</script>

<style lang="stylus" scoped>
.payments
  &__header
    display: flex
    height: 40px
    align-items: center
    margin-bottom: 30px

.payment-card
  font-size: 16px
  letter-spacing: 0.05em

.orders-list
  border-radius: 6px

.order
  box-shadow: none
  border-radius: 0

  &__header
    background-color: rgba($black, .3)

  &__title
    color: rgba($white, .5)

  &__label
    font-size: 14px
    opacity: .5

  &__content
    background-color: rgba($black, .1)

.game
  &:not(:last-child)
    margin-bottom: $space-base

  &__img
    max-width: 100%
    max-height: 100%
</style>
