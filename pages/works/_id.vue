<template>
  <div class="container">
    <div>
      {{ work.id }}
    </div>
    <div>
      {{ work.project }}
    </div>
    <div>
      <img :src="imgUrl(work.pcDetailImagePhysicalName)" alt="" />
    </div>
    <div>
      {{ work.portFolioSortCode }}
    </div>
    <div>
      {{ work.projectClientName }}
    </div>
    <div>
      {{ work.projectServiceName }}<br />
      {{ work.projectType }}<br />
      {{ work.releaseDate }}
    </div>
    <div v-html="work.projectDesc.fieldContents"></div>
  </div>
</template>
<script>
  export default {
    //layout: "clean",
    head() {
      return {
        meta: [
          {
            hid: "og:url",
            property: "og:url",
            content: `https://furia0928.tk/${this.$route.fullPath}`
          },
          {hid: "og:title", property: "og:title", content: this.work.project},
          {
            hid: "og:description",
            property: "og:description",
            content: this.work.projectDesc.fieldContents
          },
          {
            hid: "og:image",
            property: "og:image",
            content: this.imgUrl(this.work.pcDetailImagePhysicalName)
          }
        ]
      };
    },
    data() {
      return {
        work: {}
      };
    },
    methods: {
      imgUrl(url) {
        return process.env.API_URL + url;
      }
    },
    async asyncData({params, $axios}) {
      try {
        const {data: response} = await $axios.$get(
          `${process.env.API_URL}/api/v1/works/${params.id}`
        );
        return {work: response};
      } catch (e) {
        console.log(e);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .title {
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
