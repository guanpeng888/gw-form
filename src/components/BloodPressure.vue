<template>
  <div class="BloodPressure-wrap-css">
    <label
      class="BloodPressure-item-label-css"
      :style="'width:'+labelWidth"
      v-if="labelName && labelVisible"
    >
      <i v-if="required" class="required-tag-css">*</i>
      {{labelName}}
    </label>
    <div :class="['BloodPressure-item-input-css', validateErrorMessage ? 'dangerous-warning-css' : '']">
      <div>
        <InputOfNumber
          type="text"
          labelName="收缩压"
          :labelVisible="false"
          :placeholder="'收缩压'"
          :clearable="clearable"
          :readonly="readonly"
          :inputWidth="inputWidth"
          :disabled="disabled"
          :maxlength="maxlength"
          :min="RANGE.DBP.min"
          :max="RANGE.DBP.max"
          @on-blur="getInputValue"
          v-model="hbpOpts[bizOptKey.sbpkeyname]"
        ></InputOfNumber>
        <i class="input-break-css">/</i>
        <InputOfNumber
          type="text"
          labelName="舒张压"
          :labelVisible="false"
          :placeholder="'舒张压'"
          :clearable="clearable"
          :readonly="readonly"
          :inputWidth="inputWidth"
          :disabled="disabled"
          :min="RANGE.SBP.min"
          :max="RANGE.SBP.max"
          :maxlength="maxlength"
          @on-blur="getInputValue"
          v-model="hbpOpts[bizOptKey.dbpkeyname]"
        ></InputOfNumber>
          <!-- @on-blur="getInputValue" -->
        <span class="suffix-text-csss" v-if="suffix">{{suffix}}</span>
      </div>
      <transition name="fade">
        <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
      </transition>
    </div>
  </div>
</template>

<script>
import DebounceUtil from "@/utils/DebounceUtil.js"
import InputOfNumber from "@/components/InputOfNumber.vue";
import {GW_ITEM_RANGE} from '@/zx/bizconstants/ConstantOfFieldAttribute.js'

export default {
  name: "BloodPressure",
  components:{
    InputOfNumber
  },
  data() {
    return {
      hbpOpts: {},
      validateErrorMessage: "",
      RANGE:GW_ITEM_RANGE
    };
  },
  model: {
    prop: "initOpts",
    event: "change"
  },
  props: {
    initOpts: {
      type: Object,
      default: () => {
        return {}
      }
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
      default: "80px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    suffix: {
      type: String,
      default: "mmHg"
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
    min:{
      type: [Number,String],
      default: 0
    },
    max:{
      type: [Number,String],
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    bizOptKey: {
      type: Object,
      default: () => {
        return {
          sbpkeyname:'sbp',
          dbpkeyname:'dbp'
        }
      }
    }
  },
  watch: {
    initOpts(newVal, oldVal) {
      this.initCtrl();
    }
  },
  methods: {
    initCtrl() {
      this.hbpOpts = JSON.parse(JSON.stringify(this.initOpts)) || {};
    },
    getInputValue() {
      let sbpValue = JSON.parse(JSON.stringify(this.hbpOpts[this.bizOptKey.sbpkeyname]));
      let dbpValue = JSON.parse(JSON.stringify(this.hbpOpts[this.bizOptKey.dbpkeyname]));
      this.$nextTick(() => {
        if(Number(dbpValue) && Number(sbpValue) && (Number(dbpValue) > Number(sbpValue))){
          this.hbpOpts[this.bizOptKey.dbpkeyname] = sbpValue;
          this.hbpOpts[this.bizOptKey.sbpkeyname] = dbpValue;
        }
        this.sendCtrlvalue();
        this.vaildData();
      })
    },
    // clearInputValue() {
    //   this.initCtrlValue = "";
    //   this.sendCtrlvalue();
    // },
    sendCtrlvalue() {
      this.$emit("change", this.hbpOpts);
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
        if (this.hbpOpts[this.bizOptKey.sbpkeyname] == "" || this.hbpOpts[this.bizOptKey.dbpkeyname] == "") {
          if (this.labelName == "") {
            this.validateErrorMessage = "字段不能为空！";
          } else {
            this.validateErrorMessage = this.labelName + "舒张压和收缩压不能为空！";
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
