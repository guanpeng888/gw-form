import JsEncrypt from 'jsencrypt/bin/jsencrypt'

export default {
    encryptPwd: function (pwd, pubkey) {
        var encrypt = new JsEncrypt()
        encrypt.setPublicKey(pubkey)
        return encrypt.encrypt(pwd)
    }
}
