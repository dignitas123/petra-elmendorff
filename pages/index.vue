<template>
  <section class="container">
    <section class="landing-page">
      <Navbar />
      <div class="header-content">
        <div class="position-relative">
          <SanityImage
            :image="home.image"
            :width="1920"
            :height="612"
            class="mainImage"
          />
        </div>
        <hr
          class="image-sep"
          style="margin-top: 5px; margin-bottom: 7px;"
        />
        <div class="quote-block medium-font letter-spacing-0 text-center">
          <block-content
            v-if="$t(home.image.zitat)"
            :blocks="$t(home.image.zitat)"
            :serializers="serializers"
            projectId="ie6m0uwl"
            dataset="production"
            class="quote px-3 my-1"
          />
          <!-- <h3 class="quote px-3 my-1">‚{{ $t(home.image.zitat) }}‘</h3> -->
        </div>
        <b-container class="container2">
          <b-row
            align-h="between"
            style=""
          >
            <!-- style="left: 50%; transform: translateX(-50%); width: 500px; top: 50%; z-index: -2;" -->
            <b-col>
              <h1
                class="aktuelle-termine medium-font letter-spacing-more"
              >
                {{ $t(termine) }}
              </h1>
            </b-col>
          </b-row>
          <b-row
            cols="1"
            cols-md="2"
            cols-xl="4"
            class="aktuelle-termine"
          >
            <b-col
              v-for="course in previewCourses"
              v-bind:key="course.title.titel"
              class="mb-3"
            >
              <b-row cols="2" align-h="center">
                <b-col class="locale-col" style="max-width: 20%;">
                  <h5
                    v-if="course.sessionType == 'online-seminare'"
                    class="text-left medium-font color-golden-2"
                  >
                    Online
                  </h5>
                  <h5 v-else class="text-left medium-font color-golden-2">
                    {{ $t(course.ort) }}
                  </h5></b-col
                >
                <b-col>
                  <nuxt-link
                    :to="
                      $t(angebote) +
                        `/${course.sessionType}/${course.slug.current}`
                    "
                    class="text-dec-none letter-spacing-0"
                  >
                    <div class="text-left color-dark-grey max-width-div">
                      <h5 class="medium-font">
                        {{ course.title.titel }}<br /><span
                          class="light-font"
                          v-if="course.title.untertitel"
                          >{{ course.title.untertitel }}</span
                        >
                      </h5>
                    </div>
                    <h5
                      class="text-left locale-to-course color-grey light-font"
                    >
                      <div v-if="course.displayDate">
                        {{ course.displayDate }}
                      </div>
                      <div v-else>
                        <span v-if="course.date && selLanguage == 'de'">{{
                          toLocaleDateString(course.date.from)
                        }}</span>
                        <span v-else-if="selLanguage == 'en'">{{
                          toLocaleDateString(course.date.from)
                        }}</span>
                        <span v-if="course.date.to && selLanguage == 'de'"
                          >- {{ toLocaleDateString(course.date.to) }}</span
                        >
                        <span v-else-if="selLanguage == 'en'"
                          >- {{ toLocaleDateString(course.date.to) }}</span
                        >
                      </div>
                      <div v-if="course.frequency" class="text-left color-grey">
                        {{ course.frequency }}
                      </div>
                    </h5>
                  </nuxt-link></b-col
                ></b-row
              >
            </b-col>
          </b-row>
        </b-container>
        <div class="kalendar-link">
          <nuxt-link :to="$t(angebote)">
            <h4
              class="kalender medium-font color-dark-grey float-right mb-0 p-1"
            >
              {{ $t(kalender)
              }}<span class="plus-calendar d-block ml-1 float-right"
                ><Plus width="13"
              /></span>
            </h4>
          </nuxt-link>
        </div>
      </div>
    </section>
    <b-row class="text-center" style="clear:both">
      <b-col>
        <DownArrowSharp @arrow-click="scrollContent" />
      </b-col>
    </b-row>
    <section class="content">
      <b-container
        class="max-width-container"
      >
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
    </section>
  </section>
</template>

<script>
// import { dateFilter } from 'vue-date-fns'
import { mapMutations, mapGetters } from 'vuex'
// import { createDateFilter } from 'vue-date-fns'
import sanityClient from '../sanityClient'
import DownArrowSharp from '~/components/icons/DownArrowSharp'
import SanityImage from '~/components/SanityImage'
import Navbar from '~/components/Navbar'
import Plus from '~/components/icons/Plus'
import isNode from 'detect-node'
import BlockContent from 'sanity-blocks-vue-component'

