<template>
  <div class="TextWithDate-list-wrap-css">
    <label class="TextWithDate-label-css" v-if="labelName" :style="'width:'+labelWidth">
      {{labelName}}
    </label>
    <div class="TextWithDate-list-css">
      <span class="TextWithDate-item-css" v-for="(memoItem , index) in listData" :key="index">
        <InputOfText
          :labelName="textOpt.labelName"
          :labelWidth="'auto'"
          :suffix="textOpt.suffixname"
          :prefix="textOpt.prefixname"
          :readonly="readonly"
          @change="getItemInputValue"
          v-model="memoItem[textOpt.dbfieldname]"
        ></InputOfText>
        &nbsp;
        <InputOfDate
          :type="'date'"
          :labelName="dateOpt.labelName"
          :labelWidth="'auto'"
          :format="format"
          :readonly="readonly"
          :suffix="dateOpt.suffixname"
          @change="getItemInputValue"
          v-model="memoItem[dateOpt.dbfieldname]"
        ></InputOfDate>
        <Icon
          v-if="!readonly"
          type="ios-close-circle"
          class="icon-delete-css"
          size="20"
          @click.stop="deleteItem(index)"
        />
      </span>
    </div>
    <Button v-if="!readonly" class="icon-add-btn-css" @click="addItem">
      <Icon type="ios-add-circle-outline" size="24"/>
    </Button>
  </div>
</template>

<script>
import InputOfText from "@/components/InputOfText.vue";
import InputOfDate from "@/components/InputOfDate.vue";
export default {
  name: "TextWithDate",
  components: {
    InputOfText,
    InputOfDate
  },
  data() {
    return {
      listData: [],
      textOpt:{},
      dateOpt:{}
    };
  },
  model: {
    prop: "initOpts",
    event: "change"
  },
  props: {
    initOpts: {
      type: Array,
      default: function() {
        return [];
      }
    },
    labelName:{
      type:String,
      default:""
    },
    labelWidth:{
      type:String,
      default:"auto"
    },
    format:{
      type:String,
      default:"yyyy-MM-dd"
    },
    bizOptKey:{
      type: Array,
      default: function() {
        return [];
      }
    },
    readonly:{
      type: Boolean,
      default: false
    }
  },
  watch: {
    initOpts(newVal, oldVal) {
      this.listData = JSON.parse(JSON.stringify(newVal)) || [];
    }
  },
  methods: {
    initCtrl() {
      this.listData = JSON.parse(JSON.stringify(this.initOpts)) || [];
      if(this.bizOptKey && this.bizOptKey.length === 2){
        this.textOpt = this.bizOptKey[0] || {}
        this.dateOpt = this.bizOptKey[1] || {}
      }
      // 初始进来列表为空时，默认添加一行
      if(this.listData && this.listData.length === 0){
        this.addItem();
      }
    },
    addItem() {
      this.$nextTick(() => {
        let memoItem = new Object();
        memoItem[this.textOpt.dbfieldname] = "";
        memoItem[this.dateOpt.dbfieldname] = ""
        this.listData.push(memoItem);
        this.sendCtrlvalue();
      });
    },
    deleteItem(idx) {
      this.listData.splice(idx, 1);
      this.sendCtrlvalue();
    },
    getItemInputValue(){
      this.sendCtrlvalue();
    },
    getItemDateValue(){
      this.sendCtrlvalue();
    },
    sendCtrlvalue() {
      this.$emit("change", this.listData);
    }
  },
  mounted() {
    this.initCtrl();
  }
};
</script>

<style scoped>
</style>
