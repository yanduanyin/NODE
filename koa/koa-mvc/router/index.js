const KoaRouter = require('koa-router');
const registerController = require('../controller/register.js');
const loginController = require('../controller/login.js');
const router = new KoaRouter();
router.prefix('/api/V1')

router.post('/any', async (ctx) => {
  //
  ctx.body = '123456'
});
router.post('/login', loginController);
router.get('/register', registerController);

module.exports = router;