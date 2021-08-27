<template>
  <div class="chequer-list-wrap-css">
    <div class="chequer-list-css">
      <span v-for="(selectedItem, index) in squareList" :key="index">
        <span class="chequer-box-css">
          <i class="chequer-item-css">{{selectedItem[bizOptKey.bizoptcode]}}</i>
          <InputOfDate :labelWidth="'auto'" :inputWidth="'140px'" :labelName="bizOptKey.bizoptdate.labelName" :required="required" :readonly="readonly" :placeholder="'年 / 月 / 日'" :format="format" @change="getDateValue" v-model="selectedItem[bizOptKey.bizoptdate.dbfieldname]"></InputOfDate> 
        </span>
        <i class="chequer-break-css" v-if="(index < (squareList.length -1)) && ((index+1)%3 !== 0)">&nbsp;/&nbsp;</i>
      </span>      
    </div>
  </div>
</template>

<script>
import InputOfDate from "@/components/InputOfDate.vue";
export default {
  name: "squareWithDate",
  model: {
    prop: "initOpts",
    event: "change"
  },
  components:{
    InputOfDate
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
    required:{
      type: Boolean,
      default: false
    },
    format:{
      type:String,
      default:"yyyy-MM-dd"
    },
    squareNum: {
      type: Number,
      default: 1
    },
    specialCode:{
      type:String,
      default:""
    },
    initOpts: {
      type: [Array , Object],
      default: function() {
        return [];
      }
    },
    readonly:{
      type: Boolean,
      default: false
    },
    bizOptKey: {
      type: Object,
      default: function() {
        return {
          'bizoptcode':'',
          'bizoptdate':''
        };
      }
    }
  },
  data() {
    return {
      squareList: [] //根据该数组决定格子数量
    };
  },
  watch: {
    initOpts(newVal, oldVal) {
      this.initSquareList();
    }
  },
  methods: {
    // 初始化格子数
    initSquareList() {
      // this.squareList = JSON.parse(JSON.stringify(this.initOpts)) || [];
      this.squareList = [];
      let curData = JSON.parse(JSON.stringify(this.initOpts)) || [];
      for (let i = 0; i < curData.length; i++) {
        let chequerItem = curData[i] ? curData[i] : {};
        // 当所选选项包含特殊code则不渲染该元素
        if(this.squareList.indexOf(chequerItem) < 0 && chequerItem[this.bizOptKey.bizoptcode] != this.specialCode){
          this.squareList.push(chequerItem);
        }     
      }
    },
    getDateValue(date){
      this.sendCtrOpts()
    },
    sendCtrOpts(){
      let filterData = JSON.parse(JSON.stringify(this.squareList))
      this.$emit('change', filterData)
    }
  },
  mounted() {
    this.initSquareList();
  }
};
</script>

<style scoped>
/*@import url(../../../bizstatic/css/zxForm.css); */
/* .chequer-list-wrap-css{
  display: block;
  font-size: 0;
  text-align: left;
}
.chequer-list-wrap-css .chequer-list-css { 
  max-width: 630px; 
  display: inline-block;
  font-size: 0;
}
.chequer-list-wrap-css .chequer-list-css .chequer-box-css {
  display: inline-block;
  font-size: 0;
  vertical-align: middle;
  margin: 8px;
  position: relative;
}
.chequer-list-wrap-css .chequer-list-css .chequer-item-css {
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
.chequer-list-wrap-css .chequer-list-css .chequer-break-css {
  display: inline-block;
  font-style: normal;
  font-size: 16px;
  color: #cccccc;
  vertical-align: middle;
}
.chequer-list-wrap-css .chequer-list-css >>> .form-item-css{
  margin-bottom: 0;
  vertical-align: middle;
}
.icon-delete-css {
  color: #ff0000;
  position: absolute;
  right: 0px;
  top: -4px;
  z-index: 3;
  cursor: pointer;
}
.chequer-list-wrap-css .chequer-list-css .chequer-box-css:nth-child(odd) .icon-delete-css{
  right: 12px;
}
.chequer-list-wrap-css .chequer-list-css .chequer-box-css:nth-child(even) .icon-delete-css{
  right: 0;
}
.icon-add-btn-css{
  vertical-align: top;  
  margin: 10px 0 6px 16px;
}
.ivu-btn{
  border: none;
  padding: 4px 0;
}
.ivu-btn:focus{
  box-shadow: none;
}
.ivu-btn, .ivu-btn:active, .ivu-btn:focus{
  outline: none;
}
.ivu-btn:hover{
    color: #333333;
    background-color: transparent;
} */
</style>
