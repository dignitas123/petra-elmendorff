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
  },
  // setProgram(state, program) {
  //   state.program = program
  // },
  setLanguage(state, language) {
    state.language = language
  }
}
