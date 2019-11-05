// // 引入所需要的第三方包
const superagent = require('superagent');
const cheerio = require('cheerio');
const Nightmare = require('nightmare'); //  自动化测试包，处理动态页面
const express = require('express');
const nightmare = Nightmare({show: true});  // show:true  显示内置模拟浏览器
const app = express();

let hotNews = []; // 热点新闻
let localNews = []; // 本地新闻
// 用express 启动一个本地监听3000端口的Http服务
let server = app.listen(3001, function () {
  let  host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host,port);
})
// 按照国际惯例，我们希望在访问本机地址http://localhost:3001的时候，
// 这个服务能给我们犯规一个Hello World！
app.get('/',  async (req, res, next) => {
  res.send({
    hotNews: hotNews,
    localNews: localNews
  });
});

/**
 * index.js
 * [description] - 使用superagent.get()方法来访问百度新闻首页
 */
superagent.get('https://news.baidu.com/').end((err, res)  => {
  if (err) {
    // 访问失败
    console.log(`热点新闻抓取失败！ - ${err}`)
  } else {
    // 访问成功， 请求页面返回的数据会包含在res
    // 抓取热点新闻数据
    hotNews = getHotNews(res)
    // 打印数据
    // console.log(hotNews)
    //本地新闻数据 加载需要手动发起接口请求来动态获取数据的DOm结构
    // 所以通过nightmare 模拟发起接口请求获取数据
    // localNews = getLocalNews(res)
  }
})
// 通过nightmare 加载需要手动发起接口请求来动态获取数据的DOm结构
nightmare
.goto('http://news.baidu.com/')
.wait("div#local_news")
.evaluate(() => document.querySelector("div#local_news").innerHTML)
.then(htmlStr => {
  // 获取本地新闻数据
  localNews = getLocalNews(htmlStr)
})
.catch(error => {
  console.log(`本地新闻抓取失败 - ${error}`);
})


// 定义抓取数据的函数 getHotNews
let getHotNews = (res) => {
  let hotNews = [];
  // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res.text中
/* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
     以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
  */
//  console.log(res.text);
  let $ = cheerio.load(res.text);
// 通过cheerio语法 找到目标数据的页面Dom结构， 获取数据
$('div#pane-news ul li a').each((index, item) => {
  // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数index是当前遍历的元素的索引，item就是当前便利的DOM元素
  let news = {
    title: $(item).text(),// 获取新闻标题
    href: $(item).attr('href')// 获取新闻网页链接
  };
  hotNews.push(news) // 存入数组
})
return hotNews
};
let getLocalNews = (htmlStr) => {
  // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res.text中
/* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
     以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
  */
//  console.log(res.text);
  let $ = cheerio.load(htmlStr);
// 通过cheerio语法 找到目标数据的页面Dom结构， 获取数据

// 本地新闻
$('ul#localnews-focus li a').each((index, item) => {
  // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数index是当前遍历的元素的索引，item就是当前便利的DOM元素
  let news = {
    title: $(item).text(),// 获取新闻标题
    href: $(item).attr('href')// 获取新闻网页链接
  };
  localNews.push(news) // 存入数组
})

// 本地资讯
$('ul#localnews-zixun ul li a').each((index, item) => {
  // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数index是当前遍历的元素的索引，item就是当前便利的DOM元素
  let news = {
    title: $(item).text(),// 获取新闻标题
    href: $(item).attr('href')// 获取新闻网页链接
  };
  localNews.push(news) // 存入数组
})
return localNews
};
