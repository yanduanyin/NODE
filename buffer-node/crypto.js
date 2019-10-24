const crypto = require('crypto');
// api 请求 x携带 token
// sha256 === md5
let abc = 'helloWorld'
const sign = cryto.createHmac('sha256', 'abc').update(abc).digest('base64')
console.log(sign)