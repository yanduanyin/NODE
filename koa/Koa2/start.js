const Koa = require('koa');
const studet = new Koa();
// const manage = new Koa();
// 中间件  
// http://localhost:3000/a?a=1&b=2
// 中间件是一个方法
// 用户发起的请求 request -> middleWare1 -> middleWare2 -> middleWare3 -> res 
studet.use(async (ctx, next) => {
  console.log(ctx.path, ctx.query);
  ctx.body = 'hell0 world';
  await next();
  console.log('middleWare1')
})
studet.use(async (ctx, next) => {
  await next();
  ctx.body = 'middleWare2';
})
studet.use(async (ctx, next) => {
  
  ctx.body = 'middleWare3';
})
studet.listen(3000, () => {
  console.log('server is running 3000')
})