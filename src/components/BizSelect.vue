<template>
  <div class="form-item-wrap-css">
    <label
      class="form-item-label-css"
      v-if="labelName && labelVisible"
      :style="'width:'+labelWidth+';padding:'+labelPadding+';margin:'+labelMargin"
    >
      <i v-if="required" class="required-tag-css">*</i>
      {{labelName}}
    </label>
    <div
      :class="[ctrlStyle ==='iview' ? 'form-item-ivu-input-css' : 'form-item-input-css', validateErrorMessage ? 'dangerous-warning-css' : '']"
    >
      <div>
        <Select
          v-if="!readonly"
          v-model="selectedIndex"
          :clearable="clearable"
          :disabled="disabled"
          :placeholder="placeholder"
          @on-change="onSelectChange(selectedIndex)"
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
  name: "BizSelect",
  model: {
    prop: "initOpt",
    event: "change"
  },
  props: {
    controlKey: {
      type: String,
      default: ""
    },
    ctrlStyle: {
      type: String,
      default: ""
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
    labelPadding: {
      type: String,
      default: ""
    },
    labelMargin: {
      type: String,
      default: ""
    },
    inputWidth: {
      type: String,
      default: "200px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
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
    isSearch: {
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
    itemDefaultOpt: {
      type: String,
      default: "optdefaultflag"
    },
    isFilterBizOptKey: {
      type: Boolean,
      default: true
    },
    bizOptKey: {
      type: Object,
      required: false,
      default: function() {
        return {
          bizoptcode: "bizoptcode",
          bizoptname: "bizoptname",
          bizoptattr: ""
        };
      }
    }
  },
  data() {
    return {
      selectedIndex: null,
      initCtrlValue: "",
      selectItems: [],
      selectSelectedItem: {},
      curSelectedOpt: {},
      validateErrorMessage: "",
      beforeUpdateValue: {}
    };
  },
  watch: {
    initOpt(newVal, oldVal) {
      this.intiCtrl();
    },
    dictOpts(newVal, oldVal) {
      this.intiCtrl();
    }
  },
  methods: {
    intiCtrl() {
      this.selectItems = JSON.parse(JSON.stringify(this.dictOpts)) || [];
      this.selectSelectedItem = JSON.parse(JSON.stringify(this.initOpt)) || {};
      this.selectedIndex = null;
      let selectedDefaultOpt = {};
      // 字典返回字段名跟后端接收字段名同步
      if (
        this.bizOptKey.bizoptcode &&
        this.bizOptKey.bizoptname &&
        this.selectSelectedItem
      ) {
        this.selectItems.map((item, index) => {
          item[this.bizOptKey.bizoptcode] = item[this.itemKeyName] || "";
          item[this.bizOptKey.bizoptname] = item[this.itemValueName] || "";
          item[this.bizOptKey.bizoptattr] = item[this.bizOptKey.bizoptattr] || "";

          // 根据数据字典获取默认值
          if (Number(item[this.itemDefaultOpt])) {
            this.selectedIndex = index;
            selectedDefaultOpt = JSON.parse(JSON.stringify(item));
          }
        });
      }
      // 默认值
      if (
        !this.selectSelectedItem[this.bizOptKey.bizoptcode] &&
        !this.selectSelectedItem[this.bizOptKey.bizoptname] &&
        this.selectedIndex !== null
      ) {
        this.selectSelectedItem = selectedDefaultOpt;
        this.sendCtrlOpt(this.selectedIndex);
      }

      // 回显处理
      if (this.selectSelectedItem) {
        let bizoptcode = this.isFilterBizOptKey
          ? this.bizOptKey.bizoptcode
          : this.itemKeyName;
        let bizoptname = this.isFilterBizOptKey
          ? this.bizOptKey.bizoptname
          : this.itemValueName;
        for (let j = 0; j < this.selectItems.length; ++j) {
          if (
            String(this.selectSelectedItem[bizoptcode]) ===
              String(this.selectItems[j][bizoptcode]) &&
            String(this.selectSelectedItem[bizoptname]) ===
              String(this.selectItems[j][bizoptname])
          ) {
            this.selectedIndex = j;
            this.initCtrlValue = this.selectSelectedItem[bizoptname];
          }
        }
      }
    },
    onSelectChange(idx) {
      this.sendCtrlOpt(idx);
    },
    clearSelectedOpt() {
      this.sendCtrlOpt();
    },
    sendCtrlOpt(idx) {
      let selectedObj =
        idx !== undefined
          ? JSON.parse(JSON.stringify(this.selectItems[idx]))
          : {};
      if (this.isFilterBizOptKey) {
        //获取到选中的选项之后，将业务不需要的参数过滤掉
        Object.keys(selectedObj).forEach(keyName => {
          if (
            keyName !== this.bizOptKey.bizoptcode &&
            keyName !== this.bizOptKey.bizoptname &&
            keyName !== this.bizOptKey.bizoptattr
          ) {
            delete selectedObj[keyName];
          }
        });
        // 搜索条件时以便清空
        if (this.isSearch) {
          selectedObj = {
            [this.bizOptKey.bizoptcode]:
              selectedObj[this.bizOptKey.bizoptcode] || "",
            [this.bizOptKey.bizoptname]:
              selectedObj[this.bizOptKey.bizoptname] || ""
          };
        }
      }
      this.curSelectedOpt = selectedObj;
      this.$emit("change", selectedObj);
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
    resetValue() {},
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
