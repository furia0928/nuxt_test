<template>
  <div class="container">
    <BUTTON TYPE="button" @click="testFn">tsetast</BUTTON>
    <ul class="list">
      <li v-for="item in mountains" :key="item.id">
        <nuxt-link :to="`/mountains/${item.id}`">
          <div class="thumb">
            <img :src="item.image" alt="">
          </div>
          <div class="info">
            <div>
              {{ item.id }}
            </div>
            <div class="title">
              {{ item.title }}
            </div>
            <div>
              {{ item.description }}
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from "../../plugins/axios";

  export default {
    head() {
      return {
        meta: [
          {hid: "og:url", name: "og:url", content: `https://furia0928.tk/${this.$route.fullPath}`},
          {hid: "title", name: "title", content: "nuxt-test-mountains"},
          {hid: "og:image", name: "og:image", content: this.mountains[0].image},
        ],
      }
    },
    data() {
      return {
       mountains: []
      };
    },
    methods : {
      async testFn(){
        const test = await axios.get('https://api.emotion.co.kr/api/v1/works')
        console.log(test)
      }
    },
    async asyncData({$axios}) {
      try {
        const mountains = await $axios.$get(`https://api.nuxtjs.dev/posts`);
        console.log(mountains)
        return {mountains};
      } catch (e) {
        console.log(e);
      }
    }
  };
</script>

<style lang="scss">
  .list {
    li + li {
      border-top:1px solid red;
      margin-top: 10px;
    }
    li {
      list-style:none;
      a {
        display:flex;
        padding:10px;
        .thumb {
          flex: 0 0 100px;
          img {
            width:100%;
          }
        }
        .info {
          margin-left:30px;
          text-align:left;
          .title {
            font-size:30px;
            font-weight:bold;
          }
        }
      }

    }
  }
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
