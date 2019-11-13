// // 引入所需要的第三方包
// const superagent = require('superagent');
const fs = require('fs');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});  // show:true  显示内置模拟浏览器


// 热点排行榜数据
var CarsAppData = []
// 通过nightmare 加载需要手动发起接口请求来动态获取数据的DOm结构
nightmare
.goto('https://www.dcdapp.com/')
.wait("div.feed")
.evaluate(() => document.querySelector("div.feed").innerHTML)
.then(htmlStr => {
  console.log(htmlStr)
  CarsAppData = getCarsApp(htmlStr)
  // console.log(CarsAppData)
  CarsAppData = JSON.stringify(CarsAppData)
  fs.writeFile("CarsAppData.json", CarsAppData, "utf-8", (error) => {
    //监听错误，如正常输出，则打印null
    if (error == null) {
      console.log("恭喜您，CarsAppData数据爬取成功!)");
    }
  })
})
.catch(error => {
  console.log(`数据抓取失败 - ${error}`);
})


let getCarsApp  = (res) => {
  if (res) {
    let $ = cheerio.load(res.text);
    let childs = []
    // 使用cheerio对所要抓取数据的Dom结构进程处理
    $('div.box').each(function (index, item) { 
      $('span.jsx-985400560', this).each(function (Nindex, Nitem) {
        $(this).each(function () {
          let child = {
            nameTime: $(this).text()
          }
          childs.push(child)
        })
        
      })
      let news = {
        imgUrl: $(item).find('a.photo .jsx-4288683969').css('background-image').replace('url(','').replace(')',''),// 背景图片Url
        href_logo: $(item).find('a.photo').attr('href'), //logo链接地址
        href_title: $(item).find('div.info a.line-2').attr('href'),
        text_title: $(item).find('div.info a.line-2').text(),
        href_name: $(item).find('div.info .name').attr('href'),
        childs: childs
      };
      CarsAppData.push(news) // 存入数组
    })
    return CarsAppData
  } else {
    console.log('无数据传入!')
    return
  }
}