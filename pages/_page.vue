<template>
  <section class="container">
    <Navbar />
    <Courses
      v-if="
        $route.params.page == 'kurse-angebote' ||
          $route.params.page == 'courses-offers'
      "
    />
    <Page v-else :content="content" />
  </section>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import groq from 'groq'
import sanityClient from '~/sanityClient'
// import SanityImage from '~/components/SanityImage'
import Courses from '~/components/Courses'
import Page from '~/components/Page'

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
    Courses,
    Page
  },
  data() {
    return {
      serializers: {
        types: {}
      },
      image: '',
      slug: {},
      coursesPage: false
    }
  },
  // fetch({ route }) {
  //   let _this = this
  //   if (
  //     route.params.page == 'kurse-angebote' ||
  //     route.params.page == 'courses-offers'
  //   )
  //     this.coursesPage = true
  //   else this.coursesPage = false
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
@import '~/styles/custom-media';
@import '~/styles/custom-properties';

.sessionContent {
  max-width: 900px;
  margin: auto;
  text-align: center;
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
