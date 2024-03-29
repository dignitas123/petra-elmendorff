export default {
  components: true,
  server: {
    port: process.env.PORT || 5000,
    host: '0.0.0.0'
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true
  },
  router: {
    linkActiveClass: 'active-link'
  },
  dev: process.env.NODE_ENV !== 'production',
  ssr: true,

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%sPetra Elmendorff - Jin Shin Jyutsu & AstroMatrix',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
    ],
    script: [
      {
        src:
          'https://klicktipp.s3.amazonaws.com/listbuildings/system/forms/scripts/protect.js'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [{ src: 'normalize.css' }, '@/assets/scss/custom.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/eventInformation', '~/plugins/deepTranslate'],

  /*
   ** Nuxt.js modules
   */

  // don't need PWA `'@nuxtjs/pwa'`
  modules: [
    'bootstrap-vue/nuxt',
    'vue-scrollto/nuxt',
    'cookie-universal-nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: 'G-4LS7MEP022'
  },
  sitemap: {
    gzip: true,
    routes: [
      {
        url: '/',
        changefreq: 'daily',
        priority: 1,
        lastmod: '2021-01-02T13:30:00.000Z'
      },
      {
        url: '/about',
        changefreq: 'weekly',
        priority: 2,
        lastmod: '2021-01-02T13:30:00.000Z'
      },
      {
        url: '/astromatrix',
        changefreq: 'weekly',
        priority: 3,
        lastmod: '2021-01-02T13:30:00.000Z'
      },
      {
        url: '/jin-shin-jyutsu',
        changefreq: 'weekly',
        priority: 4,
        lastmod: '2021-01-02T13:30:00.000Z'
      }
    ]
  },

  /*
   ** Set global info from sanity document
   */
  // eventInformation: () => {
  //   console.log('sanity fetch config info', '*[_id == "eventInformation"]')
  //   return sanityClient.fetch('*[_id == "eventInformation"]').then(res => res)
  // },

  /*
   ** Generate dynamic routes from data from sanity.
   ** Used only for generating static served HTML files
   */

  /*
  generate: {
    routes: () => {
      console.log('sanity fetch config generate', routesQuery)
      return sanityClient.fetch(routesQuery).then(res => {
        return [
          ...res.sessions.map(item => `/sessions/${item._id}`),
          ...res.speakers.map(item => `/speakers/${item.slug.current}`)
        ]
      })
    }
  },
  */

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
          stage: 3,
          features: {
            'color-mod-function': { unresolved: 'warn' },
            'nesting-rules': true,
            'custom-media-queries': {
              preserve: false
            },
            'custom-properties': {
              preserve: false
            }
          }
        }
      }
    }

    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
