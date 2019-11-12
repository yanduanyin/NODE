// // 引入所需要的第三方包
const superagent = require('superagent');
const fs = require('fs');
const cheerio = require('cheerio');


// 热点排行榜数据
var hotSpotData = []
/**
 * index.js
 * [description] - 使用superagent.get()方法来访问百度新闻首页
 */
superagent
.get('https://www.dcdapp.com/popular')
.end((err, res)  => {
  if (err) {
    // 访问失败
    console.log(`数据抓取失败！ - ${err}`)
  } else {
    // 访问成功， 请求页面返回的数据会包含在res
    // 抓取数据
    hotSpotData = gethotSpot(res)
    // console.log(res)
    // 打印数据
    console.log(hotSpotData)
    // 有些数据 加载需要手动发起接口请求来动态获取数据的DOm结构
    // 所以通过nightmare 模拟发起接口请求获取数据
  }
  // 将爬下来的数据写成json保存下来
  hotSpotData = JSON.stringify(res) // 将数组变成字符串
  console.log(hotSpotData)
  // fs.writeFile("hotSpotData.json", hotSpotData, "utf-8", (error) => {
  // //   //监听错误，如正常输出，则打印null
  //   if (error == null) {
  //     console.log("恭喜您，hotSpotData数据爬取成功!)");
  //   }
  // })
  fs.writeFile("hotSpotData.html", hotSpotData, "utf-8", (error) => {
  //   //监听错误，如正常输出，则打印null
    if (error == null) {
      console.log("恭喜您，hotSpotData数据爬取成功!)");
    }
  })

});

let gethotSpot  = (res) => {
  if (res) {
    let $ = cheerio.load(res.text);
    // 使用cheerio对所要抓取数据的Dom结构进程处理
    $('div.content .list').each(function (index, item) {


      
      let news = {
        imgUrl: $(item).find('.cover').css('background-image').replace('url(','').replace(')',''),// 背景图片Url
        time: $(item).find('.series p.time').text(), //排名上升或下降
        name: $(item).find('.series p.name').text(), // 车名字
        price: $(item).find('.series p.price').text() // 车价
      };
      hotSpotData.push(news) // 存入数组
    })
    return hotSpotData
  } else {
    console.log('无数据传入!')
    return
  }
}