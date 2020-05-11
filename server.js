const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let body = null
  const publicPath = './public'

  try {
    console.log(`${publicPath}${req.url}`)
    body = fs.readFileSync(`${publicPath}${req.url}`)
  } catch (e) {
    body = fs.readFileSync(`${publicPath}/index.html`)
  }

  res.end(body)
})

const port = process.env.PORT || 3000

server.listen(port)
console.log('Server started on port: ', port)
