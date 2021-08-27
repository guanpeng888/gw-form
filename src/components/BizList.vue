<template>
  <div :class="['form-table-wrap-css',borderStyle === 'border']" :style="'height:'+height+'px'">
    <table class="form-table-css" :style="'text-align:'+textAlign">
      <tr v-if="showHeader" class="form-table-header-css">
        <td
          v-for="(colItem,index) in columns"
          :key="index"
          :style="'min-width:'+colItem.minWidth+'px;width:'+colItem.width"
        >
          <h4 v-html="colItem.title"></h4>
        </td>
      </tr>
      <tr v-for="(listItem,index) in data" :key="index">
        <td
          v-for="(colItem,index) in columns"
          :key="index"
          :style="'min-width:'+colItem.minWidth+'px;width:'+colItem.width+'px'"
        >
          <span class="text-css" v-if="!colItem.tooltip && !colItem.render" v-html="listItem[colItem.key]"></span>
          <span class="text-css" v-if="colItem.render" v-html="colItem.render(listItem)"></span>
          <Tooltip
            v-if="colItem.tooltip"
            max-width="200"
            :content="listItem[colItem.key]"
          >{{listItem[colItem.key]}}</Tooltip>
        </td>
      </tr>
      <tr v-if="!isShowData">
          <td style="text-align:center;" colspan="100">暂无数据</td>
      </tr>
    </table>
  </div>
</template>

<script>
import ObjectUtil from "@/utils/ObjectUtil.js";

export default {
  name: "BizList",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: "660"
    },
    textAlign: {
      type: String,
      default: "left"
    },
    borderStyle: {
      type: String,
      default: "border"
    }
  },
  data() {
    return {
      isShowData: false
    };
  },
  watch: {
    data(newVal, oldVal) {
      this.showData(newVal);
    }
  },
  methods: {
    showData(param) {
      this.isShowData = !ObjectUtil.isEmptyArray(param) ? true : false;
    }
  },
  mounted() {},
  created() {
    this.showData(this.data);
  }
};
</script>

<style scoped>
</style>