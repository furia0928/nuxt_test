<template>
  <div class="container">
    <!--    <Logo />-->
    <bbsList />
    <bbsDefault />
    <button @click="testFn">testset</button>
    <h1 class="title">emotion</h1>
    <div class="links">
      <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer" class="button--green">
        Documentation
      </a>
      <a
        href="https://github.com/nuxt/nuxt.js"
        target="_blank"
        rel="noopener noreferrer"
        class="button--grey"
      >
        GitHub
      </a>
    </div>
    <ul class="list">
      <li v-for="item in mountains" :key="item.id">
        <nuxt-link :to="`/${item.id}`">
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
  import axios from "../plugins/axios";

  export default {
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
