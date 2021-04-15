<template>
  <div class="gnb">
    <ul>
      <li>
        <nuxt-link to="/">home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/works">Works</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/magazine">Magazine</nuxt-link>
      </li>
      <!--      <li>
        <nuxt-link to="/test">test</nuxt-link>
      </li>-->
    </ul>
    <button type="button" @click="facebookShare">facebook</button>
  </div>
</template>

<script>
  export default {
    methods: {
      facebookShare() {
        window.open(`http://m.facebook.com/share.php?u=${window.location}`);
      }
    }
  };
</script>

<style lang="scss">
  .gnb {
    display: flex;
    justify-content: space-between;
    border-bottom: 5px solid #ddd;
    ul {
      display: flex;
    }
    a {
      display: block;
      padding: 20px;
      font-size: 20px;
    }
  }
</style>
