<template>
  <section class="container">
    <header class="header">
      <figure>
        <BannerImage
          v-if="image"
          :image="image"
          :zitat="$t(image.zitat)"
          :width="1800"
          :height="500"
          :author="image.zitatsource"
          class="mainImage"
        />
        <!-- <figcaption>{{ info.image.caption }}</figcaption> -->
      </figure>
      <!-- <h1 class="title">{{ info.name }}</h1>
      <p class="subtitle">{{ info.description }}</p> -->
      <!-- <div class="dates">
        {{ new Date(info.schedule.from) | dateFilter('DD MMMM ha') }}
        &ndash;
        {{ new Date(info.schedule.to) | dateFilter('ha') }}
      </div> -->
      <!-- <div class="venue">{{ info.venue.name }}, {{ info.venue.city }}</div> -->
    </header>
    <div class="content">
      <!-- <h1 class="sessionTitle">{{ $t(title) }}</h1> -->
      <!-- <p v-if="$t(summary)" class="summary">
        {{ $t(summary) }}
      </p> -->
      <div class="sessionContent">
        <BlockContent
          :v-if="$t(content)"
          :blocks="$t(content)"
          :serializers="serializers"
          projectId="ie6m0uwl"
          dataset="production"
        />
      </div>
    </div>
  </section>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import groq from 'groq'
import sanityClient from '~/sanityClient'
// import SanityImage from '~/components/SanityImage'
import BannerImage from '~/components/BannerImage'

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
    BlockContent,
    // SanityImage,
    BannerImage
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
    this.$store.commit('setCurrentSlug', this.slug)
  }
}
</script>

<style scoped lang="scss">
@import '../styles/custom-media.css';
@import '../styles/custom-properties.css';

.sessionContent {
  max-width: 900px;
  margin: auto;
  figure {
    text-align: center;
  }
  div h1 {
    text-align: center;
  }
}

.container {
  padding: 1.5rem 0;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.header {
  text-align: center;
  width: 100%;
}

.title + p + .dates {
  margin-bottom: 0;
  font-weight: 600;
}

.title + p + .dates + .venue {
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
  margin-bottom: 5rem;
}

figure {
  margin: 0 0 3em;
}

figcaption {
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
  padding: 0.25rem 1.5rem;
}

.mainImage {
  width: 100%;
  vertical-align: top;
}

.sessionListTitle {
  text-align: center;
  font-weight: 600;
  font-size: var(--font-title2-size);
  line-height: var(--font-title2-line-height);
  margin: 0 0 3rem;

  @media (--media-min-medium) {
    font-size: var(--font-title1-size);
    line-height: var(--font-title1-line-height);
  }
}

.sessionListContainer {
  max-width: var(--width-small);
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
}
</style>
