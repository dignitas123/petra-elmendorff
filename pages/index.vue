<template>
  <section class="container">
    <section class="landing-page">
      <div class="header-content">
        <div class="position-relative">
          <SanityImage
            :image="home.image"
            :width="1614"
            :height="516"
            class="mainImage"
          />
          <div
            class="quote-block quote-block-desktop position-absolute medium-font letter-spacing-0 text-center mb-3 py-3"
            style="letter-spacing: 0.3px;"
          >
            <BlockContent
              v-if="$t(home.image.zitat)"
              :blocks="$t(home.image.zitat)"
              :serializers="serializers"
              project-id="ie6m0uwl"
              dataset="production"
              class="quote px-3 my-1"
            />
          </div>
        </div>
        <hr class="image-sep" style="margin-top: 5px; margin-bottom: 7px;" />
        <div
          class="quote-block quote-block-mobile medium-font letter-spacing-0 text-center px-3"
          style="letter-spacing: 0.3px;"
        >
          <BlockContent
            v-if="$t(home.image.zitat)"
            :blocks="$t(home.image.zitat)"
            :serializers="serializers"
            project-id="ie6m0uwl"
            dataset="production"
            class="quote px-3 my-1"
          />
        </div>
        <b-container class="container2">
          <b-row align-h="between" class="mr-0 ml-0">
            <b-col>
              <h1 class="aktuelle-termine medium-font letter-spacing-more">
                {{ $t(termine) }}
              </h1>
            </b-col>
          </b-row>
          <b-row
            cols="1"
            cols-md="2"
            cols-xl="4"
            class="aktuelle-termine mr-0 ml-0"
          >
            <b-col
              v-for="course in previewCourses"
              :key="course.title.titel"
              class="mb-3"
            >
              <b-row cols="2" cols-xl="1" align-h="center">
                <b-col class="locale-col" style="max-width: 25%;">
                  <h5
                    v-if="course.sessionType == 'online-seminare'"
                    class="text-responsive medium-font color-golden-2 letter-spacing-more"
                  >
                    Online
                  </h5>
                  <h5
                    v-else
                    class="text-responsive medium-font color-golden-2 letter-spacing-more"
                  >
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
                    <div class="text-responsive color-dark-grey max-width-div">
                      <h5 class="medium-font">
                        {{ course.title.titel
                        }}<span
                          v-if="course.title.untertitel"
                          class="light-font"
                          ><br />{{ course.title.untertitel }}</span
                        >
                        <span
                          v-if="course.date && course.date.desc"
                          class="light-font"
                          ><br />{{ course.date.desc }}</span
                        >
                      </h5>
                    </div>
                    <h5
                      class="text-responsive locale-to-course color-grey light-font"
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
                        <span v-else-if="course.date.to && selLanguage == 'en'"
                          >- {{ toLocaleDateString(course.date.to) }}</span
                        >
                      </div>
                      <div
                        v-if="course.frequency"
                        class="text-responsive color-grey"
                      >
                        {{ course.frequency }}
                      </div>
                    </h5>
                  </nuxt-link></b-col
                ></b-row
              >
            </b-col>
          </b-row>
        </b-container>
        <div class="kalendar-link pb-3">
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
    <b-row class="text-center mr-0 ml-0" style="clear:both">
      <b-col>
        <DownArrowSharp @arrow-click="scrollContent" />
      </b-col>
    </b-row>
    <section class="content" style="margin-bottom: 2.75rem;">
      <b-container
        class="max-width-container py-3"
        :class="{ 'p-5': isMediumScreen }"
      >
        <b-row class="text-center grid-row" cols="1" cols-md="2">
          <b-col
            v-for="preview in previews"
            :key="$t(preview.title)"
            class="image-container"
            :class="{ 'large-screen': isMediumScreen }"
            style="display: flex; justify-content: center;"
          >
            <nuxt-link
              :to="'/' + slugLink($t(preview.slug).current)"
              class="link-wrapper"
              :style="isMediumScreen ? 'height: 314px;' : ''"
            >
              <div class="grid-image-caption">
                <div class="mt-2">{{ $t(preview.title) }}</div>
              </div>
              <div class="image-wrapper">
                <SanityImage
                  :image="preview.previewImage2"
                  :alt="$t(preview.previewImage2.alt)"
                  class="grid-image golden-border-thick"
                  :class="{ 'mb-5': isMediumScreen }"
                  style="width: 100%; height: 100%; object-fit: cover; object-position: top"
                />
              </div>
              <div class="middle">
                <div class="text">{{ $t(preview.title) }}</div>
                <div><Plus /></div>
              </div>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </section>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import sanityClient from '../sanityClient'
