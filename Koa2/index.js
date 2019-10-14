// 回调
// promise
// generator
// async 定义函数的一个关键词 
// async () => {
  // let a = await Promise() // 接 promise
  // a resolve 时候的值
// }
// http.createServer((req, res) => {})
const Koa = require('koa');
const KoaBody = require('koa-body');
const path = require('path');
const app = new Koa();
// formidable form req
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024,
    keepExtensions: true,
    uploadDir: path.join(__dirname, '/static/images')
  }
}))
app.use(async (ctx) => {
  // http://localhost:3000/  上传文件表单
  // http://localhost:3000/upload  处理表单
  const method = ctx.method;
  const path = ctx.path;
  console.log(method, path);
  // notFound
  if (method === 'GET' && path === '/') {
    ctx.body = `
    <form action="/upload" 
    method="post"
    enctype="multipart/form-data">
    <input type="file" />
      <input type="submit" value="提交" />
    </form>
    `
  } else if (method === 'POST' && path === '/upload') {
    console.log(ctx.request.files);
  }
});
app.listen(3001, () => {
  console.log('server is runing 3001');
})