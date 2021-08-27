<template>
<!-- 血型组件  -->
  <div class="bloodtype-item-css">
    <label
      class="form-item-label-css"
      :style="'width:'+labelWidth"
      v-if="labelName && labelVisible"
    >
      <i v-if="required" class="required-tag-css">*</i> {{labelName}}
    </label>
    <div class="form-item-css">
      <div>
        <BizRadio
          :labelName="'血型:'"
          :labelVisible="false"
          :labelWidth="'auto'"
          :required="required"
          :readonly="readonly"
          :dictOpts="dictOpts_bloodtype"
          :bizOptKey="bizOptKey_bloodtype"
          v-model="bloodType"
          @change="sendCtrlvalue"
        ></BizRadio>
        <i class="chequer-break-css">/</i>
        <BizRadio
          :labelName="'RH:'"
          :labelWidth="'auto'"
          :readonly="readonly"
          :required="required"
          :dictOpts="dictOpts_bloodrhcode"
          :bizOptKey="bizOptKey_bloodrhtype"
          v-model="bloodRHType"
          @change="sendCtrlvalue"
        ></BizRadio>
      </div>
      <div class="chequer-list-css right-center-css">
        <span class="chequer-item-css">{{bloodType[bizOptKey_bloodtype.bizoptcode]}}</span>
        <i class="chequer-break-css">/</i>
        <span class="chequer-item-css">{{bloodRHType[bizOptKey_bloodrhtype.bizoptcode]}}</span>
      </div>
      <transition name="fade">
          <p v-if="validateErrorMessage" class="warning-text-css">{{validateErrorMessage}}</p>
        </transition>
    </div>
  </div>
</template>

<script>
import ObjectUtil from "@/utils/ObjectUtil.js"
import BizRadio from "@/components/BizRadio.vue";
import SquareList from "@/components/SquareList.vue";

export default {
  name: "BloodType",
  components: {
    BizRadio,
    SquareList
  },
  data() {
    return {
      bloodType: {},
      bloodRHType: {},
      radioSelectedItem:{},
      dictOpts_bloodtype: [],
      dictOpts_bloodrhcode: [],
      bizOptKey_bloodtype: {
        bizoptcode: this.bizOptKey.abotypecode,
        bizoptname: this.bizOptKey.abotypename
      },
      bizOptKey_bloodrhtype: {
        bizoptcode: this.bizOptKey.rhtypecode,
        bizoptname: this.bizOptKey.rhtypename
      },
      validateErrorMessage:""
    };
  },
  model: {
    prop: "initOpt",
    event: "change"
  },
  props: {
    initOpt: {
      type: Object,
      default: function(){
        return {}
      }
    },
    labelName: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String,
      default: "120px"
    },
    inputWidth: {
      type: [String, Number],
      default: "200px"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    dictBloodOpts:{
      type:Array,
      default:function(){
        return []
      }
    },
    dictBloodRhOpts:{
      type:Array,
      default:function(){
        return []
      }
    },
    controlKey: {
      type: String,
      default: ""
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    bizOptKey:{
      type: Object,
      default: () => {
        return {
           abotypecode: "bloodtype",
           abotypename:"bloodtypename",
           rhtypecode:"bloodrhcode",
           rhtypename:"bloodrhname"
        }
      }
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    initOpt(newVal, oldVal) {
      this.initCtrl();
    }
  },
  methods: {
    initCtrl() {      
      this.dictOpts_bloodtype = JSON.parse(JSON.stringify(this.dictBloodOpts)) || [];
      this.dictOpts_bloodrhcode = JSON.parse(JSON.stringify(this.dictBloodRhOpts)) || [];
      this.radioSelectedItem = JSON.parse(JSON.stringify(this.initOpt)) || {};

      // this.$set(this.bloodType , this.bizOptKey.abotypecode , this.radioSelectedItem[this.bizOptKey.abotypecode] || "");
      // this.$set(this.bloodType , this.bizOptKey.abotypename , this.radioSelectedItem[this.bizOptKey.abotypename] || "")
      // this.$set(this.bloodRHType , this.bizOptKey.rhtypecode , this.radioSelectedItem[this.bizOptKey.rhtypecode] || "")
      // this.$set(this.bloodRHType , this.bizOptKey.rhtypename , this.radioSelectedItem[this.bizOptKey.rhtypename] || "")

      this.bloodType = {
        [this.bizOptKey.abotypecode]: this.radioSelectedItem[this.bizOptKey.abotypecode] || "",
        [this.bizOptKey.abotypename]: this.radioSelectedItem[this.bizOptKey.abotypename] || ""
      }
      this.bloodRHType = {
        [this.bizOptKey.rhtypecode]: this.radioSelectedItem[this.bizOptKey.rhtypecode] || "",
        [this.bizOptKey.rhtypename]: this.radioSelectedItem[this.bizOptKey.rhtypename] || ""
      }

    },
    sendCtrlvalue() {
      this.radioSelectedItem = {...this.bloodType , ...this.bloodRHType};
      this.$emit("change", this.radioSelectedItem);
    },
    /**
     * 当调用此方法时，返回组件当前值
     */
    getCurrentValue() {
      return { controlKey: this.controlKey, controlValue: this.radioSelectedItem };
    },
    // 组件参数校验方法
    vaildData() {
      var validflag = this.checkNotEmpty();
      if (validflag) validflag = this.checkValid();
      return validflag;
    },
    checkNotEmpty() {
      if (this.required) {
        if(ObjectUtil.isEmptyObject(this.radioSelectedItem)){
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
  created() {
    this.initCtrl();
  }
};
</script>

<style scoped>
</style>
