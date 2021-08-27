<template>
  <div class="radio-list-wrap-style">
    <div class="radio-list-style">
      <label
        class="form-item-label-css"
        v-if="labelName && labelVisible"
        :style="'width:'+labelWidth"
      >
        <i v-if="required" class="required-tag-css">*</i>
        {{labelName}}
      </label>
      <div class="radio-list-css">
        <RadioGroup
          :value="radioItems"
          v-model="selectedIndex"
          @on-change="onRadioChange(selectedIndex)"
        >
          <span class="radio-item-style" v-for="(item , idx) in radioItems" :key="idx">
            <Radio v-if="!readonly" :label="idx" :true-value="selectedIndex === idx">
              <span class="labelText">{{item[bizViewCode]}}&nbsp;{{item[itemValueName]}}</span>
            </Radio>
            <span
              v-if="readonly"
              :class="['labelText', selectedIndex === idx ? 'active-labelText' : '']"
            >{{item[bizViewCode]}} {{item[itemValueName]}}</span>
            <Input
              v-if="(item.optmemoflag == 1) && !readonly"
              type="text"
              :clearable="true"
              :readonly="readonly"
              :inputWidth="inputWidth"
              :maxlength="inputMaxlength"
              :disabled="selectedIndex !== idx"
              v-model="item[bizOptKey.bizoptmemo]"
              @on-blur="getInputValue(idx)"
              @on-clear="clearInputValue(idx)"
            ></Input>
            <div style="display: inline-block;" v-if="item.optmemoflag && readonly">
              <span class="modifier-css" v-if="prefix">{{prefix}}</span>
              <span class="valueText" :style="'min-width:'+inputWidth">{{item[bizOptKey.bizoptmemo]}}</span>
              <span class="modifier-css" v-if="suffix">{{suffix}}</span>
            </div>
          </span>
        </RadioGroup>
        <transition name="fade">
          <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
        </transition>
      </div>
    </div>
    <div class="chequer-list-css" v-if="showSquare">
      <span class="chequer-item-css">{{curSelectedCode}}</span>
    </div>
  </div>
</template>

<script>
import ObjectUtil from "@/utils/ObjectUtil.js";
export default {
  name: "BizRadioWithMemo",
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
      type: String,
      default: "120px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    inputWidth: {
      type: String,
      default: "220px"
    },
    inputMaxlength:{
      type: Number,
      default: 100
    },
    showSquare: {
      type: Boolean,
      default: true
    },
    initOpt: {
      type: Object,
      default: function() {
        return {};
      }
    },
    readonly: {
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
    itemDefaultOpt: {
      type: String,
      default: "optdefaultflag"
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
      curSelectedOpt: {},
      validateErrorMessage: ""
    };
  },
  watch: {
    initOpt(newVal, oldVal) {
      this.intiCtrl();
    }
  },
  computed:{
    curSelectedCode(){
      if(ObjectUtil.isNull(this.selectedIndex)){
        return this.radioItems[this.selectedIndex][this.bizViewCode]
      }
      return this.radioSelectedItem[this.bizOptKey.bizoptcode]
    }
  },
  methods: {
    intiCtrl() {
      this.radioItems = JSON.parse(JSON.stringify(this.dictOpts));
      this.radioSelectedItem = JSON.parse(JSON.stringify(this.initOpt));
      let radioDefaultOpt = {}; //定义空对象存放默认值
      this.selectedIndex = null;

      // 字典返回字段名跟后端接收字段名同步
      if (this.bizOptKey.bizoptcode && this.bizOptKey.bizoptname) {
        this.radioItems.map((item, index) => {
          item[this.bizOptKey.bizoptcode] = item[this.itemKeyName] || "";
          item[this.bizOptKey.bizoptname] = item[this.itemValueName] || "";
          if (this.bizOptKey.bizoptmemo) {
            item[this.bizOptKey.bizoptmemo] = item[this.itemMemoName] || "";
          }
          // 根据数据字典获取默认值
          if (item[this.itemDefaultOpt]) {
            this.selectedIndex = index;
            radioDefaultOpt = item;
          }
        });
      }

      // 默认值
      if (
        !this.radioSelectedItem[this.bizOptKey.bizoptcode] &&
        !this.radioSelectedItem[this.bizOptKey.bizoptname] &&
        this.selectedIndex !== null
      ) {
        this.radioSelectedItem = radioDefaultOpt;
        this.sendCtrlOpt(this.selectedIndex);
      }

      // 回显处理
      if (this.radioSelectedItem) {
        for (let j = 0; j < this.radioItems.length; ++j) {
          if (String(this.radioSelectedItem[this.bizOptKey.bizoptcode]) === String(this.radioItems[j][this.bizOptKey.bizoptcode]) &&
              String(this.radioSelectedItem[this.bizOptKey.bizoptname]) === String(this.radioItems[j][this.bizOptKey.bizoptname])
            ) {
              this.selectedIndex = j;
              if (this.radioSelectedItem[this.bizOptKey.bizoptmemo]) {
                this.radioItems[j][this.bizOptKey.bizoptmemo] = this.radioSelectedItem[this.bizOptKey.bizoptmemo];
              }

              if (this.bizOptKey.bizoptattr && this.radioSelectedItem[this.bizOptKey.bizoptattr]) {
                this.radioItems[j][this.bizOptKey.bizoptattr] = this.radioSelectedItem[this.bizOptKey.bizoptattr];
              }
            }
        }
      }
    },
    onRadioChange(idx) {
      this.sendCtrlOpt(idx);
    },
    getInputValue(idx) {
      this.sendCtrlOpt(idx);
    },
    clearInputValue(idx) {
      this.radioItems[idx][this.bizOptKey.bizoptmemo] = "";
      this.sendCtrlOpt(idx);
    },
    sendCtrlOpt(idx) {
      let selectedObj = JSON.parse(JSON.stringify(this.radioItems[idx])) || {};
      //获取到选中的选项之后，将业务不需要的参数过滤掉
      Object.keys(selectedObj).forEach(keyName => {
        if (
          keyName !== this.bizOptKey.bizoptcode &&
          keyName !== this.bizOptKey.bizoptname &&
          keyName !== this.bizOptKey.bizoptmemo &&
          keyName !== this.bizOptKey.bizoptattr
        ) {
          delete selectedObj[keyName];
        }
      });
      this.radioSelectedItem = selectedObj;
      this.curSelectedOpt = selectedObj;
      this.$emit("change", selectedObj);
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
  mounted() {
    this.intiCtrl();
  }
};
</script>

<style scoped>
</style>
