<template>
  <b-container>
    <b-row>
      <div
        class="maintxt d-flex align-items-center"
        :style="{ backgroundImage: `url(${imageUrl})` }"
        :aria-label="altFromImage || alt"
      >
        <div class="text-center mt-3 quote-block">
          <h2 id='mainQuote'>{{ zitat }}</h2>
          - <i>{{ author }}</i>
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
    author: {
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

<style scoped lang="scss">
.maintxt {
  height: 500px;
  background-size: cover;
  background: center;
  padding-right: 15px;
  padding-left: 15px;
}

.quote-block {
  text-shadow: 0px 0px 3px white;
  font-size: 23px;
  h2 {
    text-shadow: 0px 0px 3px white;
  }
}
</style>
