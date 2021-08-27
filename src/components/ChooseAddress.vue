<template>
  <div class="choose-address-item-css form-item-css">
    <label class="form-item-label-css" v-if="labelName && labelVisible" :style="'width:'+labelWidth">
      <i v-if="required" class="required-tag-css">*</i>
      {{labelName}}
    </label>
    <div :class="['form-item-input-css', validateErrorMessage ? 'dangerous-warning-css' : '']">
      <div>
        <Input
          :clearable="clearable"
          :disabled="disabled"
          placeholder="请选择城市"
          :readonly="true"
          v-model="selectedCityNameStr"
          @on-clear="clearSelectedOpt"
          @on-focus="showCityList"
          :style="'width:'+inputWidth"
        ></Input>        
        <transition name="fade">
          <div class="city-list-wrap-css" v-show="isShowCityList">
            <transition-group name="fade" tag="ul" class="city-list-css" :style="positionStyle">
              <li class="city-list-item-css" v-for="(itemCity , index) in cityList" :key="itemCity[index].areacode + index">
                <a
                  href="javascript:void(0);"
                  v-for="(item , idx) in itemCity"
                  :class="[item.checked ? 'city-item-checked-css':'']"
                  :key="(item.areacode + idx)"
                  @click="onSelectClick(index,item)"
                >
                  <span>{{item.areaname}}</span>
                  <Icon v-show="item.childrenflag && !item.isLoading" class="right-icon-css" type="ios-arrow-forward" size="12"/>
                  <Icon v-show="item.isLoading" class="right-icon-css ani-rotate" type="ios-loading" size="12"/>
                </a>
              </li>
            </transition-group>
            <div class="shadow" @click="showCityList('closeClick')"></div>
          </div>
        </transition>
      </div>
      <!-- <transition name="fade"> -->
        <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
      <!-- </transition> -->
    </div>
    <div class="detail-item-input-css" v-if="showDetailAddress">
      <label class="form-item-label-css">
        <i v-if="required" class="required-tag-css">*</i>&nbsp;详细地址：
      </label>
      <Input
        :disabled="detailAddressDisabled"
        :clearable="clearable"
        placeholder="请输入详细地址"
        v-model="detailAddressValue"
        @on-blur="getDetailAddressValue"
        @on-clear="clearDetailAddressValue"
      ></Input>
    </div>
  </div>
</template>

