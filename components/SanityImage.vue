<template>
  <img :src="imageUrl" :alt="altFromImage || alt" />
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
    alt: {
      type: String,
      default: 'Missing alternative text'
    },
    width: Number,
    height: Number,
    auto: {
      default: 'format',
      type: String
    },
    // 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
    fit: {
      default: 'max',
      type: String
    },
    // 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint' | 'entropy'
    crop: {
      default: '',
      type: String
    }
  },
  computed: {
    altFromImage: function() {
      return this.$t(this.image.alt)
    },
    imageUrl: function() {
      if (this.crop) {
        return builder
          .image(this.image)
          .size(this.width, this.height)
          .auto(this.auto)
          .fit(this.fit)
          .crop(this.crop)
      } else {
        return builder
          .image(this.image)
          .size(this.width, this.height)
          .auto(this.auto)
          .fit(this.fit)
      }
    }
  }
}
</script>
