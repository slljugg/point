var net = require('net')


var port = 8080
var server = net.createServer()

server.on('connection', conn => {
  conn.on('data', data => {
    var request = data.toString()
    var [header,body] = request.split('\r\n\r\n')
    var [firstLine,...headers] = header.split('\r\n')
    var [method,path] = firstLine.split(' ')
    
    var header = {}
    for(var h of headers) {
      var [key, val] = h.split(': ')
      header[key.toLowerCase()] =val
    }
      if(path == '/author') {
        if(header['accpet'] == 'text/html') {
        conn.write('HTTP/1.1 200 OK\r\n')
        conn.write('Content-Type: text/html; charset=UTF-8\r\n')
        if(header.referer.startsWith('http://www.baidu.com') || header.referer.startsWith('https://www.baidu.com')) {
          conn.write('Access-Control-Allow-Origin: *\r\n')
        }
        conn.write('\r\n')
        conn.end(`<div>i am author</div>`)
      }
        if(header['accpet'] == 'text/plain') {
        conn.write('HTTP/1.1 200 OK\r\n')
        conn.write('Content-Type: text/plain; charset=UTF-8\r\n')
        conn.write('Access-Control-Allow-Origin: *\r\n')
        conn.write('\r\n')
        conn.end(`i am author`)
      }
        if(header['accpet'] == 'application/json'){
        conn.write('HTTP/1.1 200 OK\r\n')
        conn.write('Content-Type: text/html; charset=UTF-8\r\n')
        conn.write('Access-Control-Allow-Origin: *\r\n')
        conn.write('\r\n')
        conn.end(`{"info": "i am author"}`)
      }
    }
    if(path == '/') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('\r\n')
      conn.end('hello world')
    }
  })
})


server.listen(port, ()=> {
  console.log('listening on port',port)
})