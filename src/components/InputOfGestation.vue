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
          title
          type="number"
          v-if="!readonly"
          :clearable="clearable"
          :readonly="readonly"
          :disabled="disabled"
          :placeholder="placeholder"
          v-model.trim="initCtrWeek"
          @on-blur="onInputItemBlur"
          @on-clear="clearInputValue"
          class="valueText"
          :style="'width:'+inputWidth"
        ></Input>
        <span v-if="readonly" class="valueText" :style="'width:'+inputWidth">{{initCtrWeek}}</span>
        <span class="modifier-css" v-if="firstSuffix">{{firstSuffix}}</span>
        <Input
          title
          type="number"
          v-if="!readonly"
          :clearable="clearable"
          :readonly="readonly"
          :disabled="disabled"
          :maxlength="maxlength"
          :placeholder="placeholder"
          v-model.trim="initCtrDay"
          @on-blur="onInputItemBlur"
          @on-clear="clearInputValue"
          class="valueText"
          :style="'width:'+inputWidth"
        ></Input>
        <span v-if="readonly" class="valueText" :style="'width:'+inputWidth">{{initCtrDay}}</span>
        <span class="modifier-css" v-if="lastSuffix">{{lastSuffix}}</span>
      </div>
      <transition name="fade">
        <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputOfGestation",
  data() {
    return {
      initCtrlValue: "",
      initCtrWeek: "",
      initCtrDay: "",
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
      type: String,
      default: "100px"
    },
    placeholder: {
      type: String,
      default: ""
    },
    prefix: {
      type: String,
      default: ""
    },
    firstSuffix: {
      type: String,
      default: "周"
    },
    lastSuffix: {
      type: String,
      default: "天"
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
      default: "315"
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
    }
  },
  methods: {
    initCtrl() {
      this.initCtrlValue = this.initValue || "";
      this.initCtrWeek = String(parseInt(Number(this.initCtrlValue) / 7)) || "";
      this.initCtrDay = String(parseInt(Number(this.initCtrlValue) % 7)) || "";
    },
    onInputItemBlur() {
      if (Number(this.initCtrDay) >= 7) {
        this.initCtrWeek =
          String(
            Number(this.initCtrWeek) + parseInt(Number(this.initCtrDay) / 7)
          ) || "";
        this.initCtrDay = String(parseInt(Number(this.initCtrDay) % 7)) || "";
      }
      this.initCtrlValue = String(
        Number(this.initCtrWeek) * 7 + Number(this.initCtrDay)
      );
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

      if (Number(this.initCtrlValue) < Number(this.min)) {
        if (this.labelName == "") {
          this.validateErrorMessage = "输入值不能小于最小值（" + this.min + "）！";
        } else {
          this.validateErrorMessage =
            this.labelName + "输入值不能小于最小值（" + this.min + "）！";
        }
        return false;
      }

      if (this.max && Number(this.initCtrlValue) > Number(this.max)) {
        if (this.labelName == "") {
          this.validateErrorMessage =
            "输入值不能大于最最大值（" + this.max + "天）！";
        } else {
          this.validateErrorMessage =
            this.labelName + "输入值不能大于最最大值（" + this.max + "天）！";
        }
        return false;
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
