### What is MVC
- Models: represent data, save, fetch...
- Views: for users.
- Controllers: connect models and views.
- Routes: decide which view to render.

### Implement a controller
- Move all router logic to `products.js`, and `exports` them one by one.
- Import into `admin.js` and `shop.js` by `require` the controller.
- Use them directly as `router.get('/add-product', productsController.getAddProduct)`, then just export the router.
- Import the routers into `app.js`, try again the page, it works!

### Implement a model
- Create a new folder `models`, inside it a `product.js` file.
- Move all the products related logic from `products.js` to this file, ex, data and functions: `title`, `save()`, `fetchAll()`, create a class to store them.
- Use this class back in `products.js`.

### Store the data in a file
- Create a new folder `data`, inside it a `products.json` file, put an empty array in it.
- Use module `fs` to read and write file in `product.js`.
- See details in `fs.readFile(path, callback: (err, data))`:
```js
function readFile(path: PathLike | number, callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void;
```
- Import path, parse the data into it's original format, and push in the products array.
- See details about write file, it accepts string type data.
```js
function writeFile(path: PathLike | number, data: string | NodeJS.ArrayBufferView, callback: NoParamCallback): void;
```
- So write file as string
```js
fs.writeFile(p, JSON.stringify(products), err => {
    console.log(err);
});
```
- In function `fetchAll()`, we use a callback to return the data.
> Callback is a function that you can transfer to other function.    
> It will execute when the function it depends on has finished.   
- In `products.js`, when we use the function `fetchAll()` from model `product.js`, we use `products` as a callback, and render a view with dynamic data.

### Helper for store data
- Create a reusable callback function in `product.js`: `getProductFromFile`, so the code is slimmer.
> Conclude a logic that has been used by both functions: `save()` and `fetchAll()`, grab it out from them, and then re-use it inside.      
