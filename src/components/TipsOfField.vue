<template>
  <div class="tips-wrap-css">
    <!-- <Tooltip max-width="200" :content="tipContent">
        <a class="tips-anchor-css">{{tipsAnchor}}</a>
    </Tooltip> -->
  </div>
</template>

<script>
import ConstantTips from "@/zx/bizconstants/ConstantTips.js";
export default {
  name: "TextTips",
  props:{
    tipsKeyName:{
      type: String,
      default: ""
    },
    tipsAnchor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tipContent:""
    };
  },
  methods: {
    initCtrlData(){
      this.tipContent = ConstantTips.TIPS[this.tipsKeyName].content || "";
    }
  },
  mounted() {
    this.initCtrlData()
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
</style>
