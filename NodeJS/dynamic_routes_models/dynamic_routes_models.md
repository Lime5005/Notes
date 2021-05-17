### Passing route params
#### add an id data
- Add an `id` in product model before save it, and pass in ejs pages as `<a href="/products/<%= product.id %>"`.
- Add an id in the database `products.json`, if some data is there.
- Add a new route with dynamic id: `router.get('/products/:productId')`.
- In controller, add a new function `getOneProduct` or `getProduct`, ex, console.log the id, just to try.
- In routes, use this new controller function with the new route.
- Refresh the page and try.

#### getOne by id
- Add a new function `getById` in product model, and use it in controller to `getProduct`, set the response to console.log product first, see data structure.
- Add a new page `product-details.ejs`, and set up all data places to be rendered.
- Transfer these data into view, by just rendering the view as a callback function after get the id in controller:
```js
res.render('/shop/product-details', {
    product: product,
    pageTitle: product.title,
    path: '/products'
})
```
- Try in page.
> Now we'll let user to add to cart once seen the product details, how?    
> Create a button `Add to Cart`, but how to pass the id?   
> When use a POST request, we can pass params in the request body by using a hidden input:      
```html
<form action="/cart" method="POST">
    <button class="btn" type="submit">Add to Cart</button>
    <input type="hidden" name="productId" value="<%= product.id %>">
</form>
```
- Add a new post route and a new controller function `postCart` for this post request.

#### Re-use the html code
- See the `Add to Cart` button has been repeatedly used in index, product list and details pages.
- Move it to `includes` folder with a new ejs file.
- Insert it to all the pages where needed, since the button is linked to an id, see loop error in index page, so pass a param in the ejs include function `<%- include('../includes/add-to-cart.ejs', {product: product}) %>`.

#### Add to cart
- Add a cart model.
> Think about the logic of the cart, at the beginning is 0 quantity, 0 price, an empty array of products, so we need products as an array with id and quantity, and total price as a number, wrapped in an object.   
> Import fs to read inside, is there any items?   
> If yes, override it, if no, add it.
- In model `cart`, create a static function `addToCart`, import and use modules `path`, `fs`.
- In controller, use this model and it's function in `postCart`, first `Product.getById` then `Cart.addToCart`.
- Test, if error `SyntaxError: Unexpected end of JSON input`, delete the `cart.json` file and try again.
> Since the data stored in json file is in string format, to get total price we have to consider to convert it: `cart.totalPrice = cart.totalPrice + +productPrice`.   

### Using query params: `your_url?key1=value1&key2=value2`
> How to edit a product?   
> First, get the id, then in `edit-product` page, we need all the original data be reflected to page for edit.   
> There is a query property for request, set an `edit` variable for the situation, `const editMode = req.query.edit;`, refers to `your_url?edit=true`.   
> Once the edit is true, it will render the edit product page.   
> Remember that all the url values are of string type.   
- Create a route for the dynamic id in url, `router.get('/edit-product/:productId', adminController.getEditProduct)`.
- In controller, ask to render the edit page if the mode is edit.
> Now how to pre-populate the data?   
> Before we render the edit form, we'll fetch the data first, how?   
> Since we have the dynamic id from params already, it's easy to reach the product by it's model function `getById`, at the same time pass the fetched product as a callback to render the page, if no product, just redirect, ex, `const prodId = req.params.productId`.
- If the edit mode is true, render the update button, if false, render the add product button, use `if(editing)` in ejs file, the action in `form` should be pointed dynamically too. 
- Since we've already retrieved product data before rendering the edit page, we can pass these product's data into ejs file by `value` in `input`.
- Still check if it's edit mode before giving a pre-generated value, ex, `value="<% if (editing) { %><%= product.title %><% } %>"`.
> Remember in `textarea` there is no value, put the description data directly in between html `textarea`.   

#### Edit a product
- Add a new route and a new controller function to edit a product.
> The logic is, we need to override an existing instance of the model product.   
> There is a `save()` function in model, before save it, check if the id exist, if no, create an id, if yes, update it with the same id.
- In controller, we have to get the id from the params, so again put a hidden input with edit mode, value is the id, and name is what will be used in controller function.
- Pass all data from `req.body`, to new product instance, save it, then redirect to the admin page.

#### Delete a product
> Since we store our data `products` and `cart` in local json files, we use javascript filter function to delete the id which is equal to what passed in params.
- Met an error, when click delete, nothing changed, no error either, console.log nothing, means the route is not passed correctly: the `/` is missed in route: `router.post('/delete-product')`!

### Enhance models
> For the cart model, not only add to cart, delete from cart together with delete product, but also get from cart and show, how?     
> Just read file from the given path, pass the cart data as a callback to shop controller, find the id which is equal to the products id in cart, then render them into view.   
> For the `delete` button in cart page, use the same way by passing a hidden input with id to get the item and delete it, with new route and new shopController function.   
