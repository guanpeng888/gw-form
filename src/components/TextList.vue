<template>
  <div class="TextWithDate-list-wrap-css">
    <label class="TextWithDate-label-css" v-if="labelName" :style="'width:'+labelWidth">
      {{labelName}}
    </label>
    <div class="TextWithDate-list-css">
      <span class="TextWithDate-item-css" v-for="(memoItem , index) in listData" :key="index">
        <InputOfText
          :type="'datetime'"
          :labelName="textOpt.labelName+(index+1)+':'"
          :labelWidth="'auto'"
          :readonly="readonly"
          :inputWidth="inputWidth"
          :maxlength="inputMaxlength"
          :suffix="textOpt.suffixname"
          @change="getItemInputValue"
          v-model="memoItem[textOpt.dbfieldname]"
        ></InputOfText>
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
export default {
  name: "TextList",
  components: {
    InputOfText
  },
  data() {
    return {
      listData: [],
      textOpt:{}
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
    inputWidth:{
      type: String,
      default: "220px"
    },
    inputMaxlength:{
      type: Number,
      default: 100
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
      this.initCtrl();
    }
  },
  methods: {
    initCtrl() {
      this.listData = JSON.parse(JSON.stringify(this.initOpts)) || [];
      if(this.bizOptKey && this.bizOptKey.length === 1){
        this.textOpt = this.bizOptKey[0] || {}
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
