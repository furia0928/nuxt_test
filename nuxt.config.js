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
      {
        hid: "og:image",
        name: "og:image",
        content:
          "https://res.cloudinary.com/redfern-web/image/upload/v1599840408/redfern-dev/png/nuxt.png"
      }
    ],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}]
  },

  css: [
    // Load a Node.js module directly (here it's a Sass file)
    //'@/assets/sass/_extend',
    "@/assets/sass/common",
    "@/assets/sass/layout"
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
  buildModules: ["nuxt-gsap-module"],

  dev: process.env.NODE_ENV !== "production",

  env: {
    API_URL:
      process.env.NODE_ENV !== "production"
        ? "http://devapi.emotion.co.kr"
        : "https://api.emotion.co.kr"
  },

  /*dotenv: {
    filename: process.env.NODE_ENV === 'production'
      ? '.env'
      : '.env.' + process.env.NODE_ENV
  },*/

  ssr: true,

  modules: ["@nuxtjs/axios", "@nuxt/content", "@nuxtjs/sitemap", "@nuxtjs/style-resources"],

  styleResources: {
    scss: ["~assets/sass/_extend", "~assets/sass/_mixins", "~assets/sass/_variables"]
  },
  /*axios: {
    baseURL:
      process.env.NODE_ENV !== "production"
        ? "http://devapi.emotion.co.kr"
        : "https://api.emotion.co.kr"
  },*/

  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: [/^element-ui/],
  },
  sitemap: {
    defaults: {
      changefreq: "daily",
      priority: 1,
      lastmod: new Date()
    },
    hostname: "https://furia0928.tk/",
    gzip: true,
    routes: async () => {
      const {data} = await axios.get(`${process.env.API_URL}/api/v1/works`);
      const test = data.map(el => `/project/${el.id}/`);
      return ["/", "/project/", ...test];
    }
  },
  pageTransition: {
    name: "page",
    mode: "out-in",
    css: false,
    beforeEnter(el) {
      console.log("page beforeEnter");
      this.$gsap.set(el, {
        x: 50,
        opacity: 0
      });
    },
    enter(el, done) {
      this.$gsap.to(el, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "Power1.easeInOut",
        onComplete: done
      });
    },
    beforeLeave(el) {
      console.log("page beforeLeave");
      this.$gsap.set(el, {
        x: 0,
        opacity: 1
      });
    },
    leave(el, done) {
      this.$gsap.to(el, {
        x: 50,
        opacity: 0,
        duration: 0.3,
        ease: "Power1.easeInOut",
        onComplete: done
      });
    }
  },
  layoutTransition: {
    name: "layout",
    mode: "out-in",
    beforeEnter(el) {
      console.log("page beforeEnter");
      this.$gsap.set(el, {
        x: 50,
        opacity: 0
      });
    },
    enter(el, done) {
      this.$gsap.to(el, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "Power1.easeInOut",
        onComplete: done
      });
    },
    beforeLeave(el) {
      console.log("page beforeLeave");
      this.$gsap.set(el, {
        x: 0,
        opacity: 1
      });
    },
    leave(el, done) {
      this.$gsap.to(el, {
        x: 50,
        opacity: 0,
        duration: 0.3,
        ease: "Power1.easeInOut",
        onComplete: done
      });
    }
  }
};
