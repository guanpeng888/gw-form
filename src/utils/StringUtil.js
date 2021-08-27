export default {
  safeGetString(string, defaultValue) {
    if (!string) {
      return defaultValue || ''
    }
    return string
  },
  isEmptyStr (str) {
    if (!str || str.trim() === '') {
      return true
    }
    return false
  },
  resetDecimals(val, fixedNum){
    let decimalsNum = Number(fixedNum) || 1;
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)) {   //当值是数字时才截取小数部分，否则不截取
       return String(val).indexOf('.') > -1 ? Number(val).toFixed(decimalsNum) : val;
    }
    return val;
  }
}