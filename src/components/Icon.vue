<template>
<svg
    :width="width || size"
    :height="height || size"
    :fill="fill"
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
    fill: String
  }
}
</script>
