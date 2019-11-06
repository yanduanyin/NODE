const net = require('net');
const http = require('http');
const server = net.createServer();
const httpServer = http.createServer((req, res) => {
  res.end('i am from http');
  throw new Error('error');
})

server.on('connection', (socket) => {
  // socket.on('data', (data) => {
  //   console.log('server rec', data);
  //   socket.write('hi');
  // });
  httpServer.emit('connection', socket);
})
server.listen(8181, () => {
  console.log('server is running 8181');
})