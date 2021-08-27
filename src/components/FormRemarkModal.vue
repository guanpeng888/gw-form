<template>
  <div class="tips-wrap-css">
    <!-- <a class="tips-anchor-css" @click="doModal" :style="'width:'+labelWidth" v-if="labelName && labelVisible">{{labelName}}</a> -->
    <Modal
      :title="modalTitle"
      :value="isShowModal"
      :width="760"
      :mask-closable="false"
      @on-cancel="closeModal"
    >
      <div class="content-wrap-css">
        <div v-html="initValue"></div>
      </div>
      <div slot="footer" class="ui-text-right">
        <Button type="primary" @click="closeModal">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import ConstantTipXml from "@/zx/bizconstants/ConstantTipXml.js";
export default {
  name: "ShowListFieldDetailModal",
  props:{
    labelName: {
      type: String,
      default: "填表说明"
    },
    labelWidth: {
      type: String,
      default: "auto"
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    tipsKeyName:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isShowModal: false,
      initValue: {},
      modalTitle:""
    };
  },
  methods: {
    doModal() {
      this.isShowModal = true;
      this.modalTitle = ConstantTipXml.formRemark[this.tipsKeyName].name || this.labelName;
      this.initValue = ConstantTipXml.formRemark[this.tipsKeyName].content;
    },
    closeModal(){
      this.isShowModal = false;
      this.$emit('visible-change',this.isShowModal)
    }
  },
  created() {
  }
};
</script>

<style scoped>
.tips-wrap-css{
  display: inline;
}
.tips-anchor-css{
  font-size: 14px;
  font-weight: 600;
}
.content-wrap-css{
  width: 100%;
  padding: 0 50px 20px;
  max-height: 680px;
  overflow-y: auto;
  font-size: 14px;
}
.tips-wrap-css >>> .ivu-modal-wrap .ivu-modal-body{
  padding: 0 !important;
}
</style>
