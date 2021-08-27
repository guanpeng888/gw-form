<template>
  <div id="app">
    <!-- <InputOfText
    labelName="姓名"
    placeholder="请输入姓名"
    v-model="ssname"/> -->
    <ZxRuler/>
  </div>
</template>

<script>
import InputOfText from '@/components/InputOfText.vue'
import ZxRuler from '@/components/ZxRuler.vue'
export default {
  name: 'App',
  components: {
    InputOfText,
    ZxRuler
  },
  data(){
    return {
      ssname: 'Leo Guan'
    }
  }
}
</script>

<style lang="sass">
  @import './theme/gw-component.scss';
</style>
