const pkg = require('./package')
const environment = process.env.NODE_ENV || 'development'
const BASE_URL = process.env.baseUrl || 'https://bbp10-jiriki.cf'
const envSet = require(`./env.${environment}.js`)

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: '大合奏！バンドブラザーズP☆10地力表',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '大合奏！バンドブラザーズPにおける☆10の難易度とスコアを管理するページです。'
      },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@bbp10_jiriki' },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@bbp10_jiriki'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: BASE_URL + '/'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '大合奏！バンドブラザーズP☆10地力表'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '大合奏！バンドブラザーズPにおける☆10の難易度とスコアを管理するページです。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: BASE_URL + '/favicon.ico'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  env: envSet,

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/AuthPlugin'],

  /**
   * From Nuxt 2.10
   */
  buildModules: ['@nuxt/typescript-build'],
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/google-adsense'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  'google-adsense': {
    id: 'ca-pub-9420211255933824'
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
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
