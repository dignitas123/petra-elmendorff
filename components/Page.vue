<template>
  <div class="page-content">
    <header class="header">
      <!-- kommt hier noch ein header rein? -->
    </header>
    <div class="content">
      <h3 v-if="title" class="medium-font color-headings mb-4 heading-main">
        {{ $t(title) }}
      </h3>
      <h3 v-if="heading" class="medium-font color-headings mb-4 heading-main">
        {{ $t(heading) }}
      </h3>
      <div class="sessionContent medium-font letter-spacing-less mb-3">
        <SanityImage
          v-if="image"
          :image="image"
          :zitat="$t(image.zitat)"
          :width="150"
          :height="150"
          :author="image.zitatsource"
          class="mainImage"
        />
        <BlockContent
          :v-if="$t(content)"
          :blocks="$t(content)"
          :serializers="serializers"
          projectId="ie6m0uwl"
          dataset="production"
        />
        <div class="kalendar-link">
          <nuxt-link :to="$t(angebote)">
            <h4 class="kalender medium-font color-yellow-golden float-right">
              {{ $t(kalender) }}
            </h4>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'

export default {
  props: {
    title: {
      type: Object,
      default: () => {}
    },
    content: {
      type: Object,
      default: () => {}
    },
    image: {
      default: false
    },
    heading: {
      default: false
    }
  },
  components: {
    BlockContent
  },
  data() {
    return {
      serializers: {
        types: {}
      },
      slug: {},
      angebote: {
        de: 'kurse-angebote',
        en: 'courses-offers'
      },
      kalender: {
        de: 'Kalender',
        en: 'Calendar'
      }
    }
  }
}
</script>

<style scoped>
.page-content {
  max-width: 840px;
  margin: 0 auto;
}

.sessionContent {
  font-size: 1.25rem;
  color: #717174;
  position: relative;
  background: #f4f1f0;
  padding-right: 5%;
  padding-top: 5%;
  padding-left: 15%;
  padding-bottom: 5%;
}

.mainImage {
  position: absolute;
  left: -10%;
  top: 25%;
}

.heading-main {
  font-size: 3rem;
  margin-left: 22%;
}

@media (max-width: 1055px) {
  .sessionContent {
    padding-left: 5%;
  }

  .page-content {
    margin-top: -50px;
  }

  .mainImage {
    position: relative;
    float: left;
    left: 0;
    padding-right: 15px;
    padding-bottom: 15px;
  }
}

@media (max-width: 770px) {
  .page-content {
    margin-top: -73px;
  }
  .heading-main {
    margin-left: 13%;
  }
}

@media (max-width: 542px) {
  .heading-main {
    font-size: 2rem;
  }
}

h1,
figure {
  text-align: center;
}

.content {
  margin: 100px 20px 0px 20px;
}

@media (max-width: 657px) {
  figure > img {
    width: 100%;
  }
  .content {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
