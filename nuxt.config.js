const axios = require('axios');
require('dotenv').config();
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'emotion_nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  /*css: [
    'element-ui/lib/theme-chalk/index.css'
  ],*/

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  /*plugins: [
    '@/plugins/element-ui'
  ],*/

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  dev: process.env.NODE_ENV !== 'production',

  env: {
    //APP_API_URL: process.env.NODE_ENV !== 'production' ? 'http://devapi.emotion.co.kr' : 'https://api.emotion.co.kr'
  },

  dotenv: {
    filename: process.env.NODE_ENV === 'production'
      ? '.env'
      : '.env.' + process.env.NODE_ENV
  },

  ssr : true,

  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/dotenv'
  ],

  axios: {
    //baseURL: process.env.API_URL
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
   // transpile: [/^element-ui/],
  },
  sitemap: {
    hostname: 'https://furia0928.tk/',
    gzip: true,
    routes: async () => {
      const { data : {data : response} } = await axios.get(`${process.env.API_URL}/api/v1/works`)
      const test = response.content.map((work) => `/${work.id}`);
      return [
        '/',
        ...test
      ]
    }
  }
}
