const superagent = require('superagent');
const fs = require('fs');
const cheerio = require('cheerio');

var videosDataArr = [];


superagent
.get('https://www.dcdapp.com/')
.end((err, res)  => {
  if (err) {
    // 访问失败
    console.log(`数据抓取失败！ - ${err}`)
  } else {
    // 访问成功， 请求页面返回的数据会包含在res
    // 抓取数据
    // console.log(res);
    videosData = getvideos(res)
    // 打印数据
    console.log(videosData)
  videosData = JSON.stringify(videosData) 
  fs.writeFile("videosData.json", videosData, "utf-8", (error) => {
  //   //监听错误，如正常输出，则打印null
    if (error == null) {
      console.log("恭喜您，videosData数据爬取成功!)");
    }
  })
  }
});


let getvideos  = (res) => {
  if (res) {
    let $ = cheerio.load(res.text);
    // 使用cheerio对所要抓取数据的Dom结构进程处理
    $('.videos ').each(function (index, item) {
      let video = '', smallvideoWrapper = [],
      bigvideo_imageUrl = $(this).children().first().children('a').children('.video-transition').children('.big-video').attr('style').replace('background-image:url(','https:').replace(')','')
      video = {
        bigvideo_href: $(this).children().first().children('a').attr('href'),
        bigvideo_title: $(this).children().first().children('a').children().last().text(),
        bigvideo_imageUrl: bigvideo_imageUrl,
        smallvideo: smallvideoWrapper
      }
      $('.right-rection', this).each(function () {
        $('.small-video-wrapper', this).each(function (sindex, sitem) {
          let smallvideo_imageUrl = $(sitem).children('a').children('.video-transition').children().attr('style').replace('background-image:url(','https:').replace(')','')
          let smallvideo = {
            smallvideo_href: $(sitem).children('a').attr('href'),
            smallvideo_title: $(sitem).children().last().text(),
            smallvideo_imageUrl: smallvideo_imageUrl,
            smallvideo_time: $(sitem).children('a').children('.video-transition').children('.small-video').children().text()
          }
          smallvideoWrapper.push(smallvideo)
        })
      })
      videosDataArr.push(video)
    })
    return videosDataArr
  } else {
    console.log('无数据传入!')
    return
  }
}