const http = require('http')
const fs = require('fs')
const path = require('path')

const fsp = fs.promises


const port = 8080
const baseDir = __dirname
var mimeMap = {
  '.jpg': 'image/jpeg',
  '.html': 'text/html',
  '.css': 'text/stylesheet',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.text': 'text/plain'
}

const server = http.createServer()

server.on('request',(req,res) => {
  console.log(req.url)
  console.log(__dirname)
  var allPath = path.join(baseDir,req.url)
  fs.stat(allPath,(err,stat) => {
    if(err) {
      res.writeHead(404,{
        'Content-Type': 'text/html;charset=UTF-8'
      })
      res.end('404 not found')
    } else {
      if(stat.isFile()) {
        fs.readFile(allPath, (err,data) =>{ 
          res.writeHead(200,{
          'Content-Type': 'charset=UTF-8'
          })
          res.end(data)
        })
      } else if (stat.isDirectory()) {
        var indexPath = path.join(allPath,'index.html')
        fs.stat(indexPath,(err,stat) => {
          if(err) {
            if(!req.url.endsWith('/')) {
              res.writeHead(301,{
              'location': req.url + '/'
              })
              res.end()
              return 
            }
            fs.readdir(allPath, {withFileTypes:true}, (err,entries) => {
              res.end(`
                ${
                  entries.map(entry => {
                    var slash = entry.isDirectory() ? '/' : ''
                    return `
                      <div>
                        <a href=${entry.name}${slash}>${entry.name}${slash}</a>
                      </div>
                    `
                  }).join('')
                }
              `)
            })
          } else {
            fs.readFile(indexPath,(err,data) =>{
              res.end(data)
            })
          }
        })
      }
    }
  })
})






// server.on('request',async (req,res) => {
//   console.log(req.url)
//   console.log(__dirname)
//   var allPath =decodeURIComponent(path.join(baseDir,req.url)) 
//   if(!allPath/startsWith(baseDir)) {
//     res.end('hello hancer')
//     return
//   }
//   if(allPath.split('/').some(seg => seg.startsWith('.'))) {
//     res.end('hello hancer')
//     return
//   }
//   try {
//     var stat = await fsp.stat(allPath)
//     if(stat.isFile()) {
//       var data = await fsp.readFile(allPath) 
//       var type = mimeMap[path.extname(allPath)]
//       if(type) {
//           res.writeHead(200,{'Content-Type': `${type};charset=UTF-8`})
//         } else {
//           res.writeHead(200,{'Content-Type': `application/octet-strem`})
//         }
//         res.end(data)
//     } else if (stat.isDirectory()) {
//       var indexPath = path.join(allPath,'index.html')
//       try {
//         await fsp.stat(indexPath)
//         var indexContent = await fsp.readFile(indexPath)
//         var type = mimeMap[path.extname(indexContent)]
//         if(type) {
//           res.writeHead(200,{'Content-Type': `${type};charset=UTF-8`})
//         } else {
//           res.writeHead(200,{'Content-Type': `application/octet-strem`})
//         }
//         res.end(indexContent)
//       } catch(e) {
//         if(!req.url.endsWith('/')) {
//           res.writeHead(301,{
//           'location': req.url + '/'
//           })
//           res.end()
//           return 
//         }
//         var allPath = fs.readdir(allPath, {withFileTypes:true})
//         res.end(`
//           ${
//             entries.map(entry => {
//               var slash = entry.isDirectory() ? '/' : ''
//               return `
//                 <div>
//                   <a href=${entry.name}${slash}>${entry.name}${slash}</a>
//                 </div>
//               `
//             }).join('')
//           }
//         `)
//       }
//     }
//   } catch(e) {
//     res.writeHead(404,{
//       'Content-Type': 'text/html;charset=UTF-8'
//       })
//       res.end('404 not found')
//   }
// })






server.listen(port, () => {
  console.log('listening on port',port)
})