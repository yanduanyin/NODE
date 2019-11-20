const http = require('http');

http.createServer((req, res) => {
  const url = require('url').parse(req.url)
  if (url.pathname === '/api/books') {
    const methodName = url.query && url.query.split('=')[1];    
    console.log(methodName)
    let list = [{book: 'book2'}]
    res.end(`${methodName}(${JSON.stringify(list)})`);
  }
})
.listen(3000, () => {
  console.log('Server is running http://localhost:3000');
})
