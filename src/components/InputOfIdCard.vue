<template>
  <div class="form-item-wrap-css">
    <label
      class="form-item-label-css"
      :style="'width:'+labelWidth+';padding:'+labelPadding+';margin:'+labelMargin"
      v-if="labelName && labelVisible"
    >
      <i v-if="required" class="required-tag-css">*</i>
      {{labelName}}
    </label>
    <div :class="[ctrlStyle ==='iview' ? 'form-item-ivu-input-css' : 'form-item-input-css', validateErrorMessage ? 'dangerous-warning-css' : '']">
      <Input
        type="text"
        v-if="!readonly"
        :clearable="clearable"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        :placeholder="placeholder"
        v-model.trim="initCtrlValue"
        @on-change="onInputItemChange"
        @on-clear="clearInputValue"
        @on-blur="onInputItemBlur"
        :style="'width:'+inputWidth"
      ></Input>
      <span v-if="readonly" class="valueText" :style="'width:'+inputWidth">{{initCtrlValue}}</span>
      <transition name="fade">
        <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
      </transition>
    </div>
  </div>
</template>

<script>
import DebounceUtil from "@/utils/DebounceUtil.js"
import IdcardUtil from "@/utils/IdcardUtil.js";
export default {
  name: "InputOfIdCard",
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
    labelPadding:{
      type: String,
      default: ""
    },
    labelMargin:{
      type: String,
      default: ""
    },
    inputWidth: {
      type: [String, Number],
      default: "100px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    ctrlStyle:{
      type: String,
      default: ""
    },
    controlKey: {
      type: String,
      default: ""
    },
    placeholder:{
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
      default: 18
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
      this.initCtrlValue = JSON.parse(JSON.stringify(this.initValue));
    },
    onInputItemChange(){
      DebounceUtil.debounce(() => {
        this.sendCtrlvalue();
        this.vaildData();
      })
    },
    onInputItemBlur(){
      this.$emit('on-blur', this.initCtrlValue)
    },
    clearInputValue() {
      this.initCtrlValue = "";
      this.sendCtrlvalue();
    },
    sendCtrlvalue() {
      this.getIdCardVaildStatus();
      this.$emit("change", this.initCtrlValue);
    },
    /**
     * 当调用此方法时，返回组件当前值
     */
    getCurrentValue() {
      return { controlKey: this.controlKey, controlValue: this.initCtrlValue };
    },
    /**
     * 用于居民建档赋值身份证标记位 有效 无 不详
     */
    getIdCardVaildStatus(){
      let validflag = this.checkValid();
      this.$emit('idCardVaildStatus',validflag)
    },
    vaildData() {
      var validflag = this.checkNotEmpty();
      if (validflag) validflag = this.checkValid();
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
      if (this.initCtrlValue) {
        if (!IdcardUtil.checkCard(this.initCtrlValue)) {
          this.validateErrorMessage = this.labelName + "无效或格式不正确！";
          return false;
        }
        if (this.initCtrlValue.length > this.maxlength) {
          this.validateErrorMessage =
            this.labelName + "最长为" + this.maxlength + "位！";
          return false;
        }
      }
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
