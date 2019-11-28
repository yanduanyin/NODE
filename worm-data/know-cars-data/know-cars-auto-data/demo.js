const Nightmare = require('nightmare');
const fs = require('fs');
const cheerio = require('cheerio');
const nightmare = Nightmare({show: true});  // show:true  显示内置模拟浏览器

var bigLetterData = [];


nightmare
.goto('https://www.dcdapp.com/auto')
.wait(5000)
.evaluate(() => document.querySelector("aside.jsx-2444836239").innerHTML)
.then(htmlStr => {
  console.log(htmlStr)
  bigLetterData = getbigLetter(htmlStr)
  // console.log(hotSpotData, 1)
  bigLetterData = JSON.stringify(bigLetterData)
  fs.writeFile("bigLetterData.json", bigLetterData, "utf-8", (error) => {
    //监听错误，如正常输出，则打印null
    if (error == null) {
      console.log("恭喜您，bigLetterData数据爬取成功!)");
    }
  })
})
.catch(error => {
  console.log(`数据抓取失败 - ${error}`);
})



let getbigLetter  = (res) => {
  if (res) {
    let $ = cheerio.load(res);
    // 使用cheerio对所要抓取数据的Dom结构进程处理
    $('div.brands div.jsx-2773791072').each(function(index, item){
      let carsName = []
      $('p.brand', this).each(function(idx, i) { 
        let list = {
          brand_id: $(i).attr('class').slice(21),
          imgSrc: $(i).children('img').attr('src'),
          text: $(i).children('span').text()
        }
        carsName.push(list)
      })
      let news = {
        bigLetter: $(item).attr('data-letter'),// 大写字母
        imgName: carsName
      };
      bigLetterData.push(news) // 存入数组
    })
    return bigLetterData
  } else {
    console.log('无数据传入!')
    return
  }
}