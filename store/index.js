export const state = () => ({
  eventInformation: {
    title: 'Petra Elmendorff'
  },
  siteSettings: {},
  sessions: {},
  language: 'de',
  currentSlug: {} // save both langs of current slug/route hier
})

export const getters = {
  getSiteSettings (state) {
    return state.siteSettings
  },
  getSessions (state) {
    return state.siteSettings
  },
  // getProgram(state) {
  //   return state.program
  // },
  getLanguage (state) {
    return state.language
  },
  subheader (state) {
    return deepTranslate(state.siteSettings.subheader, state.language)
  },
  currentSlug (state) {
    return state.currentSlug
  },
  headermenue (state) {
    return deepTranslate(state.siteSettings.headermenue, state.language)
  }
}

export const mutations = {
  setSiteSettings (state, info) {
    state.siteSettings = info
  },
  setSessions (state, info) {
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
  setLanguage (state, language) {
    state.language = language
  },
  setCurrentSlug (state, slug) {
    state.currentSlug = slug
  }
}

const deepTranslate = function (obj, lang, langDefault='de') {
  if (obj != null && Array.isArray(obj)) {
    return obj.map(val => deepTranslate(val, lang, langDefault));
  } 
  else if (obj != null && typeof obj === 'object') {
      if (obj.hasOwnProperty(lang) ) return obj[lang]
      else if (obj.hasOwnProperty(langDefault) ) return obj[langDefault]
      else {
        var res = {};
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) res[key] = deepTranslate(obj[key], lang, langDefault)
        }
        return res;
      }
  } 
  else {
      return obj;
  }
}