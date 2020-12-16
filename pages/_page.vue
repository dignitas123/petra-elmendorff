<template>
  <section class="container">
    <SanityImage v-if="image" :image="image" />
    <div class="content">
      <h1 class="sessionTitle">{{ $t(title) }}</h1>
      <p v-if="$t(summary)" class="summary">
        {{ $t(summary) }}
      </p>
      <!-- <div class="sessionContent">
        <BlockContent
          :blocks="description"
          :v-if="description"
          :serializers="serializers"
        />
      </div> -->
    </div>
  </section>
</template>

<script>
// import BlockContent from 'sanity-blocks-vue-component'
import groq from 'groq'
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'

const query = groq`
  *[_type == "page" && (slug["de"].current == $page || slug["en"].current == $page)] {
        ...,
        image {
          ...,
          asset->
        }
  }[0]
`

export default {
  components: {
    // BlockContent,
    SanityImage
  },
  data() {
    return {
      serializers: {
        types: {}
      },
      // selLanguage: '',
      image: '',
      slug: {}
    }
  },
  // mounted() {
  //   this.selLanguage = this.$store.state.language
  // },
  // watch: {
  //   '$store.state.language': function() {
  //     this.selLanguage = this.$store.state.language
  //   }
  // },
  async asyncData(kontext) {
    let params = {
      lang: kontext.store.getters.getLanguage,
      page: kontext.params.page
    }
    console.log('sanity fetch sessions', query, params)
    return await sanityClient.fetch(query, params)
  },
  created() {
    this.$store.commit('setCurrentSlug',this.slug)
  }
}
</script>

<style scoped>
.container {
  min-height: calc(100% - 72px - 216px);
}

.content {
  max-width: var(--width-small);
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;

  @media (--media-min-medium) {
    padding: 1.5rem 1.5rem 3rem;
  }
}

.sessionType {
  text-transform: uppercase;
  margin: 0 0 3rem;
  font-size: var(--font-micro-size);
  line-height: var(--font-micro-line-height);
  letter-spacing: 0.5px;

  @media (--media-min-medium) {
    font-size: var(--font-small-size);
    line-height: var(--font-small-line-height);
  }
}

.sessionTitle {
  font-size: var(--font-title2-size);
  line-height: var(--font-title2-line-height);
  font-weight: 600;
  margin: 0 0 0.5rem;

  @media (--media-min-medium) {
    font-size: var(--font-title1-size);
    line-height: var(--font-title1-line-height);
  }
}

.summary {
  font-size: var(--font-large-size);
  line-height: var(--font-large-line-height);
  margin: 0.5rem 0 2rem;
}

/* .sessionContent {
  @nest & p {
    margin: 1rem 0;
  }
} */

img {
  width: 100%;
  vertical-align: top;
}
</style>
