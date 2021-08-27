<template>
  <div class="form-item-wrap-css">
    <label class="form-item-label-css" v-if="labelName && labelVisible" :style="'width:'+labelWidth">
      <i v-if="required" class="required-tag-css">*</i>
      {{labelName}}
    </label>
    <div :class="[ctrlStyle ==='iview' ? 'form-item-ivu-input-css' : 'form-item-input-css', validateErrorMessage ? 'dangerous-warning-css' : '']">
      <div>
        <Select
          v-if="!readonly"
          v-model="selectedIndex"
          :clearable="clearable"
          :disabled="disabled"
          :placeholder="placeholder"
          filterable 
          multiple
          :max-tag-count="maxTagCount"
          @on-change="onSelectChange"
          @on-clear="clearSelectedOpt"
          :style="'width:'+inputWidth"
        >
          <Option
            v-for="(item , idx) in selectItems"
            :key="idx"
            :value="idx"
          >{{item[itemValueName]}}</Option>
        </Select>
        <span v-if="readonly" class="valueText" :style="'width:'+inputWidth">{{initCtrlValue}}</span>
      </div>
      <transition name="fade">
        <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "BizSelectWithMultiple",
  model: {
    prop: "initOpts",
    event: "change"
  },
  props: {
    controlKey: {
      type: String,
      default: ""
    },
    ctrlStyle:{
        type:String,
        default:''
    },
    labelName: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String,
      default: "160px"
    },
    inputWidth: {
      type: String,
      default: "200px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    maxTagCount:{
      type:Number,
      default: 99
    },
    readonly: {
      type: Boolean,
      default: false
    },
    initOpts: {
      type: Array,
      default: function() {
        return [];
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
    bizViewCode: {
      type: String,
      default: "bizoptviewcode"
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
    itemAttrName: {
      type: String,
      default: ""
    },
    bizOptKey: {
      type: Object,
      required: false,
      default: function() {
        return {
          bizoptcode:'bizoptcode',
          bizoptname:'bizoptname'
        };
      }
    }
  },
  data() {
    return {
      selectedIndex: [],
      initCtrlValue:"",
      selectItems: [],
      selectSelectedItem: {},
      curSelectedOpt: {},
      validateErrorMessage: "",
      beforeUpdateValue: {}
    };
  },
  watch: {
    dictOpts(newVal, oldVal) {
      this.selectItems = JSON.parse(JSON.stringify(this.dictOpts));
      this.intiCtrl();
    },
    initOpts(newVal, oldVal) {
      this.intiCtrl();
    }
  },
  methods: {
    intiCtrl() {
      this.selectItems = JSON.parse(JSON.stringify(this.dictOpts));
      this.selectSelectedItem = this.initOpts;
     
      this.selectedIndex = [];
      // 字典返回字段名跟后端接收字段名同步
      if (this.bizOptKey.bizoptcode && this.bizOptKey.bizoptname) {
        this.selectItems.map(item => {
          item[this.bizOptKey.bizoptcode] = item[this.itemKeyName] || "";
          item[this.bizOptKey.bizoptname] = item[this.itemValueName] || "";
          item[this.bizOptKey.bizoptmemo] = item[this.itemMemoName] || "";
        });
      }

      // 回显处理
      if (this.selectSelectedItem && this.selectSelectedItem.length > 0) {
        this.selectedIndex = [];
        this.initCtrlValue = "";
        for (let j = 0; j < this.selectItems.length; ++j) {
          for(let i = 0; i < this.selectSelectedItem.length; i++){
            if (
              String(this.selectSelectedItem[i][this.bizOptKey.bizoptcode]) === String(this.selectItems[j][this.bizOptKey.bizoptcode]) &&
              String(this.selectSelectedItem[i][this.bizOptKey.bizoptname]) === String(this.selectItems[j][this.bizOptKey.bizoptname])
            ) {
              this.selectedIndex.push(j);
              if(this.readonly){
                this.initCtrlValue += this.selectItems[j][this.bizOptKey.bizoptname] + ';'
              }
            }
          }
        }
      }
    },
    onSelectChange() {
      this.sendCtrlOpt();
      this.vaildData();
    },
    clearSelectedOpt() {
      this.selectedIndex = [];
      this.selectSelectedItem = []
      this.sendCtrlOpt();
    },
    sendCtrlOpt() {
      this.selectSelectedItem = []
      if(this.selectedIndex && this.selectedIndex.length > 0){
        this.selectedIndex.forEach(item => {
          let selectedItem = JSON.parse(JSON.stringify(this.selectItems[item])) || {}
          Object.keys(selectedItem).forEach(keyName => {
            if(keyName != this.bizOptKey.bizoptcode &&
              keyName != this.bizOptKey.bizoptname &&
              keyName != this.bizOptKey.bizoptmemo){
                delete selectedItem[keyName];
            }
          })
          this.selectSelectedItem.push(selectedItem)
        })
      }
      this.curSelectedOpt = this.selectSelectedItem;
      this.$emit("change", this.selectSelectedItem);
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
        if (!this.selectedIndex || this.selectedIndex.length <= 0) {
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
    resetValue(){

    },
    /**
     * 当调用此方法时，返回组件当前值
     */
    getCurrentValue() {
      return {
        controlKey: this.controlKey,
        controlValue: this.curSelectedOpt
      };
    }
  },
  mounted() {
    this.intiCtrl();
  }
};
</script>

<style scoped>
</style>
