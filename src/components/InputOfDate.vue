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
        <DatePicker v-if="!readonly"
          :type="type"
          :format="format"
          :separator="separator"
          :clearable="clearable"
          :disabled="disabled"
          :readonly="readonly"
          :options="dateOptions"
          :editable="false"
          :start-date="dateAxis"
          :split-panels="splitPanels"
          :placeholder="placeholder"
          v-model.trim="initCtrlValue"
          @on-change="onDateChange"
          @on-clear="clearInputValue"
          :style="'width:'+inputWidth"
        ></DatePicker>
        <span v-if="readonly" class="valueText" :style="'min-width:'+inputWidth">{{initCtrlValue}}</span>
      </div>
      <transition name="fade">
        <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
      </transition>
    </div>
  </div>
</template>

<script>
  import ObjectUtil from '@/utils/ObjectUtil'
  import DateTimeUtil from '@/utils/DateTimeUtil'
export default {
  name: "InputOfDate",
  data() {
    return {
      initCtrlValue: "",
      dateOptions:{},
      validateErrorMessage: ""
    };
  },
  model: {
    prop: "initValue",
    event: "change"
  },
  props: {
    type: {
      type: String,
      default: "date"
    },
    ctrlStyle:{
      type: String,
      default: ""
    },
    initValue: {
      type: [Date, String, Array],
      default: ""
    },
    labelName: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: [String, Number],
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
    dateType: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    inputWidth: {
      type: [String, Number],
      default: "100px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    splitPanels:{
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    beginDate:{
      type: String,
      default:""
    },
    endDate:{
      type: String,
      default:""
    },
    separator: {
      type: String,
      default:"-"
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
    disabledDateCb: {
      type: Function
    },
    maxlength: {
      type: Number,
      default: 13
    },
    required: {
      type: Boolean,
      default: false
    },
    focusedDate:{
      type: String,
      default: DateTimeUtil.getDate(new Date())
    }
  },
  watch: {
    initValue(newVal, oldVal) {
      this.initCtrl();
    },
    readonly(newVal, oldVal) {
      this.initCtrl();
    },
    beginDate(newVal, oldVal) {
      this.dateOptions = this.getDisabledDate();
    },
    endDate(newVal, oldVal) {
      this.dateOptions = this.getDisabledDate();
    }
  },
  computed:{
    dateAxis(){
      if(this.focusedDate){
        return (new Date(this.focusedDate));
      }
      return new Date()
    }
  },
  methods: {
    initCtrl() {
      this.initCtrlValue = JSON.parse(JSON.stringify(this.initValue)) || "";
      this.dateOptions = this.getDisabledDate();
      if(ObjectUtil.isArray(this.initCtrlValue)){
        this.$set(this,'initCtrlValue',this.initCtrlValue.join(' / '))
      }

      if(this.dateType === 3){
        let initValue = JSON.parse(JSON.stringify(this.initValue));
        this.initCtrlValue = DateTimeUtil.getDateStr(initValue) || "";
      }
    },
    getDisabledDate(){
      // 取区间
      if(this.beginDate != "" && this.endDate != ""){
        let beginDate = new Date(this.beginDate).valueOf();
        let endDate = new Date(this.endDate).valueOf();
        if(beginDate <= endDate){
          return {
            disabledDate(date){
              if(date && date.valueOf()){
                let curDate = date.valueOf();
                // 因为DatePicker获取的是格林尼治时间比北京时间晚8个小时，所以此处的时间应减去8小时
                return curDate < (beginDate - 8*60*60*1000) || curDate > endDate;
              }
            }
          }
        }else{
          console.error(this.labelName+"beginDate不能与endDate有交集")
        }
      }

      // 开始日期
      if(this.beginDate != "" && this.endDate == ""){
        let beginDate = new Date(this.beginDate).valueOf();
        return {
          disabledDate(date){
            // 因为DatePicker获取的是格林尼治时间比北京时间晚8个小时，所以此处的时间应减去8小时
            return date && date.valueOf() < (beginDate - 8*60*60*1000);
          }
        }
      }

      // 结束日期
      if(this.beginDate == "" && this.endDate != ""){
        let endDate = new Date(this.endDate).valueOf();
        return {
          disabledDate(date){
            return date && date.valueOf() > endDate;
          }
        }
      }
      
      return this.options;
    },
    onDateChange(date) {
      this.initCtrlValue = date;
      this.sendCtrlvalue();
      this.vaildData();
    },
    clearInputValue() {
      this.initCtrlValue = "";
      this.sendCtrlvalue();
    },
    sendCtrlvalue() {
      let selectedTime = this.initCtrlValue
      if (this.initCtrlValue) {
        if(this.type === 'date'){    //当日期类型为date才去处理时分秒有效
          switch (this.dateType) {
            case 0: //代表当前时间
              selectedTime = DateTimeUtil.getDateStr(this.initCtrlValue) + " " + DateTimeUtil.getTimeNow()
              break;
            case 1: //代表开始时间
              selectedTime = DateTimeUtil.getDateStr(this.initCtrlValue) + " " + "00:00:00"
              break;
            case 2: //代表结束时间
              selectedTime = DateTimeUtil.getDateStr(this.initCtrlValue) + " " + "23:59:59"
              break;
            case 3: //只取日期
              selectedTime = DateTimeUtil.getDateStr(this.initCtrlValue)
              break;
            default:
              break;
          }
        }
      }
      this.$emit("change", selectedTime);
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
        if (this.type === 'date' && this.initCtrlValue === "") {
          if (this.labelName == "") {
            this.validateErrorMessage = "字段不能为空！";
          } else {
            this.validateErrorMessage = this.labelName + "不能为空！";
          }
          return false;
        }

         if (this.type === 'daterange' && (ObjectUtil.isEmptyArray(this.initCtrlValue) || this.initCtrlValue == ' / ')) {
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
