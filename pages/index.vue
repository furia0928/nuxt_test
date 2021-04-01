<template>
  <div class="container">
<!--    <Logo />-->
    <bbsList />
    <bbsDefault />
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
    <ul>
      <li v-for="item in mountains" :key="item.id">
        <nuxt-link :to="`/${item.id}`">
          <div>
            {{ item.id }}
          </div>
          <div>
            {{ item.project }}
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mountains: []
      };
    },
    mounted() {
      console.log("tes222t", process.env.NODE_ENV)
      console.log("tes222t", process.env.API_URL)
    },
    async fetch() {
      console.log(`${process.env.API_URL}/api/v1/works`)
      const {data} = await fetch(
          `https://api.emotion.co.kr/api/v1/works`
      ).then(res => res.json());
      this.mountains = data.content
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
