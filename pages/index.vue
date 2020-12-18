<template>
  <section class="container">
    <header class="header">
      <figure>
        <BannerImage
          :image="home.image"
          :zitat="$t(home.image.zitat)"
          :width="1800"
          :height="500"
          :author="sitetitle"
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
      <DownArrow @arrow-click="scrollContent" />
    </header>
    <div class="content">
      <b-container class="content-preview">
        <b-row>
          <b-col
            ><div>
              <b-card
                img-top
                tag="article"
                style="max-width: 16rem;"
                class="mb-2 text-center"
              >
                <b-img
                  rounded="circle"
                  src="https://picsum.photos/600/300/?image=25"
                  height="200px"
                  width="200px"
                  alt="Bottom-rounded image"
                  class="border border-dark"
                ></b-img>

                <h1 class="mt-3">
                  Title
                </h1>
                <b-card-text class="text-justify-inter-word">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                  <b-link href="#" variant="primary">mehr</b-link>
                </b-card-text>
              </b-card>
            </div></b-col
          >
          <b-col
            ><div>
              <b-card
                img-top
                tag="article"
                style="max-width: 16rem;"
                class="mb-2 text-center"
              >
                <b-img
                  rounded="circle"
                  src="https://picsum.photos/600/300/?image=25"
                  height="200px"
                  width="200px"
                  alt="Bottom-rounded image"
                  class="border border-dark"
                ></b-img>

                <h1 class="mt-3">
                  Title
                </h1>
                <b-card-text class="text-justify-inter-word">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                  <b-link href="#" variant="primary">mehr</b-link>
                </b-card-text>
              </b-card>
            </div></b-col
          >
          <b-col
            ><div>
              <b-card
                img-top
                tag="article"
                style="max-width: 16rem;"
                class="mb-2 text-center"
              >
                <b-img
                  rounded="circle"
                  src="https://picsum.photos/600/300/?image=25"
                  height="200px"
                  width="200px"
                  alt="Bottom-rounded image"
                  class="border border-dark"
                ></b-img>

                <h1 class="mt-3">
                  Title
                </h1>
                <b-card-text class="text-justify-inter-word">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                  <b-link href="#" variant="primary">mehr</b-link>
                </b-card-text>
              </b-card>
            </div></b-col
          >
          <b-col
            ><div>
              <b-card
                img-top
                tag="article"
                style="max-width: 16rem;"
                class="mb-2 text-center"
              >
                <b-img
                  rounded="circle"
                  src="https://picsum.photos/600/300/?image=25"
                  height="200px"
                  width="200px"
                  alt="Bottom-rounded image"
                  class="border border-dark"
                ></b-img>

                <h1 class="mt-3">
                  Title
                </h1>
                <b-card-text class="text-justify-inter-word">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                  <b-link href="#" variant="primary">mehr</b-link>
                </b-card-text>
              </b-card>
            </div></b-col
          >
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
import BannerImage from '~/components/BannerImage'
import DownArrow from '../components/icons/DownArrow.vue'
// import SessionList from '~/components/SessionList'
// import { BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

/* const query = `
  {
    "info": *[_id == "eventInformation"] {
      ..., image { ..., asset->}
    }[0]
  }
` */

const query = `
  {
    "home": *[_id == "home"] {
      image { ..., asset->}
    }[0]
  }
`

export default {
  components: {
    BannerImage,
    DownArrow
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
      console.log("CLICKED")
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

.container {
  padding: 1.5rem 0;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.header {
  text-align: center;
  width: 100%;
  height: 100vh;
}

.content {
  height: 100vh;
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
