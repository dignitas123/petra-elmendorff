import pkg from './package'
import sanityClient from './sanityClient'

const routesQuery = `
  {
    "sessions": *[_type == "session"],
    "speakers": *[_type == "person" && defined(slug.current)]
  }
`

export default {
  server: {
    port: process.env.PORT || 8080,
    host: '0.0.0.0'
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true
  },
  // vue: {
  //   config: {
  //     devtools: true
  //   }
  // },
  router: {
    linkActiveClass: 'active-link'
  },
  // dev: process.env.NODE_ENV !== 'production',
  ssr: true,

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ]
    //link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    { src: 'normalize.css' },
    '@/assets/scss/custom.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/eventInformation', '~/plugins/fontawesome.js'],

  /*
   ** Nuxt.js modules
   */

  // don't need PWA `'@nuxtjs/pwa'`
  modules: ['bootstrap-vue/nuxt'],

  /*
   ** Set global info from sanity document
   */
  eventInformation: () => {
    console.log('sanity fetch config info', '*[_id == "eventInformation"]')
    return sanityClient.fetch('*[_id == "eventInformation"]').then(res => res)
  },

  /*
   ** Generate dynamic routes from data from sanity.
   ** Used only for generating static served HTML files
   */
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
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
