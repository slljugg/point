const express = require('express')

const port = 8080
const server = express()


server.get('/foo/bar', (req, res, next) => {
  console.log(req.url)
  res.end('getget')
})

server.use('/bar', (req, res, next) => {
  console.log(req.url)
  res.end('hello')
})

server.listen(port, () => {
  console.log('listening on port', port)
})