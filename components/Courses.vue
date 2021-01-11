<template>
  <div class="sessionGridContainer">
    <b-container class="filter pictures mb-3 text-center d-inline-block">
      <b-row>
        <b-col>
          <figure class="figure">
            <router-link :to="'/' + $t(courseLinkSlug) + '/astromatrix'">
              <b-img
                src="https://cdn.sanity.io/images/ie6m0uwl/production/e910a16b397f52b40b96b9294bbf867fd3193ff4-152x152.png?h=128"
                class="border border-dark float"
                rounded="circle"
                width="120"
                alt="Astromatrix"
              ></b-img
            ></router-link>
            <figcaption class="figure-caption mt-2">
              Astromatrix {{ $t(courseTranslation) }}
            </figcaption>
          </figure></b-col
        >
        <b-col
          ><figure class="figure">
            <router-link :to="'/' + $t(courseLinkSlug) + '/jin-shin-jyutsu'">
              <b-img
                src="https://cdn.sanity.io/images/ie6m0uwl/production/65d1025347292caa979fb48ebca45097fdb4a150-242x229.png?h=128"
                class="border border-dark"
                rounded="circle"
                width="120"
                alt="Jin Shin Jyutsu"
              ></b-img
            ></router-link>
            <figcaption class="figure-caption mt-2">
              Jin Shin Jyutsu {{ $t(courseTranslation) }}
            </figcaption>
          </figure></b-col
        >
        <b-col
          ><figure class="figure">
            <router-link :to="'/' + $t(courseLinkSlug) + '/online-seminare'"
              ><b-img
                src="https://cdn.sanity.io/images/ie6m0uwl/production/f939f6d0741e0cd65d59c86429ae9c899fde2cc5-3338x3240.jpg?h=128"
                class="border border-dark"
                rounded="circle"
                width="120"
                alt="Online Seminare"
              ></b-img
            ></router-link>
            <figcaption class="figure-caption mt-2">
              {{ $t(seminarTranslation) }}
            </figcaption>
          </figure></b-col
        >
      </b-row>
    </b-container>
    <!-- <b-breadcrumb :items="$t(items)"></b-breadcrumb> -->
    <SessionGrid
      :sessions="
        filterTime(
          filterCourseType(getSessions, filterCat),
          false,
          true,
          true,
          true
        )
      "
      :currentSlug="$t(currentSlug).current"
    />

    <SessionGrid
      :sessions="
        filterTime(
          filterCourseType(getSessions, filterCat),
          true,
          false,
          false,
          false
        )
      "
      :currentSlug="$t(currentSlug).current"
      :onlyPast="true"
      class="pastCourses"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SessionGrid from '~/components/SessionGrid'

export default {
  components: {
    SessionGrid
  },
  props: {
    filterCat: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      courseTranslation: {
        en: 'Courses',
        de: 'Kurse'
      },
      seminarTranslation: {
        en: 'Online Seminars & Video Courses',
        de: 'Online Seminare & Video Kurse'
      },
      courseLinkSlug: {
        en: 'courses-offers',
        de: 'kurse-angebote'
      }
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
    ...mapGetters(['currentSlug']),
    ...mapGetters(['getSessions']),
    items: function() {
      return {
        de: [
          {
            text: 'Alle Kurse',
            href: '/kurse-angebote',
            active: true
          }
        ],
        en: [
          {
            text: 'All Courses',
            href: '/courses-offers',
            active: true
          }
        ]
      }
    }
  },
  methods: {
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

        let from = new Date(session.date.from.split('T')[0].split('-'))
        let to = session.date.to
          ? new Date(session.date.to.split('T')[0].split('-'))
          : from

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

@media (max-width: 482px) {
  .filter {
    margin-top: 60px;
  }
  .border {
    width: 70px;
  }
}

.border {
  border-width: 3px !important;
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
</style>
