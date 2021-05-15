## What is Express.js and Why?
> Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.   
> See details in [Express_Doc](https://expressjs.com/).   
> Server logic is complex and we want to focus on our business logic.   

### Install express
- Delete file `routes.js` and all related imported in `app.js`
- `npm install --save express`
- In `package.json`, see express is in the list.
- Add `const express = require('express')` in `app.js`, hover over `express`, click "command", show up a file 'index.d.ts' for source code, actually 'e' is exported for express as a function.
- So we can add `const app = express()` and use `const app` as a function, like to create the server: `const server = http.createServer(app)`.

### Using middleware
- Request -> Middleware: `req, res, next => {...}` -> next() -> Middleware: `req, res, next => {...}` -> res.send() -> Response
- Before create the server, add a middleware for request handlers.
- `app.use((req, res, next) => {})`, it will be passed by every request.
- The `next()` must be called to let the request continue it's journey to the next middleware.
- Try in `app.js` to just console.log something and use `next()` to pass to the next console.log, remember to refresh the page of the port for listening.
- In the middleware, we could `setHeader`, `writeFile`, but now with express we can send HTML elements directly: `send('<h1>Middleware</h1>')`, see Network -> Header -> `Content-Type: text/html; `, it's express's default content type.

#### Handling routes
- The routes have an order from top to down, if `app.use('/')` is on top `app.use('/users')`, the latter would never run, so put the latter on top.
- `npm install --save body-parser`, to parse the request body, otherwise it will be undefined.
- See `package.json`, the list is updated, now import it to `app.js` by `require`.
- Add `app.use(bodyParser.urlencoded())`, this parser is for html forms.
- If using `app.use()`, the default request is for both `get` and `post`.
> Express has been updated since 4.16, now we can use directly the built-in parsers:
```js
const express = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

#### Separate the routes with app file
- Create a new folder `routes`, inside new files `admin.js`, `shop.js`. 
- Import router `const router = express.Router()` in new files.
- Export the router.
- Import in `app.js` by `require` the new router, and `app.use(new_router)`.
- Try to run `npm start` again, refresh the page to enter data, see `console.log(req.body);`, it works!

#### Adding a 404 page
- Add a middleware for showing a message and the status 404.
```js
app.use((req, res, next) => {
    res.status(404).send('<h2>Page not found</h2>')
})
```

#### Adding a route filter in `app.js`
- If the routes has filters, add them directly in `app.js` when use them, ex, `app.use('/admin', adminRoutes)`.
- Point the action also with the filter `action="/admin/product"`.
- Now refresh the page as '/admin/add-product' and post, it works!

### Returning HTML Pages(Files)
- Create a new folder `views`, inside it add new files `shop.html`, `add-product.html`.
- Create html pages in the new files.
> How to wire up the html files with app?   
> Import path: `const path = require('path')` in `shop.js`  
```js
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
})
```
- Export the router, then import & use it in `app.js`.

#### Better way for path rendering
- Create a new folder `util`, inside a `path.js`.
- Construct a function to export the path.
- Import the path and use it to replace `__dirname, '../',` in `shop.js` and `admin.js`.

### Style
- Create styles in all the pages.
- Create a new folder `public` and put all the styles in the folder.
- In `app.js`, import a static path `app.use(express.static(path.join(__dirname, 'public')))`.
- Add style links in all pages.
- Test if it works, and fix the bugs.
