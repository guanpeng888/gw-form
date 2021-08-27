<template>
  <div class="print-form-panel-css">
    <div class="header-button-group-css" style="text-align:right" v-if="isShowPrintBtn">
      <Button type="primary" @click="printForm">打印</Button>
    </div>
    <div :id="printId">
        <slot name='printForm'></slot>
    </div>
  </div>
</template>

<script>
// import ObjectUtil from "@/utils/ObjectUtil.js";
import HtmlDomUtil from '@/utils/HtmlDomUtil'
export default {
  name: "GwPrint",
  props:{
    formStyle: {
      type: String,
      default: ""
    },
    isShowPrintBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      printId: 'gw_'+HtmlDomUtil.randomId()
    };
  },
  methods: {
    printForm(){
      this.$printJS({
          printable: this.printId,
          type: 'html',
          style: this.formStyle,
          scanStyles: false
        });
    }
  }
};
</script>

<style scoped>
</style>
