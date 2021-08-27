export default {
  validatePhone (phone) {
    // var phoneReg = /^1[34578]\d{9}$/
    var phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if (!phoneReg.test(phone)) {
        return false
    } else {
        return true
    }
  },
  validateAcc (acc) {
    var accReg = /^[0-9a-zA-Z_!@#$%^&*()+{}:"<>?.,]+$/
    if (!accReg.test(acc)) {
        return false
    } else {
        return true
    }
  },
  validatePwd (pwd) {
    var pwdReg = /^[0-9a-zA-Z_!@#$%^&*()+{}:"<>?.,]+$/
    if (!pwdReg.test(pwd)) {
        return false
    } else {
        return true
    }
  },
  validateIntOrFloat (num) {
    // var numReg = /^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^([1-9]+)$/; //验证非0开头的无限位整数和小数。整数支持无限位，小数点前支持无限位，小数点后最多保留两位
    // var numReg = /^(([0-9]+)\.([0-9]{1,8})$)|^([1-9]+)$/;
    // var numReg = /^(\+)?\d+(\.\d+)?$/  //正数、和小数
    // var numReg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0}$/  //大于0的整数或小数，小数位数不限制
    var numReg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,3}$/  //大于0的整数或小数，小数保留两位小数
    if (!numReg.test(num)) {
        return false
    } else {
        return true
    }
  },
  validateIntNum (num) {
    var numReg = /^[0-9]*$/  //数字
    if (!numReg.test(num)) {
        return false
    } else {
        return true
    }
  },
  trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },

  validateIdcard (cardno) {
    if(cardno){
      if(this.checkCode(cardno)) {
        var date = cardno.substring(6,14);
        if(this.checkDate(date)) {
            if(this.checkProv(cardno.substring(0,2))) {
                return true;
            }
          }
      }
    }
    return false;
  },
  checkCode (val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
    var code = val.substring(17);
    if(p.test(val)) {
        var sum = 0;
        for(var i=0; i<17; i++) {
            sum += val[i]*factor[i];
        }
        if(parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
  },
  checkDate (val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if(pattern.test(val)) {
        var year = val.substring(0, 4);
        var month = val.substring(4, 6);
        var date = val.substring(6, 8);
        var date2 = new Date(year+"-"+month+"-"+date);
        if(date2 && date2.getMonth() == (parseInt(month) - 1)) {
            return true;
        }
    }
    return false;
  },
  checkProv (val) {
    var pattern = /^[1-9][0-9]/;
    var provs = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门"};
    if(pattern.test(val)) {
        if(provs[val]) {
            return true;
        }
    }
    return false;
  },
  validateMail (val) {
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/ //正则表达式
    if(val === ""){ //输入不能为空
      // alert("输入不能为空!");
      return false;
    }else if(!reg.test(val)){ //正则验证不通过，格式不对
      // alert("验证不通过!");
      return false;
    }else{
      // alert("通过！");
      return true;
    }
  }
}