<script>
import Command from "@/zx/communication/Command.js";
export default {
  name: "ChooseAddress",
  model: {
    prop: "initOpt",
    event: "change"
  },
  props: {
    positionStyle:{
      type: Object,
      default:() => {
        return {'top': '-340px'}
      }
    },
    isAdministrativeDivision:{
      type: Boolean,
      default: false
    },
    showDetailAddress:{
      type: Boolean,
      default: true
    },
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
        return {
          areacode: [],
          areaname: []
        };
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
      oldCityList: [],
      curSelectedOpts: [],      
      detailAddressValue: "",
      selectCityOpt: {},
      selectedCityNameStr: "",

      isChangeSelectedCity:false,           //定义一个Boolean变量 (用于判断是否改变城市选择组件的值)

      validateErrorMessage: "",
      isShowCityList: false                 //定义一个Boolean变量 (用于判断是否显示城市选择组件)
    };
  },
  computed: {
    detailAddressDisabled() {
      return (this.selectCityOpt[this.bizOptKey.bizoptname] !== undefined &&
        this.selectCityOpt[this.bizOptKey.bizoptname].length > 0) ? false : true;
    }
  },
  watch: {
    initOpt(newVal, oldVal) {
      if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
        this.isChangeSelectedCity = true;
        // this.intiCtrl();
      }      
    }
  },
  methods: {
    async queryCityByParentCode(parentcode) {
      var cmd20090Params = {
        userid: "admin",
        areacode: -1,
        level: parentcode ? -1 : 0,
        parentcode: parentcode || -1,
        shortname: "",
        countflag: 3,
        page: 1,
        pagesize: 1000
      };
      let resultData = await Command.cmd_20090_getDictAreaCodeTree(cmd20090Params) || {};
      if (resultData.resultcode === 0 && resultData.data) {
        return resultData.data || [];
      }
      return [];
    },
    async intiCtrl() {
      this.selectCityOpt = JSON.parse(JSON.stringify(this.initOpt));
      this.transferData(); // 回显处理
    },
    async transferData() {
      // 回显处理
      this.cityList = [];
      let cityList = await this.queryCityByParentCode();
      this.cityList.push(cityList);
      if (this.selectCityOpt[this.bizOptKey.bizoptcode] && this.selectCityOpt[this.bizOptKey.bizoptname]) {
        // 1、获取code数组和name数组
        let areacodeArr = this.selectCityOpt[this.bizOptKey.bizoptcode] || [];
        let areanameArr = this.selectCityOpt[this.bizOptKey.bizoptname] || [];

        // 2、根据areacodeArr数组的每一组数据遍历查询到(省/市/区(县)/街道(镇)/居委会(村))每一级的数据，再回显到地址选择器中 
        if(areacodeArr.length > 0){
          let areaNameStr = "";
          for (let idx = 0; idx < areacodeArr.length; idx++) {
            let curCityItemList = this.cityList[idx] || [];
            for (let index = 0; index < curCityItemList.length; index++) {
              curCityItemList[index].isLoading = false;
              curCityItemList[index].checked = false;
              // 根据初始化数据的areacode和areaname找到查询出来的对应项
              if (areacodeArr[idx] === curCityItemList[index].areacode && areanameArr[idx] === curCityItemList[index].areaname) {
                curCityItemList[index].checked = true;                
                areaNameStr += curCityItemList[index].areaname + (idx < areacodeArr.length - 1 ? "/" : "");
                this.curSelectedOpts.push(curCityItemList[index]);
                // 如果该项存在子集（后端返的childrenflag用于判断该项是否有子集）则继续查询下一级
                if(curCityItemList[index].childrenflag){
                  let childrenCity = await this.queryCityByParentCode(curCityItemList[index].id);
                  this.cityList.push(childrenCity);
                }                
                break;
              }
            }
          }
          this.selectedCityNameStr = areaNameStr;
        }

        // 3、回显详细地址 ———— 根据name数组和code数组长度比较，如果name数组长度大于code数组长度，则name数组最后一个元素，则为详细地址输入框的内容；
        if (areanameArr.length > areacodeArr.length) {
          this.detailAddressValue = areanameArr[areanameArr.length - 1];
        }
        // 4、回显完成后将isChangeSelectedCity还原（便于控制查询地址请求数）
        this.isChangeSelectedCity = false;
      }
      this.oldCityList = JSON.parse(JSON.stringify(this.cityList));
    },
    async onSelectClick(idx, selectedItem) {
      if(selectedItem.isLoading){
        return 
      }

      // 当点击的不是地址组件的最后一级列表的选项，则删除当前点击的之后的几级地址选项列表
      if (idx < this.cityList.length - 1) {
        this.cityList.splice(idx + 1);
      }

      // 当前列点击项设置高亮
      let cityItem = this.cityList[idx];
      cityItem.forEach(item => {
        selectedItem.isLoading = false;
        item.checked = (JSON.stringify(item) === JSON.stringify(selectedItem)) ? true : false;
      });

      if (selectedItem.childrenflag) {  
        selectedItem.isLoading = true;      
        let childrenCity = await this.queryCityByParentCode(selectedItem.id);
        selectedItem.isLoading = false;
        this.cityList.push(childrenCity);
      } else {        
        this.getSelectedCity('loadingDataFinished');        
        this.sendCtrlOpt();
        this.showCityList();
      }
    },
    getSelectedCity(type) {
      this.selectedCityNameStr = "";
      this.curSelectedOpts = [];
      // 如果不是选择到最后一级自动关闭地址选择组件，则组件列表应该渲染老数据；
      switch (type) {
        case 'loadingDataFinished':
          this.oldCityList = JSON.parse(JSON.stringify(this.cityList));
          break;
        case 'closeClick':
           this.cityList = JSON.parse(JSON.stringify(this.oldCityList));
          break;
        default:
          break;
      }
      
      this.cityList.forEach(item => {
        for (let idx = 0; idx < item.length; idx++) {
          if (item[idx].checked) {
            this.selectedCityNameStr += item[idx].areaname + (item[idx].childrenflag ? "/" : "");
            this.curSelectedOpts.push(item[idx]);
          }
        }
      });
    },
    showCityList(type) {
      // 显示或隐藏地址选择组件
      this.isShowCityList = !this.isShowCityList; 
      if(type){
        this.getSelectedCity(type);
      }
    },
    clearSelectedOpt() {
      this.selectedCityNameStr = "";
      this.curSelectedOpts = [];
      this.selectCityOpt = {};
      this.sendCtrlOpt();
    },
    getDetailAddressValue() {
      this.sendCtrlOpt();
    },
    clearDetailAddressValue() {
      this.detailAddressValue = "";
      this.sendCtrlOpt();
    },
    sendCtrlOpt() {
      // 将地址选择组件的结果添加进结果selectedObj对象（emit到页面）
      let selectedData = JSON.parse(JSON.stringify(this.curSelectedOpts)) || [];
      let areacodeArr = [];
      let areanameArr = [];
      // 将选择地址组件里面的结果，areacode和areaname分别添加进两个数组
      if(!this.isAdministrativeDivision){
        selectedData.forEach(item => {
          areacodeArr.push(item.areacode);
          areanameArr.push(item.areaname);
        });
      } else {
          selectedData.forEach(item => {
            areacodeArr.push(item);
            areanameArr.push(item);
          });
      }

      this.selectCityOpt[this.bizOptKey.bizoptcode] = areacodeArr;
      this.selectCityOpt[this.bizOptKey.bizoptname] = areanameArr;

      //添加文本输入框输入的详细地址
      if (this.detailAddressValue !== "") {
        this.selectCityOpt[this.bizOptKey.bizoptname].push(
          this.detailAddressValue
        );
      } else {
        if (
          this.selectCityOpt[this.bizOptKey.bizoptname].length >
          this.selectCityOpt[this.bizOptKey.bizoptcode].length
        ) {
          this.selectCityOpt[this.bizOptKey.bizoptname].splice(
            this.selectCityOpt[this.bizOptKey.bizoptname].length - 1
          );
        }
      }


      this.$emit("change", this.selectCityOpt);
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
        if ( this.selectCityOpt[this.bizOptKey.bizoptcode].length === 0) {
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
        controlValue: this.curSelectedOpts
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
