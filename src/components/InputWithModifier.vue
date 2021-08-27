<template>
  <div class="form-item-wrap-css">
    <label
      class="form-item-label-css"
      :style="'width:'+labelWidth"
      v-if="labelName && labelVisible"
    >
      <i v-if="required" class="required-tag-css">*</i>
      {{labelName}}
    </label>
    <div :class="['form-item-input-css', validateErrorMessage ? 'dangerous-warning-css' : '']">
      <div>
        <span class="modifier-css" v-if="prefix">{{prefix}}</span>
        <Input
          :type="type"
          v-if="!readonly"
          :clearable="clearable"
          :readonly="readonly"
          :disabled="disabled"
          :maxlength="maxlength"
          v-model.trim="initCtrlValue"
          @on-blur="onInputItemBlur"
          @on-clear="clearInputValue"
          :style="'width:'+inputWidth"
        ></Input>
        <span v-if="readonly" class="valueText" :style="'width:'+inputWidth">{{initCtrlValue}}</span>
        <span class="modifier-css" v-if="suffix">{{suffix}}</span>
      </div>
      <transition name="fade">
        <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputWithModifier",
  data() {
    return {
      initCtrlValue: "",
      validateErrorMessage: ""
    };
  },
  model: {
    prop: "initValue",
    event: "change"
  },
  props: {
    initValue: {
      type: [String, Number],
      default: ""
    },
    labelName: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String,
      default: "120px"
    },
    inputWidth: {
      type: [String, Number],
      default: "200px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    type:{
      type: String,
      default: "text"
    },
    prefix: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    controlKey: {
      type: String,
      default: ""
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 256
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    initValue(newVal, oldVal) {
      this.initCtrl();
    }
  },
  methods: {
    initCtrl() {
      this.initCtrlValue = this.initValue || "";
    },
    onInputItemBlur() {
      this.sendCtrlvalue();
      this.vaildData();
    },
    clearInputValue() {
      this.initCtrlValue = "";
      this.sendCtrlvalue();
    },
    sendCtrlvalue() {
      this.$emit("change", this.initCtrlValue);
    },
    /**
     * 当调用此方法时，返回组件当前值
     */
    getCurrentValue() {
      return { controlKey: this.controlKey, controlValue: this.initCtrlValue };
    },
    vaildData() {
      var validflag = this.checkNotEmpty();
      if (validflag && this.initCtrlValue) validflag = this.checkValid();
      return validflag;
    },
    checkNotEmpty() {
      this.validateErrorMessage = "";
      if (this.required) {
        if (this.initCtrlValue == "") {
          if (this.labelName == "") {
            this.validateErrorMessage = "字段不能为空！";
          } else {
            this.validateErrorMessage = this.labelName + "不能为空！";
          }
          return false;
        }
      }
      return true;
    },
    checkValid() {
      this.validateErrorMessage = "";
      return true;
    }
  },
  mounted() {
    this.initCtrl();
  }
};
</script>

<style scoped>
/*@import url(../../../bizstatic/css/zxForm.css); */
/*@import url(../../../bizstatic/css/inputControl.css);*/
</style>
