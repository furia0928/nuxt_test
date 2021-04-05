<template>
  <div>
    <div>
      {{ mountains.id }}
    </div>
    <div>
      {{ mountains.title }}
    </div>
    <div>
      <img :src="mountains.image" alt="">
    </div>
    <div>
      {{ mountains.height }}
    </div>
    <div>
      {{ mountains.description }}
    </div>
  </div>
</template>
<script>
  export default {
    head() {
      return {
        meta: [
          {hid: "og:url", name: "og:url", content: `https://furia0928.tk/${this.$route.fullPath}`},
          {hid: "og:title", name: "title", content: this.mountains.title},
          {hid: "og:description", name: "description", content: this.mountains.description},
          {hid: "og:image", name: "og:image", content: this.mountains.image},
        ],

      }
    },
    data() {
      return {
        mountains: []
      };
    },
    async asyncData({params, $axios}) {
      try {
        const mountains = await $axios.$get(`https://api.emotion.co.kr/api/v1/works/${params.id}`);
        //const mountains = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`);
        return {mountains};
      } catch (e) {
        console.log(e);
      }
    }
  };
</script>

<style>
  .container {
    margin: 0 auto;
    text-align: center;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
