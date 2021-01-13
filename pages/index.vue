<template>
  <section class="container">
    <section class="landing-page">
      <Navbar />
      <div class="header-content">
        <SanityImage
          :image="home.image"
          :width="1563"
          :height="470"
          class="mainImage"
        />
        <hr class="image-sep" />
        <div class="text-center mt-3 quote-block">
          <h3 class="quote mx-3 py-5">‚{{ $t(home.image.zitat) }}‘</h3>
        </div>
        <DownArrow @arrow-click="scrollContent" />
      </div>
    </section>
    <section class="content">
      <b-container class="container1">
        <b-row class="text-center grid-row" cols="1" cols-md="2">
          <template v-for="preview in previews">
            <b-col :key="$t(preview.title)" class="image-container">
              <nuxt-link :to="'/' + slugLink($t(preview.slug).current)">
                <div class="grid-image-caption">{{ $t(preview.title) }}</div>
                <SanityImage
                  :image="preview.previewImage2"
                  :alt="$t(preview.previewImage2.alt)"
                  class="grid-image mb-5"
                />
                <div class="middle">
                  <div class="text">{{ $t(preview.title) }}</div>
                  <div><Plus /></div>
                </div>
              </nuxt-link>
            </b-col>
          </template>
        </b-row>
      </b-container>
      <b-container class="container2">
        <b-row align-h="between">
          <b-col>
            <h1 class="aktuelle-termine">{{ $t(termine) }}</h1>
          </b-col>
          <b-col>
            <nuxt-link :to="$t(angebote)">
              <h2 class="kalender color-dark-grey float-right">
                {{ $t(kalender)
                }}<span class="plus-calendar d-block ml-1 float-right"
                  ><Plus width="15"
                /></span>
              </h2>
            </nuxt-link>
          </b-col>
        </b-row>
        <b-row cols="1" cols-md="2" cols-xl="4">
          <b-col
            v-for="course in previewCourses"
            v-bind:key="course.title.titel"
            class="mb-3"
          >
            <nuxt-link
              :to="
                $t(angebote) + `/${course.sessionType}/${course.slug.current}`
              "
              class="text-dec-none"
            >
              <div class="text-center color-dark-grey">
                <h4>{{ course.title.titel }}</h4>
              </div>
              <h5 class="text-center color-grey">
                <div>
                  {{ $t(course.ort) }}
                </div>
                <span v-if="course.date && selLanguage == 'de'">{{
                  course.date.from | de
                }}</span>
                <span v-else-if="selLanguage == 'en'">{{
                  course.date.from | en
                }}</span>
                -
                <span v-if="course.date && selLanguage == 'de'">{{
                  course.date.to | de
                }}</span>
                <span v-else-if="selLanguage == 'en'">{{
                  course.date.to | en
                }}</span>
              </h5>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </section>
</template>

<script>
import { dateFilter } from 'vue-date-fns'
import { mapMutations } from 'vuex'
import { createDateFilter } from 'vue-date-fns'
import sanityClient from '../sanityClient'
import DownArrow from '~/components/icons/DownArrow'
import SanityImage from '~/components/SanityImage'
import Navbar from '~/components/Navbar'
import Plus from '~/components/icons/Plus'

const query = `
{
  "home": *[_id == "home"] {
    image { ..., asset->},
		"courses": currentCourses[]->{
      title,
      ort,
      dates,
      sessionType,
      slug { current, }
    }
  }[0],
  "previews": [
    *[_type == "page" && slug.de.current == "jin-shin-jyutsu"] {
      previewImage2 { ..., asset->},
      slug {...},
      title {...}
    }[0],
    *[_type == "page" && slug.de.current == "astromatrix"] {
      previewImage2 { ..., asset->},
      slug {...},
      title {...}
    }[0],
    *[_type == "page" && slug.de.current == "kurse"] {
      previewImage2 { ..., asset->},
      slug {...},
      title {...}
    }[0],
    *[_type == "page" && slug.de.current == "ueber"] {
      previewImage2 { ..., asset->},
      slug {...},
      title {...}
    }[0],
  ]
}
`

export default {
  components: {
    DownArrow,
    Navbar,
    SanityImage,
    Plus
  },
  filters: {
    dateFilter,
    de: createDateFilter('DD.MM.YYYY'),
    en: createDateFilter('MM/DD/YYYY')
  },
  computed: {
    sitetitle: function() {
      return this.$store.state.siteSettings.title
    },
    previewCourses: function() {
      return this.home.courses.map(course => {
        // preview immer zum ersten termin, ist leider etwas doof
        course.date = course.dates[0]
        return course
      })
    },
  },
  data() {
    return {
      selLanguage: this.$store.state.language,
      termine: {
        de: 'Aktuelle Termine',
        en: 'Upcoming Events'
      },
      angebote: {
        de: 'kurse-angebote',
        en: 'courses-offers'
      },
      kalender: {
        de: 'Kalender',
        en: 'Calendar'
      }
    }
  },
  methods: {
    ...mapMutations(['setCurrentSlug']),
    scrollContent: function() {
      this.$scrollTo('.content')
    },
    slugLink(slug) {
      if (slug === 'kurse') return 'kurse-angebote'
      if (slug === 'courses') return 'courses-offers'
      return slug
    }
  },
  async asyncData() {
    console.log('sanity fetch index', query)
    return await sanityClient.fetch(query)
  },
  head() {
    let settings = this.$store.state.siteSettings
    if (!this || !this.home) {
      return
    }
    return {
      title: settings.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: settings.description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: settings.keywords
        }
      ]
    }
  },
  created() {
    this.setCurrentSlug(false)
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-media';
@import '~/styles/custom-properties';

.image-container {
  position: relative;
  width: 50%;
}

.text {
  color: var(--color-dark-gray);
  font-size: var(--font-title2-size);
}

.image-container:hover .grid-image {
  opacity: 0.3;
}

.image-container:hover .middle {
  opacity: 1;
}

.kalender {
  font-weight: bold;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  width: 300px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.color-dark-grey {
  color: var(--color-dark-gray);
}

.color-grey {
  color: var(--color-gray);
}

.grid-row {
  margin: 0 auto;
}

.grid-image {
  opacity: 1;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.fixed-width-wide {
  width: 500px !important;
}

.container2 {
  background: white;
}

.image-sep {
  border: 0;
  height: 8px;
  background: #dacf3d;
}

.container {
  padding-top: 2rem;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.header-content {
  text-align: center;
  width: 100%;
  margin-top: 100px;
}

.aktuelle-termine {
  color: #e0d7d6;
  font-weight: bold;
}

.content {
  background: #f3efee;
}

.plus-calendar svg {
  margin-bottom: 5px;
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

.text-dec-none:hover {
  text-decoration: none;
}

.grid-image-caption {
  display: none;
}

@media (max-width: 972px) {
  .quote {
    font-size: 20px;
  }
}

@media (max-width: 620px) {
  .quote {
    font-size: 17px;
  }
}

@media (max-width: 450px) {
  .quote {
    font-size: 13px;
  }
}

@media (max-width: 766px) {
  .grid-image-caption {
    display: block;
    font-size: 30px;
  }
  .header-content {
    margin-top: 0;
  }
}

@media (max-width: 393px) {
  .grid-image {
    width: 100%;
  }
}
</style>
