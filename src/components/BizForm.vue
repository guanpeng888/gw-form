<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import ObjectUtil from "@/utils/ObjectUtil.js";
export default {
  name: "BizForm",
  data() {
    return {
      resultArr: [],
      beforeUpdateValue: {},
      componentName: [
        "InputOfIdCard",
        "InputOfPhone",
        "InputOfmail",
        "InputOfText",
        "InputOfNumber",
        "InputOfDate",
        "InputOfGroup",
        "BizSelect",
        "BizRadio",
        "BizRadioWithMemo",
        "BizRadioWithMemoOfModifier",
        "BizCheckbox",
        "BizCheckboxWithMemo",
        "BizCheckboxWithMemoOfModifier",
        "BloodType",
        "BloodPressure",
        "FamilyDisease",
        "SelectDoctorComponent",
        "ChooseAddress",
        "AuxiliaryInspectOfDefecate",
        "AuxiliaryInspectOfHepatitisB",
        "AuxiliaryInspectOfECG",
        "AuxiliaryInspectOfXray",
        "AuxiliaryInspectOfBUltrasound",
        "AuxiliaryInspectOfCerabn",
        "ChooseResident",
        "ChooseDoctor",
        "ChooseNetDoctor",
        "ChooseAppID",
        "ChooseZoning",
        "ChooseFamily",
        "ChooseDoctorTeam",
        "ChooseHospital",
        "BizSelectWithMultiple",
        "BizTextarea",
        "ChooseDoctorTeam",
        "InputOfGroupWithNumber"
      ]
    };
  },
  methods: {
    validate(vueNode, param) {
      let childNode = vueNode || this.$children;
      let resultArr = param && param.length > 0 ? param : [];
      for (let i = 0; i < childNode.length; i++) {
        let node = childNode[i];
        if (this.componentName.indexOf(node.$vnode.componentOptions.tag) >= 0) {
          resultArr.push(node.vaildData());
        }
        if (node.$children.length > 0) {
          this.validate(node.$children, resultArr);
        }
      }
      return resultArr.indexOf(false) > -1 ? false : true;
    },
    getControlInitValue() {
      let oldParams = {};
      Array.from(this.$validateRuleSet.values()).forEach(value => {
        let curControlOpt = value.getCurrentValue();
        if (ObjectUtil.isObject(curControlOpt.controlValue)) {
          Object.keys(curControlOpt.controlValue).forEach(keyName => {
            oldParams[keyName] = curControlOpt.controlValue[keyName];
          });
        } else {
          oldParams[curControlOpt.controlKey] = curControlOpt.controlValue;
        }
      });
      return oldParams;
    }
  }
};
</script>

<style scoped>
</style>
