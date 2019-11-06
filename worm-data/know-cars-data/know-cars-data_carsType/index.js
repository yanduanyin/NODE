// // 引入所需要的第三方包
const superagent = require('superagent');
const fs = require('fs');
const cheerio = require('cheerio');
// const Nightmare = require('nightmare'); //  自动化测试包，处理动态页面
const express = require('express');
// const nightmare = Nightmare({show: true});  // show:true  显示内置模拟浏览器
const app = express();

// 数组
var logoTypeName = [];

let server = app.listen(3001, function () {
  let  host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host,port);
})
// 访问本机地址http://localhost:3001的时候, 往页面上输出数据
app.get('/',  async (req, res, next) => {
  res.send({
    logoTypeName: logoTypeName
  });
});

/**
 * index.js
 * [description] - 使用superagent.get()方法来访问百度新闻首页
 */
superagent
.get('https://www.dcdapp.com/auto')
.end((err, res)  => {
  if (err) {
    // 访问失败
    console.log(`数据抓取失败！ - ${err}`)
  } else {
    // 访问成功， 请求页面返回的数据会包含在res
    // 抓取数据
    logoTypeName = getCarsName(res)
    // 打印数据
    //有些数据 加载需要手动发起接口请求来动态获取数据的DOm结构
    // 所以通过nightmare 模拟发起接口请求获取数据
  }
  // 将爬下来的数据写成json保存下来
  logoTypeName = JSON.stringify(logoTypeName)
  console.log(logoTypeName)
  fs.writeFile("logoTypeName.json", logoTypeName, "utf-8", (error) => {
    //监听错误，如正常输出，则打印null
    if (error == null) {
      console.log("恭喜您，logoTypeName数据爬取成功!)");
    }
  })

});

let getCarsName  = (res) => {
  if (res) {
    let $ = cheerio.load(res.text);
    // 使用cheerio对所要抓取数据的Dom结构进程处理
    $('div.brands div[data-letter]').each( function(index, item) {
      // $(this) 代表你选择到的这个结构 等于item 但是在cheerio里不可以使用item 使用要用$(this)
      let letter = $(this).attr('data-letter')
      // console.log(letter);
      let child = [];
      // 通过this 绑定 表示是正在循环的结构的里面的 p.brand 集合的 的循环
      $('p.brand', this).each(function (bindex, bitem) {
        let LetterName_imgSrc = $('img', this).attr('src');
        let cars_name = $('span', this).text();
        // console.log({logo, name});
        let news = {
          LetterName_imgSrc: LetterName_imgSrc,// 大写字母
          cars_name: cars_name
        };
        child.push(news) // 存入数组
      })
      logoTypeName.push({
        letter: letter,
        child: child
      })
    })
    return logoTypeName
  } else {
    console.log('无数据传入!')
    return
  }
}