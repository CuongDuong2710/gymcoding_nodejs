const http = require('http')

const server = http.createServer((req, res) => {
    const { url } = req
    console.log(req.url)
    if (url === '/') {
        res.end('Hello World')
    } else if (url === '/contact') {
        res.end('The Contact page')
    } else if (url === '/about') {
        res.end('The About page')
    } else {
        res.writeHead(404)
        res.end('Not Found')
    }
    // res.end('Hello From Node.js')
})

server.listen(3000, () => {
    console.log('Server running on port 3000')
})



// req.url
// http://localhost:3000/about -> /about 
// http://localhost:3000/contact -> /contact