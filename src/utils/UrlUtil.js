export default {
  convertObjToUrlParam: function (obj) {
    var urlParam = ''
    for (var key in obj) {
      var val = obj[key]
      if (val || val === 0) {
        urlParam = urlParam + key + '=' + val + '&'
      }
    }
    return urlParam
  },
  urlEncode: function (param, key, encode) {
    if (param === null || param === '') return ''
    var paramStr = ''
    var t = typeof (param)
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += key + '=' + ((encode === null || encode) ? encodeURIComponent(param) : param) + '&'
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += this.urlEncode(param[i], k, encode)
      }
    }
    return paramStr
  }
}