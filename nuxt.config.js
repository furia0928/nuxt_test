const axios = require("axios");
export default {
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
      {hid: "theme-color", name: "theme-color", content: "#317EFB"},
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
    "element-ui/lib/theme-chalk/index.css",
    /*"~assets/sass/_variables.scss",
    "~assets/sass/_extend.scss",*/
    "~assets/sass/_mixins.scss",
    "~assets/sass/common"
  ],
  styleResources: {
    scss: [
      /*"~assets/sass/_extend.scss", "~assets/sass/_mixins.scss", */ "~assets/sass/_variables.scss"
    ]
  },

  plugins: ["@/plugins/element-ui", "~/plugins/axios"],
  components: true,
  buildModules: ["nuxt-gsap-module"],
  dev: process.env.NODE_ENV !== "production",
  env: {
    API_URL:
      process.env.NODE_ENV !== "production"
        ? "http://devapi.emotion.co.kr"
        : "https://api.emotion.co.kr"
  },
  ssr: true,
  modules: ["@nuxtjs/axios", "@nuxt/content", "@nuxtjs/sitemap", "@nuxtjs/style-resources"],
  content: {},
  build: {
    transpile: [/^element-ui/]
  },
  generate: {
    routes: async () => {
      const {
        data: {data: works}
      } = await axios.get(`https://api.emotion.co.kr/api/v1/works/`, {
        params: {
          page: 0,
          size: 9999
        }
      });
      let test = [];
      for (let i = 1; i <= Math.ceil(works.totalElements / 5); i++) {
        test.push(`/works/${i}`);
      }
      return test;
    }
  },
  router: {},
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
      const workArr = works.content.map(el => `/works/page/${el.id}/`);
      const magazineArr = magazine.content.map(el => `/magazine/${el.id}/`);
      return ["/", ...workArr, ...magazineArr];
    }
  },
  pageTransition: {
    name: "page",
    mode: "out-in",
    css: false,
    beforeEnter(el) {
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
