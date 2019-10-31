// 原生node实现 三部曲
// let http = require('http');

// let server = http.createServer((req, res) => {
//   res.end('hello world');
// })
// server.listen(3000, () => {
//   console.log('服务起来了');
// })

// Koa实现
// const Koa = require('koa2');
// const app = new Koa()

// app.use((ctx, next) => {
//   ctx.body = 'hello world --- runing Koa'
// })

// app.listen(3000)

// mykoa实现

let myKoa = require('./lib/application');
let app = new myKoa();

app.use((ctx, next) => {
  // ctx.body = 'hello world  ---- myKoa221231';
  // response 的部分
  console.log(ctx.req.url)
  console.log(ctx.request.req.url)
  console.log(ctx.response.req.url)
  console.log(ctx.request.url)
  console.log(ctx.request.path)
  console.log(ctx.request.query)
  // request 的部分
  console.log('代理成功',ctx.url)
  console.log('代理成功',ctx.path)

  ctx.body = 'hello world'
  console.log(ctx.response.body)
  console.log(ctx.body)
  next()
})
  // ---- 
// app.use((ctx, next) => {
//   console.log(1)
//   // next()
//   app.use((ctx, next) => {
//     console.log(3)
//     // next()
//     app.use((ctx, next) => {
//       console.log(5)
//       next()
//       console.log(6)
//     })
//   })
// })

// ----
app.use((ctx, next) => {
  console.log(3)
  next()
  console.log(4)
})
app.use((ctx, next) => {
  console.log(5)
  next()
  console.log(6)
})



app.listen(3000)