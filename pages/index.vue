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
          <h3 class="mx-3 py-5">‚{{ $t(home.image.zitat) }}‘</h3>
          <!-- - <i>{{ author }}</i> -->
        </div>
        <!-- <h1 class="title">{{ info.name }}</h1>
      <p class="subtitle">{{ info.description }}</p> -->
        <!-- <div class="dates">
        {{ new Date(info.schedule.from) | dateFilter('DD MMMM ha') }}
        &ndash;
        {{ new Date(info.schedule.to) | dateFilter('ha') }}
      </div> -->
        <!-- <div class="venue">{{ info.venue.name }}, {{ info.venue.city }}</div> -->
        <DownArrow @arrow-click="scrollContent" />
      </div>
    </section>
    <section class="content">
      <b-container class="container1">
        <b-row class="text-center grid-row" cols-sm="1" cols-md="2">
          <template v-for="preview in previews">
            <b-col :key="$t(preview.title)" class="image-container">
              <nuxt-link :to="'/' + slugLink($t(preview.slug).current)">
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
        <b-row>
          <b-col>
            <h1 class="aktuelle-termine">{{ $t(termine) }}</h1>
          </b-col>
        </b-row>
        <b-row cols-sm="1" cols-md="2" cols-xl="4">
          <b-col v-for="course in home.courses" v-bind:key="course.title" class="mb-3">
            <nuxt-link :to="$t(angebote) + `/${course.sessionType}/${course.slug.current}`" class="text-dec-none">
              <div class="text-center color-dark-grey">
                <h4>{{ course.title }}</h4>
              </div>
              <h4 class="text-center color-grey">
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
              </h4>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
      <!-- <b-container class="content-preview">
        <b-row>
          <template v-for="preview in previews">
            <b-col :key="preview.title.de"
              ><div>
                <b-card
                  tag="article"
                  style="max-width: 16rem; border: none;"
                  class="mb-2 text-center"
                >
                  <circle-image
                    :image="preview.previewImage"
                    :width="200"
                    :height="200"
                    fit="crop"
                  />

                  <h4 class="mt-3">
                    {{ $t(preview.title) }}
                  </h4>
                  <b-card-text class="text-justify">
                    {{ $t(preview.summary) }}
                    <nuxt-link
                      :to="'/' + $t(preview.slug).current"
                      variant="primary"
                      class="float-right"
                      >mehr</nuxt-link
                    >
                  </b-card-text>
                </b-card>
              </div></b-col
            >
          </template>
        </b-row>
      </b-container> -->
    </section>
    <!-- <section>
      <p>Test Icons <BIconArrowUp /> <BIconArrowDown /></p>
    </section>
    <label for="example-datepicker">Choose a date</label>
    <b-form-datepicker
      id="example-datepicker"
      v-model="value"
      class="mb-2"
    ></b-form-datepicker>
    <p>Value: '{{ value }}'</p> -->
    <!-- <div class="sessionListContainer">
      <h2 class="sessionListTitle">Schedule</h2>
      <SessionList :program="program" :info="info" />
    </div> -->
  </section>
</template>

<script>
import { dateFilter } from 'vue-date-fns'
import { mapMutations } from 'vuex'
// import { dateFilter } from 'vue-date-fns'
import { createDateFilter } from 'vue-date-fns'
import sanityClient from '../sanityClient'
import DownArrow from '~/components/icons/DownArrow'
// import ZodiacSign from '~/components/icons/ZodiacSign'
import SanityImage from '~/components/SanityImage'
// import CircleImage from '~/components/CircleImage'
import Navbar from '~/components/Navbar'
// import SessionList from '~/components/SessionList'
// import { BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'
import Plus from '~/components/icons/Plus'

const query = `
{
  "home": *[_id == "home"] {
    image { ..., asset->},
		"courses": currentCourses[]->{
      title,
      ort,
      date,
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
    // ZodiacSign,
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
@import '../styles/custom-media.css';
@import '../styles/custom-properties.css';

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

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
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
  max-width: 700px;
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
  padding: 1.5rem 0;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.landing-page {
  height: 91vh;
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
</style>
