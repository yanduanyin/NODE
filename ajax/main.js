// live-server  
// index.html  http  访问的支持 web server
const http = require('http');
const fs = require('fs');
const index = fs.createReadStream('./index.html');
// web server  一直伺服的 3000
// 向require  返回 response 资源
const server = http.createServer((req, res) => {
    // res.end('hello world');
    // indexedDB.html  显示出来   /
    // req 浏览器 访问网站的代理
    if(req.url == '/') {
        index.pipe(res);
        // res.end('index page');
} else if(req.url == '/userinfo') {
    const info = {
        "name": "严端银",
        "desc":"学富wuj"
    }
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf8'
    })
    res.end(JSON.stringify(info));
} else {
        res.end('hello world');
    }
})


server.listen(1314);
