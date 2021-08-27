<template>
  <div :class="['chequer-list-wrap-css square-list-wrap-css', alignStyle ? 'right-center-css' : '']" :style="'width:'+squareListWidth">
    <label
      class="form-item-label-css"
      :style="'width:'+labelWidth"
      v-if="labelName && labelVisible"
    >
      <i v-if="required" class="required-tag-css">*</i> {{labelName}}
    </label>
    <div class="chequer-list-css" style="font-size:14px">
      <span class="chequer-box-css" v-for="(squareItem,index) in squareList" :key="index">
        <i class="chequer-item-css">{{bizOptKey.bizoptcode ? squareItem[bizOptKey.bizoptcode] : squareItem}}</i>
        <i class="chequer-break-css" v-if="breakTag">{{(index < (squareList.length -1) && (index+1)%4 !== 0) ? breakTag : ''}}</i>
      </span>
    </div>
  </div>
</template>

<script>
import ObjectUtil from "@/utils/ObjectUtil.js";
export default {
  name: "SquareList",
  model: {
    prop: "initOpts",
    event: "change"
  },
  props: {
    labelName: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String,
      default: "120px"
    },
    squareListWidth:{
      type: String,
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
      default: "/"
    },
    squareNum: {
      type: Number,
      default: 1
    },
    initOpts: {
      type: [Array, Object],
      default: function() {
        return [];
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
      this.squareList = [];
      let curData = JSON.parse(JSON.stringify(this.initOpts)) || [];
      if(ObjectUtil.isArray(curData)){
          curData = [...curData]
      } else if (ObjectUtil.isObject(curData)) {
        curData = [curData];
      }

      // 默认创建格子数量
      let squareNum = curData.length > this.squareNum ? curData.length : this.squareNum;
      for (let i = 0; i < squareNum; i++) {
        let squareItem = curData[i] ? curData[i] : {};
        this.squareList.push(squareItem);
      }
    }
  },
  mounted() {
    this.initSquareList();
  }
};
</script>

<style scoped>
</style>
