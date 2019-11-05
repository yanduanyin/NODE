// 加载http模块
var http = require('http');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');

// 定义网络爬虫的目标地址：自如友家的主页
var url = 'http://www.ziroom.com/';

http.get(url, function(res) {
    var html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += data;
    });
    // 数据获取结束
    res.on('end', function() {
        // 通过过滤页面信息获取实际需求的轮播图信息
        var slideListData = filterSlideList(html);
        // 打印信息
        console.log(slideListData);
    });
}).on('error', function() {
    console.log('获取数据出错！');
});

/* 过滤页面信息 */
function filterSlideList(html) {
    if (html) {
        // 沿用JQuery风格，定义$
        var $ = cheerio.load(html);
        // 根据id获取轮播图列表信息
        var slideList = $('#foucsSlideList');
        // 轮播图数据
        var slideListData = [];

        /* 轮播图列表信息遍历 */
        slideList.find('li').each(function(item) {

            var pic = $(this);
            // 找到a标签并获取href属性
            var pic_href = pic.find('a').attr('href');
            // 找到a标签的子标签img并获取_src
            var pic_src = pic.find('a').children('img').attr('_src');
            // 找到a标签的子标签img并获取alt
            var pic_message = pic.find('a').children('img').attr('alt');
            // 向数组插入数据
            slideListData.push({
                pic_href : pic_href,
                pic_message : pic_message,
                pic_src : pic_src
            });
        });
        // 返回轮播图列表信息
        return slideListData;
    } else {
        console.log('无数据传入！');
    }
}

/* 打印信息 */
function printInfo(slideListData) {
    // 计数
    var count = 0;
    // 遍历信息列表
    slideListData.forEach(function(item) {
        // 获取图片
        var pic_src = item.pic_src;
        // 获取图片对应的链接地址
        var pic_href = item.pic_href;
        // 获取图片信息
        var pic_message = item.pic_message;
        // 打印信息
        console.log('第' + (++count) + '个轮播图');
        console.log(pic_message);
        console.log(pic_href);
        console.log(pic_src);
        console.log('\n');
    });
}