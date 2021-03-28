// var num = parseInt(process.argv[2]) || 100  //获取一个输入  第一项为node  第二项为factor.js 第三项就是输入值

// console.log(num + ':')

var fs = require('fs')

fs.readFile('./factor.js',(err,data) => {
  console.log(data)
})

console.log(2)
// for(var i = 2; ;i++) {
//   while(num % i == 0) {
//     console.log(i)
//     num = num / i
//     if(num == 1) {
//       process.exit(0)
//     }
//   }
// }

