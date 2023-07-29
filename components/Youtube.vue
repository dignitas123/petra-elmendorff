<template>
  <div>
    <header class="header-content container margin-top">
      <hr class="image-sep" style="margin-top: 5px; margin-bottom: 7px;" />
    </header>
    <div class="sessionGridContainer">
      <b-container class="filter pictures mb-2 mt-2 text-center d-inline-block">
        <b-row>
          <b-col>
            <h1 class="kalendar medium-font">‚WE ARE ONE‘</h1>
            <h4 class="mt-3" style="color: #593f4c; margin-top: -13px">
              {{ $t(letsStartSelfHelpJustFlowAlong) }}
            </h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            Test
          </b-col>
          <b-col>
            Test
          </b-col>
          <b-col>
            Test
          </b-col>
          <b-col>
            Test
          </b-col>
          <b-col>
            Test
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
      letsStartSelfHelpJustFlowAlong: {
        en: '‚Let´ start Selfhelp‘ - just flow along',
        de: '‚Let´ start Selfhelp‘ - einfach Mitströmen'
      },
      courseLinkTitle: {
        en: 'Go Back to the Calendar',
        de: 'Zurück zum Kalender'
      }
    }
  },
  head() {
    return {
      title: 'Shop - '
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
  created() {
    this.$store.commit('setCurrentSlug', {
      en: { current: 'courses-offers' },
      de: { current: 'kurse-angebote' }
    })
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
  }
}
</script>

<style scoped lang="scss">
.btn {
  border: 1px solid black;
  &:hover {
    background: rgba(189, 189, 189, 0.7);
  }
}

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
