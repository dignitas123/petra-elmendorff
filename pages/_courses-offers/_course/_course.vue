<template>
  <section class="container mb-3">
    <div class="container-text">
      <b-breadcrumb :items="$t(items)"></b-breadcrumb>
      <div class="header-background py-2">
        <h1 class="mt-3 maintitle px-3">{{ title.titel }}</h1>
        <h4 v-if="title.untertitel" class="text-center subtitle">
          {{ title.untertitel }}
        </h4>
      </div>
      <div
        class="mt-3 ml-auto p-3 p-md-5 header-background"
        :class="imageSrc ? 'sessionContent' : ''"
      >
        <div v-if="dieTermine.length" class="termin-header">
          <span
            ><b>{{ dieFrequency }}</b><br />
            {{ toLocaleDateString(dieTermine[0].from) }}</span
          >
          <span v-if="dieTermine[0].to">
            - {{ toLocaleDateString(dieTermine[0].to) }}</span
          >

          <span v-if="derOrt">
            | <b> {{ $t(derOrt) }}</b></span
          >
        </div>
        <br />
        <img
          v-if="imageSrc"
          :src="imageSrc"
          alt="Jin Shin Jyutsu Hände"
          class="mainImage2"
        />
        <block-content
          v-if="$t(content)"
          :blocks="$t(content)"
          :serializers="serializers"
          projectId="ie6m0uwl"
          dataset="production"
        />

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
import TextCenterBlock from '~/components/blockContent/TextCenterBlock'

const query = groq`
  *[_type == "session" && slug.current == $course] {
    ...
  }[0]
`
export default {
  components: {
    BlockContent,
    SanityImage,
    TextCenterBlock
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
      dateTitle: {
        de: 'Datum',
        en: 'Date'
      },
      serializers: {
        types: {
          textcenter: TextCenterBlock
        }
      }
    }
  },
  async asyncData(kontext) {
    return await sanityClient.fetch(query, kontext.params)
  },
  head() {
    return {
      title: this.title.titel + ' - '
    }
  },
  computed: {
    imageSrc: function() {
      if (this.sessionType == 'astromatrix') {
        return 'https://cdn.sanity.io/images/ie6m0uwl/production/e1679f6501ac1192b2e034eaed2c487873833401-308x308.png?w=150&amp;h=150&amp;fit=max&amp;auto=format'
      } else if (this.sessionType == 'jin-shin-jyutsu') {
        return 'https://cdn.sanity.io/images/ie6m0uwl/production/38994b16abfd6894c539b46c90c5b3b9e7671c5c-440x437.png?rect=2,0,437,437&amp;w=150&amp;h=150&amp;fit=max&amp;auto=format'
      } else {
        return false
      }
    },
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
    dieFrequency: function() {
      if (typeof this.frequency == 'undefined') return ''
      else return this.frequency
    },
    items: function() {
      return {
        de: [
          {
            text: 'Alle Kurse',
            href: '/kurse-angebote'
          },
          {
            text: this.slugCreation(),
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
            text: this.slugCreation(),
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
    },
    slugCreation: function() {
      let res = this.sessionType
        .replace(/-/g, ' ')
        .replace(/(?:^|\s)\S/g, function(a) {
          return a.toUpperCase()
        })
      if (res == 'Astromatrix') {
        return 'AstroMatrix'
      } else return res
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-media';
@import '~/styles/custom-properties';

.mainImage2 {
  width: 152px;
  border: 1px solid #e3c85d;
  position: absolute;
  left: -11%;
  top: 25%;
}

@media (max-width: 978px) {
  .mainImage2 {
    position: relative;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    border: 3px solid #e3c85d;
    margin-bottom: 30px;
  }
}

@media (max-width: 415px) {
  .mainImage2 {
    width: 100px;
  }
}

.breadcrumb-item.active {
  text-transform: none !important;
}

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

img {
  width: 100%;
  vertical-align: top;
}

.termin-header {
  font-size: 2.1rem;
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

.sessionContent {
  padding-left: 15% !important;
  position: relative;
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

@media (max-width: 762px) {
  .termin-header {
    font-size: 1.5rem;
    margin-top: 30px;
    text-align: center;
  }
}

@media (max-width: 521px) {
  .termin-header {
    font-size: 1.3rem;
  }
}

@media (max-width: 736px) {
  .maintitle {
    font-size: 2rem;
  }
  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 482px) {
  .breadcrumb {
    font-size: 12px;
    margin-top: 40px;
  }
  .ml-auto {
    margin: 0 auto;
  }
  .termin-header {
    font-size: 1.2rem;
  }
}

.header-background {
  background: #f5f1f0;
}
</style>
