const http = require('http')


const port = 8080
const server = http.createServer()

server.on('request',(request,response) => {
  console.log(request.method, request.url)
  // console.log(request.headers)
  request.on('data',data => {
    console.log(data.toString())
  })
  response.write('hello world')
  response.end()
})


server.listen(port, () => {
  console.log('listening on port',port)
})