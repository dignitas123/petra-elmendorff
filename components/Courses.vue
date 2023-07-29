<template>
  <div>
    <header class="header-content container margin-top">
      <hr class="image-sep" style="margin-top: 5px; margin-bottom: 7px;" />
    </header>
    <div class="sessionGridContainer">
      <b-container class="filter pictures mb-2 mt-2 text-center d-inline-block">
        <b-breadcrumb
          v-if="breadCrumb"
          :items="$t(items)"
          class="ml-5"
        ></b-breadcrumb>
        <b-row>
          <b-col>
            <h1 class="kalendar medium-font">{{ $t(kalender) }}</h1>
          </b-col>
        </b-row>
        <b-row class="preview-grid">
          <b-col class="preview-grid-col" @click="scrollToTarget('YearWrap')"
            ><figure class="figure">
              <router-link :to="'/' + $t(courseLinkSlug) + '/jin-shin-jyutsu'">
                <b-img
                  src="https://cdn.sanity.io/images/ie6m0uwl/production/08adb0dc609005383c88be7afe1b979693379478-440x437.png?h=128"
                  class="border border-dark"
                  width="200"
                  alt="Jin Shin Jyutsu"
                  @click="scrollToTarget('YearWrap')"
                ></b-img
              ></router-link>
              <figcaption class="figure-caption mt-2">
                Jin Shin Jyutsu
              </figcaption>
            </figure></b-col
          >
          <b-col @click="scrollToTarget('YearWrap')">
            <figure class="figure">
              <router-link :to="'/' + $t(courseLinkSlug) + '/astromatrix'">
                <b-img
                  src="https://cdn.sanity.io/images/ie6m0uwl/production/e1679f6501ac1192b2e034eaed2c487873833401-308x308.png?h=128"
                  class="border border-dark float"
                  width="200"
                  alt="Astromatrix"
                ></b-img
              ></router-link>
              <figcaption class="figure-caption mt-2">
                AstroMatrix
              </figcaption>
            </figure></b-col
          >
          <b-col @click="scrollToTarget('YearWrap')"
            ><figure class="figure">
              <router-link :to="'/' + $t(courseLinkSlug) + '/online-seminare'"
                ><b-img
                  src="https://cdn.sanity.io/images/ie6m0uwl/production/da0dffd3daf43d3e1e84bdec323d206f956a3ee5-308x308.jpg?h=128"
                  class="border border-dark"
                  width="200"
                  alt="Online Seminare"
                ></b-img
              ></router-link>
              <figcaption class="figure-caption mt-2">
                Online
              </figcaption>
            </figure></b-col
          >
        </b-row>
      </b-container>

      <SessionGrid
        :sessions="filterTime(sessionsToShow, false, true, true, true)"
        :current-slug="$t(currentSlug).current"
      />

      <!-- <SessionGrid
      v-if="$route.params.coursetype != 'online-seminare'"
      :sessions="filterTime(sessionsToShow, true, false, false, false)"
      :currentSlug="$t(currentSlug).current"
      :onlyPast="true"
      class="pastCourses"
    /> -->

      <!-- <div v-if="$route.params.coursetype == 'online-seminare'">
      <div>
        <b-container>
          <b-row class="event-row text-center my-3">
            <b-col class="my-auto">
              <h2 class="yearTitle medium-font" style="color: #e5dfdd;">
                {{ $t(onlineSeminare) }}
              </h2></b-col
            >
          </b-row>
        </b-container>
      </div>

      <VideoGrid
        :sessions="filterCourseType(getSessions, 'online-kurse')"
        :currentSlug="$t(currentSlug).current"
        :onlyVideoCourses="true"
      />
    </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SessionGrid from '~/components/SessionGrid'
// import VideoGrid from '~/components/VideoGrid'

