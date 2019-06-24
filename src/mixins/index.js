/**
 * Validate empty fields
 */
export const input_validators = {
  data () {
    return {
      not_empty: [
        val => Boolean(val) || this.$trans('labels', 'field_is_required')
      ]
    }
  }
}
