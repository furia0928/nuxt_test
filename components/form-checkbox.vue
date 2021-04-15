<template>
  <label
    v-if="checkedType"
    :class="{
      'form-checkbox': true,
      disabled: disabled,
      checked: checked,
      focused: focused
    }"
  >
    <input
      ref="checkbox"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :required="required"
      @change="$emit('change', $event.target.checked, $event)"
      @blur="focused = false"
      @focus="focused = true"
    />
    <slot></slot>
  </label>
  <label
    v-else
    :class="{
      'form-radio': true,
      disabled: this.disabled,
      checked: this.checked.some(el => el === val),
      focused: focused
    }"
  >
    <input
      ref="checkbox"
      type="checkbox"
      :checked="checked.some(el => el === val)"
      :disabled="disabled"
      :required="required"
      @change="handleChange"
      @blur="focused = false"
      @focus="focused = true"
    />
    <slot></slot>
  </label>
</template>
<script>
  export default {
    name: "Checkbox",
    data() {
      return {
        focused: false
      };
    },
    computed: {
      checkedType() {
        return typeof this.checked === "boolean";
      }
    },
    model: {
      prop: "checked",
      event: "change"
    },
    props: {
      checked: [Boolean, Array],
      disabled: Boolean,
      required: Boolean,
      val: String
    },
    methods: {
      handleChange(e) {
        const idx = this.checked.indexOf(this.val);
        if (idx !== -1) {
          this.checked.splice(idx, 1);
        } else {
          this.checked.push(this.val);
        }
        this.$emit("change", this.checked, e);
      }
    }
  };
</script>
<style scoped lang="scss">
  label {
    height: 53px;
    box-sizing: border-box;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    letter-spacing: -0.05em;
    transition: all 200ms ease-in-out 0s;
    input {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      visibility: hidden;
    }
    &.disabled {
      cursor: default;
      color: #ddd;
    }
    &.checked {
      border-color: $red;
      background: $red;
      color: #fff;
      &.disabled {
        opacity: 0.5;
      }
    }
  }
</style>
