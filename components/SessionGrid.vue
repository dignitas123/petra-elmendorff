<template>
  <ul v-if="Object.keys(sessionsByMonth).length" class="sessionGrid">
    <h3 v-if="onlyPast">{{ $t(pastCoursesTitle) }}</h3>
    <div v-for="year in Object.keys( this.sessionsByMonth ).sort()" :key="year" class="yearWrap">
      <div
        v-for="month in Object.keys( sessionsByMonth[year] ).sort()"
        :key="month"
        class="monthWrap"
      >
        <div class="monthSign">{{ $t(monthName)[month - 1] }} {{ year }}</div>

        <ul class="list-unstyled">
          <b-media
            v-for="session in sessionsByMonth[year][month]"
            :key="session._id"
            tag="li"
            class="mb-2"
          >
            <template #aside>
              <b-img
                :src="courseThumbnail[session.sessionType]"
                class="border border-dark"
                rounded="circle"
                width="64"
                alt="placeholder"
              ></b-img>
            </template>
            <nuxt-link
              :to="
                `/${currentSlug}/${session.sessionType}/${session.slug.current}`
              "
            >
              <h5 class="mt-0 mb-1">{{ session.title }}</h5>
              <p class="mb-0">
                {{ session.summary }}
                <span v-if="session.ort"
                  ><b>{{ $t(session.ort) }}</b></span
                >
                <span v-if="session.date && selLanguage == 'de'">{{
                  session.date.from | de
                }}</span>
                <span v-else-if="selLanguage == 'en'">{{
                  session.date.from | en
                }}</span>
              </p>
            </nuxt-link>
          </b-media>
        </ul>
      </div>
    </div>
    <div v-if="videoCourses.length > 0" class="yearWrap">
      <div class="monthSign">
        {{ $t(videoCourseTitle) }}
      </div>
      <ul class="list-unstyled">
        <b-media
          v-for="session in videoCourses"
          :key="session._id"
          tag="li"
          class="mb-2"
        >
          <template #aside>
            <b-img
              :src="courseThumbnail[session.sessionType]"
              class="border border-dark"
              rounded="circle"
              width="64"
              alt="placeholder"
            ></b-img>
          </template>
          <nuxt-link
            :to="
              `/${currentSlug}/${session.sessionType}/${session.slug.current}`
            "
          >
            <h5 class="mt-0 mb-1">{{ session.title }}</h5>
            <p class="mb-0">
              {{ session.summary }}
              <span v-if="session.ort"><b>{{ $t(session.ort) }}</b></span>
            </p>
          </nuxt-link>
        </b-media>
      </ul>
    </div>
  </ul>
</template>

<script>
// import { dateFilter } from 'vue-date-fns'
import { createDateFilter } from 'vue-date-fns'

export default {
  filters: {
    de: createDateFilter('DD.MM.YYYY'),
    en: createDateFilter('MM/DD/YYYY')
  },
  props: {
    sessions: {
      type: Array,
      default: () => []
    },
    currentSlug: {
      type: String,
      default: ''
    },
    onlyPast: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      selLanguage: this.$store.state.language,
      courseLinkTitle: {
        en: 'Courses-Offers',
        de: 'Kurse-Angebote'
      },
      videoCourseTitle: {
        en: 'Video Courses',
        de: 'Video Kurse'
      },
      place: {
        de: 'Ort',
        en: 'Place'
      },
      pastCoursesTitle: {
        de: 'Vergangene Kurse',
        en: 'past Courses'
      },
      courseThumbnail: {
        'online-kurse':
          'https://cdn.sanity.io/images/ie6m0uwl/production/4ce5d6fcdb6f31ee4d4b3b0a32d2ae2df62c1d3f-169x166.png?rect=2,0,166,166&w=64&h=64&fit=crop&auto=format',
        'online-seminare':
          'https://cdn.sanity.io/images/ie6m0uwl/production/4ce5d6fcdb6f31ee4d4b3b0a32d2ae2df62c1d3f-169x166.png?rect=2,0,166,166&w=64&h=64&fit=crop&auto=format',
        astromatrix:
          'https://cdn.sanity.io/images/ie6m0uwl/production/a3c532c4fa153a1367899ca8312aba5e2ca09abc-170x166.png?rect=2,0,166,166&w=64&h=64&fit=crop&auto=format',
        'jin-shin-jyutsu':
          'https://cdn.sanity.io/images/ie6m0uwl/production/e1a2800e04c2d36dd15bc1bf8cff4e4554c3867e-252x257.png?rect=0,2,252,252&w=64&h=64&fit=crop&auto=format'
      },
      monthName: {
        en: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        de: [
          'Januar',
          'Februar',
          'März',
          'April',
          'Mai',
          'Juni',
          'Juli',
          'August',
          'September',
          'Oktober',
          'November',
          'Dezember'
        ]
      }
    }
  },
  computed: {
    filteredSessions: props => {
      return props.sessions
    },
    // courses packed like obj[year][month] (unsorted obj keys)
    sessionsByMonth: props => {
      let months = {}
      props.sessions.forEach(session => {
        if (session.date && session.showInCal) {
          // pack sessions by month and year
          let fromDate = session.date.from.split('T')[0].split('-')
          let year = fromDate[0]
          let month = fromDate[1]
          if (months[year]) {
            if (months[year][month]) months[year][month].push(session)
            else months[year][month] = [session]
          } else {
            months[year] = {}
            months[year][month] = [session]
          }
        }
      })
      return months
    },
    videoCourses: props => {
      return props.sessions.filter(
        session => session.sessionType == 'online-kurse'
      )
    }
  },
  methods: {
    calculatemonthName(m) {
      return new Date(null, m, null).toLocaleDateString('default', {
        month: 'long'
      })
    }
  }
}
</script>

<style scoped>
@import '~/styles/custom-properties';

.border {
  border-width: 2px !important;
  border-color: #c39e00 !important;
}

.sessionGrid {
  margin: 0 auto;
  padding: 0;
}

h2.sessionTitle {
  font-weight: 600;
  font-size: var(--font-title3-size);
  line-height: var(--font-title3-line-height);
  margin: 0;
  margin-top: 0.5rem;
}

div.monthSign {
  background: #f4e0ed;
  padding: 9px 17px 10px 16px;
  margin: 5px 0px 10px 0px;
  color: rgb(146, 24, 99);
  font-family: var(--font-family-sans);
}

li.session {
  /* display: flex;
  flex-direction: column; */
  list-style: none;
}

.sessionGrid a {
  color: inherit;
  text-decoration: inherit;
}

.sessionGrid a > span {
  display: block;
}

span.type {
  float: left;
  display: block;
  height: 100%;
  text-align: center;
  margin: 10px;
}

.sessionGrid h2 {
  display: inline-block;
}

.sessionGrid a span.type {
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.session .time {
  font-size: var(--font-small-size);
  line-height: var(--font-small-line-height);
  margin-top: 0;
  color: var(--color-gray);
}

.media-body {
  transform: translateY(0.5rem);
}

h3 {
  margin: 30px 0px 15px 0px;
  color: rgb(53, 53, 53);
}

</style>
