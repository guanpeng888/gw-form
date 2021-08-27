import UserManager from "@/zx/bizmodules/user/UserManager";

export default {
    // 匹配机构
    getModifyAuthByHospcode(hospcode) {
        if (hospcode === UserManager.getHospcode()) {
            return true;
        }
        return false
    },
    // 匹配用户
    getModifyAuthByUserid(userid) {
        if (userid === UserManager.getUserid()) {
            return true;
        }
        return false
    }
}