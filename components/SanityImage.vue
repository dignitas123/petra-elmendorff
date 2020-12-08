<template>
  <b-container>
    <b-row>
      <div
        class="maintxt d-flex align-items-center"
        :style="{ backgroundImage: `url(${imageUrl})` }"
        :aria-label="altFromImage || alt"
      >
        <div class="text-center mt-3">
          <h2>{{ zitat }}</h2>
          - Petra Elmendorff
        </div>
      </div>
    </b-row>
  </b-container>
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
    zitat: {
      default: '',
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Petra Elmendorff Bild - Home'
    },
    width: Number,
    height: Number,
    auto: {
      default: 'format',
      type: String
    },
    fit: {
      default: 'max',
      type: String
    }
  },
  computed: {
    altFromImage: function() {
      return this.image.alt
    },
    imageUrl: function() {
      return builder
        .image(this.image)
        .size(this.width, this.height)
        .auto(this.auto)
        .fit(this.fit)
    }
  }
}
</script>

<style scoped>
.maintxt {
  height: 500px;
  background-size: cover;
  background: center;
}
</style>
