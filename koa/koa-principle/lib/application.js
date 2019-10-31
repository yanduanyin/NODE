let http = require('http');
let EventEmitter = require('events');
let Stream = require('stream');

let context = require('./context');
let request = require('./request');
let response = require('./response');

class myKoa extends EventEmitter {
  constructor () {
    super();
    this.middlewares = []; // 中间件
    this.fn;
    this.context = context;
    this.request = request;
    this.response = response;
  }

  createContext (req, res) { // 创建ctx
    // 通过Object.create创建对象是为了继承this.context, 但是在增加属性时不影响原对象
    const ctx = Object.create(this.context);
    const request = ctx.request = Object.create(this.request);
    const response = ctx.response = Object.create(this.response);

    ctx.req = request.req = response.req = req;
    ctx.res = request.res = response.res = res;

    request.ctx = response.ctx = ctx;
    request.response = response;
    response.request = request;
    return ctx
  }

  handleRequest (req, res) { // 处理请求
    res.statusCode = 404 // 默认
    let ctx = this.createContext(req, res)
    let fn = this.compose(this.middlewares, ctx)
    fn.then(() => {
      if (typeof ctx.body == 'object') {
        res.setHeader('Content-Type', 'application/json;charset=utf8')
        res.end(JSON.stringify(ctx.body))
      } else if (ctx.body instanceof Stream) {
        ctx.body(res)
      } else if (typeof ctx.body == 'string' || Buffer.isBuffer(ctx.body)) {
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end(ctx.body)
      } else {
        res.end('Not found!')
      }
    }).catch((err) => {
      this.emit('error', err)
      res.statusCode = 500
      res.end('server error')
    })
    // this.fn(ctx) // 调用用户给的回调, 把ctx还给用户使用
    // res.end(ctx.body) // ctx.body用来输出到页面
  }

  use (fn) {
    // this.fn = fn;
    this.middlewares.push(fn)
  }

  compose (middlewares, ctx) {
    function dispatch(index) {
      if (index === middlewares.length) return
      let middleware = middlewares[index]
      return Promise.resolve(middleware(ctx, () => dispatch(index + 1)))
    }
    return dispatch(0)
  }

  listen (...args) {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = myKoa