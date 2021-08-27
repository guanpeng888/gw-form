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
          :clearable="clearable"
          :readonly="readonly"
          :inputWidth="inputWidth"
          :disabled="disabled"
          :placeholder="placeholder[0]"
          :maxlength="maxlength"
          @change="getInputValue"
          v-model="groupOpts[bizOptKey.leftkeyname]"
        ></InputOfNumber>
        <i class="input-break-css">{{breakTag}}</i>
        <InputOfNumber
          :clearable="clearable"
          :readonly="readonly"
          :inputWidth="inputWidth"
          :disabled="disabled"
          :placeholder="placeholder[1]"
          :maxlength="maxlength"
          @change="getInputValue"
          v-model="groupOpts[bizOptKey.rightkeyname]"
        ></InputOfNumber>
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
export default {
  name: "BloodPressure",
  components:{
    InputOfNumber
  },
  data() {
    return {
      groupOpts: {},
      validateErrorMessage: ""
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
    breakTag: {
      type: String,
      default: "/"
    },
    placeholder:{
      type:Array,
      default: () => {
        return ['','']
      }
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
    required: {
      type: Boolean,
      default: false
    },
    bizOptKey: {
      type: Object,
      default: () => {
        return {
          rightkeyname:'',
          leftkeyname:''
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
      this.groupOpts = JSON.parse(JSON.stringify(this.initOpts)) || {};
    },
    getInputValue() {
      DebounceUtil.debounce(() => {
        this.sendCtrlvalue();
        this.vaildData();
      })
    },
    // clearInputValue() {
    //   this.initCtrlValue = "";
    //   this.sendCtrlvalue();
    // },
    sendCtrlvalue() {
      this.$emit("change", this.groupOpts);
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
        if (this.groupOpts[this.bizOptKey.leftkeyname] == "") {
          if (this.labelName == "") {
            this.validateErrorMessage = "字段不能为空！";
          } else {
            this.validateErrorMessage = this.labelName + "不能为空！";
          }
          return false;
        }
        if (this.groupOpts[this.bizOptKey.rightkeyname] == "") {
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
