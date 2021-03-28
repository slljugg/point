var net = require('net')

var port = 8080
var server = net.createServer()

server.on('connection', conn => {
  conn.on('data', data => {
    // var path = data.toString().split('\r\n\r\n')[0].split('\r\n')[0].split(' ')[1]
    // console.log(path)
    console.log(data.toString())
    conn.write(
`HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Date: ${new Date().toISOString()}

<h1>hello, now is ${new Date().toLocaleString()}</h1>`)
  conn.end()
  })
})

server.listen(port, () => {
  console.log('server listening on port',port)
})