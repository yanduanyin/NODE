const Router = require('koa-router');
const { findById, createShop} = require('./controller')
const router = new Router({
  'prefix': '/api'
});

router.get('/shop/:id', findById);
router.post('/shop', createShop)
module.exports = router;
