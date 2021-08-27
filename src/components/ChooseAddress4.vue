<template>
  <div class="form-item-css">
    <label class="form-item-label-css" v-if="labelName" :style="'width:'+labelWidth">
      <i v-if="required" class="required-tag-css">*</i>
      {{labelName}}
    </label>
    <div :class="['form-item-input-css', validateErrorMessage ? 'dangerous-warning-css' : '']">
      <div>
        <Cascader :style="'width:'+inputWidth" :data="cityList" :load-data="loadData" v-model="curSelectedOpts" @on-change="onSelectChange"></Cascader>
        <label class="form-item-label-css">
          <i v-if="required" class="required-tag-css">*</i>&nbsp;详细地址：
        </label>
        <Input
          :type="type"
          placeholder="请输入详细地址"
          :clearable="clearable"
          :disabled="detailAddressDisabled"
          :maxlength="maxlength"
          v-model="detailAddressValue"
          @on-blur="onInputItemBlur"
          @on-clear="clearInputValue"          
        ></Input>
      </div>
      <transition name="fade">
        <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
      </transition>
    </div>
  </div>
</template>

<script>
import Command from "@/zx/communication/Command.js";
import AddressData from "@/zx/dataSource/addressdata.js";
export default {
  name: "ChooseAddress",
  model: {
    prop: "initOpt",
    event: "change"
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
      default: "160px"
    },
    inputWidth: {
      type: [String, Number],
      default: "320px"
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
    maxlength:{
      type:Number,
      default:256
    },
    type:{
      type:String,
      default:'text'
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
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
      cityList: [],
      selectedCity: {},
      curSelectedOpts: [],
      detailAddressValue:"",
      validateErrorMessage: "",
      beforeUpdateValue: {},
      isNoMoreData:false
    };
  },
  computed:{
    detailAddressDisabled(){
      return this.selectedCity[this.bizOptKey.bizoptname] !== undefined && this.selectedCity[this.bizOptKey.bizoptname].length > 0 ? false : true;
    }
  },
  watch: {
    initOpt(newVal, oldVal) {
      this.intiCtrl();
    }
  },
  methods: {    
    async intiCtrl() {
      this.cityList = AddressData.getCityList();
      this.selectedCity = JSON.parse(JSON.stringify(this.initOpt)) || {};

      // 回显处理
      // if (this.selectedCity[this.bizOptKey.bizoptcode] && this.selectedCity[this.bizOptKey.bizoptname]) {
      //   // 1、获取code数组和name数组
      //   let areacode = this.selectedCity[this.bizOptKey.bizoptcode] || [];
      //   let areaname =  this.selectedCity[this.bizOptKey.bizoptname] || [];
      //   // 2、回显详细地址 ———— 根据name数组和code数组长度比较，如果name数组长度大于code数组长度，则name数组最后一个元素，则为详细地址输入框的内容；
      //   if(areaname.length > areacode.length){
      //     this.detailAddressValue = areaname[areaname.length - 1];
      //   }
      //   // 3、根据code数组和name数组 组成Cascader组件的数据格式(格式为：[{label:"110000000000",value:"北京市"},{label:"110102000000",value:"西城区"},{label:"110102003000",value:"新街口街道办事处"},{label:"110102003020",value:"西里一区社区居委会"}])
      //   let initCityArray = [];
      //   areacode.forEach((item , idnex)=>{
      //     let itemObj = {
      //       label:areaname[idnex],
      //       value:areacode[idnex],
      //     }
      //     initCityArray.push(itemObj)
      //   })
      //   this.curSelectedOpts = initCityArray;
      //   // 4、根据新数组initCityArray获取第一项的code和
      //   let cityItemList = [this.cityList];
      //   [{label:'sadasd',value:'beijing'},{label:'sadasd',value:'beijing'},{label:'sadasd',value:'beijing'},{label:'sadasd',value:'beijing'},]
      //   for (let idx = 0; idx < initCityArray.length; idx++) {
      //     let curCityItemList = cityItemList[idx] || [];
      //     for (let index = 0; index < curCityItemList.length; index++) {
      //       if(initCityArray[idx].value === curCityItemList[index].areacode && initCityArray[idx].label === curCityItemList[index].areaname){
      //         let childrenCity = await this.queryCityByParentCode([curCityItemList[index].id]);
      //           cityItemList.push(childrenCity);
      //          await this.loadData(curCityItemList[index]);   
      //          break;
      //       }
      //     }
      //   }
      // }
    },
    // 根据parentcode查询城市
    async queryCityByParentCode(parentcode){
      var cmd20090Params = {
        userid:"admin",
        areacode: [],
        level: parentcode ? [] : [0],
        parentcode: parentcode || [0],
        shortname:'',
        countflag:3,
        page:1,
        pagesize:1000
      }
      let cityList = []
      let resultData = await Command.cmd_20090_getDictAreaCodeTree(cmd20090Params);
      if(resultData.data && resultData.data.length > 0){
        resultData.data.map(item => {          
          item.value = item.areacode || "";
          item.label = item.areaname || "";
          // 判断是否是没有子集
          if(item.childrenflag){
            item['children'] = item.children || [];
            item['loading'] = false;
          }          
          cityList.push(item);
        });
      }
      return cityList;
    },
    async loadData(item, callback){
      // 根据当前选中去获取子集
      item.loading = true;
      let childrenCity = await this.queryCityByParentCode([item.id]);
      item.loading = false;
      if(childrenCity.length > 0){
        item.children = childrenCity;
        if(callback){
          callback();     //该方法是Cascader组件渲染回调，不得删除
        }        
      }
      
    },
    onSelectChange(value, selectedData) {
      this.sendCtrlOpt(selectedData);
    },
    onInputItemBlur() {
      this.sendCtrlOpt();
    },
    clearInputValue() {
      this.detailAddressValue = "";
      this.sendCtrlOpt();
    },
    sendCtrlOpt(data) {
      // 将地址选择组件的结果添加进结果selectedObj对象（emit到页面）
      if(data !== undefined){
        let selectedData = JSON.parse(JSON.stringify(data)) || [];
        let areacodeArr = [], areanameArr = [];
        // 将选择地址组件里面的结果
        selectedData.forEach(item => {
          areacodeArr.push(item.areacode);
          areanameArr.push(item.areaname);
        });
         this.selectedCity[this.bizOptKey.bizoptcode] = areacodeArr;
         this.selectedCity[this.bizOptKey.bizoptname] = areanameArr;
      }
      

      //添加文本输入框输入的详细地址
      if(this.detailAddressValue !== ""){
        this.selectedCity[this.bizOptKey.bizoptname].push(this.detailAddressValue);
      }
      this.$emit("change", this.selectedCity);
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
    resetValue() {}
  },
  mounted() {
    this.intiCtrl();
    
  }
};
</script>

<style scoped>
/*@import url(../../../bizstatic/css/inputControl.css);*/
</style>
