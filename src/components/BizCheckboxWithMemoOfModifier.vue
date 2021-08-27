<template>
  <div :class="[ctrlStyle === 'iview' ? '' : 'checkbox-list-wrap-style']">
    <div class="checkbox-list-style" :style="'width:calc(100% - '+squareListWidth+')'">
      <label
        class="form-item-label-css"
        v-if="labelName && labelVisible"
        :style="'width:'+labelWidth+';padding:'+labelPadding+';margin:'+labelMargin"
      >
        <i v-if="required" class="required-tag-css">*</i>
        {{labelName}}
      </label>
      <div class="checkbox-list-css">
        <CheckboxGroup
          :value="checkboxItems"
          v-model="curSelectedOptsIndex"
          @on-change="onCheckboxChange"
        >
          <span class="checkbox-item-style" v-for="(item , idx) in checkboxItems" :key="idx">
            <Checkbox v-if="!readonly" :label="idx">
              <span class="labelText">{{item[bizViewCode]}}&nbsp;{{item[itemValueName]}}</span>
            </Checkbox>
            <span
              v-if="readonly"
              :class="['labelText', item.checked ? 'active-labelText' : '']"
            >{{item[bizViewCode]}} {{item[itemValueName]}}</span>
            <InputOfText
              v-if="(item.optmemoflag == 1) && !readonly"
              :clearable="true"
              :readonly="readonly"
              :prefix="prefix"
              :suffix="suffix"
              :maxlength="inputMaxlength"
              :inputWidth="inputWidth"
              :disabled="!item.checked"
              v-model="item[bizOptKey.bizoptmemo]"
              @change="getInputValue"
            ></InputOfText>
            <span
              v-if="item.optmemoflag && readonly"
              class="valueText"
              :style="'min-width:'+inputWidth"
            >{{item[bizOptKey.bizoptmemo]}}</span>
          </span>
        </CheckboxGroup>
        <transition name="fade">
          <span v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</span>
        </transition>
      </div>
    </div>
    <SquareList
      v-if="showSquare"
      :squareListWidth="squareListWidth"
      :squareNum="squareNum"
      :bizOptKey="bizOptKey"
      v-model="checkboxCurSelectedItems"
    ></SquareList>
  </div>
</template>

