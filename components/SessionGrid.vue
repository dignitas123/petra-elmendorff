<template>
  <transition name="fade">
    <ul v-if="Object.keys(sessionsByMonth).length" class="sessionGrid">
      <h3 v-if="onlyPast" class="ml-3 mb-4">{{ $t(pastCoursesTitle) }}</h3>
      <div
        v-for="year in Object.keys(this.sessionsByMonth).sort()"
        :key="year"
        class="yearWrap"
      >
        <b-container>
          <b-row class="event-row">
            <b-col class="my-auto">
              <b-container>
                <b-row
                  ><b-col class="my-auto">
                    <h2 class="yearTitle medium-font" style="color: #593f4c;">
                      {{ year }}
                    </h2></b-col
                  >
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
        <div
          v-for="month in Object.keys(sessionsByMonth[year]).sort(
            (a, b) => a - b
          )"
          :key="month"
          class="monthWrap"
        >
          <b-container>
            <b-row
              v-for="session in sessionsByMonth[year][month].sort((a, b) =>
                a.date.from > b.date.from ? 1 : -1
              )"
              :key="session._id"
              class="mb-3 event-row"
              v-bind:class="{ oneOfToManyEvents: session.dates.length > 5 }"
            >
              <b-col class="my-auto">
                <b-container>
                  <b-row
                    ><b-col class="my-auto">
                      <h3 v-if="session.displayDate" class="date">
                        {{ session.displayDate }}
                      </h3>
                      <h3 v-else class="date">
                        <span v-if="session.date && selLanguage == 'de'">{{
                          toLocaleDateStringDay(session.date.from)
                        }}</span>
                        <span v-else-if="selLanguage == 'en'">{{
                          toLocaleDateStringDay(session.date.from)
                        }}</span>
                        <span v-if="session.date.to && selLanguage == 'de'"
                          >- {{ toLocaleDateString(session.date.to) }}</span
                        >
                        <span v-else-if="session.date.to && selLanguage == 'en'"
                          >- {{ toLocaleDateString(session.date.to) }}</span
                        >
                      </h3>
                    </b-col>
                  </b-row>
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
                        <span v-if="session.ort" class="color-grey place">{{
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
                  <h3 class="mt-0 color-normal maintitle">
                    {{ session.title.titel }}
                  </h3>
                  <h5 class="untertitle" v-if="session.title.untertitel">
                    {{ session.title.untertitel }}
                  </h5>
                  <h6
                    v-if="session.date && session.date.desc"
                    class="untertitel termintitel"
                  >
                    {{ session.date.desc }}
                  </h6>
                  <!-- <p class="mb-0">
                  {{ session.summary }}
                </p> -->
                </nuxt-link>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </div>
    </ul>
  </transition>
</template>

<script>
export default {
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
    },
    onlyVideoCourses: {
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
      onlyVideoCoursesTitle: {
        de: 'Online Video Kurse',
        en: 'Online Video Classes'
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
          let fromDate = new Date(session.date.from)
          let year = fromDate.getFullYear()
          let month = parseInt(fromDate.getMonth() + 1)
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
    }
    // videoCourses: props => {
    //   return props.sessions.filter(
    //     session => session.sessionType == 'online-kurse'
    //   )
    // }
  },
  methods: {
    // calculatemonthName(m) {
    //   return new Date(null, m, null).toLocaleDateString('default', {
    //     month: 'long'
    //   })
    // },
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
    toLocaleDateStringDay(date) {
      if (this.selLanguage == 'de') {
        return new Date(date).toLocaleDateString('de-DE', {
          day: 'numeric'
        })
      } else {
        return new Date(date).toLocaleDateString('en-EN', {
          day: 'numeric'
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/custom-properties';

.untertitle {
  margin-bottom: -5px;
  margin-top: -10px;
}

.border {
  border-width: 2px !important;
  border-color: #c39e00 !important;
}

.sessionGrid {
  margin: 0 auto;
  width: 133%;
  padding: 0;
  transform: translateX(-15%);
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
  opacity: 0;
}

.color-grey {
  color: #626364;
  font-weight: bold;
}

.course-text {
  background: #f4f1f0;
}

.yearTitle {
  font-size: 48px;
}

li.session {
  list-style: none;
  margin: 1rem 0.5rem !important;
}

.date {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  color: #593f4c;
}

.termintitel {
  margin-bottom: 0;
}

.color-normal {
  color: #593f4c;
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
  max-width: 200px;
}

h3 {
  margin: 30px 0px 15px 0px;
  color: rgb(53, 53, 53);
}

// .oneOfToManyEvents {
//   .course-text {
//     padding: 0px;
//     h3,h5 {
//       display: inline;
//       font-size: 1rem;
//       margin: 0px 0px 0px 0px;
//     }
//   }

// }

@media (max-width: 1010px) {
  .sessionGrid {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 862px) {
  .date {
    font-size: 17px;
  }
  .maintitle {
    font-size: 17px;
  }
  .untertitle {
    font-size: 17px;
  }
  .termintitel {
    font-size: 17px;
  }
  .max-width-class {
    max-width: 50px;
  }
}

@media (max-width: 650px) {
  .yearTitle {
    font-size: 28px;
  }
  .event-row {
    margin-left: -10px;
  }
  .yearWrap {
    margin: 0;
  }
  .container {
    padding-right: 15px;
  }
  .yearWrap {
    margin: 5px;
  }
  .date {
    font-size: 15px;
  }
  .color-normal {
    font-size: 15px;
  }
  .untertitle {
    font-size: 15px;
  }
  .termintitel {
    font-size: 12px;
  }
  .color-grey {
    font-size: 15px;
  }
  .max-width-class {
    max-width: 90px;
  }
  .container {
    padding-left: 3px;
  }
}

@media (max-width: 337px) {
  .date {
    font-size: 12px;
  }
  .color-normal {
    font-size: 12px;
  }
  .untertitle {
    font-size: 12px;
  }
  .color-grey {
    font-size: 12px;
  }
  .max-width-class {
    max-width: 70px;
  }
  .container {
    padding-left: 3px;
  }
  .figure-caption {
    font-size: 8px;
  }
}
</style>