import DownArrowSharp from '~/components/icons/DownArrowSharp'
import SanityImage from '~/components/SanityImage'
import Plus from '~/components/icons/Plus'
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
    SanityImage,
    Plus,
    BlockContent
  },
  data() {
    return {
      screenWidth: 0,
      MEDIUM_WIDTH: 767,
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
  computed: {
    isMediumScreen: function() {
      return this.screenWidth > this.MEDIUM_WIDTH
    },
    ...mapGetters(['currentSlug', 'getDates', 'getLanguage']),
    sitetitle: function() {
      return this.$store.state.siteSettings.title
    },
    previewCourses: function() {
      // zeige angepinnte Kurse und upcoming courses (anzahl auch aus sanity)
      return (
        this.home.courses
          // .filter(ses => ses.sessionLang == this.getLanguage)
          .map(course => {
            // preview immer zum ersten termin, ist leider etwas doof
            course.date = course.dates[0]
            return course
          })
          .concat(this.upcomingCourses)
      )
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
          (session.sessionLang == 'de' && this.getLanguage == 'en') // only when english show no german courses
          // || session.sessionLang != this.getLanguage
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
  async asyncData() {
    return await sanityClient.fetch(query)
  },
  mounted() {
    this.updateScreenSize() // Call it initially to set initial values
    window.addEventListener('resize', this.updateScreenSize)
  },
  created() {
    this.setCurrentSlug(false)
  },
  methods: {
    ...mapMutations(['setCurrentSlug', 'setLanguage']),
    scrollContent: function() {
      this.$scrollTo('.content')
    },
    updateScreenSize() {
      this.screenWidth = window.innerWidth
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
  beforeDestroy() {
    window.removeEventListener('resize', this.updateScreenSize)
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-media';
@import '~/styles/custom-properties';

.image-container {
  position: relative;
  width: 50%;

  .link-wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    .image-wrapper {
      width: 314px;
      height: 314px;
    }
    @media (max-width: 657px) {
      .image-wrapper {
        width: 200px;
        height: 200px;
      }
    }
    @media (max-width: 449px) {
      .image-wrapper {
        width: 125px;
        height: 125px;
      }
    }
  }
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
  width: 100%;
  margin: 0 auto;
  p {
    margin: 0;
  }
}

.quote-block-desktop {
  background: rgba(255, 255, 255, 0.7);
  padding-right: 17%;
  padding-left: 17%;
}

.kalender {
  font-size: 27px;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

@media (max-width: 767px) {
  .middle {
    top: 58%;
  }
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
  .image-container.large-screen:nth-last-child(-n + 2) {
    margin-top: 50px;
  }
}

.grid-image {
  opacity: 1;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
  max-height: 314px;
  max-width: 314px;
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
}

.container {
  padding-top: 1.75rem;
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
  font-size: 75px;
  h5 {
    font-size: 27px;
  }
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

.quote-block > p {
  font-size: 35px;
}

.image-container a:hover {
  text-decoration: none;
}

.kalendar-link,
.quote-block {
  letter-spacing: -1px;
}

.quote-block > p {
  font-size: 27px;
}

.max-width-div {
  max-width: 100%;
}

.text-responsive {
  text-align: center;
}

.image-sep {
  margin-top: 12px !important;
  height: 8px;
}

.locale-col {
  min-width: 200px;
}

.quote-block-mobile {
  display: none;
}

.aktuelle-termine {
  text-align: left;
}

@media (max-width: 1203px) {
  .aktuelle-termine {
    text-align: center;
  }

  .quote-block-mobile {
    display: block;
  }
  .quote-block-desktop {
    display: none;
  }
  .text-responsive {
    text-align: left;
  }
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
  .aktuelle-termine {
    font-size: 48px;
    h5 {
      font-size: 20px;
    }
  }
  .kalender {
    font-size: 22px;
  }
}

@media (max-width: 1495px) {
  .quote-block-desktop {
    padding-left: 10%;
    padding-right: 10%;
  }
}

@media (max-width: 993px) {
  .image-sep {
    margin-top: 5px !important;
  }
  .container {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 0;
  }
  .aktuelle-termine {
    font-size: 48px;
    h5 {
      font-size: 20px;
    }
  }
}

@media (max-width: 972px) {
  .quote {
    font-size: 20px;
  }
  .quote-block > p {
    font-size: 21px;
  }
  .aktuelle-termine {
    font-size: 46px;
    h5 {
      font-size: 20px;
    }
  }
}

@media (max-width: 767px) {
  .image-sep {
    height: 3.5px;
  }
  .grid-image {
    width: 100%;
  }
  .grid-image-caption {
    display: flex;
    justify-content: center;
    font-size: 30px !important;
  }
  .header-content {
    margin-top: 0;
  }
  .quote-block > p {
    font-size: 16px;
  }
  .max-width-container {
    max-width: 50%;
  }
  .aktuelle-termine {
    font-size: 46px;
    h5 {
      font-size: 20px;
    }
  }
}

@media (max-width: 667px) {
  .grid-image-caption {
    font-size: 30px !important;
  }
  .aktuelle-termine {
    font-size: 44px;
    h5 {
      font-size: 19px;
    }
  }
}

@media (max-width: 620px) {
  .quote {
    font-size: 12px;
  }
  .quote-block > p {
    font-size: 15px;
  }
  .aktuelle-termine {
    font-size: 36px;
    h5 {
      font-size: 18px;
    }
  }
}

@media (max-width: 472px) {
  .aktuelle-termine {
    font-size: 34px;
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
  .quote-block > p {
    font-size: 15px;
  }
}

@media (max-width: 452px) {
  .aktuelle-termine {
    font-size: 18px;
  }
  .quote-block > p {
    font-size: 12px;
  }
  .aktuelle-termine {
    font-size: 32px;
    h5 {
      font-size: 18px;
    }
  }
  .quote-block > p {
    font-size: 14px;
  }
}

@media (max-width: 404px) {
  .aktuelle-termine {
    font-size: 31px;
    h5 {
      font-size: 17px;
    }
  }
}

@media (max-width: 393px) {
  .quote-block > p {
    font-size: 12px;
  }
  .grid-image-caption {
    font-size: 20px !important;
  }
  .aktuelle-termine {
    font-size: 28px;
    h5 {
      font-size: 16px;
    }
  }
}
@media (max-width: 349px) {
  .quote-block > p {
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
    font-size: 25px;
    h5 {
      font-size: 14px;
    }
  }
  .kalender {
    font-size: 14px;
  }
}
</style>

<style>
.btn-secondary {
  user-select: none;
}
</style>
