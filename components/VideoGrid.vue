<template>
  <transition name="fade">
    <ul v-if="sessions.length" class="sessionGrid videoGrid">
      <h3 v-if="onlyPast">{{ $t(pastCoursesTitle) }}</h3>
      <b-container>
        <b-row v-for="session in sessions" :key="session._id" class="mb-3">
          <b-col class="my-auto py-3 mx-5 course-text text-center">
            <nuxt-link
              :to="
                `/${currentSlug}/${session.sessionType}/${session.slug.current}`
              "
            >
              <h3 class="mt-2 mb-1 color-normal">
                {{ session.title.titel }}
                <!-- <span
                    v-if="session.date && session.date.desc"
                    class="termintitel"
                  >
                    - {{ session.date.desc }}</span
                  > -->
              </h3>
              <div v-if="session.title.untertitel">
                <h5 class="untertitle">{{ session.title.untertitel }}</h5>
              </div>
              <!-- <p class="mb-0">
                  {{ session.summary }}
                </p> -->
            </nuxt-link>
          </b-col>
        </b-row>
      </b-container>
      <!-- </div>
      </div> -->
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
      // pastCoursesTitle: {
      //   de: 'Vergangene Kurse',
      //   en: 'Past Classes'
      // },
      // onlyVideoCoursesTitle: {
      //   de: 'Online Video Kurse',
      //   en: 'Online Video Classes'
      // },
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
  opacity: 0;
}

.color-grey {
  color: #626364;
  font-weight: bold;
}

.course-text {
  background: #f4f1f0;
}

// .course-text:hover {
//   background: #a5831d;
//   a {
//     color: #fff !important;
//     transition: color 1s;
//   }
//   h3 {
//     color: #fff !important;
//     transition: color 1s;
//   }
//   transition: background 1s;
// }

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
  max-width: 500px;
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

@media (max-width: 650px) {
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
