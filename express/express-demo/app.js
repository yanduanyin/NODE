// let http = require('http')

// let server = http.createServer()

// server.on('request', (req, res) => {
//   res.end('hello world!')
// })
// server.listen(3001, () => {
//   console.log('服务已启动')
// })

const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.end('hello world!')
})
app.listen(3001, () => {
  console.log('服务已启动')
})

