const koa = require('koa');
const router = require('./router');
const koaBody = require('koa-body');
const app = new koa();
app.use(koaBody());
app.use(router.routes())
app.listen(3000, () => {
  console.log('run in http://localhost:3000');
})
