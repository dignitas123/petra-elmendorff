<template>
  <b-img
    rounded="circle"
    :src="imageUrl"
    :alt="$t(altFromImage) || alt"
    class="border border-dark"
  ></b-img>
</template>

<script>
/* eslint-disable vue/require-default-prop */
import sanityClient from '~/sanityClient'
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(sanityClient)

export default {
  props: {
    image: {
      type: Object,
      required: true
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    alt: {
      type: String,
      default: 'Category Picture'
    },
    auto: {
      type: String,
      default: 'format'
    },
    fit: {
      type: String,
      default: 'max'
    }
  },
  computed: {
    altFromImage: function() {
      return this.image.alt
    },
    imageUrl: function() {
      return String(builder
        .image(this.image)
        .size(this.width, this.height)
        .auto(this.auto)
        .fit(this.fit))
    }
  }
}
</script>

<style scoped lang="scss">
.border {
  border-width: 4px !important;
  border-color: #c39e00 !important;
}
</style>