export default {
  components: {
    SessionGrid
    // VideoGrid
  },
  props: {
    filterCat: {
      type: String,
      default: ''
    },
    breadCrumb: {
      type: Boolean,
      default: false
    },
    items: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      courseTranslation: {
        en: 'Classes',
        de: 'Kurse'
      },
      courseLinkSlug: {
        en: 'courses-offers',
        de: 'kurse-angebote'
      },
      kalender: {
        de: 'Kalender',
        en: 'Calendar'
      },
      onlineSeminare: {
        de: 'Shop für Online Seminare',
        en: 'Shop for Online Seminars'
      }
    }
  },
  head() {
    return {
      title: this.$t(this.kalender) + ' - '
    }
  },
  computed: {
    ...mapGetters(['currentSlug', 'getDates', 'getSessions', 'getLanguage']),
    sessionsWithShowinCalTag: function() {
      return this.getDates.filter(session => session.showInCal)
    },
    sessionsToShow: function() {
      return this.filterCourseType(
        this.filterLang(this.sessionsWithShowinCalTag, this.getLanguage),
        this.filterCat
      )
    }
  },
  created() {
    this.$store.commit('setCurrentSlug', {
      en: { current: 'courses-offers' },
      de: { current: 'kurse-angebote' }
    })
  },
  methods: {
    scrollToTarget(targetId) {
      setTimeout(() => {
        const target = document.getElementById(targetId)
        if (target) {
          this.$nextTick(() => {
            const topOffset = target.getBoundingClientRect().top
            window.scrollBy({
              top: topOffset,
              behavior: 'smooth'
            })
          })
        }
      }, 500)
    },
    filterLang: function(sessions, lang) {
      if (lang && lang != 'de') {
        // added && lang != 'de' because Petra wants also english courses shown in german calendar
        return sessions.filter(session => {
          return session.sessionLang === lang
        })
      } else return sessions
    },
    filterCourseType: function(sessions, coursetype) {
      if (coursetype) {
        return sessions.filter(session => {
          return session.sessionType === coursetype
        })
      } else return sessions
    },
    filterTime: function(sessions, past, ongoing, future, noDate) {
      let now = new Date()
      return sessions.filter(session => {
        if (!session.date.from) return noDate

        let from = new Date(session.date.from)
        let to = session.date.to ? new Date(session.date.to) : from

        let isPast = to < now
        let isOngoing = to > now && from < now
        let isFuture = from > now
        session.dateDif = isPast
          ? 'past'
          : isOngoing
          ? 'ongoing'
          : isFuture
          ? 'future'
          : undefined
        return (
          (past && isPast) || (ongoing && isOngoing) || (future && isFuture)
        )
      })
    }
  }
}
</script>

<style scoped lang="scss">
@media (max-width: 767px) {
  .filter {
    margin-top: 30px;
  }
}

@media (max-width: 590px) {
  .kalendar {
    font-size: 35px;
  }
  .filter {
    margin-top: 60px;
  }
  .border {
    width: 70px;
  }
}

.border {
  border-width: 1px !important;
  border-color: #c39e00 !important;
  // transition: box-shadow 0.2s cubic-bezier(0, 0.7, 0.38, 1.06);
  // &:hover {
  //   cursor: pointer;
  //   // box-shadow: 0px 0px 20px black;
  //   box-shadow: 0 0 15px 0px #00000047;
  // }
}

.sessionGridContainer {
  margin-top: 100px;
  max-width: 800px;
  margin: 0 auto;
}

.sessionGrid.pastCourses {
  filter: grayscale(100%) brightness(70%) contrast(2);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: gray;
  -webkit-filter: grayscale(1);
  opacity: 0.9;
}

.kalendar {
  color: #e0d7d6;
  font-size: 50px;
}

@media (max-width: 355px) {
  .preview-grid {
    margin-left: 0;
    margin-right: 0;
  }
  .preview-grid-col {
    padding-left: 0;
    padding-right: 0;
  }
  .pictures {
    padding-right: 5px;
    padding-left: 5px;
  }
}
</style>
