const express = require('express')

const port = 8080
const app = express()
app.use((req,res,next) => {
  res.setHeader('Content-Type','text/plain;charset=UTF-8')
  next()
})

app.get('/',(req,res,next)=> {
  res.end('首页')
})

app.get('/question/:id',(req,res,next)=> {
  res.end(`您正在查看${req.params.id}号问题`)
})

app.get('/live/:id',(req,res,next)=> {
  res.end(`您正在收听${req.params.id}号知乎live`)
})

app.get('/people/:id',(req,res,next)=> {
  res.end(`您正在查看${req.params.id}的个人页面`)
})

app.listen(port,()=>{
  console.log(port)
})
