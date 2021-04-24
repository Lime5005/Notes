## Using Laravel and Vuejs to build an application
`composer create-project laravel/laravel laravelbnb --prefer-dist`  
`composer require laravel/ui --dev`  
`php artisan ui vue`  
`npm install`  
`npm cache clean --force`  
`rm -rf node_modules package-lock.json`  
`npm install`  
`npm run dev`  

> Go to `welcome.blade.php`, delete all the <style> and all the contents in <body>, replace by 
```html
<div id="app"></div>
```

- Add in `welcome.blade.php` under font <link>:  
```html
<script src="{{ asset('js/app.js') }}" defer></script>
```
- In chrome browser, download `Vue.js devtools`, enable it in developer tool.  

- Add in `web.php`  
```php
Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '^(?!api\/)[\/\w\.\,-]*');
```
> See [regex101](https://regex101.com/) for explanation  
> Now try `http://127.0.0.1:8000/contact`, the link is successfully rendered as it's under the regex rule!  

- Run `npm install vue-router` 
- In `js` folder create file `routes.js`, and add `const routes` as an array of `path` and `component`  
```js
import ExampleComponent from "./components/ExampleComponent";
const routes = [
  {
    path: "/",
    component: ExampleComponent,
  }, 
]
```
- In `routes.js`
```js
import VueRouter from "vue-router";
import ExampleComponent from "./components/ExampleComponent";

const routes = [{
    path: "/",
    component: ExampleComponent,
}, ];

const router = new VueRouter({
    routes,
});

export default router;
```
- In `app.js`
```js
require('./bootstrap');

import router from "./routes";

window.Vue = require('vue').default;

Vue.component('example-component', require('./components/ExampleComponent.vue').default);


const app = new Vue({
    el: '#app',
    router,
});
```

- Run `npm run watch`
- import and use `VueRouter` in `app.js`, so in every component, we can access to router with `$` sign.
- See `/#/` added in url, it's working the router!

- In `welcome.blade.php`, add <router-view> in <div id="app">
> Now you see the example component in url   

### Component registration
`Vue.component('my-component-name', { /* ... */ })`  
> Register in `app.js` globally the components, so you can use them anywhere you want.
> Each component must have only one main root element <div>.  
- Add a main component `index.vue` in `js` folder.  
- Remove the <router-view> element from `welcome.blade.php` to the template of `index.vue`, and replace it by <index> component.    
> This main component is very usefull because it can put header and footer, or any data you want there.  
> So now we can put all the components in `routes.js`.   

- Add <router-link> in `index.vue` to avoid reload when change page.
- Add <router-link to="/page"> to point to the HTML page.
- Create a new component called `Component2` after `ExampleComponent`, import & register it in both `app.js` and `routes.js`.
- Now add this new component as <router-link to="/second"> to `index.vue`, and try in url.
> Different component is rendered when you click the links.   

### Using Bootstrap to style the page
- Add `<link rel="stylesheet" href="{{ asset('css/app.css') }}">` in `welcome.blade.php`.
- With `npm run watch` always running, refresh the page, now you have some style.
> In `resources`->`sass`->`app.scss`, there are some imports like google font and bootstrap, that's the scene behind which will go to `public` folder for `app.css`.
> In `webpack.mix.js`, it also shows how the css works.   

### Why we need to define the route name, v-bind
> v-bind can pass dynamic parameters, like a data, a function, or an object.
- Change the `to="/path"` to `<router-link v-bind:to="{name:'Second'}">Second</router-link>`, now try in url, it works!
> You can use v-bind for any data, like a `href="url"`, a `:[key]` value, etc.
> For shorthand, just use `:`.
- `<router-link :to="{name:'Second'}">Second</router-link>`   

### Style the router-link, using a navbar
- Add a <nav> element in `index.vue`, put all the <router-link> inside, and put <router-view> inside a new <div> with style classes of bootstrap.

### What is single file Vue components
> Normally a component has 3 parts, <template> <script> and <style> , so one file to specify what to render, how to style the template.

### Child components
> Keep a logic in organising components, a `Bookable` component and `BookableListItem` in `bookable` folder.
> Register the child component only in the parent component, not globally.
- First add `<bookable-list-item>` in the <template>.
- Then import the component in <script>, and add in the list of `export default`->`components` object.
> Using kebab-case for component in <template> is better so it's valid directly in the DOM.   

### Pass property to child components
> What is `props` ? 
> It's an array of strings or an object contains names and types(String, Number, Boolean, Array, Object, function, Promise), which would be used as keys to pass values in parent component.
- Define some `props` in child component, like `props: ['title', 'content']`.
- Render these `props` in the <template> using double curly brackets `{{ props data }}`.
> So these names now is becoming variables, in parent component you can define their values freely in where the variables are.
> There is another way to pass variables in the HTML elements.
> If these variables are written in camelCase, they should be used as kebab-case in the parent component.
- The string type would be used as it is, but other types of data must be changed into v-bind mode, just add `:`.   

### One way data flow
> `props` is only used to pass data from parent component to child component, they are read only, they should not be modified.
> `mounted()` is a lifecycle event, it can read the data passed from parent.
```js
mounted(){
  console.log(this.title);
}
```

### Lifecycle hooks
> `mounted()` is been called once anything happened to the component, ex: when you leave the page, it's `beforeDestroy` then `destroyed`.
- In `Bookables.vue`, add these into `export default` and observe:
```js
beforeCreate(){
  console.log('Before create');
},
created(){
  console.log('created');
},
beforeMount(){
  console.log('before mount');
},
mounted(){
  console.log('Mounted');
},
beforeDestroy(){
  console.log('before destroy');
},
destroyed(){
  console.log('Destroyed');
}
```
> You will see that the `title` and `content` in the child component are rendered in the parent component just between `beforeMount()` and `mounted()`, once you click another link, it's `beforeDestroy()` then `destroyed`.

> You can use `created()` to initialize fetching data from the server as soon as possible.

### Reactive data
> Get data from the server and assign it to somewhere, this is what `data` property is in the componen.
> The data property is a function that returns an object, it's keep on changing.
- Add these in `Bookables` component:
```js
data(){
  return {
    bookable1: {
      title: "A title 1",
      content: "A content 1"
    },
    bookable2: {
      title: "A title 2",
      content: "A content 2"
    },
  }
},
```
- These data can be read by `created()` as ex, `console.log(this.bookable1);`. 
- Bind them in the <template>, ex, `:title="bookable1.title"`.

### See how data changes 
- In `Bookables`:
```js
created(){
  setTimeout(()=>{
    this.bookable1.title = "Changed title 1"
    this.bookable2.title = "Changed title 2"
  }, 5000)
}
```
- Refresh the page, wait for 5 seconds, see the titles are changed.
> The workflow of data is `data()` been defined in and then been passed from parent component->child component->`props`.
> You have de define the `data()` first, even it's null, otherwise they will not be rendered proplely.
> Never change `props` data in child component, it will be lost.

### Render data under condition
> Because in <template>, when the initial data is null, we read immediately all the object properties before the data is been loaded, so it gives an error.
> To avoid this, use `v-if` in HTML element to tell that only render the child component after certain condition is met.
- Add `v-if="bookable1 !== null"` in the child component element <bookable-list-item>. 
- Make sure `npm run watch` is running, and you see no error in dev tool.
- In javascript, if somthing is `null`, it returns `false`, so just use `v-if="bookable1"` is enough.

### Rendering massive data using `v-for`
- Pass the massive data as an array `bookables` of objects with `key: value` pairs in `created()`, don't forget to initialize it as `null` in `data()`. 
- Add in component element: `v-for="(item, index) in bookables" :key="index"`, it will be rendered repeatly for all the data.
> Why when we deleted the `v-if`, and changed to `v-for`, there is no error when refresh, because `v-for` starts iterating data at the beginning already.

### While page loading, give a message
- Define in `data()` first as `loading: false`.
- In `created()`, `this.loading = true` at the beginning, and `false` in the end of the array of data.
> Using `v-if` and `v-else` to wrap the loading and not loading condition.

### Computed properties
- Style the child component as a <card> using Bootstrap.
- Using `Math.ceil(totalItems / numberOfColumnsForEachRow)` to calculate how many rows we will need for <card> in Bootstrap.
> How to know how many items/data we have in the database? 
- Define `columns: 3` in the `data()` property. 
- Using `this.bookables.length` to know how many items in the database.
- Using `computed` object to return the calculated result.
```js
computed:{
  rows(){
    return Math.ceil(this.bookables.length / this.columns)
  }
},
```
- You see a `computed` property `row:3`, it's keep re-calculating automatically according to data changes.

### Component `methods`
- `array.prototype.slice()`, slice cuts an array and returns a portion of the array. slice(from which one(count from 0), until but not include which one).
- We want to render these items of <card> in rows.
- To avoid duplicate key error, add a string before it: `:key="'row'+row"`.
- Data `bookables` is an array, from 0 to 6, total 7, but the row of CSS is starting by 1, and total is 3.
- `bookables.slice((row-1) * columns, row * columns )` start from 0, multiple by the amount of items in a column, to the amount of items in a row.
```html
<div class="row" v-for="row in rows" :key="'row' + row">
  <div class="col" v-for="(bookable, column) in bookables.slice((row-1) * columns, row * columns)" :key="'row' + row + column">
  </div>
</div>
```
- This means for the <div class="row">, it loop through from 1 to 3, because we need 3 rows.
- Then in the <div class="col">, it loop through all the items in the data array, and slice(0, 3), then (3, 6), then (6, 9) even we have only 7 items.
> It's a loop inside another loop, <col> inside <row>.
- Now the last item took all the <col> in the <row>, how to solve it?
- We need to know which item is the last one, by using `method()` object.
- Calculate in `methods` how many placeholder <card> for the last row: 
```js
methods: {
  bookablesInRow(row) {
    return this.bookables.slice((row-1) * this.columns, row * this.columns)
  },
  placeholderInRow(row){
  // 3-3, 3-3, 3-1, so result is 2
  return this.columns - this.bookablesInRow(row).length
  }
},
```
- Create 2 <div class="col"> in <card> which are empty in the last <row>.
```html
<div class="col" v-for="p in placeholderInRow(row)" :key="'placeholder' + p"></div>
```
> Only `methods` can accept some additional parameters, ex, computed (row) is been used, `computed` doesn't.
