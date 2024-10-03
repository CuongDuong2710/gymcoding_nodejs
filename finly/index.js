const express = require('express')
const morgan = require('morgan') // for logging

const app = express() // CREATE an Express application

app.set('views', './views') // add specific configurations to Express
app.set('view engine', 'ejs')

app.use(morgan('dev')) // use() method is used to register a middleware function

// Express enables you to specify and separate the URL routes available in your application
app.get('/', (req, res) => {
    // res.send('Hello From Node.js')
    res.render('index', { message: 'Hello From Node.js' })
})

app.get('/contact', (req, res) => {
    // res.send('The Contact Page')
    res.render('index', { message: 'The Contact Page' })
})

app.get('/about', (req, res) => {
    // res.send('The About Page')
    res.render('index', { message: 'The About page' })
})

// The asterisk * symbol is known as the wild card route, it will match any URL route
// You need to define this route at the bottom of your routes. If the top, you'll get the 404 response when you visit a valid route
app.get('*', (req, res) => { 
    // res.status(404).send('Not Found')
    res.status(404).render('index', { message: 'Not Found' })
})

const PORT = 3000

app.listen(PORT, () => { // enable the server to listen for requests
    console.log(`Server running on port ${PORT}`)
})

/* 
[request_method] [route] [status] [amount of time]

GET / 200 3.715 ms - 18
GET /favicon.ico 404 1.689 ms - 9
GET /about 200 0.710 ms - 14
GET /contact 200 0.708 ms - 16
GET /abc 404 0.422 ms - 9 
*/