<template>
  <div class="container">
    <ul class="list">
      <li v-for="item in magazine" :key="item.id">
        <nuxt-link :to="`/magazine/${item.id}/`">
          <div class="thumb">
            <img :src="imgUrl(item.pcKeyPicturePhysicalName)" alt="" />
          </div>
          <div class="info">
            <div>
              {{ item.id }}
            </div>
            <div class="title">
              {{ item.magazineTitle }}
            </div>
            <div>
              {{ item.reportingDate }}
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    head() {
      return {
        meta: [
          {hid: "title", name: "title", content: "nuxt-test-mountains"},
          {
            hid: "og:url",
            property: "og:url",
            content: `https://furia0928.tk/${this.$route.fullPath}`
          },
          {
            hid: "og:image",
            property: "og:image",
            content: this.imgUrl(this.magazine[0].pcKeyPicturePhysicalName)
          }
        ]
      };
    },
    data() {
      return {
        magazine: []
      };
    },
    methods: {
      imgUrl(url) {
        return process.env.API_URL + url;
      }
    },
    async asyncData({$axios}) {
      try {
        const {data: response} = await $axios.$get(`${process.env.API_URL}/api/v1/magazine/`, {
          params: {
            page: 0,
            size: 999
          }
        });
        //console.log(response.content);
        return {magazine: response.content};
      } catch (e) {
        console.log(e);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list {
    li + li {
      border-top: 1px solid red;
      margin-top: 10px;
    }
    li {
      list-style: none;
      a {
        display: flex;
        padding: 10px;
        .thumb {
          flex: 0 0 100px;
          img {
            width: 100%;
          }
        }
        .info {
          margin-left: 30px;
          text-align: left;
          .title {
            font-size: 30px;
            font-weight: bold;
          }
        }
      }
    }
  }
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
