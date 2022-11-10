// import Vue from "vue"
// import CryptoJS from "crypto-js"

// export default ({}, inject) => {
//     inject('encryption', Vue.observable({
//         encrypt: function(data, key) {
//             const encrypt = CryptoJS.AES.encrypt(data, key)
//             return encrypt.toString()
//         },
//         decrypt: function(data, key) {
//             const bytes = CryptoJS.AES.decrypt(data, key);
//             return bytes.toString(CryptoJS.enc.Utf8);
//         },
//     }))
// }