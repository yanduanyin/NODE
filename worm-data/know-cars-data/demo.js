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
     var siteData = filterSlideList(html)
     console.log('siteData', siteData)
  })
}).on('error',  () =>{
  console.log('获取资源出错误!')
})

// 过滤页面信息
function filterSlideList(html) {
 if (html) {
    // 沿用JQuery风格，定义$
    var $ = cheerio.load(html);
   // 根据id获取轮播图列表信息
    var cityListDom = $('.jsx-3450653894 section[class="jsx-3082016416"]');
    // 城市名字列表数据
    var cityListData = [];
    var cityList = [];
    cityListDom.find('section[class="jsx-3082016416"]').each(function(item) {
      var cityname = $(this)
      var smallLetter = cityname.find('div').attr('data-letter');
      var bigLetter = cityname.find('div').children('h4').text();
      cityname.find('div').children('span[class="jsx-3082016416"]').each((item) => {
        cityList.push({
          'cityname': item
        })
      })
      cityList.unshift({
        'bigLetter': bigLetter
      })
      cityListData.push(
        {
          'a': '1',
          smallLetter: smallLetter,
          cityList: cityList
        }
      )
    });
    // 返回处理好的数据
    return cityListData;
  } else {
    console.log('无数据传入!')
    return 'a'
  }
}