const query = `
{
  "home": *[_id == "home"] {
    image { ..., asset->},
		"courses": currentCourses[]->{
      title,
      ort,
      dates,
      sessionType,
      sessionLang,
      slug { current, }
    },
    numberUpcomingPreview
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
    DownArrowSharp,
    Navbar,
    SanityImage,
    Plus,
    BlockContent
  },
  // filters: {
  //   dateFilter,
  //   de: createDateFilter('DD. MMMM'),
  //   en: createDateFilter('DD. MMMM')
  // },
  computed: {
    ...mapGetters(['currentSlug', 'getDates', 'getLanguage']),
    sitetitle: function() {
      return this.$store.state.siteSettings.title
    },
    previewCourses: function() {
      // zeige angepinnte Kurse und upcoming courses (anzahl auch aus sanity)
      return this.home.courses
        .filter(ses => ses.sessionLang == this.getLanguage)
        .map(course => {
          // preview immer zum ersten termin, ist leider etwas doof
          course.date = course.dates[0]
          return course
        })
        .concat(this.upcomingCourses)
    },
    upcomingCourses: function() {
      let now = new Date()
      let maxNumberOfitems = this.home.numberUpcomingPreview

      // show sessions only once
      let alreadyinList = []
      return this.getDates.filter(session => {
        if (
          alreadyinList.length >= maxNumberOfitems ||
          !session.date.from ||
          session.sessionLang != this.getLanguage
        )
          return false

        let from = new Date(session.date.from)
        let to = session.date.to ? new Date(session.date.to) : from

        let isPast = to < now
        // let isOngoing = to > now && from < now
        // let isFuture = from > now
        if (!isPast && !alreadyinList.includes(session.originalSessionObj)) {
          alreadyinList.push(session.originalSessionObj)
          return true
        } else return false
      })
    }
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
      },
      serializers: {}
    }
  },
  methods: {
    ...mapMutations(['setCurrentSlug', 'setLanguage']),
    ...mapGetters(['getLanguage']),
    scrollContent: function() {
      this.$scrollTo('.content')
    },
    slugLink(slug) {
      if (slug === 'kurse') return 'kurse-angebote'
      if (slug === 'courses') return 'courses-offers'
      return slug
    },
    toLocaleDateString(date) {
      if (this.selLanguage == 'de') {
        return new Date(date).toLocaleDateString('de-DE', {
          month: 'long',
          day: 'numeric'
        })
      } else {
        return new Date(date).toLocaleDateString('en-EN', {
          month: 'long',
          day: 'numeric'
        })
      }
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
    if (!isNode) {
      let langCooky = this.$cookies.get('lang')
      console.log('langCooky:', langCooky)
      if (!langCooky) {
        let userLang = navigator.language || navigator.userLanguage
        console.log('The language is: ' + userLang)
        if (userLang.includes('de')) {
          this.setLanguage('de')
        } else {
          this.setLanguage('en')
        }
        this.$cookies.set('lang', this.getLanguage, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7 // 1 week
        })
      }
    }
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

.quote-block {
  color: #5f4142;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
  margin: 0 auto;
  p {
    margin: 0;
  }
}

.kalender {
  font-size: 22px;
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

.color-golden-2 {
  color: var(--color-golden-2);
}

.max-width-div {
  max-width: 50%;
  margin: 0 auto;
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

.locale-to-course {
  margin-top: -8px;
}

.container2 {
  background: white;
}

.image-sep {
  border: 0;
  height: 4px;
  background: #dacf3d;
}

.container {
  padding-top: 0.75rem;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.header-content {
  text-align: center;
  width: 100%;
  margin-top: 55px;
}

.aktuelle-termine {
  color: #e0d7d6;
  font-size: 28px;
  letter-spacing: -0.5px;
}

.content {
  background: #f3efee;
}

.plus-calendar svg {
  margin-bottom: 5px;
}

.max-width-container {
  max-width: 950px;
}

.title + p + .dates {
  margin-bottom: 0;
  font-weight: 600;
}

.max-width-row {
  max-width: 100px;
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

.kalendar-link {
  right: 5%;
  bottom: 5%;
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
  color: #ada2a1;
  font-size: 45px !important;
}

.quote-block > div > p {
  font-size: 35px;
}

.image-container a:hover {
  text-decoration: none;
}

.kalendar-link,
.quote-block {
  letter-spacing: -1px;
}

.aktuelle-termine {
  h5 {
    letter-spacing: -1px;
  }
}

.quote-block > div > p {
  font-size: 27px;
}

.max-width-div {
  max-width: 100%;
}

@media (min-width: 1203px) {
  .image-sep {
    height: 8px;
  }
  .locale-col {
    min-width: 100px;
  }
  .aktuelle-termine {
    text-align: left;
    font-size: 45px;
  }
  .kalender {
    margin-top: -230px;
  }
}

@media (max-width: 993px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media (max-width: 972px) {
  .quote {
    font-size: 20px;
  }
  .quote-block > div > p {
    font-size: 21px;
  }
}

@media (max-width: 766px) {
  .grid-image {
    width: 100%;
  }
  .grid-image-caption {
    display: block;
    font-size: 39px;
  }
  .header-content {
    margin-top: 0;
  }
  .quote-block > div > p {
    font-size: 16px;
  }
  .max-width-container {
    max-width: 50%;
  }
}

@media (max-width: 667px) {
  .grid-image-caption {
    font-size: 30px !important;
  }
}

@media (max-width: 620px) {
  .quote {
    font-size: 12px;
  }
  .quote-block > div > p {
    font-size: 15px;
  }
}

@media (max-width: 472px) {
  .image-sep {
    height: 3.5px;
  }
  .grid-image-caption {
    font-size: 22px !important;
  }
  .quote {
    font-size: 12px;
  }
  .container {
    padding-left: 7px;
    padding-right: 7px;
  }
  .quote-block > div > p {
    font-size: 15px;
  }
}

@media (max-width: 452px) {
  .aktuelle-termine {
    h5 {
      font-size: 18px;
    }
  }
}

@media (max-width: 404px) {
  .aktuelle-termine {
    h5 {
      font-size: 15px;
    }
  }
}

@media (max-width: 393px) {
  .quote-block > div > p {
    font-size: 12px;
  }
  .grid-image-caption {
    font-size: 20px !important;
  }
}
@media (max-width: 349px) {
  .quote-block > div > p {
    font-size: 11px;
  }
  .grid-image-caption {
    font-size: 20px !important;
  }
}

@media (max-width: 339px) {
  .grid-image-caption {
    font-size: 18px !important;
  }
  .aktuelle-termine {
    h5 {
      font-size: 14px;
    }
  }
  .kalender {
    font-size: 14px;
  }
}
</style>
