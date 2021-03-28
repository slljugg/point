const http = require('http')
const querystring = require('querystring')

const port = 8080
const server = http.createServer()
const msgs = [{
  name:'zhansan',
  content:'hello'
}
]

server.on('request',(request,response) => {
  if(request.method == 'GET'){
    response.writeHead(200,{
      'content-Type': 'text/html;charset=UTF-8'
    })
    response.write(
      `
      <form method="POST" action="/">
        Name: <br>
        <input name='name'/><br>
        Message: <br>
        <textarea name='content'></textarea><br>
        <button>提交</button>
      </form>
      
      `
    )
    msgs.reduceRight((momo, msg)=>{
      var html = `
        <div class="message-box">
          <h3>${msg.name}</h3>
          <pre>${msg.content}</pre>
        </div>
      `
      response.write(html)
    },null)
    response.end()
    return
  }
  if(request.method == 'POST'){
    request.on('data', data=>{
      var msg = querystring.parse(data.toString())
      msgs.push(msg)
      response.writeHead(301,{
        'location': '/'
      })
      response.end()
    })
  }
})


server.listen(port, () => {
  console.log('listening on port',port)
})