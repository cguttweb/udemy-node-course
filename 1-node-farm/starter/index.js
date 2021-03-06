const fs = require('fs')
const http = require('http')
const url = require('url')

const replaceTemplate = require('./modules/replaceTemplate')
const slugify = require('slugify')

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

// top level is only run once
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const templateOverview = fs.readFileSync(`${__dirname}/templates/overview-template.html`, 'utf-8')
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const templateProduct = fs.readFileSync(`${__dirname}/templates/product-template.html`, 'utf-8')
const dataObj = JSON.parse(data)

<<<<<<< HEAD:1-node-farm/starter/app.js
=======
const slugs = dataObj.map(el => slugify(el.productName, { lower: true }))
console.log(slugs)

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)
>>>>>>> d42989323f8950824408f6102ca1a646f592be9f:1-node-farm/starter/index.js


const server = http.createServer((req, res) => { 

  const { pathname, query } = url.parse(req.url, true)


  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    const cardsHtml = dataObj.map((el) => replaceTemplate(templateCard, el)).join('')
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml) 
    res.end(output)

    // Product pages
  } else if (pathname === '/product'){

    res.writeHead(200, { 'Content-Type': 'text/html' })
    const product = dataObj[query.id]
    const output = replaceTemplate(templateProduct, product)
    res.end(output)

    // API
  } else if (pathname === '/api'){
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(data)
  } else {
    res.writeHead(404, {
      // set headers - info about response being sent back
      'Content-Type': 'text/html',
      'my-header': 'hello-node'
    })
    res.end('<h1>Page not found</h1>')
  }


})
// 1st parameter is port number using 8000/2nd parameter is the host
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000')  
})