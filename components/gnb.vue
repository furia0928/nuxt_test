<template>
  <ul class="gnb">
    <li>
      <nuxt-link to="/">home</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/mountains">mountains</nuxt-link>
    </li>
  </ul>
</template>

<style lang="scss">
.gnb {
  display:flex;
  border-bottom:5px solid #ddd;
  a {
    display:block;
    padding:20px;
    font-size:20px;
  }
}
</style>
