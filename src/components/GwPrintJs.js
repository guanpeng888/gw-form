export default {
    formStyle() {
        return `

    @media print {
      body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
        margin: 0;
        padding: 0;
        font-size: 14px;
        font-family:"宋体"!important;
        color: #000;
      }
      body{
        -webkit-print-color-adjust: exact;
        font-family:"宋体"!important;
      }

      @page{
        size:a4;
        margin:45px;
        padding:0;
        font-family:"宋体"!important;
      }
      .height1260{
        height: 1260px;
        position: relative;
        overflow:hidden
      }
      .height1000{
        height: 1000px;
        position: relative;
        overflow:hidden
      }

      li{
        list-style:none
      }
      i {
        font-style: normal!important;
      }

      .ui-text-center {
        text-align: center;
      }
      .text-align-left{
        text-align: left;
      }


      /************************************** 建档封面**********************************************/
      .health-record-cover ul li{
        line-height: 40px
      }
      .health-record-cover .top-panel{
        padding-left:200px;

      }
      .health-record-cover .bottom-panel{
        padding-left:250px;
        margin-top:100px

      }



    /**************************************** 老年人中医********************************************/
    .question-item-css .answer-item-css{
        position: relative;
        cursor: pointer;
    }
    .question-item-css .answer-item-score-css{
        display: inline-block;
        padding: 6px 0;
        position: relative;
    }
    .question-item-css .answer-item-checked-css:after{
        width: 20px;
        height: 20px;
        display: block;
        content: "";
        background-image: url('../../../assets/img/icon_tick.png');
        background-size: 100%;
        background-color: transparent;
        position: absolute;
        left: 50%;
        top: 8px;
        margin-left: -10px;
    }
    .diagnostic-text-css{
        width: 100%;
        padding: 6px;
        text-align: left;
        line-height: 20px;
    }


    /**************************************** 职业病危害因素接触式********************************************/
    .profession-wrap-css{
        text-align: left;
        position: relative;
    }
    .profession-wrap-css .profession-text-wrap-css{
        display: inline-block;
        position: absolute;
        top: 3px;
        left: 100px;
    }




    /**************************************** 毒物种类********************************************/
    .ToxicSpecies-list-wrap-css{
        width: 100%;
        font-size: 0;
        padding: 8px 0;
    }
    .ToxicSpecies-list-wrap-css .radio-list-wrap-style{
        width: calc(100% - 200px);
        display: inline-block;
    }
    .ToxicSpecies-list-wrap-css .ToxicSpecies-list-css{
        width: calc(100% - 72px);
        display: inline-block;
        vertical-align: top;
    }




    /**************************************** td包table 里面的table样式修改********************************************/
    .reset-table-cell-css{
        border:none
    }
    .reset-table-cell-css tr td:nth-child(1){
        border-left:none
    }
    .reset-table-cell-css tr:nth-child(1) td{
        border-top:none
    }
    .reset-table-cell-css tr:last-child td{
        border-bottom:none
    }

    /**************************************** td 内部分两块内容展示********************************************/
    .td-left-side-item{
        float:left;
        width:48%;
        border-right:1px solid #8b8b8b
    }
    .td-right-side-item{
        float:left;
        width:48%
    }

    /**************************************** 体检登记套餐样式 ********************************************/
    .AuxiliaryInspect-wrap-css .AuxiliaryInspect-item-css{
      margin: 0!important;
      border: none!important;
      padding: 0!important;
    }

    .AuxiliaryInspect-wrap-css .form-item-wrap-css{
      margin:0!important;
    }
    
    #inspection-register-print-wrap .inspection-register-title-css{
        width: 100%;
        font-size: 24px;
        font-weight: 500;
        text-align: center;
        padding-bottom: 10px;
      }
    #inspection-register-print-wrap .form-title-css {
    border-bottom: 1px solid #ddddd1;
    padding-bottom:10px;
    }
    #inspection-register-print-wrap .inspection-list-wrap-css {
    width: 100%;
    display: block;
    }
    #inspection-register-print-wrap .inspection-list-wrap-css .inspection-list-title-css {
    display: block;
    font-size: 15px;
    padding: 0 10px;
    line-height: 32px;
    background-color: #dddddd;
    }
    #inspection-register-print-wrap .inspection-list-wrap-css .inspection-list-css {
    padding-bottom: 10px;
    }
    

    /****************************************会诊:医疗机构及医生组件********************************************/



    .hz-list-wrap-css {
        width: 100%;
        font-size: 0;
        position: relative;
      }
      .hz-list-css {
        width: calc(100% - 26px);
        display: inline-block;
        position: relative;
      }
      /* .hz-list-css:after{
          width: 1px;
          height: 100%;
          display: block;
          content: "";
          background-color: #000000;
          position: absolute;
          left: 240px;
          top: 0;
      } */
      .hz-list-title-css {
        font-size: 14px;
      }
      .hz-list-item-css {
        width: 100%;
        font-size: 0;
        vertical-align: middle;
        position: relative;
        border-bottom: 1px solid #cccccc;
      }
      .hz-hosp-css {
        font-size: 14px;
        padding-right: 15px;
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        padding-bottom: 5px;
      }
      .hz-doctor-list-css {
        width: calc(100% - 243px);
        font-size: 14px;
        display: flex;
        flex: 1;
        padding-left: 10px;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        padding-bottom: 5px;
        border-left: 1px solid #000000;
      }
      .hz-doctor-item-css {
        display: inline-block;
        padding-right: 20px;
        position: relative;
      }
      .hz-doctor-item-css .doctor-del-icon {
        position: absolute;
        right: 0;
        top: 0;
      }













/**************************************** gw-formpanel.lees********************************************/
.form-panel-css {
    width: 860px;
    margin: 0 auto;
    position: relative;
    font-family: "宋体";
    font-size: 14px;
  }
  .form-header-css {
    width: 100%;
    position: relative;
    margin-bottom: 10px;
  }
  .form-header-css .form-title-css {
    width: 100%;
    font-size:20px;
    text-align: center;
    font-weight: 600;
    margin-bottom:15px;
  }
  .form-header-css .right-center-css {
    top: auto;
    bottom: 0;
    transform: none;
  }
  .form-table-css {
    width        : 100%;
    text-align   : center;
    border       : 1px solid #d4d4d4;
    border-bottom: 0;
    border-right : 0;
  }
  
  .form-table-css tr {
    width: 100%;
  }
  
  .form-table-css th {
    min-width  : 60px;
    font-size  : 14px;
    position   : relative;
    line-height: 36px;
    border     : 1px solid #d4d4d4;
    background : #f8f8f9;
    border-left: 0;
    border-top : 0;
  }
  
  .form-table-css tr td {
    min-width  : 60px;
    font-size  : 12px;
    position   : relative;
    height     : 36px;
    border     : 1px solid #d4d4d4;
    border-left: 0;
    border-top : 0;
  }
  
  .form-table-css .text-left {
    text-align: left
  }
  
  .form-table-css .td-label-css {
    width: 130px
  }



  /**************************************** gw-component.lees********************************************/

  /* --------------------------iview样式重置 START--------------------------- */
  .p-l15{
      padding-left:15px;
  }

  .form-item-input-css .ivu-input ,
  .form-item-input-css .ivu-input-number,
  .checkbox-list-wrap-style .ivu-input,
  .radio-list-wrap-style .ivu-input,
  .detail-item-input-css .ivu-input,
  .form-item-input-css .ivu-select-single .ivu-select-selection,
  .form-item-input-css .ivu-select-single .ivu-select-selection,
  .form-item-input-css .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .form-item-input-css .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      height: 22px;
      line-height: 22px;
      border: none;
      box-shadow: none;
      border-radius: 0;
      border-bottom: 1px solid #dddee1;
    //   background-color: transparent;
      transition: none;
      outline: none;
  }
  .form-item-input-css .ivu-input-number-handler-wrap{
      display: none;
  }
  .form-item-input-css .ivu-input:focus,
  .form-item-input-css .ivu-input-number:focus,
  .radio-list-wrap-style .ivu-input:focus ,
  .checkbox-list-wrap-style .ivu-input:focus,
  .detail-item-input-css .ivu-input:focus {
      box-shadow: none;
  }
  .form-item-input-css .ivu-input-prefix,
  .form-item-input-css .ivu-input-suffix,
  .form-item-input-css .ivu-input-icon{
      width: 22px;
  }

  .form-item-input-css .ivu-input-prefix i,
  .form-item-input-css .ivu-input-suffix i,
  .form-item-input-css .ivu-input-icon,
  .radio-list-wrap-style .ivu-input-prefix i,
  .radio-list-wrap-style .ivu-input-suffix i,
  .radio-list-wrap-style .ivu-input-icon,
  .checkbox-list-wrap-style .ivu-input-prefix i,
  .checkbox-list-wrap-style .ivu-input-suffix i,
  .checkbox-list-wrap-style .ivu-input-icon,
  .detail-item-input-css .ivu-input-prefix i,
  .detail-item-input-css .ivu-input-suffix i,
  .detail-item-input-css .ivu-input-icon {
      line-height: 22px;
      height: 22px;
  }


  .checkbox-list-wrap-style .ivu-checkbox-wrapper+span,
  .checkbox-list-wrap-style .ivu-checkbox+span,
  .checkbox-list-wrap-style .ivu-checkbox-wrapper,
  .radio-list-wrap-style .ivu-radio-wrapper,
  .radio-list-wrap-style  span.ivu-radio+* {
      margin: 0;
  }

  .TextWithDate-list-wrap-css .ivu-btn,
  .TextWithDate-list-wrap-css .ivu-btn:active,
  .TextWithDate-list-wrap-css .ivu-btn:focus,
  .DrugList-wrap-css .ivu-btn,
  .DrugList-wrap-css .ivu-btn:active,
  .DrugList-wrap-css .ivu-btn:focus {
      padding: 0 5px;
      outline: none;
      border: none;
      box-shadow: none;
  }

  .TextWithDate-list-wrap-css .ivu-btn:hover,
  .DrugList-wrap-css .ivu-btn:hover{
      color: #333333;
      background-color: transparent;
  }

  // .ivu-tabs{
  //     overflow: visible;
  // }


  /* --------------------------iview样式重置 END--------------------------- */

  .required-tag-css {
      color: red;
  }

  .warning-text-css {
      color: #ff0000;
      text-align: left;
      font-size: 14px;
      position: absolute;
      left: 0;
      top: 100%;
  }

  .width80 {
    min-width: 80px !important;
  }
  .width150 {
    min-width: 150px !important;
  }


  /* .dangerous-warning-css {
      box-sizing: border-box;
      border: 1px solid #ff0000;
  } */


  /* 输入框样式 */

  .form-item-wrap-css {
      display: inline-block;
      font-size: 0;
      padding-left: 5px;
  }

  .form-item-label-css {
      text-align: right;
      font-size: 14px;
      line-height: 22px;
      display: inline-block;
  }

  .form-item-input-css {
      display: inline-block;
      font-size: 14px;
      position: relative;
  }

  .form-item-input-css>div {
      display: inline-block;
      position: relative;
  }

  .form-item-input-css>div .ivu-input-wrapper {
      display: inline-block;
  }

  .form-item-input-css>div .modifier-css {
      display: inline-block;
      font-size: 14px;
  }
  .form-item-textarea-css,
 .form-item-wrap-css {  
    display       : inline-block;
    font-size     : 0;
    padding-left  : 5px;
    vertical-align: middle;
    position: relative;
    }

  .form-item-textarea-css .valueText{
    width: 100%;
    display: inline-block;
    border-radius: 4px;
    padding: 4px 7px;
    font-size: 14px;
    line-height: 22px;
    box-sizing: border-box;
  }
  .form-item-ivu-input-css .valueText,
  .form-item-input-css .valueText{
     // min-width: 160px;
     width: 160px;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      text-align:center;
      // padding-left:7px;
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      white-space: nowrap;
      border-bottom: 1px solid #000000;
  }

  .form-item-input-css .ivu-select-selection,
  .form-item-input-css .ivu-input {
      border: none;
      border-radius: 0;
      outline: none;
      box-shadow: none;
      padding: 0 22px 0 7px;
      border-bottom: 1px solid #dcdee2;
  }
  .BloodPressure-item-input-css{
    width: 242px;
    display: inline-block;
    vertical-align: middle;
    border: none;
  }
  .form-item-textarea-css textarea.ivu-input{
    min-height: 60px;
  }

  /* SquareList组件样式 */

  .chequer-list-wrap-css,
  .chequer-list-css,
  .chequer-box-css {
      display: inline-block;
      font-size: 0;
      vertical-align: middle;
      position: relative;
  }

  .right-center-css {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
  }

  .chequer-list-wrap-css .form-item-label-css {
      text-align: right;
      font-size: 14px;
      font-weight: 900;
      display: inline-block;
      vertical-align: middle;
  }

  .chequer-list-css .chequer-item-css {
      width: 14px;
      height: 14px;
      font-size: 10px;
      display: inline-block;
      text-align: center;
      line-height: 14px;
      font-style: normal;
      border: 1px solid #000;
      margin: 0 2px;
      vertical-align: middle;
  }


  /* BizRadioWithMemo组件样式 */

  .checkbox-list-wrap-style,
  .radio-list-wrap-style {
      font-size: 0;
      text-align: left;
      display: block;
      position: relative;
      padding-left: 5px;
  }

  .checkbox-list-wrap-style .checkbox-list-style,
  .radio-list-wrap-style .radio-list-style {
      font-size: 0;
      text-align: left;
      display: inline-block;
  }

  .radio-list-wrap-style .radio-list-style {
      padding-right: 20px;
  }

  .checkbox-list-wrap-style .checkbox-list-style .form-item-label-css,
  .radio-list-wrap-style .radio-list-style .form-item-label-css {
      text-align: right;
      font-size: 14px;
      line-height: 22px;
      display: inline-block;
      vertical-align: middle;
  }

  .checkbox-list-wrap-style .checkbox-item-style,
  .radio-list-wrap-style .radio-item-style {
      font-size: 14px;
      display: inline-block;
      margin: 1px;
  }

  .checkbox-list-wrap-style .checkbox-item-style .form-item-wrap-css,
  .radio-list-wrap-style .radio-item-style .form-item-wrap-css {
      margin: 0
  }

  .radio-list-wrap-style .radio-item-style .TextWithDate-wrap-css {
      display: inline-block;
      vertical-align: middle;
  }

  .checkbox-list-wrap-style .checkbox-item-style .labelText,
  .radio-list-wrap-style .radio-item-style .labelText {
      padding: 0 6px;
      display: inline-block;
      vertical-align: middle;
  }

  .checkbox-list-wrap-style .checkbox-item-style .valueText,
  .radio-list-wrap-style .radio-item-style .valueText {
      min-width: 200px;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
      border-bottom: 1px solid #000000;
  }

  .checkbox-list-wrap-style .checkbox-item-style .ivu-checkbox,
  .radio-list-wrap-style .radio-item-style .ivu-radio {
      display: none;
  }

  .checkbox-list-wrap-style .checkbox-item-style .ivu-checkbox-wrapper-checked .labelText,
  .radio-list-wrap-style .radio-item-style .ivu-radio-wrapper-checked .labelText,
  .checkbox-list-wrap-style .checkbox-item-style .active-labelText,
  .radio-list-wrap-style .radio-item-style .active-labelText {
      background-color: #fff;
      color: #000;
  }

  .radio-list-wrap-style .chequer-list-css {
      display: inline-block;
      text-align: right;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
  }

  .checkbox-list-wrap-style .checkbox-list-style .checkbox-list-css,
  .radio-list-wrap-style .radio-list-style .radio-list-css {
      font-size: 0;
      line-height: 22px;
      display: inline-block;
      vertical-align: middle;
      position: relative;
  }

  .checkbox-list-wrap-style .checkbox-item-style .ivu-input-wrapper,
  .radio-list-wrap-style .radio-item-style .ivu-input-wrapper {
      width: auto;
  }

  .checkbox-list-wrap-style .checkbox-item-style .ivu-radio-wrapper,
  .radio-list-wrap-style .radio-item-style .ivu-radio-wrapper {
      margin-right: 0;
  }

  .TextWithDate-list-wrap-css,
  .TextWithDate-list-wrap-css .TextWithDate-list-css {
      display: inline-block;
      vertical-align: middle;
      font-size: 0;

  }
  .TextWithDate-list-wrap-css .TextWithDate-label-css {
      text-align: right;
      font-size: 14px;
      line-height: 22px;
      display: inline-block;
      vertical-align: middle;
  }

  .TextWithDate-item-css {
      display: block;
      position: relative;
      padding-top: 3px;
  }

  .icon-delete-css {
      color: #ff0000;
      position: absolute;
      right: -12px;
      top: -3px;
      z-index: 3;
      cursor: pointer;
  }

  .icon-add-btn-css {
      vertical-align: top;
      margin-left: 16px;
      cursor: pointer;
      margin-top: 3px;
  }

  .checkbox-list-wrap-style .checkbox-item-style  /deep/  .ivu-checkbox-wrapper,
  .TextWithDate-list-wrap-css .TextWithDate-item-css  /deep/  .form-item-css {
      margin-bottom: 0;
  }

  .TextWithDate-list-wrap-css  /deep/  .ivu-input,
  .TextWithDate-list-wrap-css  /deep/  .ivu-input-prefix i,
  .TextWithDate-list-wrap-css  /deep/  .ivu-input-suffix i {
      height: 22px;
      line-height: 22px;
  }



  .DrugList-wrap-css{
      width: 100%;
      text-align: left;
      font-size: 0;
  }
  .DrugList-wrap-css .DrugList-list-css{
      display: inline-block;
  }
  .DrugList-wrap-css .DrugList-list-css .DrugList-item-css{
      width: 100%;
      display: block;
      position: relative;
  }


  /* FamilyDisease组件样式 */

  .disefamily-style {
      width: 100%;
      position: relative;
      font-size: 0;
      padding: 0 0 4px;
  }

  .disefamily-style .chequer-list-css {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      top: 0;
      transform: none;
  }

  .disefamily-style .member-css {
      width: 50%;
      // padding: 4px 0;
      text-align: left;
      margin: 0;
      font-size: 14px;
      display: inline-block;
      box-sizing: border-box;
      position: relative;
  }

  .disefamily-style .member-css label {
      display: inline-block;
      vertical-align: middle;
      width: 72px;
      padding: 4px 0;
      text-align: right;
      cursor: pointer;
  }

  .disefamily-style .member-css .member-checked-css {
      background-color: #2d8cf0;
      color: #ffffff;
  }

  .disefamily-style .chequer-list-wrap-css .chequer-list-css {
      max-width: 630px;
      display: inline-block;
      font-size: 0;
  }

  .disefamily-style .checkbox-list-wrap-style {
      padding-right: 0 !important;
  }


  /* 格子列表样式 */

  .bloodtype-item-css .chequer-break-css,
  .chequer-list-css .chequer-break-css {
      display: inline-block;
      font-style: normal;
      font-size: 14px;
      line-height: 22px;
      color: #000;
      vertical-align: middle;
  }

  .chequer-list-wrap-css .chequer-list-css .form-item-input-css {
      margin-bottom: 0;
      vertical-align: middle;
  }

  .checkbox-list-wrap-style .chequer-list-css .chequer-box-css {
      margin: 8px 0
  }

  .checkbox-list-wrap-style .square-list-wrap-css {
      text-align: right;
  }

  .checkbox-list-wrap-style .square-list-wrap-css .chequer-box-css {
      margin: 0;
  }


  /* SquareOfFormCode组件样式 */

  .chequer-list-date-wrap-css .form-item-wrap-css {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 4;
  }

  .chequer-list-date-wrap-css .ivu-input-wrapper {
      width: 100% !important;
  }

  .chequer-list-date-wrap-css .ivu-input-wrapper .ivu-input {
      cursor: pointer;
      background-color: transparent;
      font-size: 0;
      border: none;
  }

  .chequer-list-date-wrap-css .ivu-input-wrapper .ivu-input:focus {
      box-shadow: none;
  }

  .chequer-list-date-wrap-css .ivu-input-wrapper .ivu-input-prefix i,
  .chequer-list-date-wrap-css .ivu-input-wrapper .ivu-input-suffix i {
      font-size: 0;
      display: none;
  }


  /* BloodType血型组件 */

  .bloodtype-item-css .form-item-css {
      width: 100%;
      display: block;
      text-align: left;
      position: relative;
      padding-right: 70px;
      box-sizing: border-box;
  }

  .bloodtype-item-css .form-item-css .radio-list-wrap-style {
      display: inline-block;
      white-space: nowrap;
  }

  .bloodtype-item-css .form-item-css .radio-list-wrap-style:nth-child(1) .radio-list-style {
      padding-right: 0;
  }


  /* InputOfTooth组件样式*/

  /* InputOfTooth组件样式*/

.tooth-input-wrap-css {
  width           : 88px;
  height          : 40px;
  display         : inline-block;
  vertical-align  : middle;
  overflow        : hidden;
  font-size       : 0;
  background-color: none;
  position        : relative;
}
.tooth-input-wrap-css:before {
  width     : 100%;
  height    : 1px;
  border-top: 1px solid #afafaf;
  display   : block;
  content   : '';
  position  : absolute;
  left      : 0;
  top       : 50%;
  margin-top: -1px;
}

.tooth-input-wrap-css:after {
  width      : 1px;
  height     : 100%;
  border-left: 1px solid #afafaf;
  display    : block;
  content    : '';
  position   : absolute;
  left       : 50%;
  top        : 0;
  margin-top : -1px;
}


.tooth-input-wrap-css>div {
  font-size: 0;
}

.tooth-input-wrap-css>div .valueText{
    width: 36% !important;
    min-width: auto !important;
    border: none !important;
    height        : 20px;
    line-height   : 20px;
    text-align    : center;
    display       : inline-block;
    vertical-align: top;
    border        : none;
    border-radius : 0;
    box-shadow    : none;
    font-size     : 12px;
    background    : none;
    padding       : 0 6px;
}


  /* 问题列表样式 */

  .question-list-wrap-css {
      font-size: 0;
      text-align: left;
      position: relative;
      background-color: #ffffff;
      padding: 10px;
      margin: 0 auto;
      box-sizing: border-box;
  }

  .question-list-wrap-css .question-header-css{
  width: 100%;
  }
  .question-list-wrap-css .question-header-css .maintitle-css{
      font-size: 14px;
  }
  .question-list-wrap-css .question-header-css .subtitle-css{
      font-size: 14px;
  }
  .question-list-wrap-css .question-list-item-css {
      width: 100%;
      font-size: 0;
      text-align: left;
      display: block;
      padding-bottom: 12px;
  }

  .question-list-item-css .question-item-title-css {
      // width: 100%;
      font-size: 14px;
      padding: 4px 0;
      // display: block;
      display: inline-block;
      text-align: left;
  }

  .question-list-item-css .answer-list-css {
      width: 100%;
      font-size: 0;
      display: block;
      position: relative;
  }

  .question-list-item-css .answer-list-css .answer-item-css {
      font-size: 14px;
      display: inline-block;
      margin: 0 6px;
  }
  .question-list-item-css  .question-item-thumbnail-css{
      width: 100%;
      position: relative;
      padding: 5px 0 10px;
      font-size: 0;
  }
  .question-list-item-css  .question-item-thumbnail-css img{
      max-width: 300px;
  }

  .question-list-wrap-css .btn-group-css{
      width: 100%;
      padding: 10px;
      font-size: 0;
  }
  .question-list-wrap-css .btn-group-css .ivu-btn{
      margin: 0 6px;
  }
  .question-list-wrap-css .btn-group-css .turn-page-css{
      width: 120px;
      margin: 0 6px;
      display: inline-block;
      font-size: 0;
  }
  .question-list-wrap-css .btn-group-css .turn-page-css .ivu-input-number,
  .question-list-wrap-css .btn-group-css .turn-page-css .ivu-btn{
      width: 50%;
      font-size: 14px;
      border-radius: 4px 0 0 4px;
      margin: 0;
  }
  .question-list-wrap-css .btn-group-css .turn-page-css .ivu-btn{
      border-radius: 0 4px 4px 0;
  }
  .question-list-wrap-css .btn-group-css .total-prop-text-css{
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
      margin: 0 6px;
  }

  /* ChooseAddress(选择地址)组件样式 */

  .choose-address-item-css {
      width: 100%;
      text-align: left;
  }

  .city-list-wrap-css {
      position: relative;
      white-space: nowrap;
  }

  .city-list-wrap-css .shadow {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 3;
  }

  .city-list-css {
      font-size: 0;
      text-align: left;
      white-space: nowrap;
      position: absolute;
      left: 0;
      top: -340px;
      z-index: 4;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px #dfdfdf;
  }

  .city-list-css .city-list-item-css {
      height: 300px;
      min-width: 120px;
      overflow-y: auto;
      display: inline-block;
      background-color: #ffffff;
      border-right: 1px solid #dfdfdf;
      font-size: 14px;
      box-sizing: border-box;
  }

  .city-list-css .city-list-item-css a {
      display: block;
      padding: 8px 16px;
      color: #333333;
      position: relative;
  }

  .city-list-css .city-list-item-css .city-item-checked-css {
      color: #2d8cf0;
      background-color: #efefee;
  }

  .city-list-css .city-list-item-css .right-icon-css {
      font-size: 14px;
      position: absolute;
      right: 8px;
      top: 50%;
      margin-top: -6px;
  }

  .choose-address-item-css .detail-item-input-css {
      display: inline-block;
      font-size: 0;
      margin-left: 20px;
  }

  .choose-address-item-css .detail-item-input-css  .ivu-input-wrapper {
      width: 240px;
      vertical-align: auto;
  }

  .ani-rotate {
      animation: ani-rotate 1s linear infinite;
  }

  @keyframes ani-rotate {
      from {
          transform: rotate(0deg)
      }
      to {
          transform: rotate(360deg)
      }
  }


  /* BizRadioWithTextDate组件样式 */

  .BizRadioWithTextDate-css {
      width: 100%;
      font-size: 0;
      text-align: left;
      position: relative;
  }

  .BizRadioWithTextDate-css .radio-list-wrap-style,
  .BizRadioWithTextDate-css .TextWithDate-list-wrap-css {
      display: inline-block;
      vertical-align: top;
      font-size: 0;
  }

  .BizRadioWithTextDate-css .radio-list-wrap-style .radio-list-style {
      padding-right: 0;
  }

  .BizRadioWithTextDate-css .chequer-list-css {
      display: inline-block;
      text-align: right;
      position: absolute;
      right: 0;
      top: 6px;
  }

  .AuxiliaryInspect-wrap-css{
      width: 100%;
      display: block;
  }
  .AuxiliaryInspect-wrap-css .AuxiliaryInspect-label-css {
      text-align: right;
      font-size: 14px;
      line-height: 22px;
      display: inline-block;
      vertical-align: middle;
  }
  .AuxiliaryInspect-body-css{
      width: 100%;
      padding: 10px 10px 0 10px;
      text-align: left;
  }
  .AuxiliaryInspect-wrap-css .AuxiliaryInspect-list-css{
      width: 100%;
      display: block;
  }
  .AuxiliaryInspect-wrap-css .AuxiliaryInspect-item-css{
      width: 100%;
      margin: 14px 0;
      border: 1px solid #dfdfdf;
      padding: 14px 10px 10px 10px;
      position: relative;
  }
  .AuxiliaryInspect-wrap-css .AuxiliaryInspect-item-css .AuxiliaryInspect-item-title-css{
      padding: 0 6px;
      background-color: #ffffff;
      display: inline-block;
      font-size: 0;
      line-height: 16px;
      position: absolute;
      left: 10px;
      top: -8px;
  }
  .AuxiliaryInspect-wrap-css .AuxiliaryInspect-item-css .title-text-css,
  .AuxiliaryInspect-wrap-css .AuxiliaryInspect-item-css .icon-delete-css {
      display: inline-block;
      font-size: 14px;
      cursor: pointer;
      vertical-align: middle;
      position: static;
  }
  .AuxiliaryInspect-wrap-css .AuxiliaryInspect-item-css .icon-delete-css{
      margin-left: 8px;
  }

  // 血压组件
  .BloodPressure-wrap-css{
    //   width: 280px;
      display: inline-block;
  }
  .BloodPressure-wrap-css .suffix-text-csss,
  .BloodPressure-wrap-css .input-break-css{
      display: inline-block;
      font-style: normal;
      font-size: 14px;
      line-height: 22px;
      vertical-align: middle;
  }


    // 头部患者基本信息概要
        .header-summary-css{
            min-height:36px;
            color: #000;
            display: flex;
            justify-content: space-around;
            font-weight: bold;
            text-align:center;
            line-height:36px;
            font-size: 0;
        }
        .header-summary-css span{
            margin:0 10px;
            font-size: 14px;
            display: inline-block;
        }

        // BizList组件样式
        .form-table-wrap-css{
            width: 100%;
            overflow-y: auto;
            display: block;
            font-weight: "微软雅黑";
        }
        .form-table-wrap-css .form-table-css{
            width: 100%;
            border-collapse:collapse;
        }
        .form-table-wrap-css .form-table-css .form-table-header-css{
            background-color: #f8f8f9;
        }
        .form-table-wrap-css .form-table-css tr{
            border-bottom: 1px solid #dddee1;
        }
        .form-table-wrap-css .form-table-css td{
            min-height: 22px;
            line-height: 22px;
            font-size: 14px;
            padding-left: 8px;
        }
        .form-table-wrap-css .form-table-css td .text-css{
            width: 100%;
            display: block;
            word-break: break-all;
            line-height: 22px;
          }

        /* --------------------------治疗计划打印样式--------------------------- */



        .margin-left-15 {
            margin-left: 15px;
          }
          .margin-bottom-15 {
            margin-bottom: 15px;
          }
          .flex-container-center {
            display: flex;
            justify-content: space-between;
          }
          .archive-message-list-css {
            padding: 3px 0;
            line-height: 22px;
            padding-left: 5px;
            border-bottom: 1px solid #d4d4d4;
          }
          .tpContent1-title-css {
            color: #1e84f3;
            font-size: 16px;
            height: 30px;
            line-height: 30px;
            margin-bottom: 25px;
          }
          .tp1-icon-css:hover {
            color: #b0d4fc;
          }
          .archive-message {
            padding: 5px;
          }
          .archive-message-photo-css {
            float: left;
            margin-left: -100px;
            width: 100px;
            height: 120px;
          }
          .archive-message-photo-css .photo-css {
            width: 90px;
          
          }
          .archive-message-right-css {
            float: right;
            width: 100%;
          }

    }
    `
    }
}