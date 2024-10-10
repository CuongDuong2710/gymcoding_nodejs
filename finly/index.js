const express = require('express')
const morgan = require('morgan') // for logging
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

require('dotenv').config()
require('./lib/dbConnect')

const userRouter = require('./routes/user.route')
const dashboardRouter = require('./routes/dashboard.route')

const app = express() // CREATE an Express application

app.set('views', './views') // add specific configurations to Express
app.set('view engine', 'ejs')

app.use(morgan('dev')) // use() method is used to register a middleware function
app.use('/public', express.static(path.join(__dirname, './public'))) // make the `public` folder static so that the browser can reach the style.css file
app.use(express.urlencoded({ extended: false })) // Express needs to use this middleware to process form data

app.use(
    session({
        secret: process.env.AUTH_SECRET, // key used to sign the session
        saveUninitialized: true, // used to optimize the session storage
        resave: false // used to optimize the session storage
    })
)
app.use(flash())

// Express enables you to specify and separate the URL routes available in your application
app.use('/', userRouter) // use the `app.use()` instead of `app.get()` because we want to let the `userRouter` object handles the requests coming to the /users route
app.use('/dashboard', dashboardRouter)

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