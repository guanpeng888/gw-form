<template>
  <div class="tooth-input-wrap-css">
    <div v-if="!readonly">
      <Input
        :type="type"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        v-model.trim="initCtrlOpt[bizOptKey.bizlefttop]"
        @on-blur="onInputItemBlur"
      ></Input>
      <Input
        :type="type"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        v-model.trim="initCtrlOpt[bizOptKey.bizrighttop]"
        @on-blur="onInputItemBlur"
        @on-clear="clearInputValue(bizOptKey.bizrighttop)"
      ></Input>
      <Input
        :type="type"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        v-model.trim="initCtrlOpt[bizOptKey.bizleftbottom]"
        @on-blur="onInputItemBlur"
        @on-clear="clearInputValue(bizOptKey.bizleftbottom)"
      ></Input>
      <Input
        :type="type"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxlength"
        v-model.trim="initCtrlOpt[bizOptKey.bizrightbottom]"
        @on-blur="onInputItemBlur"
        @on-clear="clearInputValue(bizOptKey.bizrightbottom)"
      ></Input>
    </div>
    <div v-if="readonly">
      <span class="valueText">{{initCtrlOpt[bizOptKey.bizlefttop]}}</span>
      <span class="valueText">{{initCtrlOpt[bizOptKey.bizrighttop]}}</span>
      <span class="valueText">{{initCtrlOpt[bizOptKey.bizleftbottom]}}</span>
      <span class="valueText">{{initCtrlOpt[bizOptKey.bizrightbottom]}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputOfTooth",
  data() {
    return {
      initCtrlOpt: "",
      validateErrorMessage: ""
    };
  },
  model: {
    prop: "initOpt",
    event: "change"
  },
  props: {
    initOpt: {
      type: Object,
      default: function(){
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
    controlKey: {
      type: String,
      default: ""
    },
    clearable: {
      type: Boolean,
      default: false
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
    bizOptKey:{
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    initOpt(newVal, oldVal) {
      this.initCtrlOpt = newVal || {};
    }
  },
  methods: {
    onInitData() {
      this.initCtrlOpt = this.initOpt || {};
    },
    onInputItemBlur() {
      this.sendCtrlvalue();
    },
    clearInputValue(itemkey) {
      this.initCtrlOpt[itemkey] = "";
      this.sendCtrlvalue();
    },
    sendCtrlvalue() {
      this.$emit("change", this.initCtrlOpt);
    }
  },
  mounted() {
    this.onInitData();
  }
};
</script>

<style scoped>
/*@import url(../../../bizstatic/css/zxForm.css); */
/* .tooth-input-wrap-css{
  width: 124px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  font-size: 0;
  position: relative;
}
.tooth-input-wrap-css:before{
  width: 100%;
  height: 1px;
  border-top: 1px solid #afafaf;
  display: block;
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -1px; 
}
.tooth-input-wrap-css:after{
  width: 1px;
  height: 100%;
  border-left: 1px solid #afafaf;
  display: block;
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  margin-top: -1px;
}
.tooth-input-wrap-css >>> .ivu-input-wrapper{
  width: auto;
}
.tooth-input-wrap-css >>> .ivu-input{
  width: 60px;
  text-align: center;
  display: inline-block;
  border: none;
  border-radius: 0;
  box-shadow: none;
  font-size: 12px;
  background: none;
  padding: 0 6px;
  height: 20px;
  line-height: 20px;
} */
</style>
