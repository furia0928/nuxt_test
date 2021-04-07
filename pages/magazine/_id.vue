<template>
  <div>
    <div>
      {{ magazine.id }}
    </div>
    <div class="title">
      {{ magazine.magazineTitle }}
    </div>
    <div class="desc">
      {{ magazine.magazineDesc }}
    </div>
    <div>
      <img :src="imgUrl(magazine.pcKeyPicturePhysicalName)" alt="" />
    </div>
    <div class="content" v-html="magazine.magazineContents"></div>
  </div>
</template>
<script>
  export default {
    layout: "clean",
    head() {
      return {
        meta: [
          {hid: "og:url", name: "og:url", content: `https://furia0928.tk/${this.$route.fullPath}`},
          {hid: "og:title", name: "title", content: this.magazine.magazineTitle},
          {
            hid: "og:description",
            name: "description",
            content: this.magazine.magazineDesc
          },
          {
            hid: "og:image",
            name: "og:image",
            content: this.imgUrl(this.magazine.pcKeyPicturePhysicalName)
          }
        ]
      };
    },
    data() {
      return {
        magazine: {}
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
          `${process.env.API_URL}/api/v1/magazine/${params.id}`
        );
        console.log(response);
        return {magazine: response};
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
    font-size: 30px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .desc {
  }

  .content {
    font-size: 16px;
    line-height: 2em;
    ::v-deep iframe {
      width: 100%;
    }
  }

  .links {
    padding-top: 15px;
  }
</style>
