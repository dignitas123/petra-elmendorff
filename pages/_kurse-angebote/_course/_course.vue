<template>
  <section class="container mb-3">
    <Navbar />
    <div class="container-text">
      <b-breadcrumb :items="$t(items)" class="breadcrumb"></b-breadcrumb>
      <h1>{{ title }}</h1>
      <block-content
        v-if="$t(content)"
        :blocks="$t(content)"
        :serializers="serializers"
        projectId="ie6m0uwl"
        dataset="production"
      />
      <div v-if="dasDatum" class="mb-3">
        <span v-if="selLanguage == 'de'">Datum: {{ dasDatum.from | de }}</span>
        <span v-else>Date: {{ dasDatum.from | en }}</span
        ><span v-if="derOrt"> | {{ $t(place) }}: {{ derOrt }}</span>
      </div>
      <div class="d-flex">
        <span v-if="derPreis">Preis: {{ $t(derPreis) }}</span>
        <div v-if="derAnmeldelink" class="ml-auto">
          <a :href="courseLink" class="float-right">
            <input class="btn btn-secondary" :value="$t(anmelden)"
          /></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import groq from 'groq'
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'
import PersonBlock from '~/components/blockContent/PersonBlock'
import { createDateFilter } from 'vue-date-fns'

const query = groq`
  *[_type == "session" && slug.current == $course] {
    ...
  }[0]
`
export default {
  components: {
    BlockContent,
    SanityImage
  },
  filters: {
    de: createDateFilter('DD.MM.YYYY'),
    en: createDateFilter('MM/DD/YYYY')
  },
  data() {
    return {
      selLanguage: this.$store.state.language,
      anmelden: {
        de: 'Anmelden',
        en: 'Sign in'
      },
      place: {
        de: 'Ort',
        en: 'Place'
      },
      serializers: {
        types: {
          personReference: PersonBlock
        }
      }
    }
  },
  // fetch({ params }) {
  //   console.log("PARAAAAAAAAAAAAAAAAAAAAAAAAAMS", params)
  // },
  async asyncData(kontext) {
    console.log('sanity fetch sessions', query, kontext)
    let _this = this
    return await sanityClient.fetch(query, kontext.params)
    // .then(function() {
    //   _this.$store.commit('setCurrentSlug', title)
    // })
  },
  computed: {
    dateForReal: () => {
      if (typeof this.date != 'undefined') {
        return this.date
      } else {
        return { from: false, to: fales }
      }
    },
    derOrt: function() {
      if (typeof this.ort == 'undefined') return ''
      else return this.ort
    },
    derPreis: function() {
      if (typeof this.price == 'undefined') return ''
      else return this.price
    },
    derAnmeldelink: function() {
      if (typeof this.courseLink == 'undefined') return ''
      else return this.courseLink
    },
    dasDatum: function() {
      if (typeof this.date == 'undefined') return ''
      else return this.date
    },
    items: function() {
      return {
        de: [
          {
            text: 'Alle Kurse',
            href: '/kurse-angebote'
          },
          {
            text: this.sessionType.replace(/-/g, ' '),
            href: '/kurse-angebote/' + this.sessionType
          },
          {
            text: this.title,
            active: true
          }
        ],
        en: [
          {
            text: 'All Courses',
            href: '/courses-offers'
          },
          {
            text: this.sessionType.replace(/-/g, ' '),
            href: '/kurse-angebote/' + this.sessionType
          },
          {
            text: this.title,
            active: true
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-media';
@import '~/styles/custom-properties';

.breadcrumb {
  text-transform: capitalize;
  max-width: 800px;
  width: 100%;
}

.container {
  min-height: calc(100% - 72px - 216px);
}

.container-text {
  max-width: 700px;
  h1 {
    text-align: center;
  }
  margin: 0 auto;
}

.content {
  max-width: var(--width-small);
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
  @media (--media-min-medium) {
    padding: 1.5rem 1.5rem 3rem;
  }
}
.sessionType {
  text-transform: uppercase;
  margin: 0 0 3rem;
  font-size: var(--font-micro-size);
  line-height: var(--font-micro-line-height);
  letter-spacing: 0.5px;
  @media (--media-min-medium) {
    font-size: var(--font-small-size);
    line-height: var(--font-small-line-height);
  }
}
.sessionTitle {
  font-size: var(--font-title2-size);
  line-height: var(--font-title2-line-height);
  font-weight: 600;
  margin: 0 0 0.5rem;
  @media (--media-min-medium) {
    font-size: var(--font-title1-size);
    line-height: var(--font-title1-line-height);
  }
}
.summary {
  font-size: var(--font-large-size);
  line-height: var(--font-large-line-height);
  margin: 0.5rem 0 2rem;
}
// .sessionContent {
//   @nest & p {
//     margin: 1rem 0;
//   }
// }
img {
  width: 100%;
  vertical-align: top;
}

// Sign in Button
@mixin form-style {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  font-family: var(--font-family-sans);
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: white;
  opacity: 1;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: white;
  opacity: 1;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: white;
  opacity: 1;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: white;
  opacity: 1;
}

input {
  @include form-style;
  border-radius: 0;
  background: var(--color-accent);
  border: 2px solid var(--color-accent);

  &:focus,
  &:active {
    border: 2px solid var(--color-background) !important;
    caret-color: var(--color-background) !important;
    color: white !important;
    background: var(--color-background) !important;
    &::placeholder {
      color: transparent;
    }
  }
  &:hover {
    color: var(--color-accent);
    background: transparent;
    border: 2px solid var(--color-accent);
  }
}
</style>
