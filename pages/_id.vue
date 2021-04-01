<template>
  <div>
    {{mountains}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      //mountains: []
    };
  },

  mounted() {
    console.log(process.env.API_URL)
  },
  async asyncData({params, $axios}) {
    const {data} = await $axios.$get( `http://devapi.emotion.co.kr/api/v1/works/${params.id}`)
    return {mountains : data}
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
