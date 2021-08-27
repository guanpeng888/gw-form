<template>
  <div class="form-item-wrap-css">
    <label
      class="form-item-label-css"
      :style="'width:'+labelWidth+';padding:'+labelPadding+';margin:'+labelMargin"
      v-if="labelName && labelVisible"
    >
      <i v-if="required" class="required-tag-css">*</i>{{labelName}}
    </label>
    <div :class="[ctrlStyle ==='iview' ? 'form-item-ivu-input-css' : 'form-item-input-css', validateErrorMessage ? 'dangerous-warning-css' : '']">
      <div>
        <span class="modifier-css" v-if="prefix">{{prefix}}</span>
        <Input
          :type="inputOfTyep"
          v-if="!readonly"
          :clearable="clearable"
          :readonly="readonly"
          :disabled="disabled"
          :maxlength="maxlength"
          :placeholder="placeholder"
          v-model.trim="initCtrlValue"
          @on-change="onInputItemChange"
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
import DebounceUtil from "@/utils/DebounceUtil.js"
export default {
  name: "InputOfText",
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
    inputOfTyep: {
      type: String,
      default: "text"
    },
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
    labelPadding:{
      type: String,
      default: ""
    },
    labelMargin:{
      type: String,
      default: ""
    },
    inputWidth: {
      type: String,
      default: "100px"
    },
    ctrlStyle:{
      type: String,
      default: ""
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder:{
      type: String,
      default: ""
    },
    prefix: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
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
      DebounceUtil.debounce(() => {
        this.vaildData();
      })
    }
  },
  methods: {
    initCtrl() {
      this.initCtrlValue = this.initValue || "";
    },
    onInputItemChange(){
      DebounceUtil.debounce(() => {
        this.sendCtrlvalue();
        this.vaildData();
      })
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
</style>
