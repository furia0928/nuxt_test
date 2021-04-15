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
      {hid: "og:url", property: "og:url", content: "https://furia0928.tk/"},
      {hid: "og:type", property: "og:type", content: "website"},
      {hid: "og:title", property: "og:title", content: "nuxt-test-title"},
      {hid: "og:description", property: "og:description", content: "nuxt-test-description"},
      {
        hid: "og:image",
        property: "og:image",
        content:
          "https://res.cloudinary.com/redfern-web/image/upload/v1599840408/redfern-dev/png/nuxt.png"
      }
    ],
    link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}]
  },
  target: "static",
  css: [
    // Load a Node.js module directly (here it's a Sass file)
    //'@/assets/sass/_extend',
    "element-ui/lib/theme-chalk/index.css",
    "~assets/sass/_variables.scss",
    /*"~assets/sass/_extend.scss",
    "~assets/sass/_mixins.scss",*/
    "~assets/sass/common"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/element-ui", "~/plugins/axios"],

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
    scss: [
      /*"~assets/sass/_extend.scss", "~assets/sass/_mixins.scss", */ "~assets/sass/_variables.scss"
    ]
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
    transpile: [/^element-ui/]
  },
  router: {
    //trailingSlash: true // process.env.NODE_ENV !== "production" ? undefined : true
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
      const {
        data: {data: works}
      } = await axios.get(`https://api.emotion.co.kr/api/v1/works/`, {
        params: {
          page: 0,
          size: 9999
        }
      });
      const {
        data: {data: magazine}
      } = await axios.get(`https://api.emotion.co.kr/api/v1/magazine/`, {
        params: {
          page: 0,
          size: 9999
        }
      });
      const workArr = works.content.map(el => `/works/${el.id}/`);
      const magazineArr = magazine.content.map(el => `/magazine/${el.id}/`);
      return ["/", ...workArr, ...magazineArr];
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
