<template>
  <section class="container mb-3">
    
    <div class="container-text">
      <b-breadcrumb :items="$t(items)"></b-breadcrumb>
      <div class="header-background py-2">
        <h1 class="mt-3">{{ title.titel }}</h1>
        <h4 v-if="title.untertitel" class="text-center">
          {{ title.untertitel }}
        </h4>
      </div>
      <div class="mt-3 ml-auto p-5 header-background" style="max-width: 600px;">
        <!-- erster termin  -->
        <div v-if="dieTermine.length">
            <span class="ab" v-if="dieTermine.length > 1"> {{ $t(ab) }} </span> <!-- wenn es mehrere termine gibt: ein ab -->
            <!-- <span v-if="dieTermine[0].desc" class="termintitel font-weight-bold">{{
              dieTermine[0].desc
            }}</span> -->
            <span>{{ toLocaleDateString(dieTermine[0].from) }}</span>
            <span v-if="dieTermine[0].to">
              - {{ toLocaleDateString(dieTermine[0].to) }}</span
            >

            <span v-if="derOrt">
              | <b> {{ $t(derOrt) }}</b></span
            >
          </div>
          <br>

        <block-content
          v-if="$t(content)"
          :blocks="$t(content)"
          :serializers="serializers"
          projectId="ie6m0uwl"
          dataset="production"
        />
        
        <div v-if="dieTermine.length > 1" class="mb-3">
          <div v-for="dasDatum in dieTermine" v-bind:key="dasDatum.from">
            <!-- {{ $t(ab) }} -->
            <span v-if="dasDatum.desc" class="termintitel font-weight-bold">{{
              dasDatum.desc
            }}</span>
            <span>{{ toLocaleDateString(dasDatum.from) }}</span>
            <span v-if="dasDatum.to">
              - {{ toLocaleDateString(dasDatum.to) }}</span
            >

          </div>
          <span v-if="derOrt">
            <b> {{ $t(derOrt) }}</b></span
          >
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
    </div>
  </section>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import groq from 'groq'
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'
import PersonBlock from '~/components/blockContent/PersonBlock'

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
      ab: {
        de: 'ab',
        en: 'from'
      },
      serializers: {
        types: {
          personReference: PersonBlock
        }
      }
    }
  },
  async asyncData(kontext) {
    // console.log('sanity fetch sessions', query, kontext)
    let _this = this
    return await sanityClient.fetch(query, kontext.params)
  },
  head() {
    return {
      title: this.title.titel + " - "
    }
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
    dieTermine: function() {
      if (!Array.isArray(this.dates)) return false
      else return this.dates
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
            text: this.title.titel,
            active: true
          }
        ],
        en: [
          {
            text: 'All Classes',
            href: '/courses-offers'
          },
          {
            text: this.sessionType.replace(/-/g, ' '),
            href: '/kurse-angebote/' + this.sessionType
          },
          {
            text: this.title.titel,
            active: true
          }
        ]
      }
    }
  },
  methods: {
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
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-media';
@import '~/styles/custom-properties';

.btn-secondary {
  background: #593f4c;
  border-color: #593f4c;
}

.btn-secondary:hover {
  color: #593f4c;
  border-color: #593f4c;
}

h1 {
  color: #593f4c;
}

h4 {
  color: #593f4c;
}

.container {
  min-height: calc(100% - 72px - 216px);
}

.container-text {
  max-width: 800px;
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

@media (max-width: 482px) {
  .breadcrumb {
    font-size: 12px;
    margin-top: 80px;
  }
  .ml-auto {
    margin: 0 auto;
  }
}

.header-background {
  background: #f5f1f0;
}
</style>
