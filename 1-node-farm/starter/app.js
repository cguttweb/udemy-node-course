const fs = require('fs')
const http = require('http')

// Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt')
// console.log(textIn)

// const textOut = `This is what we know abot avocados: ${textIn}.\nCreated on ${Date.now()}`

// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File created!')

// Asynchronous way 2 parameters for callback function 1st error and 2nd data itself
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('You have an error!')
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2)
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3)

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('File written!')
//       })
//     })
//   })
// })

// Simple web server

const server = http.createServer((req, res) => { 
  res.end('Hello from server')
})
// 1st parameter is port number using 8000/2nd parameter is the host
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000')  
})