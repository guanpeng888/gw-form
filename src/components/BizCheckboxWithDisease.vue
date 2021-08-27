<template>
  <div class="checkbox-list-wrap-style">
    <BizCheckboxWithMemoOfModifier
    :readonly="readonly"
    :dictOpts="dictOpts"
    :squareNum="3"
    :prefix="prefix"
    :suffix="suffix"
    :bizOptKey="bizOptKey.bizopt.bizfield"
    v-model="curSelectedOpt[bizOptKey.bizopt.dbfieldname]"
    @change="getCheckboxData"
    ></BizCheckboxWithMemoOfModifier>
    <SquareWithDate 
    v-if="isShowDiseaseDate"
    :bizOptKey="bizOptKey.bizopt.bizfield"
    :readonly="readonly" 
    :format="'yyyy-MM-dd'"
    :required="true"
    :specialCode="specialCode"
    v-model="curSelectedOpt[bizOptKey.bizopt.dbfieldname]" 
    @change="getSquareListData"
    ></SquareWithDate>
    <TextWithDate
      v-if="showList"
      :labelName="'其他疾病：'"
      :readonly="readonly"
      :format="'yyyy-MM-dd'"
      :bizOptKey="bizOptKey.bizotherfield.listfields"
      v-model="curSelectedOpt[bizOptKey.bizotherfield.dbfieldname]"
      @change="getTextWithDateData"
    ></TextWithDate>
  </div>
</template>

<script>
import BizCheckboxWithMemoOfModifier from "@/components/BizCheckboxWithMemoOfModifier.vue";
import SquareWithDate from "@/components/SquareWithDate.vue";
import TextWithDate from "@/components/TextWithDate.vue";
import ObjectUtil from "@/utils/ObjectUtil.js";
export default {
  name: "BizCheckboxWithDisease",
  model: {
    prop: "initOpts",
    event: "change"
  },
  components:{
    BizCheckboxWithMemoOfModifier,
    SquareWithDate,
    TextWithDate
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
    labelVisible: {
      type: Boolean,
      default: true
    },
    squareNum:{
      type:Number,
      default:1
    },
    filterDateCode:{
      type: String,
      default: "",
    },
    specialCode:{
      type: String,
      default: "",
      required:true
    },
    prefix: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    },
    readonly:{
      type: Boolean,
      default: false
    },
    initOpts: {
      type: Object,
      default: function() {
        return {};
      }
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
    itemDefaultOpts: {
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
      chequerCount:0,
      curSelectedOptsIndex: [],
      checkboxItems: [],
      checkboxCurSelectedItems: [],
      curSelectedOpt: {
        [this.bizOptKey.bizopt.dbfieldname]:[],
        [this.bizOptKey.bizotherfield.dbfieldname]:[]
      },
      validateErrorMessage: ""
    };
  },
  computed:{
    isShowDiseaseDate(){
      let checkboxData = this.curSelectedOpt[this.bizOptKey.bizopt.dbfieldname] || [];
      let isShowDiseaseDate = false;
      for(let i = 0; i < checkboxData.length; i++){
        if(checkboxData[i][this.bizOptKey.bizopt.bizfield.bizoptcode] != this.filterDateCode){
          isShowDiseaseDate = true;
        }
      }
      return isShowDiseaseDate;
    },
    showList(){
      let checkboxData = this.curSelectedOpt[this.bizOptKey.bizopt.dbfieldname] || [];
      let isShowList = false;
      for(let i = 0; i < checkboxData.length; i++){
        if(checkboxData[i][this.bizOptKey.bizopt.bizfield.bizoptcode] == this.specialCode){
          isShowList = true;
        }
      }
      return isShowList;
    }
  },
  watch: {
    initOpts(newVal, oldVal) {
      this.intiCtrl();
    }
  },
  methods: {
    intiCtrl() {
      this.chequerCount = JSON.parse(JSON.stringify(this.squareNum));
      this.checkboxItems = JSON.parse(JSON.stringify(this.dictOpts)) || [];
      this.curSelectedOpt = JSON.parse(JSON.stringify(this.initOpts)) || {};
      if(ObjectUtil.isEmptyObject(this.curSelectedOpt)){
        this.curSelectedOpt = {
          [this.bizOptKey.bizopt.dbfieldname]:[],
          [this.bizOptKey.bizotherfield.dbfieldname]:[]
        }
      }
    },
    getCheckboxData(result) {
      this.sendCtrlOpt();
    },
    getTextWithDateData(result){
      this.sendCtrlOpt();
    },
    getSquareListData(result){      
      this.sendCtrlOpt();
    },
    clearInputValue(idx) {
      this.checkboxItems[idx][this.bizOptKey.bizoptmemo] = "";
      this.sendCtrlOpt();
    },
    sendCtrlOpt() {
      this.$emit("change", this.curSelectedOpt);
    },
    /**
     * 当调用此方法时，返回组件当前值
     */
    getCurrentValue() {
      return {
        controlKey: this.controlKey,
        controlValue: this.curSelectedOpts
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
        if (this.curSelectedOptsIndex && this.curSelectedOptsIndex.length === 0) {
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