<script>
import ArraySortUtil from "@/utils/ArraySortUtil.js";
import InputOfText from "@/components/InputOfText.vue";
import SquareList from "@/components/SquareList.vue";
export default {
  name: "BizCheckboxWithMemoOfModifier",
  model: {
    prop: "initOpts",
    event: "change",
  },
  components: {
    InputOfText,
    SquareList,
  },
  props: {
    ctrlStyle: {
      type: String,
      default: "",
    },
    labelName: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: String,
      default: "120px",
    },
    labelPadding: {
      type: String,
      default: "0",
    },
    labelMargin: {
      type: String,
      default: "0",
    },
    labelVisible: {
      type: Boolean,
      default: true,
    },
    showSquare: {
      type: Boolean,
      default: true,
    },
    squareNum: {
      type: Number,
      default: 1,
    },
    inputWidth: {
      type: String,
      default: "220px",
    },
    inputMaxlength: {
      type: Number,
      default: 100,
    },
    prefix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    initOpts: {
      type: Array,
      default: function () {
        return [];
      },
    },
    dictOpts: {
      type: Array,
      default: function () {
        return [];
      },
    },
    required: {
      type: Boolean,
      default: false,
    },
    bizViewCode: {
      type: String,
      default: "bizoptviewcode",
    },
    itemKeyName: {
      type: String,
      default: "bizoptcode",
    },
    itemValueName: {
      type: String,
      default: "bizoptname",
    },
    itemMemoName: {
      type: String,
      default: "bizoptmemo",
    },
    itemDefaultOpts: {
      type: String,
      default: "optdefaultflag",
    },
    bizOptKey: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      curSelectedOptsIndex: [],
      checkboxItems: [],
      checkboxCurSelectedItems: [],
      curSelectedOpts: [],
      validateErrorMessage: "",
    };
  },
  watch: {
    initOpts(newVal, oldVal) {
      this.intiCtrl();
    },
  },
  computed: {
    squareListWidth() {
      let squareListCount =
        this.checkboxCurSelectedItems.length > this.squareNum
          ? this.checkboxCurSelectedItems.length
          : this.squareNum;
      let squareListWidth = 0;

      if (squareListCount > 0) {
        if (squareListCount >= 4) {
          squareListWidth = 120;
        } else {
          squareListWidth = squareListCount * 30;
        }
      } else {
        squareListWidth = 30;
      }
      return squareListWidth + "px";
    },
  },
  methods: {
    intiCtrl() {
      this.checkboxItems = JSON.parse(JSON.stringify(this.dictOpts)) || [];
      this.checkboxCurSelectedItems =
        JSON.parse(JSON.stringify(this.initOpts)) || [];
      let checkboxDfaultOpts = []; //定义空数组存放默认值
      this.curSelectedOptsIndex = []; // checkbox回显处理
      // 字典返回字段名跟后端接收字段名同步
      this.checkboxItems.map((item, index) => {
        item[this.bizOptKey.bizoptcode] = item[this.itemKeyName] || "";
        item[this.bizOptKey.bizoptname] = item[this.itemValueName] || "";
        item[this.bizOptKey.bizoptmemo] = item[this.itemMemoValue] || "";
        if (this.bizOptKey.bizoptattr) {
          item[this.bizOptKey.bizoptattr] =
            item[this.bizOptKey.bizoptattr] || "";
        }
        // 根据数据字典获取默认值
        if (
          item[this.itemDefaultOpts] &&
          this.checkboxCurSelectedItems.length === 0
        ) {
          checkboxDfaultOpts.push(item);
          this.curSelectedOptsIndex.push(index);
          this.sendCtrlOpt();
        }
      });

      for (let j = 0; j < this.checkboxItems.length; j++) {
        this.checkboxItems[j].checked = false;
        // 如果选项的值为空，则取数据字典定义的默认值
        if (this.checkboxCurSelectedItems.length === 0) {
          this.checkboxCurSelectedItems = checkboxDfaultOpts;
        }
        // 如果选项的值不为空
        if (this.checkboxCurSelectedItems.length > 0) {
          for (let i = 0; i < this.checkboxCurSelectedItems.length; i++) {
            if (
              String(
                this.checkboxCurSelectedItems[i][this.bizOptKey.bizoptcode]
              ) === String(this.checkboxItems[j][this.bizOptKey.bizoptcode]) &&
              String(
                this.checkboxCurSelectedItems[i][this.bizOptKey.bizoptname]
              ) === String(this.checkboxItems[j][this.bizOptKey.bizoptname])
            ) {
              this.checkboxItems[j].checked = true;
              // checkbox切换时对已选择的选项要做去重操作，避免一个选项重复多次添加，导致回传到业务时有多个重复值
              if (this.curSelectedOptsIndex.indexOf(j) < 0) {
                this.curSelectedOptsIndex.push(j);
              }
              // 给memo赋值
              if (this.checkboxCurSelectedItems[i][this.bizOptKey.bizoptmemo]) {
                this.checkboxItems[j][
                  this.bizOptKey.bizoptmemo
                ] = this.checkboxCurSelectedItems[i][this.bizOptKey.bizoptmemo];
              }

              // 给attr赋值
              if (
                this.bizOptKey.bizoptattr &&
                this.checkboxCurSelectedItems[i][this.bizOptKey.bizoptattr]
              ) {
                this.checkboxItems[j][
                  this.bizOptKey.bizoptattr
                ] = this.checkboxCurSelectedItems[i][this.bizOptKey.bizoptattr];
              }
            }
          }
        }
      }
    },
    onCheckboxChange() {
      if (this.curSelectedOptsIndex.length > 0) {
        //判断互斥
        for (let i = 0; i < this.curSelectedOptsIndex.length; i++) {
          //拿到已选择项每一项下标
          let idx = this.curSelectedOptsIndex[i];
          for (let j = 0; j < this.checkboxItems.length; j++) {
            //根据已选择项每一项的下标去遍历找到它是否是与已选择的每一项是否是互斥；是，则先清掉已选择的项，并添加互斥的项
            if (this.curSelectedOptsIndex.indexOf(j) > -1) {
              this.checkboxItems[j].checked = true;
              if (
                this.checkboxItems[idx].optmutexflag !=
                this.checkboxItems[j].optmutexflag
              ) {
                this.curSelectedOptsIndex = [];
                this.curSelectedOptsIndex.push(j);
              }
            } else {
              this.checkboxItems[j].checked = false;
            }
          }
        }
      }
      this.sendCtrlOpt();
    },
    getInputValue() {
      this.sendCtrlOpt();
    },
    clearInputValue(idx) {
      this.checkboxItems[idx][this.bizOptKey.bizoptmemo] = "";
      this.sendCtrlOpt();
    },
    sendCtrlOpt() {
      let selectedOpts = [];
      if (this.curSelectedOptsIndex && this.curSelectedOptsIndex.length > 0) {
        for (let i = 0; i < this.curSelectedOptsIndex.length; i++) {
          let idx = this.curSelectedOptsIndex[i];
          selectedOpts.push(this.checkboxItems[idx]);
        }
      }
      selectedOpts = JSON.parse(JSON.stringify(selectedOpts)) || [];

      //获取到选中的选项之后，将业务不需要的参数过滤掉
      selectedOpts.map((item) => {
        Object.keys(item).forEach((keyName) => {
          if (
            keyName !== this.bizOptKey.bizoptcode &&
            keyName !== this.bizOptKey.bizoptname &&
            keyName !== this.bizOptKey.bizoptmemo &&
            keyName !== this.bizOptKey.bizoptattr
          ) {
            delete item[keyName];
          }
        });
      });
      this.checkboxCurSelectedItems = selectedOpts.sort(
        ArraySortUtil.sortBy(this.bizOptKey.bizoptcode)
      );
      this.curSelectedOpts = this.checkboxCurSelectedItems;
      this.$emit("change", this.checkboxCurSelectedItems);
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
        if (
          this.curSelectedOptsIndex &&
          this.curSelectedOptsIndex.length === 0
        ) {
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
  },
  mounted() {
    this.intiCtrl();
  },
};
</script>

<style scoped>
</style>
