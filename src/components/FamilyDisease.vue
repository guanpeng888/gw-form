<template>
<!-- 家族史组件 -->
  <div class="disefamily-style">
    <div class="member-css" v-for="(item,idx) in familyMembers" :key="(item.familyrelationcode + idx)">
      <label v-if="!readonly" @click="onMenberClick(idx)" :class="[(curMember === idx) ? 'member-checked-css':'']">{{item.familyrelationname}}：</label>
      <label v-if="readonly" >{{item.familyrelationname}}：</label>
      <SquareList :bizOptKey="bizOptKey_disefamily" :squareNum="item.squareNum" squareListWidth="auto" v-model="item.familydisedetail"></SquareList>
      <transition name="fade">
        <span v-if="item.validateErrorMessage" class="warning-text-css">{{item.validateErrorMessage}}</span>
      </transition>
    </div>
    <BizCheckboxWithMemo
      :showSquare="false"
      :dictOpts="dict_disehistory"
      :squareNum="0"
      :initOpts="initOpts_disefamily"
      :readonly="readonly"
      :bizOptKey="bizOptKey_disefamily"
      @change="getDisefamilyData"
    ></BizCheckboxWithMemo>
  </div>
</template>

<script>
import SquareList from "@/components/SquareList.vue";
import BizCheckboxWithMemo from "@/components/BizCheckboxWithMemo.vue";
export default {
  name: "FamilyDisease",
  components: {
    SquareList,
    BizCheckboxWithMemo
  },
  model: {
    prop: "initOpts",
    event: "change"
  },
  data() {
    return {
      curMember: 0,
      initOpts_disefamily: [],
      dict_disehistory: [],
      bizOptKey_disefamily: {
        bizoptcode: "familydisecode",
        bizoptname: "familydisename",
        bizoptmemo: "familydisememo"
      },
      familyMembers:[]
    };
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
    initOpts: {
      type: Array,
      default: function() {
        return [];
      }
    },
    dictOpts:{
      type:Array,
      default: () => {
        return [];
      }
    },
    bizOptKey: {
      type: Array,
      default: () => {
        return [
          {
            familyrelationcode: "1",
            familyrelationname: "父亲",
            familydisedetail: [],
            squareNum: 2,
            validateErrorMessage:""
          },
          {
            familyrelationcode: "2",
            familyrelationname: "母亲",
            familydisedetail: [],
            squareNum: 2,
            validateErrorMessage:""
          },
          {
            familyrelationcode: "3",
            familyrelationname: "兄弟姐妹",
            familydisedetail: [],
            squareNum: 2,
            validateErrorMessage:""
          },
          {
            familyrelationcode: "4",
            familyrelationname: "子女",
            familydisedetail: [],
            squareNum: 2,
            validateErrorMessage:""
          }
        ];
      }
    },
    itemKeyName:{
      type: String,
      default: "familyrelationcode"
    },
    itemValueName:{
      type: String,
      default: "familyrelationname"
    },
    itemMemoName:{
      type: String,
      default: ""
    },
    readonly:{
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  watch:{
    initOpts(newVal, oldVal) {
      this.intiCtrl();
    }
  },
  methods: {
    intiCtrl() {
      this.familyMembers = JSON.parse(JSON.stringify(this.bizOptKey))
      this.squareNum = this.familyMembers[this.curMember].squareNum;
      this.dict_disehistory = JSON.parse(JSON.stringify(this.dictOpts)) || [];


      //回显处理
      let cloneInitOpts = JSON.parse(JSON.stringify(this.initOpts)) || [];
      // 将初始化数据与组件结构数据的familyrelationcode 字段进行比对，满足条件则将该条记录添加进对应的家庭成员的疾病数组(familydisedetail)
      this.familyMembers.forEach((memberItem , index) => {
        this.familyMembers[index].familydisedetail = [];
        cloneInitOpts.forEach(item => {
          if(item[this.itemKeyName] === memberItem['familyrelationcode']){
            this.familyMembers[index].familydisedetail = item['familydisedetail'] || [];
            // 避免重复添加
            // if(this.familyMembers[index].familydisedetail.indexOf(item) < 0){
            //   this.familyMembers[index].familydisedetail.push(item);
            // }
          }
        })
      })
      this.initOpts_disefamily = this.familyMembers[this.curMember].familydisedetail;
    },
    onMenberClick(idx) {
      this.curMember = idx;
      this.squareNum = this.familyMembers[idx].squareNum;
      this.initOpts_disefamily = this.familyMembers[idx].familydisedetail;
      this.sendCtrlOpts()
    },
    getDisefamilyData(result) {
      this.familyMembers[this.curMember].familydisedetail = result;
      this.sendCtrlOpts()
    },
    sendCtrlOpts() {
      let selectedAllData = JSON.parse(JSON.stringify(this.familyMembers));
      selectedAllData.forEach(item => {
        Object.keys(item).forEach(keyName => {
          if(keyName === 'squareNum' ||  keyName === 'validateErrorMessage'){
              delete(item[keyName])
          }
        })
      })
      this.$emit("change",selectedAllData);
    },
    vaildData() {
      var validflag = this.checkNotEmpty();
      if (validflag && this.initCtrlValue) validflag = this.checkValid();
      return validflag;
    },
    checkNotEmpty() {
      let isEmptyFlag = [];
      if (this.required) {
        for (let index = 0; index < this.familyMembers.length; index++) {
          this.familyMembers[index].validateErrorMessage = "";
          if(this.familyMembers[index].familydisedetail.length === 0){
            isEmptyFlag.push(false);
            if (this.labelName == "") {
              this.familyMembers[index].validateErrorMessage = "字段不能为空！";
            } else {
              this.familyMembers[index].validateErrorMessage = this.labelName + this.familyMembers[index].familyrelationname + "疾病不能为空！";
            }
          }
        }
      }
      return isEmptyFlag.indexOf(false) < 0 ? true : false;
    },
    checkValid() {
      // this.validateErrorMessage = "";
      return true;
    }
  },
  created() {
    this.intiCtrl();
  }
};
</script>

<style scoped>

</style>
