<template>
  <section class="container">
    <header class="header">
      <figure>
        <BannerImage
          :image="home.image"
          :zitat="home.image.zitat"
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
    </header>
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

import sanityClient from '../sanityClient'
import BannerImage from '~/components/BannerImage'
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
    BannerImage
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
  }
}
</script>

<style scoped>
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
