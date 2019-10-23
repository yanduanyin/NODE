// nuxt:vue ssr   next: react ssr   nest: node  基于 express
const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaView = require('koa-views');
const path = require('path');
const router = KoaRouter();
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
app.use(bodyParser());

// views 模板引擎 <template></template> ejs pug
app.use(KoaView(path.join(__dirname, './view/'), {
  extension: 'ejs'
}))
router.get('/', async(ctx) => {
  // ctx.body = `html`
  const userInfo = { useName: 123, sex: 0, hobby: ['1', '2', '3'] }
  // 服务端渲染
  // spa + 服务器渲染 = 同构
  await ctx.render('index', {
    ...userInfo
  })
})
router.get('/login', async(ctx) => {
  await ctx.render('login');
})
router.post('/login', async (ctx) => {
  const data = ctx.request.body;
  if (data.userName === '123' && data.pwd === '456') {
    // 生成 token
    // 保持 用户登录状态   每次请求  我都把 uid 传 { uid：000 }
    // jwt 解决了 传递数据 加密的功能
    // 加密的算法  playload(数据， 时间)  签名 
    const token = jwt.sign({uid: 000}, 'secret', {
      expiresIn: 60
    })
    ctx.body = {
      code: 200,
      token: token
    }
  }
})
router.get('/401', async (ctx) => {
  await ctx.render('401');
})
router.get('/userInfo', async (ctx) => {
  try {
		//解码取出之前存在payload的user_id 和 name
    const payload = jwt.verify(token, secret);
    console.log('payload———', payload);
		ctx.user_id = payload.id;
		await next(next)
	} catch (err) {
    ctx.body = {
      code: 300
    }
	}
}, async (ctx) => {
  ctx.body = {
    code: 200,
    name: 123,
    id: 1
  }
})
app.use(router.routes()).use(router.allowedMethods())
app.listen(3005, () => {
  console.log('server is running 3005');
})