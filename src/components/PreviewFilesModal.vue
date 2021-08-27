<template>
  <div>
    <Modal
      :title="modalTitle"
      :value="isShowModal"
      :width="1200"
      :mask-closable="false"
      :footer-hide="true"
      :fullscreen="true"
      @on-cancel="closeModal">
      <div class="file-container-css">
        <!-- 图片文件预览容器 -->
        <div v-if="fileType === '3'" class="file-image-wrap-css">
          <embed :src="fileSrc" :alt="fileAlt" :height="contentHeight" />
        </div>

        <!-- pdf预览 -->
        <div v-if="fileType === '5'" class="file-image-wrap-css">
          <embed :src="fileSrc" :alt="fileAlt" :width="contentWidth" :height="contentHeight" />
        </div>

        <!-- 心电图预览容器 -->
        <div v-if="fileType === '1'" class="file-Ecg-wrap-css">
            <EcgdataDxModalView
              ref="ecgdataDxView"
              :ecgdataid="curEcgInspectionData.ecgdataid"
              :ecgInspectionData="curEcgInspectionData"
              :leadType="curEcgInspectionData.leadType"
              :isExamine="isExamine"
              @on-save-success="onSaveSuccess"
              @visiable-modal="closeModal"
            ></EcgdataDxModalView>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import EcgParamsPanel from "@/zx/bizcomponents/ecg/ecgWork/EcgParamsPanel";
