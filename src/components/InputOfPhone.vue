<template>
  <div class="form-item-wrap-css">
    <label
      class="form-item-label-css"
      :style="'width:'+labelWidth+';padding:'+labelPadding+';margin:'+labelMargin"
      v-if="labelName && labelVisible"
    >
      <i v-if="required" class="required-tag-css">*</i> {{labelName}}
    </label>
    <div :class="[ctrlStyle ==='iview' ? 'form-item-ivu-input-css' : 'form-item-input-css', validateErrorMessage ? 'dangerous-warning-css' : '']">
     <div>
        <Input
          type="text"
          v-if="!readonly"
          :clearable="clearable"
          :readonly="readonly"
          :disabled="disabled"
          :placeholder="placeholder"
          :maxlength="maxlength"
          v-model.trim="initCtrlValue"
          @on-change="onInputItemChange"
          @on-clear="clearInputValue"
          :style="'width:'+inputWidth"
        ></Input>
        <span v-if="readonly" class="valueText" :style="'width:'+inputWidth">{{initCtrlValue}}</span>
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
  name: "InputOfPhone",
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
    placeholder:{
      type: String,
      default: ""
    },
    ctrlStyle:{
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
      default: 13
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
      const phonePattern = /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9})|(166\d{8}))$/;
      if (this.initCtrlValue) {
        if (!phonePattern.test(this.initCtrlValue)) {
          this.validateErrorMessage = this.labelName + "格式不正确！";
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
/*@import url(../../../bizstatic/css/zxForm.css); */
/*@import url(../../../bizstatic/css/inputControl.css);*/
</style>
