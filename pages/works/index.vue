<template>
  <div class="container">
    <!--    <button @click="routerQueryUpdate(0)">123123</button>
    <button @click="routerQueryUpdate(1)">123123</button>
    <button @click="$fetch">Refresh</button>-->

    <transition mode="out-in" name="list">
      <ul class="list" :key="$route.query.page">
        <li v-for="item in works" :key="item.id" class="list-item">
          <nuxt-link :to="`/works/${item.id}/`">
            <div class="thumb">
              <img :src="imgUrl(item.pcDetailImagePhysicalName)" alt="" />
            </div>
            <div class="info">
              <div>
                {{ item.id }}
              </div>
              <div class="title">
                {{ item.project }}
              </div>
              <div>
                {{ item.portFolioSortCode }}<br />
                {{ item.projectClientName }}<br />
                {{ item.projectType }}
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </transition>
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :page-size="size"
      :total="totalElements"
      @current-change="routerQueryUpdate"
    ></el-pagination>
  </div>
</template>
<script>
  export default {
    head() {
      return {
        meta: [
          {hid: "og:url", name: "og:url", content: `https://furia0928.tk/${this.$route.fullPath}`},
          {hid: "title", name: "title", content: "nuxt-test-mountains"},
          {
            hid: "og:image",
            name: "og:image",
            content: this.imgUrl(this.works[0]?.pcDetailImagePhysicalName)
          }
        ]
      };
    },
    data() {
      return {
        page: 1,
        size: 5,
        works: [],
        totalElements: 0
      };
    },
    methods: {
      routerQueryUpdate(val) {
        console.log(val);
        this.$router.push({
          query: {page: val}
        });
      },
      imgUrl(url) {
        return process.env.API_URL + url;
      }
    },
    watch: {
      "$route.query.page"(val) {
        console.log(val);
        this.$fetch();
      }
    },
    /*watchQuery: ["page"],*/
    scrollToTop: true,
    async fetch() {
      console.log(this.$route.query.page);
      try {
        const {data: response} = await this.$axios.$get(`${process.env.API_URL}/api/v1/works/`, {
          params: {
            page: this.$route.query.page - 1 || 0,
            size: this.size
          }
        });
        this.totalElements = response.totalElements;
        this.works = response.content;
      } catch (e) {
        console.log(e);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .pagination {
    margin-top: 30px;
    text-align: center;
  }
  .list {
    border: 1px solid #ddd;
    transition-duration: 0.3s;
    transition-property: transform, opacity;
  }
  .list-enter {
    opacity: 0;
  }
  .list-leave-to {
    opacity: 0;
  }
  .list-leave-active {
    //position: absolute;
  }

  .list {
    li + li {
      border-top: 1px solid #ddd;
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
