import InputOfDate from '../components/InputOfDate.vue'
import InputOfIdCard from '../components/InputOfIdCard.vue'
import InputOfNumber from '../components/InputOfNumber.vue'
import InputOfPhone from '../components/InputOfPhone.vue'
import InputOfText from '../components/InputOfText.vue'



const install = (Vue) => {
    Vue.component('InputOfDate', InputOfDate);
    Vue.component('InputOfIdCard', InputOfIdCard);
    Vue.component('InputOfNumber', InputOfNumber);
    Vue.component('InputOfPhone', InputOfPhone);
    Vue.component('InputOfText', InputOfText);
}


export default install;