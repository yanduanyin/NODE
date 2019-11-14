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
.wait(6000)
.evaluate(() => document.querySelector("div.content").innerHTML)
.then(htmlStr => {
  // console.log(htmlStr)
  hotSpotData = gethotSpot(htmlStr)
  // console.log(hotSpotData, 1)
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


let gethotSpot  = (htmlStr) => {
  if (htmlStr) {
    let $ = cheerio.load(htmlStr);
    console.log(htmlStr,2);
    
    let lsnews = ''
    // 使用cheerio对所要抓取数据的Dom结构进程处理
    $('div.list').each( function(index, item){ 
      let rank = $(item).children('.rank').text()
      $('.series', this).each(function (sindex, sitem) {
        lsnews = {
          cars_name: $(this).children('.name').text(),
          cars_price: $(this).children().last().text()
        }
      })
      let news1 = {
       cars_rank: rank
      };
      let news = JSON.parse((JSON.stringify(lsnews) + JSON.stringify(news1)).replace(/}{/, ',')); // 将两个json合并
      hotSpotData.push(news) // 存入数组
    })
    return hotSpotData
  } else {
    console.log('无数据传入!')
    return
  }
}