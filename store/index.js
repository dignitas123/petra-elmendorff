export const state = () => ({
  eventInformation: {
    title: 'Petra Elmendorff'
  },
  siteSettings: {},
  sessions: {},
  language: 'de'
  // program: {}
})

export const getters = {
  getSiteSettings(state) {
    return state.siteSettings
  },
  getSessions(state) {
    return state.siteSettings
  },
  // getProgram(state) {
  //   return state.program
  // },
  getLanguage(state) {
    return state.language
  }
}

export const mutations = {
  setSiteSettings(state, info) {
    state.siteSettings = info
  },
  setSessions(state, info) {
    state.sessions = info
    // state.sessions.forEach(session => {
    //   if (session.date) {
    //     session.date.from = new Date(session.date.from)
    //     session.date.to = new Date(session.date.to)
    //   }
    // })
  },
  // setProgram(state, program) {
  //   state.program = program
  // },
  setLanguage(state, language) {
    state.language = language
  }
}
