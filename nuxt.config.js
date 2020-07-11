require('dotenv').config()

module.exports = {
  // mode: 'universal',
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Daily Necessities',
    // title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    middleware: ['authenticated']
  },
  plugins: ["@/plugins/firebase"],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  '~/assets/style/app.scss',
  'firebaseui/dist/firebaseui.css'
],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-loading-template.js', ssr: false },
    { src: '~/plugins/vue-touch.js'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    '@nuxtjs/nuxt-leaflet'
  ],
  buildModules: [
    '@nuxtjs/pwa',
  ],
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASEURL: process.env.FIREBASE_DATABASEURL,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
    GURUNAVI_API_KEY: process.env.GURUNAVI_API_KEY
  },
  manifest: {
    name: "Daily Necessities",
    lang: 'ja'
  },
  // fontのimport
  modules: [['nuxt-webfontloader']],
  webfontloader: {
    google: {
      families: ['Roboto:400,500,700,900'],
      families: ['Noto+Sans+JP:400,500,700,900']
    }
  },
  // setting axios
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    
    babel: {
      presets({ isServer }) {
        const targets = isServer ? { node: 'current' } : { ie: 11 }
        return [
          [
            require.resolve('@nuxt/babel-preset-app'), { targets },
          ]
        ]
      }
    },
    extend (config, ctx) {
    }
  }
}
