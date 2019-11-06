const http = require('http');
const httpServer = http.createServer((req, res) => {
  res.end('http res');
  throw new Error('error');
})
process.on('message', function(name, socketServer) {
  if(name === 'server') {
    socketServer.on('connection', (socket) => {
      httpServer.emit('connection', socket)
    })
  }
})
process.on('uncaughtException', (err) => {
  console.log(err);
  process.send({act: 'dead'})
})
httpServer.listen()