const axios = require("axios");
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: "emotion_nuxt",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {hid: "title", name: "title", content: "nuxt-test-title"},
      {hid: "description", name: "description", content: "nuxt-test-description"},
      {hid: "og:url", name: "og:url", content: "https://furia0928.tk/"},
      {hid: "og:type", name: "og:type", content: "website"},
      {hid: "og:title", name: "og:title", content: "nuxt-test-title"},
      {hid: "og:description", name: "og:description", content: "nuxt-test-description"},
      {hid: "og:image", name: "og:image", content: "https://res.cloudinary.com/redfern-web/image/upload/v1599840408/redfern-dev/png/nuxt.png"},
    ],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}]
  },

  css: [
    // Load a Node.js module directly (here it's a Sass file)
    //'@/assets/sass/_extend',
    '@/assets/sass/common'
  ],

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
  //mode: "universal",
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  dev: process.env.NODE_ENV !== "production",

  /*env: {
    API_URL:
      process.env.NODE_ENV !== "production"
        ? "http://devapi.emotion.co.kr"
        : "https://api.emotion.co.kr"
  },*/

  /*dotenv: {
    filename: process.env.NODE_ENV === 'production'
      ? '.env'
      : '.env.' + process.env.NODE_ENV
  },*/

  ssr: true,

  modules: [
    "@nuxtjs/axios",
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "@nuxtjs/style-resources"
  ],

  styleResources: {
    scss : [
      '~assets/sass/_extend',
      '~assets/sass/_mixins',
      '~assets/sass/_variables',
    ]
  },
  axios: {
    baseURL:
      process.env.NODE_ENV !== "production"
        ? "http://devapi.emotion.co.kr"
        : "https://api.emotion.co.kr"
  },

  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: [/^element-ui/],
  },
  sitemap: {
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    hostname: "https://furia0928.tk/",
    gzip: true,
    routes: async () => {
      const {data} = await axios.get(`https://api.nuxtjs.dev/posts`);
      const test = data.map((el) => `/mountains/${el.id}/`)
      return [
        {
          url:'/',
          priority: 1,
        },
        {
          url:'/mountains/',
          priority: 1,
        },
        ...test
      ]
    }
  }
};
