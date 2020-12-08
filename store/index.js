export const state = () => ({
  eventInformation: {
    title: 'Petra Elmendorff'
  },
  siteSettings: {},
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
  setSiteSettings(state, info) {
    state.siteSettings = info
  },
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
