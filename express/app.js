const express = require('express')

const port = 8080
const server = express()
const bodrParser = require('./body-parser')
const static = require('./static')

server.use((req, res, next) => {
  console.log(req.method, req.url)
  req.starTtime = Date.now()
  next()
})

server.use(static('public'))

server.use(bodrParser('only json'))

server.use((req,res,next) => {
  var time = Date.now() - req.starTtime
  console.log('rquest task', time, 'ms')
})
server.listen(port, () => {
  console.log('listening on port', port)
})