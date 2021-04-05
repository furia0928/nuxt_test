<template>
  <div>
    <div>
      {{ mountains.id }}
    </div>
    <div>
      {{ mountains.project }}
    </div>
    <div>
      <img :src="imgUrl(mountains.pcDetailImagePhysicalName)" alt="">
    </div>
    <div>
      {{ mountains.portFolioSortCode }}
    </div>
    <div>
      {{ mountains.projectClientName }}
    </div>
    <div>
      {{ mountains.projectServiceName }}
      {{ mountains.projectType }}
      {{ mountains.releaseDate }}
    </div>
    <div v-html="mountains.projectDesc.fieldContents">

    </div>
  </div>
</template>
<script>
  export default {
    head() {
      return {
        meta: [
          {hid: "og:url", name: "og:url", content: `https://furia0928.tk/${this.$route.fullPath}`},
          {hid: "og:title", name: "title", content: this.mountains.project},
          {hid: "og:description", name: "description", content: this.mountains.projectDesc.fieldContents},
          {hid: "og:image", name: "og:image", content: this.imgUrl(this.mountains.pcDetailImagePhysicalName)},
        ],

      }
    },
    data() {
      return {
        mountains: {}
      };
    },
    methods : {
      imgUrl(url) {
        return process.env.API_URL + url;
      },
    },
    async asyncData({params, $axios}) {
      try {
        const {data : response} = await $axios.$get(`${process.env.API_URL}/api/v1/works/${params.id}`);
        //const mountains = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`);
        console.log(response)
        return {mountains : response};
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