import EcgdataDxModalView from "@/zx/bizcomponents/ecg/EcgdataDxModalView";
import Constant from "@/zx/bizconstants/Constant";
export default {
  name: "PreviewFilesModal",
  components: {
    EcgParamsPanel,
    EcgdataDxModalView
  },
  data() {
    return {
      fileSrc: "",
      fileAlt: "",
      modalTitle: "",
      fileType: 1,
      isShowModal: false,
      ecgDataWorkSize: {
        wrapWidth: window.outerWidth - 32,
        wrapHeight: window.innerHeight - 132,
        canvasHeight: 700
      },
      windowClientHeight: $(window).height(),
      contentWidth: "",
      contentHeight: "",
      ecgdatas: {},
      ecgDataInfo: {},
      isAI_SPECIAL_VERSION:false,
      ecgDataWorkloading: true,
      checkedResult: {
        sympsdesc: '',
        interpretation: '',
        positiveflag: '20000'  //  心电图诊断结果（10000=阳性；20000=阴性）
      },
      ecgCheckRule: {
        interpretation: [
          { required: true, message: this.$t('i.ecgdataInfoCounselor.valid.sugcontNotNull'), trigger: 'blur' },
          { type: 'string', max: 2048, message: this.$t('i.valid.valid.maxLen'), trigger: 'blur' }
        ]
      },
      curEcgInspectionData:{}
    };
  },
  methods: {
    transferData(params) {
      var inspectionfileItem = (params && params.qaitem && params.qaitem.inspectionfile && params.qaitem.inspectionfile[0]) || {};
      this.fileType = inspectionfileItem.filetypecode || 1;
      this.modalTitle = params.inspectionindexname;
      if (
        inspectionfileItem.filecontent &&
        inspectionfileItem.filecontent.indexOf(";base64") < 0
      ) {
        if (this.fileType === "3") {
          // 图片格式
          this.fileSrc =
            "data:image/jpg;base64," + inspectionfileItem.filecontent;
        } else if (this.fileType === "5") {
          // pdf格式
          this.initModalSize();
          this.fileSrc =
            "data:application/pdf;base64," + inspectionfileItem.filecontent;
        }
      } else {
        this.fileSrc = inspectionfileItem.filecontent;
      }
  
      // 设置12导心电数据
      if (this.fileType === "1" && inspectionfileItem.filecontent) {
        var filecontent = JSON.parse(inspectionfileItem.filecontent);
        if (1001 === params.leadType) {
          //  如果是单导，则将心电数据数组，转成12导所需的MAP格式
          filecontent.ecgData = { I: filecontent.ecgData };
        }
        let sampleRate = filecontent.sampleRate;
        this.curEcgInspectionData = this.set12LeadEcgData(params, filecontent)
      }
    },
    set12LeadEcgData(param, filecontent) {
      let ecgData = {
        qaitem: param.qaitem,
        leadType: param.leadType,
        registcode: param.registcode || "",
        inspectionno: param.inspectionno || param.id,
        hospcode: param.hospcode || "",
        hospname: param.hospname || "",
        deptcode: param.responsbdeptcode || "",
        deptname: param.responsbdeptname || "",
        applyflag: param.applyflag || 10000,
        applyno: param.applyno || "1542183799367",
        hospbedno: param.hospbedno || "",
        ecgdataid: param.ecgdataid || param.id,
        ecgdatamesubitemcode: param.leadType,
        inspectdur: param.inspectdur || 10,
        ecgfile: param.ecgfile,
        ssid: param.ssid || "",
        ssname: param.ssname || "",
        age: param.age || "",
        gendercode: param.gendercode || "",
        gendername: param.gendername || "",
        datatype: param.datatype || 0,
        datatypedesc: param.datatypedesc || "",
        meitemcode: param.meitemcode || param.leadType,
        meitemname: param.meitemname || param.inspectionsubitemname,
        positiveflag: param.positiveflag || param.doctordxresultcode,
        priority: param.priority || 10000,
        prioritydesc: param.prioritydesc || "",
        detecttime: param.detecttime || "",
        detectdur: param.detectdur,
        inspecthospcode: param.inspectionhospcode || "",
        inspectdeptcode: param.inspectdeptcode || "",
        inspecttime: param.inspectiontime || "",
        validflag: param.validflag,
        sampleRate: filecontent.sampleRate,
        aiflag: param.aiflag || 10003,
        aitime: param.aitime || "",
        aiecgsymps: param.aiecgsymps || '["23"]',
        aiecgsympsarray: JSON.stringify(param.aiecgsympsarray) || JSON.stringify(param.aidxresult), //aidxresult
        airesult: param.aidxresult,
        deviceInterpretation: param.deviceInterpretation || "",
        aiEcgInterpretation: param.aiEcgInterpretation || {
          p_wave: [],
          t_wave: [],
          st_segment: [],
          p_waveInterpretation: "",
          t_waveInterpretation: "",
          st_segmentInterpretation: "",
          interpretationName: {
            w7: "肺型",
            w8: "二尖瓣型",
            w9: "宽大",
            w10: "间期延长",
            w1: "异常",
            w2: "抬高",
            w3: "压低",
            w4: "低平",
            w5: "高尖",
            w6: "双向"
          },
          interpretationCode: '{"p_wave":[],"t_wave":[],"st_segment":[]}'
        },
        dxflag: param.dxflag || 10003,
        dxtime: param.dxtime || "",
        dxflagdesc: param.dxflagdesc || "",
        dxhospcode: param.dxhospcode || "",
        dxdeptcode: param.dxdeptcode || "",
        doctordxid: param.doctordxid || "",
        doctordxname: param.doctordxname || "",
        dxecgsymps: param.dxecgsymps || "[]",
        dxecgsympsarray: param.dxecgsympsarray || JSON.stringify(param.doctordxresult), //doctordxresult
        dxEcgSympsDesc: param.dxEcgSympsDesc || param.doctordxresultmemo,
        dxresult: param.dxresult || param.doctordxresultmemo,
        verfflag: param.verfflag || 10001,
        verftime: param.verftime || "",
        verfflagdesc: param.verfflagdesc || "待审",
        verfhospcode: param.verfhospcode || "",
        verfdeptcode: param.verfdeptcode || "",
        doctorverfid: param.doctorverfid || "",
        doctorverfname: param.doctorverfname || "",
        verfecgsymps: param.verfecgsymps || "",
        verfecgsympsarray: param.verfecgsympsarray || "[]",
        verfEcgSympsDesc: param.verfEcgSympsDesc || param.doctordxresultmemo,
        verfresult: param.verfresult || "",
        operation: param.operation || "审核"
      };
      return ecgData;
    },
    doModal(params, operateFlag){
      this.isShowModal = true;
      switch (operateFlag) {
        case Constant.OPERATE_FLAG.EDIT:
          this.isExamine = true;
          break;
        case Constant.OPERATE_FLAG.VIEW:
          this.isExamine = false;
          break;
        default:
          break;
      }
      this.transferData(params);
    },
    initModalSize() {
      let winWidth = window.outerWidth;
      let winHeight = window.innerHeight;
      this.contentWidth = winWidth - 32 || "600px";
      this.contentHeight = winHeight - 72 || "680px";
    },
    closeModal(param) {
      this.isShowModal = false;
      this.$emit("on-visible-change", this.isShowModal);
    },
    onSaveSuccess() {
      this.$emit("on-save-success");
      this.closeModal()
    }
  },
  created() {

  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
.file-container-css {
  width: 100%;
  height: 100%;
  /* overflow: auto; */
}
.file-container-css .file-image-wrap-css {
  width: 100%;
  display: block;
  font-size: 0;
  text-align: center;
}
.file-container-css .file-image-wrap-css embed {
  min-width: 800;
}

.patientInfoPanelBody {
  // padding-top:5px;
  background: #f3f3f7;
  text-align: left;
  /*margin:10px 0 5px 1px;*/
  /*height:40px;*/
  /*line-height:40px;*/
  ul {
    li {
      float: left;
      width: 265px;
      span {
        font-size: 16px;
      }
      &.w190 {
        width: 190px;
        span {
          &:nth-child(1) {
            display: inline-block;
            width: 65px;
            text-align: right;
          }
        }
      }
      // &:nth-last-child(1){
      //   width:90%;
      //   margin-left:4px;
      // }
      // &:nth-child(1){
      //   width:50px;
      // }
      span {
        &:nth-child(1) {
          display: inline-block;
          width: 85px;
          text-align: right;
        }
      }
    }
  }
}
.diagnosis-title {
  .ivu-card-head {
    paddind: 0 !important;
  }
}
.diagnosis-title {
  .ivu-card-body {
    padding: 0 !important;
  }
}
// .commonly-used{
//   padding:3px 0 3px 10px;
//   font-size:15px;
//   font-weight:bold;
//   background: #F0F0F0;
// }
.ivu-form-item {
  margin-bottom: 2px;
}
#giveUpDialog {
  z-index: 1001;
}
#giveUpDialog .vertical-center-modal {
  z-index: 1001;
}
.ai {
  margin-bottom: 5px;
  overflow: hidden;
}
.ai-body {
  border: 1px solid #dedede;
  max-height: 50px;
  overflow: auto;
  border-radius: 3px;
  padding: 5px;
  color: #2284e6;
  font-weight: bold;
  font-size: 14px;
}
.ai .ivu-alert {
  margin: 0;
}

.content-tabs-top {
  border: none;
}
.aiResultTit {
  // padding: 3px 0 3px 10px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: bold;
  background: #f0f0f0;
  height: 24px;
  line-height: 24px;
  margin-top: 5px;
  border: 1px solid rgb(222, 222, 222);
  border-bottom: none;
}
.vertical-label {
  width: 20px;
  margin: 0 auto;
  line-height: 24px;
  font-size: 20px;
}
</style>