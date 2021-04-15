<template>
  <span class="form-select">
    <button
      ref="select"
      type="button"
      @click="selectOpen"
      @focusout="open = false"
      @keydown="keydown($event)"
      :class="{'non-select': !value}"
    >
      <span>{{ selectedLabel }}</span>
    </button>
    <ul v-show="open">
      <li
        v-for="(item, index) in options"
        :class="{active: activeClass(item), disabled: item.disabled}"
        :key="index"
        @mouseenter="listEnter()"
        @mouseup="listClick(item)"
        @mousedown.prevent=""
      >
        {{ item.label }}
      </li>
    </ul>
  </span>
</template>
<script>
  export default {
    name: "Select",
    data() {
      return {
        open: false,
        focused: false
      };
    },
    computed: {
      selectedLabel() {
        const idx = this.options.findIndex(el => el.value === this.value);
        return this.options[idx]?.label || this.placeholder;
      }
    },
    model: {
      event: "change"
    },
    methods: {
      keydown(e) {
        if (
          e.keyCode === 32 ||
          e.keyCode === 37 ||
          e.keyCode === 38 ||
          e.keyCode === 39 ||
          e.keyCode === 40
        ) {
          e.preventDefault();
        }
        if (e.keyCode === 32) {
          this.open = true;
        }
        if (e.keyCode === 37 || e.keyCode === 38) {
          this.keyUpDown(true);
        }
        if (e.keyCode === 39 || e.keyCode === 40) {
          this.keyUpDown(false);
        }
      },
      keyUpDown(state) {
        const selectIndex = this.options.findIndex(el => el.value === this.value);
        if (state && selectIndex !== 0) {
          this.$emit("change", this.options[selectIndex - 1]?.value);
        } else if (!state && selectIndex !== this.options.length - 1) {
          this.$emit("change", this.options[selectIndex + 1]?.value);
        }
      },
      listClick(item) {
        this.$refs.select.focus();
        this.open = false;
        this.$emit("change", item.value);
      },
      listEnter() {
        //console.log(1);
      },
      activeClass(item) {
        return this.value === item.val && !item.disabled;
      },
      selectOpen() {
        this.open = !this.open;
      }
    },
    props: {
      placeholder: String,
      value: String,
      options: Array,
      required: Boolean,
      disabled: Boolean
    }
  };
</script>
<style lang="scss" scoped>
  .form-select {
    position: relative;
    display: inline-block;
    line-height: 51px;
    height: 53px;
    box-sizing: border-box;
    button {
      position: relative;
      text-align: left;
      border-bottom: 1px solid #ddd;
      vertical-align: top;
      line-height: inherit;
      padding: 0 10px;
      height: 100%;
      width: 100%;
      cursor: pointer;
      background: $red;
      span {
        position: relative;
        color: #000;
        font-size: 14px;
        font-family: "Noto Sans KR", sans-serif;
      }
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        width: 15px;
        height: 8px;
        //background: url(../../assets/images/select_arrow.png) no-repeat 0 0/100%;
      }
      &.non-select {
        span {
          color: #b4b4b4;
        }
      }
    }
    ul {
      position: absolute;
      top: calc(100% - 1px);
      left: 0;
      width: 100%;
      font-size: 14px;
      font-weight: normal;
      line-height: 40px;
      background: #fff;
      box-sizing: border-box;
      border: 1px solid #ddd;
      li {
        user-select: none;
        padding: 0 10px;
        &.active {
          color: #fff;
          background: blue;
        }
      }
      li + li {
        border-top: 1px solid #ddd;
      }
    }
  }
</style>
