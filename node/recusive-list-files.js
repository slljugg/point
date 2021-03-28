const fs = require('fs')
const lodash = require('lodash')
const path = require('path')
const fsp = fs.promises

function listAllFilesSync(path) {
  var result = []
  var stat = fs.statSync(path)
  if(stat.isFile()) {
    return [path]
  } else {
    var names = fs.readdirSync(path)
    names.forEach(name =>{
      var fullname = path + '/' + name
      var stat = fs.statSync(fullname) 
      if (stat.isFile()) {
        result.push(fullname)
      } else {
        var files =  listAllFilesSync(fullname)
        result.push(...files)
      }
    })
    return result 
  }
}

function listAllFilesPromise(path) {
  return fsp.stat(path).then(stat => {
    if(stat.isFile()) {
      return [path]
    } else {
      return fsp.readdir(path, {withFileTypes:true}).then(entries =>{
        return Promise.all(entries.map(entry =>{
          var fullname = path + '/' + entry.name
          if(entry.isFile()) {
            return [fullname]
          } else {
            return listAllFilesPromise(fullname)
          }
        })).then(arrays =>{
          return [].concat(...arrays)
        })
      })
    }
  })
}

function listAllFilesPromise2(path) {
  return fsp.stat(path).then(stat => {
    if(stat.isFile()) {
      return [path]
    } else {
      return fsp.readdir(path, {withFileTypes:true}).then(entries =>{
        return Promise.all(entries.map(entry =>{
          var fullname = path + '/' + entry.name
            return listAllFilesPromise(fullname)
        })).then(arrays =>{
          return [].concat(...arrays)
        })
      })
    }
  })
}


console.log(listAllFilesSync('./aaa'))

listAllFilesPromise('./aaa').then(console.log)
listAllFilesPromise2('./aaa').then(console.log)