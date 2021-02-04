<template>
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
        <b-col class="preview-grid-col"
          ><figure class="figure">
            <router-link :to="'/' + $t(courseLinkSlug) + '/jin-shin-jyutsu'">
              <b-img
                src="https://cdn.sanity.io/images/ie6m0uwl/production/08adb0dc609005383c88be7afe1b979693379478-440x437.png?h=128"
                class="border border-dark"
                width="150"
                alt="Jin Shin Jyutsu"
              ></b-img
            ></router-link>
            <figcaption class="figure-caption mt-2">
              Jin Shin Jyutsu
              <!--{{ $t(courseTranslation) }} -->
            </figcaption>
          </figure></b-col
        >
        <b-col>
          <figure class="figure">
            <router-link :to="'/' + $t(courseLinkSlug) + '/astromatrix'">
              <b-img
                src="https://cdn.sanity.io/images/ie6m0uwl/production/e1679f6501ac1192b2e034eaed2c487873833401-308x308.png?h=128"
                class="border border-dark float"
                width="150"
                alt="Astromatrix"
              ></b-img
            ></router-link>
            <figcaption class="figure-caption mt-2">
              Astromatrix
              <!--{{ $t(courseTranslation) }} -->
            </figcaption>
          </figure></b-col
        >
        <b-col
          ><figure class="figure">
            <router-link :to="'/' + $t(courseLinkSlug) + '/online-seminare'"
              ><b-img
                src="https://cdn.sanity.io/images/ie6m0uwl/production/da0dffd3daf43d3e1e84bdec323d206f956a3ee5-308x308.jpg?h=128"
                class="border border-dark"
                width="150"
                alt="Online Seminare"
              ></b-img
            ></router-link>
            <figcaption class="figure-caption mt-2">
              <!-- {{ $t(seminarTranslation) }} -->
              Online
            </figcaption>
          </figure></b-col
        >
      </b-row>
    </b-container>

    <SessionGrid
      :sessions="filterTime(sessionsToShow, false, true, true, true)"
      :currentSlug="$t(currentSlug).current"
    />

    <SessionGrid
      :sessions="filterTime(sessionsToShow, true, false, false, false)"
      :currentSlug="$t(currentSlug).current"
      :onlyPast="true"
      class="pastCourses"
    />

    <!--
    <VideoGrid
      :sessions="filterCourseType(getSessions, 'online-kurse')"
      :currentSlug="$t(currentSlug).current"
      :onlyVideoCourses="true"
    /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SessionGrid from '~/components/SessionGrid'
import VideoGrid from '~/components/VideoGrid'

export default {
  components: {
    SessionGrid,
    VideoGrid
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
      seminarTranslation: {
        // en: 'Online Seminars & Video Classes',
        // de: 'Online Seminare & Video Kurse'
      },
      courseLinkSlug: {
        en: 'courses-offers',
        de: 'kurse-angebote'
      },
      kalender: {
        de: 'Kalender',
        en: 'Calendar'
      }
    }
  },
  head() {
    return {
      title: this.$t(this.kalender) + " - "
    }
  },
  computed: {
    // sessionsWithoutBreak: data => {
    //   if (data.program && data.program.schedule) {
    //     return data.program.schedule.filter(
    //       i => i.session.sessionType !== 'break'
    //     )
    //   }
    // }
    ...mapGetters(['currentSlug', 'getDates', 'getSessions', 'getLanguage']),
    // items: function() {
    //   return {
    //     de: [
    //       {
    //         text: 'Alle Kurse',
    //         href: '/kurse-angebote',
    //         active: true
    //       }
    //     ],
    //     en: [
    //       {
    //         text: 'All Classes',
    //         href: '/courses-offers',
    //         active: true
    //       }
    //     ]
    //   }
    // },
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
  methods: {
    filterLang: function(sessions, lang) {
      if (lang) {
        return sessions.filter(session => {
          return session.sessionLang === lang
        })
      } else return sessions
    },
    filterCourseType: function(sessions, coursetype) {
      if (coursetype) {
        // console.log(
        //   'RETURN',
        //   sessions.filter(session => {
        //     console.log('SESSION TYPE', session.sessionType, coursetype)
        //     return session.sessionType === coursetype
        //   })
        // )
        return sessions.filter(session => {
          // console.log("SESSION TYPE", session.sessionType, coursetype)
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
        // console.log("SESSION dATE", session.title, isPast, isOngoing, isFuture)

        return (
          (past && isPast) || (ongoing && isOngoing) || (future && isFuture)
        )
      })
    }
  },
  created() {
    this.$store.commit('setCurrentSlug', {
      en: { current: 'courses-offers' },
      de: { current: 'kurse-angebote' }
    })
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
  transition: box-shadow 0.2s cubic-bezier(0, 0.7, 0.38, 1.06);
  &:hover {
    cursor: pointer;
    // box-shadow: 0px 0px 20px black;
    box-shadow: 0 0 15px 0px #00000047;
  }
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
