let url = require('url');
let request = {
  get url() { // 声明函数时加一个get  那么在调用函数时直接写函数名不用加括号
    return this.req.url
  },
  get path() {
    return url.parse(this.req.url).pathname
  },
  get query() {
    return url.parse(this.req.url).query
  }
  // ...
}

module.exports = request

// url.parse 理解
// var url = require('url');
// var a = url.parse('http://localhost:8080/one?a=index&t=article');
// console.log(a);
 
//输出结果：
// { 
//     protocol : 'http' ,
//     auth : null ,
//     host : 'localhost:8080' ,
//     port : '8080' ,
//     hostname : 'localhost' ,
//     hash : null ,
//     search : '?a=index&t=article',
//     query : 'a=index&t=article',
//     pathname : '/one',
//     path : '/one?a=index&t=article',
//     href : 'http://localhost:8080/one?a=index&t=article'
// }
