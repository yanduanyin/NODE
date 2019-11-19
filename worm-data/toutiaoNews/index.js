const cheerio = require('cheerio');
const fs = require('fs');
const Nightmare = require('nightmare');
const nightmare = Nightmare({show: true});  // show:true  显示内置模拟浏览器
var newsList = [] // 用来存新闻数据

nightmare
.goto('https://www.toutiao.com/')
.wait(6000)
.evaluate(() => document.querySelector("div.feed-infinite-wrapper").innerHTML)
.then(htmlStr => {
  // console.log(htmlStr,1)
  newsListData = getnewsList(htmlStr)
  // console.log(newsListData, 2)
  newsListData = JSON.stringify(newsListData)
  fs.writeFile("newsListData.json", newsListData, "utf-8", (error) => {
    //监听错误，如正常输出，则打印null
    if (error == null) {
      console.log("恭喜您，newsListData数据爬取成功!)");
    }
  })
})
.catch(error => {
  console.log(`数据抓取失败 - ${error}`);
})
let getnewsList  = (res) => {
  if (res) {
    let $ = cheerio.load(res);
    $('ul li').each(function (index, item) {
      if ($(item).children().attr('class') === 'no-mode') {
        let titem = $(item).children('.no-mode').children('.title-box');
        let fitem = $(item).children('.no-mode').children('.footer-bar');
        let news1 = {
          title_href: titem.children().attr('href'),
          title_text: titem.children().text(),
          tag_href: fitem.children('.footer-bar-left').children('.tag').attr('href'),
          tag_text: fitem.children('.footer-bar-left').children('.tag').text(),
          mediaAvatar_href: fitem.children('.footer-bar-left').children('.media-avatar').attr('href'),
          mediaAvatar_imgsrc: fitem.children('.footer-bar-left').children('.media-avatar').children().first().attr('src'),
          source1_href: fitem.children('.footer-bar-left').children('.source').first().attr('href'),
          source1_text: fitem.children('.footer-bar-left').children('.source').first().text(),
          source2_href: fitem.children('.footer-bar-left').children('.source').last().attr('href'),
          source2_text: fitem.children('.footer-bar-left').children('.source').last().text(),
          time_text: fitem.children('.footer-bar-left').children('span').text()
        }
        newsList.push(news1)
      } else {
        let litem = $(item).children('.single-mode').children('.single-mode-lbox');
        let ritem = $(item).children('.single-mode').children('.single-mode-rbox').children('.single-mode-rbox-inner');
        let news2 = {
          img_href: litem.children('.img-wrap').attr('href'),
          img_src: litem.children('.img-wrap').children().attr('src'),
          title_href: ritem.children('.title-box').children().attr('href'),
          title_text: ritem.children('.title-box').children().text(),
          tag_href: ritem.children('.footer-bar').children('.footer-bar-left').children('.tag').attr('href'),
          tag_text: ritem.children('.footer-bar').children('.footer-bar-left').children('.tag').text(),
          mediaAvatar_href: ritem.children('.footer-bar').children('.footer-bar-left').children('.media-avatar').attr('href'),
          mediaAvatar_imgsrc: ritem.children('.footer-bar').children('.footer-bar-left').children('.media-avatar').children().attr('src'),
          source1_href: ritem.children('.footer-bar').children('.footer-bar-left').children('.source').first().attr('href'),
          source1_text: ritem.children('.footer-bar').children('.footer-bar-left').children('.source').first().text(),
          source2_href: ritem.children('.footer-bar').children('.footer-bar-left').children('.source').last().attr('href'),
          source2_text: ritem.children('.footer-bar').children('.footer-bar-left').children('.source').last().text(),
          time_text: ritem.children('.footer-bar').children('.footer-bar-left').children('span').text()
        }
        newsList.push(news2)
      }  
    })
    return newsList
  } else {
    console.log('无数据传入!')
    return
  }
}
