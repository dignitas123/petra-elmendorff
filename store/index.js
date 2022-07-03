export const state = () => ({
  eventInformation: {
    title: 'Petra Elmendorff'
  },
  siteSettings: {},
  kurse: {},
  language: 'de',
  currentSlug: {} // save both langs of current slug/route hier
})

export const getters = {
  getSiteSettings(state) {
    return state.siteSettings
  },
  getSessions(state) {
    return state.sessions
  },
  // get Sessions split up by Dates (sessions with multiple dates get shallowcopied)
  getDates(state) {
    let dates = []
    state.sessions.forEach(sessi => {
      // split up sessions by dates
      if (sessi.dates) {
        sessi.dates.forEach(function(otherDate) {
          //copy session object
          let dummySession = Object.assign({}, sessi)
          // set old api stzle date
          dummySession.date = otherDate
          dummySession.originalSessionObj = sessi
          dates.push(dummySession)
        })
      }
    })
    dates.sort((a, b) => (a.date.from > b.date.from ? 1 : -1))
    return dates
  },
  getLanguage(state) {
    return state.language
  },
  subheader(state) {
    return deepTranslate(state.siteSettings.subheader, state.language)
  },
  currentSlug(state) {
    return state.currentSlug
  },
  headermenue(state) {
    return deepTranslate(state.siteSettings.headermenue, state.language)
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
  },
  setCurrentSlug(state, slug) {
    state.currentSlug = slug
  }
}

export const actions = {
  nuxtServerInit(vuexContext, { req }) {
    let headerlang = req.headers['accept-language']
      ? req.headers['accept-language'].split(',')[0].split('-')[0]
      : false

    let coockielang = this.$cookies.get('lang')

    if (coockielang) {
      vuexContext.commit('setLanguage', coockielang)
    } else if (headerlang == 'en') vuexContext.commit('setLanguage', 'en')
  }
}

const deepTranslate = function(obj, lang, langDefault = 'de') {
  if (obj != null && Array.isArray(obj)) {
    return obj.map(val => deepTranslate(val, lang, langDefault))
  } else if (obj != null && typeof obj === 'object') {
    if (obj.hasOwnProperty(lang)) return obj[lang]
    else if (obj.hasOwnProperty(langDefault)) return obj[langDefault]
    else {
      var res = {}
      for (var key in obj) {
        if (obj.hasOwnProperty(key))
          res[key] = deepTranslate(obj[key], lang, langDefault)
      }
      return res
    }
  } else {
    return obj
  }
}
