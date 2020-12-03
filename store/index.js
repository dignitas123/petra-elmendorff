export const state = () => ({
  eventInformation: {
    title: 'Petra Elmendorff'
  },
  language: 'DE',
  program: {}
})

export const getters = {
  eventInformation(state) {
    return state.eventInformation
  },
  getProgram(state) {
    return state.program
  },
  getLangauge(state) {
    return state.language
  }
}

export const mutations = {
  setEventInformation(state, info) {
    state.eventInformation = info
  },
  setProgram(state, program) {
    state.program = program
  },
  setLanguage(state, language) {
    state.language = language
  }
}
