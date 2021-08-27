<template>
  <div class="BizRadioWithTextDate-css">
    <BizRadioWithMemo
      :labelName="labelName"
      :labelVisible="labelVisible"
      :dictOpts="dictOpts"
      :required="true"
      :readonly="readonly"
      :labelWidth="'60px'"
      :showSquare="false"
      :bizOptKey="bizOptKey.bizfield"
      v-model="radioSelectedItem"
      @change="getRadioData"
    ></BizRadioWithMemo>
    <TextList
      v-if="showList"
      :readonly="readonly"
      :bizOptKey="bizOptKey.textfield.listfields"
      v-model="radioSelectedItem[bizOptKey.textfield.dbfieldname]"
      @change="getTextListDate"
    ></TextList>
    <div class="chequer-list-css">
      <span class="chequer-item-css">{{chequerItemCode}}</span>
    </div>
  </div>
</template>

<script>
import ObjectUtil from "@/utils/ObjectUtil.js";
import BizRadioWithMemo from "@/components/BizRadioWithMemo.vue";
import TextList from "@/components/TextList.vue";
export default {
  name: "BizRadioWithTextList",
  model: {
    prop: "initOpt",
    event: "change"
  },
  components:{
    BizRadioWithMemo,
    TextList
  },
  props: {
    controlKey: {
      type: String,
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
    inputWidth:{
      type: String,
      default: "220px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    initOpt: {
      type: Object,
      default: function() {
        return {};
      }
    },
    readonly:{
      type: Boolean,
      default: false
    },
    dictOpts: {
      type: Array,
      default: function() {
        return [];
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    specialCode:{
      type: String,
      default: "",
      required:true
    },
    itemKeyName: {
      type: String,
      default: "bizoptcode"
    },
    itemValueName: {
      type: String,
      default: "bizoptname"
    },
    itemMemoName: {
      type: String,
      default: "bizoptmemo"
    },
    itemDefaultOpt:{
      type: String,
      default: "bizoptdefault"
    },
    bizOptKey: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      selectedIndex: null,
      radioItems: [],
      radioSelectedItem: {},
      textDateList:[],
      curSelectedOpt: {},
      validateErrorMessage: ""
    };
  },
  computed:{
    showList(){      
      if(ObjectUtil.isEmptyObject(this.radioSelectedItem)){
        return false;
      } else{
        return (this.radioSelectedItem[this.bizOptKey.bizfield.bizoptcode] === this.specialCode) ? true : false;
      }  
    },
    chequerItemCode () {
      if(!ObjectUtil.isEmptyObject(this.radioSelectedItem)){
        return this.radioSelectedItem[this.bizOptKey.bizfield.bizoptcode];
      } 
      return ""
    }
  },
  watch: {
    initOpt(newVal, oldVal) {
      this.intiCtrl();
    }
  },
  methods: {
    intiCtrl() {
      this.radioItems = JSON.parse(JSON.stringify(this.dictOpts)) || [];      
      this.radioSelectedItem = JSON.parse(JSON.stringify(this.initOpt)) || {};
      if(ObjectUtil.isEmptyObject(this.radioSelectedItem)){
        this.radioSelectedItem[this.bizOptKey.textfield.dbfieldname] = []
      }
    },
    getRadioData(result){
      // 如果当前选中项不等于特定code时，则将list数据清空
      if((result[this.bizOptKey.bizfield.bizoptcode] !== this.specialCode)){
        this.radioSelectedItem[this.bizOptKey.textfield.dbfieldname] = [];
      }
      this.sendCtrlOpt();
    },
    getTextListDate(result){
      this.radioSelectedItem[this.bizOptKey.textfield.dbfieldname] = result
      this.sendCtrlOpt();
    },
    sendCtrlOpt() {
      this.curSelectedOpt = this.radioSelectedItem || {};
      this.$emit("change", this.curSelectedOpt);
    },
    /**
     * 当调用此方法时，返回组件当前值
     */
    getCurrentValue() {
      return {
        controlKey: this.controlKey,
        controlValue: this.curSelectedOpt
      };
    },
    // 组件参数校验方法
    vaildData() {
      var validflag = this.checkNotEmpty();
      if (validflag) validflag = this.checkValid();
      return validflag;
    },
    // 判断组件是否未选
    checkNotEmpty() {
      this.validateErrorMessage = "";
      if (this.required) {
        if (this.selectedIndex === null || this.selectedIndex === undefined) {
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
  created() {
    this.intiCtrl();
  }
};
</script>

<style scoped>
</style>
