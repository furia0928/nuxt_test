<template>
  <div class="container">
    <!--    {{ page }}
    {{ typeof query }}
    {{ JSON.stringify(query) }} <input type="text" v-model="pageNum" />
    <button class="testBtn" type="button" @click="testBtn">tetet</button>-->
    <button type="button" @click="refresh">refresh</button>
    <ul class="list" :key="page">
      <li v-for="item in works" :key="item.id" class="list-item">
        <nuxt-link :to="`/works/page/${item.id}/`">
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
    <!--    <nuxt-link :to="`/works/5/`">5</nuxt-link>
    <nuxt-link :to="`/works/4/`">4</nuxt-link>
    <nuxt-link :to="`/works/3/`">3</nuxt-link>
    <nuxt-link :to="`/works/2/`">2</nuxt-link>
    <nuxt-link :to="`/works/1/`">1</nuxt-link>-->
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :page-size="size"
      :total="totalElements"
      :current-page.sync="page"
      @current-change="routerQueryUpdate"
    ></el-pagination>
  </div>
</template>
<script>
  const size = 5;
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
            content: this.imgUrl(this.works?.[0].pcDetailImagePhysicalName)
          }
        ]
      };
    },
    data() {
      return {
        page: 0,
        size: size,
        works: null,
        totalElements: 0
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        setTimeout(() => this.$nuxt.$loading.finish(), 500);
      });
    },
    methods: {
      refresh() {
        this.$nuxt.refresh();
      },
      routerQueryUpdate(val) {
        console.log(val);
        this.$router.push({
          params: {id: val}
        });
      },
      imgUrl(url) {
        return process.env.API_URL + url;
      }
    },
    async asyncData({params, $axios}) {
      console.log(params);
      try {
        const {data: response} = await $axios.$get(`${process.env.API_URL}/api/v1/works/`, {
          params: {
            page: parseInt(params.id || 1) - 1,
            size: size
          }
        });
        return {
          page: parseInt(params.id || 1),
          totalElements: response.totalElements,
          works: response.content
        };
      } catch (e) {
        console.log(e);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .testBtn {
    background: $red;
  }
  .pagination {
    margin-top: 30px;
    text-align: center;
  }
  .list {
    border: 1px solid #ddd;
    //transition-duration: 0.3s;
    //transition-property: transform, opacity;
  }
  /*.list-enter {
    opacity: 0;
  }
  .list-leave-to {
    opacity: 0;
  }*/
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
