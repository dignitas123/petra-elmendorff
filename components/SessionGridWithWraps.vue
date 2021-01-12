<template>
  <transition name="fade">
    <ul v-if="Object.keys(sessionsByMonth).length" class="sessionGrid">
      <h3 v-if="onlyPast">{{ $t(pastCoursesTitle) }}</h3>
      <div
        v-for="year in Object.keys(this.sessionsByMonth).sort()"
        :key="year"
        class="yearWrap"
      >
        <div
          v-for="month in Object.keys(sessionsByMonth[year]).sort()"
          :key="month"
          class="monthWrap"
        >
          <div class="monthSign mb-3">
            {{ $t(monthName)[month - 1] }} {{ year }}
          </div>

          <b-container>
            <b-row
              v-for="session in sessionsByMonth[year][month]"
              :key="session._id"
              class="mb-3"
            >
              <b-col class="my-auto">
                <b-container>
                  <b-row
                    ><b-col class="my-auto">
                      <h3
                        v-if="session.date && selLanguage == 'de'"
                        class="date"
                      >
                        {{ session.date.from | de }}
                      </h3>
                      <h3 v-else-if="selLanguage == 'en'">
                        {{ session.date.from | en }}
                      </h3></b-col
                    ></b-row
                  >
                  <b-row
                    ><b-col class="max-width-class">
                      <template
                        v-if="
                          session.sessionType == 'online-seminare' ||
                            session.sessionType == 'online-kurse'
                        "
                      >
                        <span class="color-grey">Online</span>
                      </template>
                      <template v-else>
                        <span v-if="session.ort" class="color-grey">{{
                          $t(session.ort)
                        }}</span>
                      </template>
                    </b-col></b-row
                  >
                </b-container>
              </b-col>
              <b-col cols="8" class="my-auto py-3 course-text text-center">
                <nuxt-link
                  :to="
                    `/${currentSlug}/${session.sessionType}/${session.slug.current}`
                  "
                >
                  <h3 class="mt-0 mb-1 color-normal">
                    {{ session.title.titel }}
                    <!-- <span
                    v-if="session.date && session.date.desc"
                    class="termintitel"
                  >
                    - {{ session.date.desc }}</span
                  > -->
                  </h3>
                  <div v-if="session.title.untertitel">
                    <h5>{{ session.title.untertitel }}</h5>
                  </div>
                  <!-- <p class="mb-0">
                  {{ session.summary }}
                </p> -->
                </nuxt-link>
              </b-col>
            </b-row>
          </b-container>
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
            class="mb-3"
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
              </p>
            </nuxt-link>
          </b-media>
        </ul>
      </div>
    </ul>
  </transition>
</template>

<script>
// import { dateFilter } from 'vue-date-fns'
import { createDateFilter } from 'vue-date-fns'
import { de } from "date-fns/locale";

export default {
  filters: {
    de: createDateFilter('DD. MMMM', { locale: de }),
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
        en: 'Classes-Offers',
        de: 'Kurse-Angebote'
      },
      videoCourseTitle: {
        en: 'Video Classes',
        de: 'Video Kurse'
      },
      place: {
        de: 'Ort',
        en: 'Place'
      },
      pastCoursesTitle: {
        de: 'Vergangene Kurse',
        en: 'Past Classes'
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
        if (session.date) {
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

<style scoped lang="scss">
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
  background: #d6c9c970;
  padding: 11px 17px 10px 17px;
  color: #593f4c;
  font-family: 'GillSans';
}

.color-grey {
  color: #626364;
}

.course-text:hover {
  background: #d6c9c970;
  background-size: contain;
}

li.session {
  /* display: flex;
  flex-direction: column; */
  list-style: none;
  margin: 1rem 0.5rem !important;
}

.date {
  font-family: "GillSansMedium";
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  color: #593f4c;
}

.color-normal {
  color: #593f4c;
  font-family: "GillSansMedium";
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

.media {
  transition: all 0.2s cubic-bezier(0, 0.7, 0.38, 1.06);
}

.max-width-class {
  max-width: 500px;
}

h3 {
  margin: 30px 0px 15px 0px;
  color: rgb(53, 53, 53);
}

@media (max-width: 576px) {
  .yearWrap {
    margin: 5px;
  }
}
</style>
