## What is NoSQL
- Database sorted in collections, can have duplicated data in the same collection, easy to retrieve.
- No data schema: `{name: xxx, id: xxx, age: sss}`, `{id: sss, aga: lll}`
- No structure required.
- No data relations, no/few connections.

### Connect MySQL with our node project
- In MySQLWorkbench, create a new schema/database: node_complete.
- In our node project, `npm install --save mysql2`.
- In folder `util`, create a new file `database.js`, to connect our database in MySQLWorkbench.
- Once setup the connection, go to `app.js`, create a `const db = require('./util/database')`, use it to execute mysql queries.
- Create a new table `products`, with columns.
> Product `id` is unsigned, means no negative values.
- create a dummy data in the table.
- Try to select data in app.
> Promise is a basic javascript object, always available in browser to work with asynchronous code.   
> The workflow of a promise: db.execute('sql_queries').then().catch()   

### Replace local database json files by new MySQL database
- Delete all connections about local fs and path in model `product.js`
- Use database instance `db` to execute all the SQL queries, ex, fetchAll, getOneProduct, etc.

## Using a 3rd party package: Sequelize
> An object-relational mapping library.    
> Core concepts: Models -> Instances -> Queries -> Associations.      
> We don't have to write the SQL code.   
- `npm install --save sequelize`, it must be used together with `mysql2` installed.
- Create a model with sequelize, then connect to database.
- Delete in MySQLWorkbench the `products` table.
- In `database.js` create a new instance of the sequelize to connect to mysql database.
- Make a model in `product.js`: see details [Sequelize_doc](https://sequelize.org/master/manual/model-basics.html), and export it.
- In `app.js`, import the sequelize instance and ask to sync `sequelize.sync()`
- Create new product with sequelize in `admin.js` controller.
> Sequelize has `create()`, `findAll()`, `findByPk()`, `save()`, `destroy()`, etc, details [model_querying](https://sequelize.org/master/manual/model-querying-basics.html).    
> If more precise: use `findOne()`: `Project.findOne({ where: { title: 'My Title' } });`.   
- Use the fetched data in `then()` instead of putting them as a callback for rendering the view.
```js
exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products-list', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err))
}
```
> In MySQLWorkbench if no data shown, right click the table -> Refresh All -> Click a tiny calender-like icon.   
- Try to implement all the CRUD functions with sequelize functions.

### Relations by Sequelize
- Deal with relations, add a User model
- Associate two tables `product` and `user`: import the two models, and relate them before sync in `app.js`: `A.belongsTo(b)`, `b.hasMany(A)`.
> See details: [sequelize_assocs](https://sequelize.org/master/manual/assocs.html).   
- Once the relation is set up, we have to add `userId` when creating a product, see `postAddProduct`.
- Add `userId` in database eloquently by `req.user.createProduct`, and `req.user.getProducts`, instead of `Product.findByPk(prodId)` or `Product.findAll()`, etc.

### One to many and many to many
- Create models `cart.js`, `cart-item.js`, and in `app.js` import & relate them with `User` and `Product`:
```js
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
```
- Once the relations are set up, use `sequelize.sync({force:true})` to refresh the tables in database, see `userId` is added in table `carts`, and `cartId`, `productId` are added in table `cartItems`.
- In `shop.js` controller, for `postCart` and `postDeleteFromCart`, `product` can reach `cartItem` directly like this: 
```js
const oldQuantity = product.cartItem.quantity //`postCart`
return product.cartItem.destroy() //`postDeleteFromCart`
```
> That's how sequelize works!   
> Once a user click a button below the cart `Order Now!`, all the items should go to `order` table.
- Create models: `Order` and `OrderItem`, relate them with `User` and `Product`.
> A button has a `submit` `action`, the `action` will point to `/create-order`, that's where the router will lead to trigger a function in controller.   
- With the easy related models, we can reach tables like this:
```js
exports.getOrders = (req, res, next) => {
    req.user.getOrders({ include: ['products'] }) // Ask sequelize to also give products, since they are related in `app.js`, then expose all to view
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your orders',
                orders: orders
            })
        })
        .catch(err => console.log(err))
}
```
- And in view:
```html
<ul>
    <% order.products.forEach(product => { %>
        <li>
            <%= product.title %>(
                <!-- product can reach orderItem table to get it's quantity -->
                <%= product.orderItem.quantity %>) 
        </li>
        <% }) %>
</ul>
```
