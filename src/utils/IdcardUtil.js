import DateTimeUtil from "./DateTimeUtil";

const CITY = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外'
}

export default {
  GENDER_TYPE: {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    UNKNOWN: 'UNKNOWN'
  },
  GENDER_CODE:{
    MALE: '1',
    FEMALE: '2',
    UNKNOWN: '0'
  },
  getBirth(iIdNo, age) {
    var birth = this.getBirthByIdNo(iIdNo)
    // console.log('birth:' + birth)
    if (birth === '') {
      birth = this.getBirthByAge(age)
    } else {
      var birthDate = new Date(birth)
      birth = DateTimeUtil.getDateTime(birthDate)
    }
    // console.log('birth:' + birth)
    return birth
  },
  getBirthByIdNo(idNo) {
    var birthStr = '';
    if (!this.checkCard(idNo)) {
      return
    }

    if (idNo.length === 15) {
      birthStr = idNo.substring(6, 12);
      birthStr = '19' + birthStr;
      birthStr = birthStr.substring(0, 4) + '-' + birthStr.substring(4, 6) + '-' + birthStr.substring(6);
      // birthday.text(sexStr + tmpStr);
    } else {
      birthStr = idNo.substring(6, 14);
      birthStr = birthStr.substring(0, 4) + '-' + birthStr.substring(4, 6) + '-' + birthStr.substring(6);
      // birthday.text(sexStr + tmpStr);
    }
    return birthStr
  },
  getBirthByAge(age) {
    if (this.isDate(age)) {
      return age
    } else {
      var nowDate = new Date()
      var year = nowDate.getFullYear() - parseInt(age)
      nowDate.setFullYear(year)
      var birthDate = nowDate
      var birthFormat = DateTimeUtil.getDateTime(birthDate)
      return birthFormat
    }
  },
  getAgeByIdNo(idNo) {
    var birth = this.getBirthByIdNo(idNo)
    return this.getAgeByBirth(birth)
  },
  getAgeByBirth(age) {
    if (this.isDate(age)) {
      var nowDate = new Date()
      var ageDate = new Date(age);
      var year = nowDate.getFullYear() - ageDate.getFullYear()
      return year + ''
    } else {
      return age
    }
  },
  getGenderByIdNo(idNo) {
    if (!this.checkCard(idNo)) {
      return
    }
    if (idNo.length === 15) {
      return parseInt(idNo.substring(14, 1), 10) % 2 ? this.GENDER_TYPE.MALE : this.GENDER_TYPE.FEMALE;
    } else {
      return parseInt(idNo.substring(17, 1), 10) % 2 ? this.GENDER_TYPE.MALE : this.GENDER_TYPE.FEMALE;
    }
  },
  getGenderCodeByIdNo(idNo){
    if (!this.checkCard(idNo)) {
      return
    }
    if (idNo.length === 15) {
      return parseInt(idNo.substring(14, 1), 10) % 2 ? this.GENDER_CODE.MALE : this.GENDER_CODE.FEMALE;
    } else {
      return parseInt(idNo.substring(17, 1), 10) % 2 ? this.GENDER_CODE.MALE : this.GENDER_CODE.FEMALE;
    }
  },
  isDate(dateString) {
    if (dateString.trim() === '') {
      return true
    }
    var r = dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
    if (r === null) {
      // alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r");
      return false
    }
    var d = new Date(r[1], r[3] - 1, r[4])
    var num = (d.getFullYear() === r[1] && (d.getMonth() + 1) === r[3] && d.getDate() === r[4])
    if (num === 0) {
      // alert("请输入格式正确的日期\n\r日期格式：yyyy-mm-dd\n\r例    如：2008-08-08\n\r");
    }
    return (num !== 0)
  },
  checkCard(card) {
    // 是否为空
    if (!card || card.trim() === '') {
      // alert('请输入身份证号，身份证号不能为空');
      // document.getElementById('card_no').focus;
      return false;
    }
    // 校验长度，类型
    if (this.isCardNo(card) === false) {
      // alert('您输入的身份证号码不正确，请重新输入');
      // console.log('checkCard : isCardNo')
      return false;
    }
    // 检查省份
    if (this.checkProvince(card) === false) {
      // alert('您输入的身份证号码不正确,请重新输入');
      // console.log('checkCard : checkProvince')
      return false;
    }
    // 校验生日
    if (this.checkBirthday(card) === false) {
      // alert('您输入的身份证号码生日不正确,请重新输入');
      // console.log('checkCard : checkBirthday')
      return false;
    }
    // 检验位的检测
    if (this.checkParity(card) === false) {
      // alert('您的身份证校验位不正确,请重新输入');
      // console.log('checkCard : checkParity')
      return false;
    }
    // alert('OK');
    return true;
  },
  // 检查号码是否符合规范，包括长度，类型
  isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
      // alert("demo");
      return false;
    }
    return true;
  },
  // 取身份证前两位,校验省份
  checkProvince(card) {
    var province = card.substr(0, 2);
    if (CITY[province] === undefined) {
      return false;
    }
    return true;
  },
  // 检查生日是否正确
  checkBirthday(card) {
    var len = card.length
    // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    // console.log('checkBirthday : len' + len)
    if (len === 15) {
      var reFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
      var arrData = card.match(reFifteen)
      var year = arrData[2]
      var month = arrData[3]
      var day = arrData[4]
      var birthday = new Date('19' + year + '/' + month + '/' + day)
      return this.verifyBirthday('19' + year, month, day, birthday)
    }
    // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len === 18) {
      var reEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
      var arrData2 = card.match(reEighteen)
      var year2 = arrData2[2]
      var month2 = arrData2[3]
      var day2 = arrData2[4]
      var birthday2 = new Date(year2 + '/' + month2 + '/' + day2)
      return this.verifyBirthday(year2, month2, day2, birthday2)
    }
    return false;
  },
  // 校验日期
  verifyBirthday(year, month, day, birthday) {
    var now = new Date();
    var nowYear = now.getFullYear();
    var bolYear = birthday.getFullYear() === (year * 1)
    // var bolMonth = (birthday.getMonth() + 1) === (month * 1)
    var bolDate = birthday.getDate() === (day * 1)
    // console.log('checkBirthday : bolYear' + bolYear)
    // console.log('checkBirthday : bolDate' + bolDate)
    // 年月日是否合理
    if (bolYear && bolYear && bolDate) {
      // 判断年份的范围（3岁到100岁之间)
      var time = nowYear - year;
      // console.log('checkBirthday : time' + time)
      if (time >= 1 && time <= 150) {
        return true;
      }
      return false;
    }
    return false;
  },
  // 校验位的检测
  checkParity(card) {
    // 15位转18位
    card = this.changeFivteenToEighteen(card);
    var len = card.length;
    if (len === 18) {
      var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      var cardTemp = 0
      for (var i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      var valnum = arrCh[cardTemp % 11];
      if (valnum === card.substr(17, 1)) {
        return true;
      }
      return false;
    }
    return false;
  },
  // 15位转18位身份证号
  changeFivteenToEighteen(card) {
    if (card.length === 15) {
      var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      var cardTemp = 0
      var i = 0
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6)
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i];
      }
      card += arrCh[cardTemp % 11]
      return card
    }
    return card
  }
}
