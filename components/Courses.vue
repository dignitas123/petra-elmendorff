<template>
  <!-- <h1 class="title">Sessions</h1> -->
  <div class="sessionGridContainer">
    <SessionGrid :sessions="sessions" :currentSlug="$t(currentSlug).current" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SessionGrid from '~/components/SessionGrid'

export default {
  components: {
    SessionGrid
  },
  data() {
    return {
      // program: this.$store.getters.getProgram
      sessions: this.$store.state.sessions
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
    console: function() {
      console.log('Courses rendered')
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
