<template>
  <div class="sessionGridContainer">
    <b-container class="filter pictures mb-3 text-center d-inline-block">
      <b-row>
        <b-col>
          <figure class="figure">
            <router-link :to="'/' + $t(courseLinkSlug) + '/astromatrix'">
              <b-img
                src="https://cdn.sanity.io/images/ie6m0uwl/production/a3c532c4fa153a1367899ca8312aba5e2ca09abc-170x166.png?rect=2,0,166,166&w=64&h=64&fit=crop&auto=format"
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
                src="https://cdn.sanity.io/images/ie6m0uwl/production/e1a2800e04c2d36dd15bc1bf8cff4e4554c3867e-252x257.png?rect=0,2,252,252&w=64&h=64&fit=crop&auto=format"
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
                src="https://cdn.sanity.io/images/ie6m0uwl/production/4ce5d6fcdb6f31ee4d4b3b0a32d2ae2df62c1d3f-169x166.png?rect=2,0,166,166&w=64&h=64&fit=crop&auto=format"
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
      :sessions="filterCourseType(getSessions, filterCat)"
      :currentSlug="$t(currentSlug).current"
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
    filterCourseType(sessions, coursetype) {
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
.border {
  border-width: 3px !important;
  border-color: #c39e00 !important;
  &:hover {
    cursor: pointer;
  }
}

.sessionGridContainer {
  margin-top: 100px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
