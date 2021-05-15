### Managing data without a database
> We just console.log the input data, how to store them?   
- Create a `const products = []` in `admin.js`, and export it.
- Push each input into the array by the middleware `router.post`.
- Since the input data will be submitted to `shop.js`, import admin data and console.log in `shop.js`.
- Try to enter a data and see the console.log, data is in an array.

### Template engines
- HTML template -> Node/Express content OR Template engines -> replace the placeholders in HTML -> HTML file.
- 3 available template engines: EJS, Plug(Jade), Handlerbars.
- `<p><%= name %></p>`, `p #{name}`, `<p>{{name}}</p>`.
- Install all of the 3:
- `npm install --save ejs pug express-handlerbars@3.0`

### Rendering dynamic content in views using ejs
- `npm install --save ejs`
- In foler `views`, create a new file `404.ejs`, copy all the content from `page-not-found.html` and paste here.
- Change static title as dynamic title: `<title><%= pageTitle %></title>`.
- Rendering dynamic data in `app.js`: 
```js
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' })
})
```
- Try refresh the page for not found url, it works!
> To render all the pages, we have to copy and paste a lot, is there another way to reuse the code?   
> Create a `includes` folder in `views`, and put the repeated static html code here, ex, "header", "nav", "end", then use `include()` to import them to where we need.    
> Data flow:    
> Express middleware `render` -> `view engine`, ex, ejs, with some params: 'title', 'path', ect.      
> Design a layout for all static html elements: 'header', 'nav', 'footer'.      
> Pass the data by using the params in `ejs` files.   
> Ex, if the data is an array, loop through the data with for or foreach loop.   

#### ejs example
```html
<%- include('layouts/head.ejs'); %>
  <h1>Users List</h1>
  <% if (users.length > 0) { %>
  <ul>
    <% users.forEach(user) => ({ %>
      <li>
      <%= user.name %>
      </li>
    <% }) %>
  </ul>
  <% } else { %>
    <h1>No Users Found!</h1>
  <% } %>
```
> `<% javascript_code %>`, `<%= passing_dynamic_data %>`.   
> See details [ejs_doc](https://ejs.co/#docs).
