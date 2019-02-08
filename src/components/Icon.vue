<template>
<svg
    :width="width || size"
    :height="height || size"
    :fill="fill"
    :stroke="stroke"
    class="c-icon">
  <use :xlink:href="`#${ name }`"/>
</svg>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    name: {
      type: String,
      required: true
    },
    width: [String, Number],
    height: [String, Number],
    size: [String, Number],
    fill: String,
    stroke: String
  },

  created () {
    console.log(this.stroke)
  }
}
</script>
