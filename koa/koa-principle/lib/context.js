let proto = {}

function defineGetter(prop, name) { // 参数分别是代理的对象和对象上的属性
  proto.__defineGetter__(name, function () { // 每个对象上都有一个__defineGetter__方法， 用这个方法实现代理
    return this[prop][name] // this === ctx 所以ctx.url得到的就是this.request.url
  })
}

function defineSetter(prop, name) {
  proto.__defineSetter__(name, function(val) {
    this[prop][name] = val
  })
}
defineGetter('request', 'url');
defineGetter('request', 'path');
defineGetter('request', 'query');

defineGetter('response', 'body'); // ctx.body 代理 response的body方法
defineSetter('response', 'body');

module.exports = proto