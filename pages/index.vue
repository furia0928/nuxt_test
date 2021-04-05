<template>
  <div class="container">
    <button @click="compFn('LazyBbsDefault')">Logo</button>
    <button @click="compFn('LazyBbsList')">bbsList</button>

    <transition
      @before-enter="beforeEnter"
      @before-leave="beforeLeave"
      @enter="enter"
      @leave="leave"
      mode="out-in"
      :css="false"
    >
      <component :is="comp" :key="comp" />
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        test: "bbsList",
        docState: "saved"
      };
    },
    computed: {
      comp() {
        return this.test;
      }
    },
    created() {
      console.log("created", this.comp);
    },
    mounted() {
      console.log("mounted", this.comp);
    },
    watch: {
      comp(val) {
        console.log(val);
      }
    },
    methods: {
      compFn(val) {
        this.test = val;
      },
      beforeEnter(el) {
        console.log("comp beforeEnter");
        this.$gsap.set(el, {
          y: 50,
          opacity: 0
        });
      },
      enter(el, done) {
        this.$gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "Power1.easeInOut",
          onComplete() {
            console.log("comp enter");
            done();
          }
        });
      },
      beforeLeave(el) {
        console.log("comp beforeLeave");
        this.$gsap.set(el, {
          y: 0,
          opacity: 1
        });
      },
      leave(el, done) {
        this.$gsap.to(el, {
          y: 50,
          opacity: 0,
          duration: 0.3,
          ease: "Power1.easeInOut",
          onComplete() {
            console.log("comp leave");
            done();
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    text-align: center;
  }
</style>
