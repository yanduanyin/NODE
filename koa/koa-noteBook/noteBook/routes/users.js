const router = require('koa-router')()
const userService = require('../controllers/mySqlConfig')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/all', async(ctx, next) => {
  await userService.getAllUsers().then((res) => {
    console.log('打印结果：', JSON.stringify(res))
    ctx.body = res
  })
})

router.get('/userRegister', async(ctx, next) => {
  var _username = ctx.request.body.username
  var _userpwd = ctx.request.body.userpwd
  var _nickname = ctx.request.body.nickname
  if (!_username && !_userpwd && !_nickname) {
    ctx.body = {
      code: '800001',
      mess: "用户名昵称密码不能为空"
    }
    return
  }
  let user = {
    username: _username,
    userpwd: _userpwd,
    nickname: _nickname
  }
  await userService.findUser(user.username).then(async (res) => {
    if (res.lenght) {
      try {
        throw Error("用户名已存在")
      } catch (error) {
        console.log(error)
      }
      ctx.body = {
        code: '800003',
        data: 'error',
        mess: '用户名已存在'
      }
    } else {
      await userService.insertUser([user.username, user.userpwd, user.nickname]).then((res) => {
        let r = ''
        if (res.affectedRows != 0) {
          r = 'ok'
          ctx.body = {
            code: '800000',
            data: r,
            mess: '注册成功'
          }
        } else {
          r = 'error'
          ctx.body = {
            code: '800004',
            data: r,
            mess: '注册失败'
          }
        }
      })
    }
  })
})

module.exports = router
