<template>
  <ul v-if="sessionsByMonth" class="sessionGrid">
    <div v-for="(months, year) in sessionsByMonth" :key="year" class="yearWrap">
      <div
        v-for="(sessionsOneMonth, month) in months"
        :key="month"
        class="monthWrap"
      >
        <div class="monthSign">
          {{ monthName[selLanguage][month - 1] }} {{ year }}
        </div>

        <li
          v-for="session in sessionsOneMonth"
          :key="session._id"
          class="session"
        >
          <nuxt-link :to="`/${currentSlug}/${session._id}`">
            <span class="top">
              <span>
                <span class="type">{{ session.sessionType }}</span>
                <h2 class="sessionTitle">{{ session.title }}</h2>
              </span>
              <span
                class="time"
                :title="session.date.from | date('MMMM DD h:MM a')"
              >
                {{ session.date.from | date('MMMM DD') }}
                <p>
                  {{ session.summary }}
                </p>
              </span>
            </span>
          </nuxt-link>
        </li>
      </div>
    </div>
  </ul>
</template>

<script>
// import { dateFilter } from 'vue-date-fns'
import { createDateFilter } from 'vue-date-fns'
import { de } from 'date-fns/locale'

export default {
  filters: {
    date: createDateFilter('dd MMMM yyyy', { de })
  },
  components: {},
  props: {
    sessions: {
      type: Array,
      default: () => []
    },
    currentSlug: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      courseLinkTitle: {
        en: 'Courses-Offers',
        de: 'Kurse-Angebote'
      },
      selLanguage: this.$store.state.language,
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
    sessionsByMonth: props => {
      let months = {}
      /* eslint-disable */
      props.sessions.forEach(session => {
        if (session.date) {
          // sort sessions by month and year
          let fromDate = session.date.from.split('T')[0].split('-')
          let year = fromDate[0]
          let month = fromDate[1]
          if (months[year]) {
            if (months[year][month]) months[year][month].push(session)
            else months[year][month] = [session]
          } else {
            months[year] = {}
            months[year][month] = [session]
            // console.log(months)
          }
        }
      })
      return months
    }
  },
  methods: {
    calculatemonthName (m) {
      return new Date(null, m, null).toLocaleDateString('default', {
        month: 'long'
      })
    }
  }
}
</script>

<style scoped>
@import '../styles/custom-properties.css';

.sessionGrid {
  margin: 0;
  padding: 0;
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 3rem; */
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

/* .session .top {
  display: flex;
  justify-content: space-between;
} */

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
</style>
