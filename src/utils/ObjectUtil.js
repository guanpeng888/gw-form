const SERIALIZE_OBJ = 'SERIALIZE_OBJ'

export default {
  isString: function (str) {
    if (str === null) {
      return false
    } else {
      return (typeof str === 'string') && str.constructor === String
    }
  },
  isArray: function (obj) {
    if (obj === null) {
      return false
    } else {
      return (typeof obj === 'object') && obj.constructor === Array
    }
  },
  isObject: function (obj) {
    if (obj === null) {
      return false
    } else {
      return (typeof obj === 'object') && obj.constructor === Object
    }
  },
  isFunction: function (obj) {
    if (obj === null) {
      return false
    } else {
      return (typeof obj === 'function')
    }
  },
  isEmptyObject(e) {
    var t
    for (t in e) {
      return false
    }
    return true
  },
  isEmptyArray(array) {
    if (!array || array.length === 0) {
      return true
    }
    return false
  },
  isNull(value) {
    if (value !== undefined && value !== null) {
      return true
    }
    return false
  },
  clone: function (obj) {
    var str
    var newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
      return
    } else if (window.JSON) {
      str = JSON.stringify(obj) // 序列化对象
      newobj = JSON.parse(str) // 还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? this.clone(obj[i]) : obj[i]
      }
    }
    return newobj
  },

  serialize(obj) {
    var name = SERIALIZE_OBJ
    var result = "";
    function serializeInternal(o, path) {
      for (var p in o) {
        var value = o[p];
        if (typeof value != "object") {
          if (typeof value == "string") {
            result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + "\"" + value.replace(/\"/g, "\\\"") + "\"" + ";";
          } else {
            result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + value + ";";
          }
        }
        else {
          if (value instanceof Array) {
            result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Array();";
            serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]");
          } else {
            result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Object();";
            serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]");
          }
        }
      }
    }
    serializeInternal(obj, name);
    return result;
  },
  deserialize(str) {
    var SERIALIZE_OBJ = {}
    eval(str)
    return SERIALIZE_OBJ
  }
}