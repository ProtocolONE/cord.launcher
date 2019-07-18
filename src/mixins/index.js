/**
 * Validate empty fields
 */
const patterns = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const input_validators = {
  data () {
    return {
      validate_empty: [
        val => Boolean(val) || this.$trans('labels', 'field_is_required')
      ],

      validate_email: [
        val => patterns.email.test(val.toLowerCase()) || this.$trans('labels', 'email_is_not_corrected')
      ],

      validate_len: chars_len => [
        val => {
          val = val.trim()
          if (!val) return true
          return val.length <= chars_len || `${this.$trans('labels', 'len_char_over')} ${chars_len}`
        }
      ]
    }
  },

  methods: {
    validate (...rest) {
      return rest.reduce((result, name) => {
        let validator = `validate_${name}`
        if (validator in this.$data) {
          return result.concat(this.$data[validator])
        }
        return result
      }, [])
    }
  }
}
