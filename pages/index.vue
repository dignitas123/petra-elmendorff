<template>
  <section class="container">
    <Navbar />
    <header class="header">
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
      <ZodiacSign @arrow-click="scrollContent" />
    </header>
    <div class="content">
      <b-container class="content-preview">
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
      </b-container>
    </div>
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

import sanityClient from '../sanityClient'
import DownArrow from '~/components/icons/DownArrow'
import ZodiacSign from '~/components/icons/ZodiacSign'
import CircleImage from '~/components/CircleImage'
import Navbar from '~/components/Navbar'
// import SessionList from '~/components/SessionList'
// import { BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

const query = `
{
  "home": *[_id == "home"] {
    image { ..., asset->}
  }[0],
  "previews": [
    *[_type == "page" && slug.de.current == "jin-shin-jyutsu"] {
      previewImage { ..., asset->},
      slug {...},
      summary {...},
      title {...}
    }[0],
    *[_type == "page" && slug.de.current == "astromatrix"] {
      previewImage { ..., asset->},
      slug {...},
      summary {...},
      title {...}
    }[0],
    *[_type == "page" && slug.de.current == "kurse"] {
      previewImage { ..., asset->},
      slug {...},
      summary {...},
      title {...}
    }[0],
    *[_type == "page" && slug.de.current == "ueber"] {
      previewImage { ..., asset->},
      slug {...},
      summary {...},
      title {...}
    }[0],
  ]
}
`

export default {
  components: {
    DownArrow,
    ZodiacSign,
    CircleImage,
    Navbar
    // SessionList
    // BIconArrowUp,
    // BIconArrowDown
  },
  filters: {
    dateFilter
  },
  data() {
    return {
      // value: '',
      // program: this.$store.getters.getProgram
    }
  },
  computed: {
    sitetitle: function() {
      return this.$store.state.siteSettings.title
    }
  },
  methods: {
    ...mapMutations(['setCurrentSlug']),
    scrollContent: function() {
      this.$scrollTo('.content')
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

.header {
  text-align: center;
  width: 100%;
  height: 100vh;
  margin-top: 100px;
}

.content {
  min-height: 100vh;
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
