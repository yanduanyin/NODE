var https = require('https'); // Node.js提供了http/https模块，用于搭建HTTP服务端和客户端
var cheerio = require('cheerio');// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var url = 'https://www.dcdapp.com' // 输入任何网址都可以 这里demo以豆瓣为例

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
     var siteData = filterSlideList(html)
     console.log('siteData', siteData)
  })
}).on('error',  () =>{
  console.log('获取资源出错误!')
})

// 过滤页面信息
let filterSlideList  = (html) => {
 if (html) {
    // 沿用JQuery风格，定义$
    var $ = cheerio.load(html,{decodeEntities:false});
   // 根据class获取DOM
    // var cityListDom = $('.jsx-3450653894 section[class="jsx-3082016416"]');
    // 城市名字列表数据
    var cityListData = [];
    var cityList = [];
    let p = new Promise(function (reslove, reject) {
      // cityListDom.find('section[class="jsx-3082016416"]').each(function(item) {
        $('section.jsx-3450653894 div.jsx-3082016416 div.cities').each((item) => {
        var cityname = $(this) // 把当前对象保存起来， 便于后面使用
        // console.log(this)
        var smallLetter = $('cities').attr('data-letter');
        var bigLetter = $('cities').children('h4').text();
        $('cities').find('span[class="jsx-3082016416"]').each((item) => {
          console.log(item)
          cityList.push({
            'cityname': item
          })
        })
        cityList.unshift({
          "bigLetter": "bigLetter"
        })
        cityListData.push({
            "smallLetter": "smallLetter",
            "cityList": cityList
          })
      }); 
      console.log('异步操作，逻辑部分完成！')
      // 返回处理好的数据
      reslove(cityListData)
    })
    p.then((data) => {
      console.log(data)
      cityListData = data
    })
    return cityListData
  } else {
    console.log('无数据传入!')
    return
  }
}