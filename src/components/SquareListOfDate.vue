<template>
  <div :class="['chequer-list-date-wrap-css chequer-list-wrap-css', alignStyle ? 'right-center-css' : '']">
    <label
      class="form-item-label-css"
      :style="'width:'+labelWidth"
      v-if="labelName && labelVisible"
    >
      <i v-if="required" class="required-tag-css">*</i> {{labelName}}
    </label>
    <div class="chequer-list-css">
      <InputOfDate :required="true" :labelName="labelName" :labelVisible="false" :inputWidth="'200px'" :initValue="dateValue" @change="getDateValue"></InputOfDate>
      <span class="chequer-box-css" v-for="(chequerItem,index) in dateChequer" :key="index"> 
        <i class="chequer-item-css" v-for="(item , idx) in chequerItem" :key="idx">{{item}}</i>
        <i class="chequer-break-css" v-if="(index < (dateChequer.length -1))">{{breakTag}}</i>
      </span>
    </div>
  </div>
</template>

<script>
import InputOfDate from "@/components/InputOfDate.vue";
export default {
  name: "SquareListOfDate",
  components:{
    InputOfDate
  },
  model:{
    prop:'initDate',
    event:'change'
  },
  props: {
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
    required: {
      type: Boolean,
      default: false
    },
    breakTag:{
      type: String,
      default: "—"
    },
    initDate: {
      type: String,
      default: ""
    },
    groupStyle:{
      type:Array,
      default:function(){
        return [4,2,2]
      }
    },
    alignStyle:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dateValue:"",
      dateChequer: [] //根据该数组决定格子数量
    };
  },
  watch: {
    initDate(newVal, oldVal) {
      this.initDateChequer();
    }
  },
  methods: {
    // 初始化格子数
    initDateChequer(dateStr) {
      /**
       * 该方法主要是把initDate（传进来的字符串）根据指定的格式组成二位数组，再根据二位数组渲染格子数：
       * 1、将initDate字符串转换成一个一维数组（dateArr）。
       * 2、按照groupStyle参数有几个元素将dateArr数组分割成几个数组，且数组里面的元素之和不得大于initDate字符串的总长度。
       * 3、groupStyle元素总和大于initDate字符串的总长度时,则直接截取剩余字符串为一个数组。
       * 4、groupStyle元素总和小于initDate字符串的总长度时，就按照groupStyle元素个数分个成dateChequer数组的个数。
       *  */
      let dateArr = [];
      this.dateValue = dateStr || JSON.parse(JSON.stringify(String(this.initDate)));
      let curDateStr = JSON.parse(JSON.stringify(String(this.dateValue))) || '';
      let groupStyleSum = this.getGroupStyleSum();     //获取格子显示的数组groupStyle总和，用来初始化格子数（按理该数组总和应该与 initValue字符串的值长度应该是一样的）
      if(curDateStr != ''){
        dateArr = curDateStr.replace(/-/g, '').replace(/(.)(?=[^$])/g,"$1,").split(",");
      } else {            
        // 当初始化字符串为空时，默认根据groupStyle数组总和定义格子数
        for (let j = 0; j < groupStyleSum; j++) {
          dateArr.push("");
        }
      }

      let startIndex = 0;
      let endIndex = 0;
      let squareNum = 0;
      let curDateStrLength = (curDateStr ? curDateStr.length : groupStyleSum);  //根据日期字符串长度取格子数，当日期为空时，则取groupStyle总和初始化出格子列表
      this.dateChequer = [];
      for (let i = 0; i < this.groupStyle.length; i++) {
        squareNum += this.groupStyle[i];
        let chequerGroup = [] 
        // 判断遍历到第几次格子数大于日期字符串长度 ，当squareNum元素总和大于initDate字符串的总长度时,则直接截取剩余字符串为一个数组，不再进行数组遍历
        if(squareNum >= curDateStrLength){
          chequerGroup = JSON.parse(JSON.stringify(dateArr)).slice(startIndex);
          this.dateChequer.push(chequerGroup)
          return false
        }else{
          endIndex = (startIndex + this.groupStyle[i]);
          chequerGroup = JSON.parse(JSON.stringify(dateArr)).slice(startIndex,endIndex);
        } 
        this.dateChequer.push(chequerGroup)
        startIndex = endIndex;       
      }
    },
    getGroupStyleSum(){
      let sum = 0;
      for (let i = 0; i < this.groupStyle.length; i++) {
        sum += this.groupStyle[i]
      }
      return sum;
    },
    getDateValue(result){
      this.dateValue = result;
      this.initDateChequer(this.dateValue);
      this.senCtrlData();
    },
    senCtrlData(){
      this.$emit('change',this.dateValue)
    }
  },
  mounted() {
    this.initDateChequer();
  }
};
</script>

<style scoped>
/*@import url(../../../bizstatic/css/zxForm.css); */
/* .chequer-list-wrap-css {
  width: 100%;
  text-align: left;
  display: inline-block;
  font-size: 0;
  cursor: pointer;
  vertical-align: middle;
}
.right-center-css {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.chequer-list-wrap-css .form-item-label-css {
  text-align: right;
  font-size: 12px;
  display: inline-block;
  vertical-align: middle;
}
.required-tag-css {
  color: red;
}
.warning-text-css {
  color: #ff0000;
  text-align: left;
  font-size: 12px;
  position: absolute;
  left: 0;
  top: 110%;
}

.chequer-list-css {
  display: inline-block;
  font-size: 0;
  vertical-align: middle;
  position: relative;
}

.chequer-list-css .chequer-box-css {
  display: inline-block;
  font-size: 0;
  vertical-align: middle;
}
.chequer-list-css .chequer-item-css {
  width: 24px;
  height: 24px;
  font-size: 12px;
  display: inline-block;
  text-align: center;
  line-height: 24px;
  font-style: normal;
  border: 1px solid #cccccc;
  margin: 0 4px;
  vertical-align: middle;
}
.chequer-list-css .chequer-break-css {
  width: 10px;
  display: inline-block;
  font-style: normal;
  font-size: 16px;
  color: #cccccc;
  vertical-align: middle;
}

.chequer-list-css .form-item-css{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.chequer-list-css >>> .ivu-input-wrapper{
  width: 100% !important;
}
.chequer-list-css >>> .ivu-input-wrapper .ivu-input{
  cursor: pointer;
  background-color: transparent;
  font-size: 0;
  border: none;
}
.chequer-list-css >>> .ivu-input-wrapper .ivu-input-prefix i, 
.chequer-list-css >>> .ivu-input-wrapper .ivu-input-suffix i{
  font-size: 0;
  display: none;
} */
</style>
