<template>
    <div class="search-wrap-css">
        <BizSelect
        :ctrlStyle="ctrlStyle"
        :labelWidth="'auto'"
        :required="true"
        inputWidth="90px"
        :clearable="false"
        :dictOpts="ssInfoDict"
        :bizOptKey="bizOptKey"
        @change="onSelectChange"
        v-model="currentSearchOpt"
        ></BizSelect>
        <InputOfText v-if="currentSearchOpt.searchflag == 1" v-model.trim="ssinfo.ssname" @change="sendCtrlData" :maxlength="30"  :ctrlStyle="ctrlStyle" inputWidth="140px" placeholder="姓名"></InputOfText>
        <InputOfNumber v-if="currentSearchOpt.searchflag == 2" v-model.trim="ssinfo.ssphone" @change="sendCtrlData" :maxlength="11" :ctrlStyle="ctrlStyle" inputWidth="140px" placeholder="联系电话"></InputOfNumber>
        <InputOfNumber v-if="currentSearchOpt.searchflag == 3" v-model.trim="ssinfo.idcardno" @change="sendCtrlData" :maxlength="18" :ctrlStyle="ctrlStyle" inputWidth="140px" placeholder="身份证号"></InputOfNumber>
    </div>
</template>

<script>
import BizSelect from '@/components/BizSelect';
import InputOfText from '@/components/InputOfText';
// import InputOfPhone from '@/components/InputOfPhone';
import InputOfNumber from '@/components/InputOfNumber';
import ObjectUtil from "@/utils/ObjectUtil.js";
export default {
    name: "BizSearchOfSsInfo",
    model:{
        prop: 'initOpt',
        event: 'change'
    },
    components:{
        BizSelect,
        InputOfText,
        // InputOfPhone,
        InputOfNumber
    },
    props:{
        initOpt:{
            type: Object,
            default: () => {
                return {}
            }
        },
        ctrlStyle:{
            type: String,
            default: 'iview'
        },
        ssInfoDict:{
            type: Array,
            default: () => {
                return [
                    {
                        bizoptcode: '1',
                        bizoptname: "姓名"
                    },
                    {
                        bizoptcode: '2',
                        bizoptname: "手机号码"
                    },
                    {
                        bizoptcode: '3',
                        bizoptname: "身份证号"
                    }
                ]
            }
        }
    },
    data(){
        return {
            ssinfo:{
                ssname:"",
                ssphone:"",
                idcardno:""
            },
            bizOptKey:{
                bizoptcode: "searchflag",
                bizoptname: "searchflagname"
            },
            currentSearchOpt:{
                searchflag: "1",
                searchflagname: "姓名"
            }
        }
    },
    methods:{
        initCtrl(){
            this.ssinfo = ObjectUtil.clone(this.initOpt);
        },
        onSelectChange(result){
            this.ssinfo = { ssname:"", ssphone:"", idcardno:""};
            this.sendCtrlData()
        },
        sendCtrlData(result){
            this.ssinfo.certnum = this.ssinfo.idcardno || ""
            this.$emit('change', this.ssinfo)
        }
    }
    
}
</script>

<style scoped>

</style>