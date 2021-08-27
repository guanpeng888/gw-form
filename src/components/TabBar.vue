<template>
    <div class="tab-wrap-css">
        <a v-for="(tabItem,tabIndex) in tabOpts" :key="tabIndex" 
        :class="['tab-item-css', curTab === tabItem.tabName ? 'tab-item-active-css' : '']" 
        @click="tabChange(tabItem.tabName)">{{tabItem.labelName}}</a>
    </div>
</template>

<script>
export default {
    model:{
        prop: "curTabName",
        event: "on-tab-change"
    },
    props:{
        tabOpts:{
            type: Array,
            default: () => {
                return []
            }
        },
        curTabName:{
            type: String,
            default: ""
        }
    },
    data(){
        return {
            curTab: ''
        }
    },
    watch:{
        curTabName(newVal, oldVal){
            this.initCtrl()
        }
    },
    methods:{
        initCtrl(){
            this.curTab = this.curTabName;
        },
        tabChange(tabName){
            this.curTab = tabName;
            this.$emit('on-tab-change', this.curTab)
        }
    },
    mounted(){
        this.initCtrl()
    }
}
</script>

<style scoped>
    .tab-wrap-css{
        position: relative;
        font-size: 0;
        display: inline;
    }
    .tab-wrap-css .tab-item-css{
        color: #515a6e;
        width: 100px;
        display: inline-block;
        font-size: 14px;
        line-height: 28px;
        text-align: center;
        position: relative;
        z-index: 1;
    }
    .tab-wrap-css .tab-item-css::before{
        content: '';
        position: absolute;
        top: -8px;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background: #dfdfdf;
        border-bottom: none;
        border-radius: 8px 8px 0 0;
        transform: perspective(32px) rotateX(16deg);
        transform-origin: bottom;
    }
    .tab-wrap-css .tab-item-css.tab-item-active-css{
        color: #ffffff;
    }
    .tab-wrap-css .tab-item-css.tab-item-active-css::before{
        background: #1e84f3;
    }
</style>