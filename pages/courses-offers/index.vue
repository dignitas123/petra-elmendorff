<template>
  <section class="container">
    <!-- <h1 class="title">Sessions</h1> -->
    <div class="sessionGridContainer">
      <SessionGrid :sessions="sessions" :currentSlug="$t(currentSlug).current" />
    </div>
  </section>
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
    ...mapGetters(['currentSlug'])
  },
  created() {
    this.$store.commit('setCurrentSlug', {
      en: { current: 'courses-offers' },
      de: { current: 'kurse-angebote' }
    })
  }
}
</script>

<style scoped>
@import '../../styles/custom-properties.css';

.container {
  padding: 1.5rem 0;
  box-sizing: border-box;
  min-height: calc(100% - 72px - 216px);
}

.title {
  text-align: center;
  margin-bottom: 4rem;
}

.sessionGridContainer {
  max-width: var(--width-medium);
  padding: 0 1.5rem;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
