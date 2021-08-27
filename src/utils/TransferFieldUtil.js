export default {
    // 根据后端返回的字段code（字典code）回显字段中文名称
    transferZhNameByDictcode(dictArr = [], fieldCode = "", dictItemCodeKey = "bizoptcode", dictItemNameKey = "bizoptname"){
        let dictItem = {};
        if(dictArr && dictArr.length){
            let dictItemArr = dictArr.filter(item => item[dictItemCodeKey] == fieldCode)
            if(dictItemArr && dictItemArr.length){
                dictItem = dictItemArr[0]
            }
        }
        return dictItem[dictItemNameKey] || ""
    }
}