<template>
  <div class="question-list-wrap-css">
    <div class="question-list-item-css" v-for="(questionItem , index) in questionList" :key="index">
      <h3
        class="question-title-css"
        v-if="questionItem.qcatetitleshowflag"
      >{{questionItem.qcatetitle}}</h3>
      <h4
        class="question-sub-title-css"
        v-if="questionItem.qcatesubtitleshowflag"
      >{{questionItem.qcatesubtitle}}</h4>
      <h5 class="question-item-title-css">{{questionItem.qname}}</h5>
      <img class="question-item-img-css" v-if="questionItem.qgwcode === specialCode" src="../../../assets/img/question-test-1.jpg" alt="示例图片">
      <div class="answer-list-css">
        <RadioGroup
          v-model="questionItem.selectedIndex"
          @on-change="onRadioChange(index,questionItem.selectedIndex)"
        >
          <span class="answer-item-css" v-for="(item , idx) in questionItem.answerlist" :key="idx">
            <Radio v-if="!readonly" :label="idx" :true-value="curSelectedOpts[index] === idx">
              <span class="labelText">{{item[itemValueName]}}</span>
            </Radio>
          </span>
        </RadioGroup>
        <transition name="fade">
          <p
            v-if="questionItem.validateErrorMessage"
            class="warning-text-css"
          >{{questionItem.validateErrorMessage}}</p>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ObjectUtil from "@/utils/ObjectUtil.js";
export default {
  name: "BizRadioOfQuestion",
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
      default: "120px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    specialCode:{
      type: String,
      default: ""
    },
    initOpt: {
      type: Array,
      default: function() {
        return [];
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
    itemKeyName: {
      type: String,
      default: "qitemcode"
    },
    itemValueName: {
      type: String,
      default: "qitemname"
    },
    itemMemoName: {
      type: String,
      default: "bizoptmemo"
    },
    itemDefaultOpt: {
      type: String,
      default: "bizoptdefault"
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
      questionList: [],
      answerSelectedItems: [],
      curSelectedOpts: [],
      totalScore: ""
    };
  },
  watch: {
    initOpt(newVal, oldVal) {
      this.intiCtrl();
    }
  },
  methods: {
    intiCtrl() {
      this.questionList = JSON.parse(JSON.stringify(this.dictOpts));
      this.answerSelectedItems = JSON.parse(JSON.stringify(this.initOpt)) || [];
    },
    onRadioChange(questionIndex, answerIndex) {
      this.questionList.forEach((qItem, index) => {
        qItem.answerlist.forEach((aItem, idx) => {
          if (index === questionIndex) {
            aItem.checked = false;
            if (idx === answerIndex) {
              aItem.checked = true;
              qItem.selectedScore = aItem.qitemscore;
              qItem.checked = true;
            }
          }
        });
      });
      this.calcTotalScore();
      this.sendCtrlOpt();
    },
    calcTotalScore() {
      let totalScore = 0;
      this.questionList.forEach((qItem, index) => {
        totalScore += Number(qItem.selectedScore);
      });
      this.totalScore = String(totalScore);
    },
    getSelectedOpts() {
      let notAnsweredQCode = [];
      let cloneQuestionList = JSON.parse(JSON.stringify(this.questionList));
      cloneQuestionList.forEach((qItem, index) => {
        qItem.qcode = qItem.qgwcode
        if (qItem.checked) {
          qItem.answerlist.forEach((aItem, idx) => {
            if (aItem.checked) {
              qItem.qacode = aItem.qitemcode;
              qItem.qaname = aItem.qitemname;
              qItem.qamemo = "";
            }
          });
          Object.keys(qItem).forEach(keyName => {
            if (
              keyName !== "qcode" &&
              keyName !== "qname" &&
              keyName !== "qacode" &&
              keyName !== "qaname" &&
              keyName !== "qamemo"
            ) {
              delete qItem[keyName];
            }
          });
        } else {
          notAnsweredQCode.push(qItem.qcode)
          cloneQuestionList[index] = {};
        }
      });
      return {
        notAnsweredQCode:notAnsweredQCode,
        totalScore: this.totalScore,
        selectedData: cloneQuestionList
      };
    },
    sendCtrlOpt() {
      let selectedData = this.getSelectedOpts();
      this.$emit("change", selectedData);
    },
    /**
     * 当调用此方法时，返回组件当前值
     */
    getCurrentValue() {
      return {
        controlKey: this.controlKey,
        controlValue: this.answerSelectedItems
      };
    },
    // 组件参数校验方法
    vaildData() {
      var validflag = this.checkNotEmpty();
      if (validflag) validflag = this.checkValid();
      return validflag;
    },
    checkNotEmpty() {
      let resultArr = [];
      if (this.required) {
        for (let index = 0; index < this.questionList.length; index++) {
          if (ObjectUtil.isEmptyObject(this.answerSelectedItems[index])) {
            this.$set(
              this.questionList[index],
              "validateErrorMessage",
              this.questionList[index].title + "答案不能为空！"
            );
            resultArr.push(false);
          }
        }
      }
      return resultArr.length > 0 ? false : true;
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
