<template>
  <transition name="fade">
    <section class="container">
      <Navbar />
      <b-breadcrumb :items="$t(items)" class="mt-5 breadcrumb"></b-breadcrumb>
      <Courses :filterCat="$router.history.current.params.coursetype" />
    </section>
  </transition>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import groq from 'groq'
import sanityClient from '~/sanityClient'
// import SanityImage from '~/components/SanityImage'
import Courses from '~/components/Courses'
import Page from '~/components/Page'
import { mapGetters } from 'vuex'

// const query = groq`
//   *[_type == "page" && (slug["de"].current == $page || slug["en"].current == $page)] {
//         ...,
//         image {
//           ...,
//           asset->
//         }
//   }[0]
// `

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
  computed: {
    ...mapGetters(['currentSlug']),
    items: function() {
      return {
        de: [
          {
            text: 'Alle Kurse',
            href: '/kurse-angebote'
          },
          {
            text: this.$router.history.current.params.coursetype
              .replace(/-/g, ' ')
              .replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase()
              }),
            href: '/kurse-angebote/' + this.slug,
            active: true
          }
        ],
        en: [
          {
            text: 'All Classes',
            href: '/courses-offers'
          },
          {
            text: this.$router.history.current.params.coursetype
              .replace(/-/g, ' ')
              .replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase()
              }),
            href: '/kurse-angebote/' + this.slug,
            active: true
          }
        ]
      }
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
  created() {
    this.$store.commit('setCurrentSlug', this.slug)
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-media';
@import '~/styles/custom-properties';

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.breadcrumb {
  max-width: 800px;
  width: 100%;
}

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
