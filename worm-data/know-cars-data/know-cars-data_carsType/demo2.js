// // 引入所需要的第三方包
// const superagent = require('superagent');
const fs = require('fs');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});  // show:true  显示内置模拟浏览器


// 热点排行榜数据
var hotSpotData = []
// 通过nightmare 加载需要手动发起接口请求来动态获取数据的DOm结构
nightmare
.goto('https://www.dcdapp.com/popular')
.wait("div.newcar")
.evaluate(() => document.querySelector("div.newcar").innerHTML)
.then(htmlStr => {
  console.log(htmlStr)
  hotSpotData = gethotSpot(htmlStr)
  // console.log(hotSpotData)
  hotSpotData = JSON.stringify(hotSpotData)
  fs.writeFile("hotSpotData.json", hotSpotData, "utf-8", (error) => {
    //监听错误，如正常输出，则打印null
    if (error == null) {
      console.log("恭喜您，hotSpotData数据爬取成功!)");
    }
  })
})
.catch(error => {
  console.log(`数据抓取失败 - ${error}`);
})


let gethotSpot  = (res) => {
  if (res) {
    let $ = cheerio.load(res.text);
    // 使用cheerio对所要抓取数据的Dom结构进程处理
    $('div.list').each( (index, item) => { 
      let news = {
        imgUrl: $(item).find('div.cover').css('background-image').replace('url(','').replace(')',''),// 背景图片Url
        time: $(item).find('div.series .time').text(), //排名上升或下降
        name: $(item).find('div.series .name').text(), // 车名字
        price: $(item).find('div.series .price').text() // 车价
      };
      hotSpotData.push(news) // 存入数组
    })
    return hotSpotData
  } else {
    console.log('无数据传入!')
    return
  }
}