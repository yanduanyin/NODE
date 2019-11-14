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
.wait(4000)
.evaluate(() => document.querySelector("div.feed").innerHTML)
.then(htmlStr => {
  // console.log(htmlStr)
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


let getCarsApp  = (htmlStr) => {
  if (htmlStr) {
    console.log(htmlStr, 1);

    let $ = cheerio.load(htmlStr);
    
    // 使用cheerio对所要抓取数据的Dom结构进程处理
    $('div.box').each(function (index, item) { 
      let lsjson = ''
      let titlejson = ''
      $('a.photo', this).each(function (pindex, pitem) {
        lsjson = {
          href_logo: $(this).attr('href'), //logo链接地址
          // imgUrl: $(this).children().first().attr('url'),
          imgUrl: 'https://p1.pstatp.com/w480/pgc-image/b52a788fbc5e438a890c35baf352adfc.webp',
          video_time: $(this).children('.duration').text()
        }
      })
      $('div.info', this).each(function (Iindex, Iitem) {
        titlejson = {
          href_title: $(this).children('.title').attr('href'),
          text_title: $(this).children('.title').text(),
          href_name: $(this).children('.name').attr('href'),
          text_name: $(this).children('.name').children().first().text(),
          text_time: $(this).children('.name').children().last().text()
        }
      })
      let news = JSON.parse((JSON.stringify(lsjson) + JSON.stringify(titlejson)).replace(/}{/, ',')); // 将两个json合并
      CarsAppData.push(news) // 存入数组
    })
    return CarsAppData
  } else {
    console.log('无数据传入!')
    return
  }
}