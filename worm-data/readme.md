## 爬虫笔记
- 工具
1. superagent 通过接口网址去网站爬页面的数据
2. cheerio 将爬下来的数据 用jq的语法整理
3. express 开启一个后台服务， 如果不要在浏览器上看爬好并且整理好的数据可以不用
4. fs node.js 自带的写文件的模块 将爬好并且整理好的数据写成json文件

- cheerio 
   1. 使用 jq 的语法来选择dom 结构
   2. 在多重循环结构里， 注意this的使用，在使用jq语法取到的是一个数组要用each来遍历时，绑定了this就用this,没有绑定就用循环的item
   3. 使用cheerio语法， 必须到你要取的元素这里来才能获取成功，不能...传递来取
   4. cheerio 取不到样式里的url的值，一般浏览器会通过js来手动加载，可以在控制台中找到加载出来的数据手动的复制


- nightmare 自动登录并轮询的例子

   有那么一个网站（比如叫chagang.site)，在我登录进去后，会不定时的查岗，需要点击一个按钮以证明没有离线，怎么用nightmare实现自动挂机呢？

   大概分这么几步走：

   - 先跳转到该网站
   - 模拟输入帐号信息后点击submit
   - 登录后等待主界面加载出现
   - 在客户端起一个定时器，2秒一次轮询那个查岗按钮，发现就模拟点击
   nightmare
   .goto('http://chagang.site/')
   .viewport(1024, 768)
   .cookies.clearAll()
   .type('#username', '用户名')
   .type('#password', '密码')
   .click('input[type=submit]')
   .wait('#mainContent')
   .evaluate(() => {
      /* eslint-disable */
      function handle() {
   // 一个叫inspector的button
         var inspector = document.querySelector('#inspector');
         if (inspector && inspector.style.visibility === 'visible') {
         inspector.click();
         }
      }
   
      setInterval(handle, 2000);
      /* eslint-enable */
   })
   .evaluate(() => document.title)
   .then(title => console.log(`${title} => 加载完成`))
   .catch(err => console.error(err))