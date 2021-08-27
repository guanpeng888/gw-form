<template>
  <div :class="['chequer-list-wrap-css', alignStyle ? 'right-center-css' : '']">
    <label
      class="form-item-label-css"
      :style="'width:'+labelWidth"
      v-if="labelName && labelVisible"
    >
      <i v-if="required" class="required-tag-css">*</i> {{labelName}}
    </label>
    <div class="chequer-list-css">
      <span class="chequer-box-css" v-for="(chequerItem,index) in formCodeChequer" :key="index"> 
        <i class="chequer-item-css" v-for="(item , idx) in chequerItem" :key="idx">{{item}}</i>
        <i class="chequer-break-css">{{(index < (formCodeChequer.length -1)) ? breakTag : ''}}</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SquareOfFormCode",
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
    initValue: {
      type: [String,Number],
      default: ""
    },
    groupStyle:{
      type:Array,
      default:function(){
        return [6,6,6,2]
      }
    },
    alignStyle:{
      type: String,
      default: ""
    },
    bizOptKey: {
      type: Object,
      default: function() {
        return {
          bizoptcode: ""
        };
      }
    }
  },
  data() {
    return {
      formCodeChequer: [] //根据该数组决定格子数量
    };
  },
  watch: {
    initValue(newVal, oldVal) {
      this.initCodeChequer();
    }
  },
  methods: {
    // 初始化格子数
    initCodeChequer() {
      /**
       * 该方法主要是把initValue（传进来的字符串）根据指定的格式组成二位数组，再根据二位数组渲染格子数：
       * 1、将initValue字符串转换成一个一维数组（curCodeArr）。
       * 2、按照groupStyle参数有几个元素将curCodeArr数组分割成几个数组，且数组里面的元素之和不得大于initValue字符串的总长度。
       * 3、groupStyle元素总和大于initValue字符串的总长度时,则直接截取剩余字符串为一个数组。
       * 4、groupStyle元素总和小于initValue字符串的总长度时，就按照groupStyle元素个数分个成formCodeChequer数组的个数。
       *  */
      this.formCodeChequer = [];
      let curCodeArr = [];
      let curCodeStr = JSON.parse(JSON.stringify(String(this.initValue))) || ''; 
      let groupStyleSum = this.getGroupStyleSum();     //获取格子显示的数组groupStyle总和，用来初始化格子数（按理该数组总和应该与 initValue字符串的值长度应该是一样的）
      if(curCodeStr != ''){
        curCodeArr = curCodeStr.replace(/(.)(?=[^$])/g,"$1,").split(",");
      } else {            
        // 当初始化字符串为空时，默认根据groupStyle数组总和定义格子数
        for (let j = 0; j < groupStyleSum; j++) {
          curCodeArr.push("");
        }
      }
      let startIndex = 0;
      let endIndex = 0;
      let squareNum = 0;
      let curCodeStrLength = (curCodeStr ? curCodeStr.length : groupStyleSum);    
      for (let i = 0; i < this.groupStyle.length; i++) {
        let chequerGroup = [] 
        squareNum += this.groupStyle[i]
        //  groupStyle元素总和大于initValue字符串的总长度时,则直接截取剩余字符串为一个数组，再不进行数组下一次的遍历        
        if(squareNum >= curCodeStrLength){
          chequerGroup = JSON.parse(JSON.stringify(curCodeArr)).slice(startIndex);
          this.formCodeChequer.push(chequerGroup)
          return false
        }else{
          endIndex = (startIndex + this.groupStyle[i]);
          chequerGroup = JSON.parse(JSON.stringify(curCodeArr)).slice(startIndex,endIndex);
          this.formCodeChequer.push(chequerGroup)
        }     
        startIndex = endIndex;       
      }
    },
    getGroupStyleSum(){
      let sum = 0;
      for (let i = 0; i < this.groupStyle.length; i++) {
        sum += this.groupStyle[i]
      }
      return sum;
    }
  },
  mounted() {
    this.initCodeChequer();
  }
};
</script>

<style scoped>
</style>
