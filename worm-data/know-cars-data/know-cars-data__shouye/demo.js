const https = require('https'); // Node.js提供了http/https模块，用于搭建HTTP服务端和客户端
const cheerio = require('cheerio');// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
const url = 'https://www.dcdapp.com' // 输入任何网址都可以 这里demo以豆瓣为例
const Koa = require('koa2');
const app = new Koa()
const Nightmare = require('nightmare');
const fs = require('fs');
const nightmare = Nightmare({show: true});  // show:true  显示内置模拟浏览器


app.use((ctx, next) => {
  ctx.body = {siteData}
  // ctx.body = {cityList}
})

app.listen(3001, () => {
  console.log('server is runding 3001')
})
// 通过nightmare 加载需要手动发起接口请求来动态获取数据的DOm结构
nightmare
.goto(url)
.wait("section.jsx-3450653894")
.evaluate(() => document.querySelector("section.jsx-3450653894").innerHTML)
.then(htmlStr => {
  // 获取本地新闻数据
  // console.log(htmlStr)
  siteData = getCityname(htmlStr)

  siteData = JSON.stringify(siteData)
  fs.writeFile("siteData.json", siteData, "utf-8", (error) => {
    //监听错误，如正常输出，则打印null
    if (error == null) {
      console.log("恭喜您，siteData数据爬取成功!)");
    }
  })
})
.catch(error => {
  console.log(`城市名字数据抓取失败 - ${error}`);
})

// 城市名字列表数据 数组
var cityListData = [];
var cityList = [];
https.get(url,(res) => { // 发送get请求
  var html = ''
  // 获取页面数据
  res.on('data', (data) => {
    html += data // 字符串的拼接
  })
  // 数据获取结束
  res.on('end', () => {
     // 打印信息
    //  console.log(html)
    //  var siteData = getCityname(html)
    //  console.log('siteData', siteData)
  })
}).on('error',  () =>{
  console.log('获取资源出错误!')
})

// 过滤页面信息
let getCityname  = (htmlStr) => {
 if (htmlStr) {
    // 沿用JQuery风格，定义$
    var $ = cheerio.load(htmlStr);
   // 根据class获取DOM
      // cityListDom.find('section[class="jsx-3082016416"]').each(function(item) {
        // $('section.jsx-3450653894 div.jsx-3082016416 div.cities').each((item) => {
        // var smallLetter = cityname.attr('data-letter');
        // var bigLetter = cityname.find('h4').text();
      // }); 
      // console.log('htmlStr', htmlStr);
        $('.cities').each(function (index, item) {
          let letter = $(this).attr('data-letter')
          // console.log('letter', letter)
          let child = [];
          let citynames = [];
          $('span', this).each(function(sindex, sitem){
            $(this).each(function(tindex, titem) {
              let city_name = $(this).text()
              let city_names = {
                city_name: city_name
              }
              citynames.push(city_names)
            })
          })
          $('h4', this).each(function(hindex, hitem){
            let h4_content =  $(this).text()
            child.push({
              h4_content: h4_content,
              citynames: citynames
            })
          })
         
          let cityArrs = {
            letter: letter,
            child: child
          }
          cityList.push(cityArrs)
        })
      // 返回处理好的数组
    return cityList
  } else {
    console.log('无数据传入!')
    return
  }
}