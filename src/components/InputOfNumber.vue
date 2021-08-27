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
      <div>
        <span v-if="prefix" class="modifier-css">{{prefix}}</span>
        <Input
          title
          type="text"
          v-if="!readonly"
          :clearable="clearable"
          :readonly="readonly"
          :disabled="disabled"
          :maxlength="maxlength"
          :placeholder="placeholder"
          v-model.trim="initCtrlValue"
          @on-keyup="onInputItemKeyUp"
          @on-change="onInputItemChange"
          @on-blur="onInputItemBlur"
          @on-clear="clearInputValue"
          :style="'width:'+inputWidth"
        ></Input>
        <span v-if="readonly" class="valueText" :style="'width:'+inputWidth">{{initCtrlValue}}</span>
        <span v-if="suffix" class="modifier-css">{{suffix}}</span>
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
  name: "InputOfNumber",
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
      type: String,
      default: "100px"
    },
    placeholder: {
      type: String,
      default: ""
    },
    ctrlStyle: {
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
    labelVisible: {
      type: Boolean,
      default: true
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
      type: [String, Number],
      default: 256
    },
    decimalNum: {
      type: [String, Number],
      default: 4
    },
    max: {
      type: [String, Number],
      default: ""
    },
    min: {
      type: [String, Number],
      default: 0
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
      this.initCtrlValue = this.initValue + "" || "";
    },
    onInputItemBlur() {
      DebounceUtil.debounce(() => {
        this.$emit('on-blur');
        this.sendCtrlvalue();
        this.vaildData();
      })
    },
    onInputItemKeyUp(e) {
      this.initCtrlValue = this.formatNum(e.target.value);
    },
    formatNum(input) {
      // 匹配正数和小数
      let output = input || "";
      output = /\d+(\.\d{0,4})?/.exec(output);
      if (output && output[0] != undefined) {
        return output[0] || "";
      }
      return output || "";
    },
    // formatNum(input) {
    //   // 匹配正、负数和小数
    //   let output = input;
    //   output =
    //     output.slice(0, 1).replace(/[^\d|^\-]/g, "") +
    //     output.slice(1).replace(/[^\d|^\.]/g, ""); //首位必须负号或数字,第二位开始是数字或小数点
    //   output = output.replace("-.", "-"); // 去除第一位是负号和第二位是小数点情况
    //   output = output
    //     .replace(".", "$#$")
    //     .replace(/\./g, "")
    //     .replace("$#$", "."); //只保留第一个小数点, 清除多余的
    //   output = output.replace(/^(\-)*(\d+)\.(\d{4}).*$/, "$1$2.$3"); //保留小数点后三位
    //   return output;
    // },
    onInputItemChange() {
      /*
       *根据正则表达式控制小数点后几位小数，参考正则（/^(\-)*(\d+)\.(\d{2}).*$/）
       * 1.以下正则字符串主要解决动态修改小数位数（根据"this.decimalNum"取小数位数）
       * 2.将正则字符串转义成正则表达式去匹配输入的值，'$1$2.$3'为占位符（表示要替换的值长成该占位符的样子）
       * 3.'this.$nextTick'主要解决处理后的值不能跟输入框显示的值同步更新
       * */
      this.$nextTick(() => {
        let regStr = "/^(\\-)*(\\d+)\\.(\\d{" + this.decimalNum + "}).*$/";
        let curVal = this.initCtrlValue.replace(eval(regStr), "$1$2.$3");
        this.initCtrlValue = curVal;
        DebounceUtil.debounce(() => {
          this.sendCtrlvalue();
          this.vaildData()
        })
      });
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
      if (Number(this.initCtrlValue)) {
        if (Number(this.initCtrlValue) < Number(this.min)) {
          if (this.labelName == "") {
            this.validateErrorMessage = "输入值不能小于最小值（"+this.min+"）！";
          } else {
            this.validateErrorMessage =
              this.labelName + "输入值不能小于最小值（"+this.min+"）！";
          }
          return false;
        }

        if (this.max && Number(this.initCtrlValue) > Number(this.max)) {
          if (this.labelName == "") {
            this.validateErrorMessage =
              "输入值不能大于最最大值（" + this.max + "）！";
          } else {
            this.validateErrorMessage =
              this.labelName + "输入值不能大于最最大值（" + this.max + "）！";
          }
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
