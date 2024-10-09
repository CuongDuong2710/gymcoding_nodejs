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

# CHAPTER 4 - Using EJS templating engine for views

Templating engines allow you to dynamically render your HTML pages.

EJS enables you to embed Javascript by using the <% %> tag.

```
http://localhost:3000/about
The About page
Response created using EJS
```

Setting content to `views` folder in `tailwind.config.js`
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}


You can resuse EJS Template with partials by include() function


npm install --save-dev tailwindcss postcss autoprefixer postcss-cli

npx tailwindcss init-p
Created Tailwind CSS config file: tailwind.config.js
Created PostCSS config file: postcss.config.js  // tool is used to run CSS compilation

"devcss": "postcss public/styles/tailwind.css -o public/styles/style.css -w"

The `-o` option is used to tell PostCSS where to put the produced CSS file -> `public/styles/style.css`

The `-w` option passed to PostCSS will make it watch our template files for any changes, and then run the process again.

# CHAPTER 7 - Connect MongoDB
npm install mongodb mongoose
npm install dotenv

# CHAPTER 8 - MVC

MongoDB will only create a database when you insert data into a collection.

So, first enter urls `http://localhost:3000/users/create` to create user -> Mongo cluster will display `finly` database and `user` collection

# CHAPTER 9 - AUTHENTICATION

In Express, user authentication can be done by creating a session as an identifier that keeps track of the user.

When  the user signs up or logs into our application, a session is created by Express and sent to the browser as a cookie.

The cookie needs to be included in all subsequent requests sent by the browser -> Express knows that the user is allowed to access the resource it wants to access.

When user logs out, the session and cookie are removed from both the server and the client.

npm install express-session

$ openssl rand -base64 32 -> generate AUTH_SECRET