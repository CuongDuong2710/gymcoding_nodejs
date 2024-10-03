# CHAPTER 1- CREATE A SERVER by HTTP and LISTEN port 3000

```
const http = require('http')

const server = http.createServer((req, res) => {
    res.end('Hello From Node.js')
})

server.listen(3000, () => {
    console.log('Server running on port 3000')
})

>> node index.js // run terminal
```

Nodemon is a monitoring script that will automatically restart Node.js when it detects any changes to the files
in your project.


D:/...gymcoding_nodejs\finly> npm run dev  

```
> finly@1.0.0 dev 
> nodemon index.js

[nodemon] 3.1.7
[nodemon] to restart at any time, enter `rs`  
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Server running on port 3000
```

# CHAPTER 3 - CREATE A SERVER by HTTP and LISTEN port 3000

To simplify the process of building a web application, you can use a framework called `Express`

Express enables you to specify and separate the URL routes available in your application

The asterisk * symbol is known as the wild card route, it will match any URL route
You need to define this route at the bottom of your routes. If the top, you'll get the 404 response when you visit a valid route

app.listen(PORT, () => {...} // enable the server to listen for requests

`Morgan` is used for logging your Node.js application