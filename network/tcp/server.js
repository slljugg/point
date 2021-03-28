var net = require('net')

var port = 9090
var server = net.createServer(conn => {
  console.log('someone connect', conn.remoteAddress, conn.remotePort)
  conn.on('data', data => {
    console.log(conn.remoteAddress, conn.remotePort, 'say:', data.toString())
    conn.write(data.toString().toUpperCase())
  })
  conn.on('error',() => {})
})

server.listen(port, ()=> {
  console.log('listening on port',port)
})