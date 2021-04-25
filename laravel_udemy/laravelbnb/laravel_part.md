### Solve the limit for email length problem
- (unique) is a key, string limit from 255 to 191 characters.
- In `AppServiceProvider.php`, add below:
```php
public function boot()
{
    Schema::defaultStringLength(191);
}
```
### php migration
- Run MAMP, go to phpMyAdmin.
- Create a database `laravelbnb`, and set as `'utf8mb4_unicode_ci'`. 
- Modify `.env` and `database.php` to connect to the database.
- `php artisan make:model Bookable -m`
- Add `title` and `content` in the new table.
- `php artisan migrate`
> Now we can see the tables `users`, `bookables`, etc are in phpMyAdmin.     
> If migrate fails, check if `DB_SOCKET=/Applications/MAMP/tmp/mysql/mysql.sock` has been added in `.env` and `database.php`, if you use MAMP for database.


### Model factory, database seeder and faker
- Make a factory for model `Bookable`: `php artisan make:factory BookableFactory --model=Bookable`.
- See `database`->`factories`->`BookableFactory.php`.
- Run `composer require laravel/legacy-factories`.
- Run `composer dump-autoload`  to auto load dependencies.
- Add in `BookableFactory.php`:
```php
use Illuminate\Support\Arr;
public function definition()
{
    $suffix = [
        'Villa',
        'House',
        'Cottage',
        'Luxury Villas',
        'Cheap House',
        'Rooms',
        'Cheap Rooms',
        'Luxury Rooms',
        'Fancy Rooms'
    ];
    return [
        'title' => $this->faker->city . ' '. Arr::random($suffix),
        'content' => $this->faker->text(),
    ];
}
```
- ` php artisan make:seeder BookableSeeder`.
- In `BookableSeeder`, add in `run()`:
```php
factory(Bookable::class, 100)->create();
```
- In `DatabaseSeeder.php`, add in `run()`:
```php
\App\Models\Bookable::factory(100)->create();
```
- `php artisan migrate:fresh --seed`.
- Now check phpMyAdmin, you have 100 data with 'title' and 'content' in `bookables`!

### Route and Model::all() method
- (Request $request) is like `$_POST` or `$_GET`, etc.
- In `api.php`, add below:
```php
Route::get('bookables', function(Request $request) {
    return Bookable::all();
});
```
- Run `php artisan route:list`, the new route is added already!
- See [url](http://127.0.0.1:8000/api/bookables), all the data are in an array of JSON format automatically!


### API testing in Postman
#### Postman setup
- Add a new collection name, click the 'eye' icon in the right, to set an environment, like add a `URL` and it's value.
> How to use the environment?   
- `GET: {{URL}}`, hit `SEND`, see your website page.
- `GET: {{URL}}/api/bookables`, see all the data in JSON.
> Be carefully not to add more than neccessary the `/` in the URL.   
> In Postman, click the `</>` icon in the right, see code, ex, the `JavaScript-Fetch` code, usefull for later while using the API.

### Model::find method, mandatory and optional route parameters
- Add one param in url: 
```php
Route::get('bookables/{id}', function(Request $request, $id){
    return Bookable::findOrFail($id);
});
```
- Try add 2 params, one mandatory, one optional, test in Postman:
```php
Route::get('bookables/{id}/{optional?}', function(Request $request, $id, $optional = null){
    dd($id, $optional); 
});
```
> Using `Headers` to specify to your server what kind of data you can accept.

### JavaScript Promise
- In `created()`, add 
```js
created(){
  this.loading = true
  const p = new Promise((resolve, reject)=>{
    console.log(resolve);
    console.log(reject); // ƒ () { [native code] }
    setTimeout(()=>resolve(' Hi there'), 3000);
  })
  .then(result=>" Hi first" + result)
  .then(result=>console.log(`Success ${result}`)) // After 3s, Success  Hi first Hi there
  .catch(result=>console.log(`Failure ${result}`));
  console.log(p); // Promise {<pending>}, with catch, finally, then, etc.
}
```
> Why we need Promise?   
> When handling data, you may want to get some info first, then decide what to do next.

### HTTP request using axios
- In `bootstrap.js`, it required axios globally, so you can use axios anywhere.
> `axios.get(route_url)` is like a route in laravel.   
- In `created()`, add below:
```js
const request = axios.get('api/bookables');
console.log(request);
```
- Refresh the page, see dev tool -> Network -> XHR -> Name:bookables -> Preview/Response, all the JSON data are there.
- See in dev tool -> Console -> Promise -> Config/data/headers/request(response), etc.
- Now we can use the data from 'GET' in `created()` to replace the static data.
```js
const request = axios.get('api/bookables')
// console.log(request);
.then(response => {
  this.bookables = response.data
  this.loading = false
})
```

### CSS flexbox and bootstrap classes
> See the cards in the page are not the same size, they are restrained by the content length, how to solve this?
- In bootstrap, the class `d-flex align-items-stratch` can solve it, add it in the `class="col"`.
> If the content is very small, the card won't show it's normal size, how to solve this?   
> Ex, try `this.bookables.push({title: "t", content: "c"})`, and refresh the page.
- Add `w-100`, (means width 100%) in `class="card"`, problem solved!

### Vue router parameters
- In `js` folder create a new folder `bookable` for one item pages.
- Delete all Example components, and refresh, any problem, see dev tool -> console.
- Create a component `Bookable.vue` in folder `bookable`.
- Import this component and add it's path in `routes.js`. 
- Write somthing in `<template>` and test the new path in url: `/bookable/1`.

#### Pass $route.params.id
-In new component, test in url `/bookable/1` if the `$route.params.id` works, write a script:
```js
created() {
  console.log(this.$route.params.id);
}
```
- If you see `1` in console, it means it works!
- Add reactive data in script: register in `data()` first, then use it in `created()`.
```js
created() {
  // console.log(this.$route.params.id);
  axios.get(`/api/bookables/${this.$route.params.id}`)
  .then(response => (this.bookable = response.data))
}
```
> if you don't know how to define the route, see `php artisan route:list` to get one.

#### v-bind trick
- `:title="bookable.title" :content="bookable.content" :id="bookable.id"` can be replaced by one code: `v-bind="bookable"`, if the `props` names are the same as in database, like `title`, `content`, etc, and also, you have registered `bookable: null` in `data()`.

### How to insert links in vue router components?
- Add in `<card-body>`: `<router-link :to="{ name: 'bookable', params: {id: id} }"></router-link>`, and insert the `title` in the router link.
- Now refresh the page, all the titles are becoming a link with the id!

### CSS grid system
- Divide by 12 columns in a row, so `col-md-8` and `col-md-4` divide one row in 2:1.
> This is good for responsive design.   
> `col-md` means the portions for columns are for screen`≥768px`.   
- In the `col-8` column, add `bookable.title` and `bookable.content` in `<template>`.
> Watch the console, if any error, ex, data is null, use `v-if` and  add `loading:false` to `data()` to fix it.


### Laravel controllers
- Add a folder `Api` in `Controllers`.
- `php artisan make:controller Api/BookableController --resource`.
- In `BookableController`, fill in the methods `index` and `show` to return the according data.
- Replace the 2 routes by `index` and `show`:
```php
Route::get('bookables', [BookableController::class, 'index']);
Route::get('bookables/{id}', [BookableController::class, 'show']);
```
- Now refresh the page, it works!
> In `Providers` folder, the environments are set up there.   
> Ex, in `RouteServiceProvider`, it adds a prefix ('api') for our routes automatically.
- Use `apiResource` instead of writing all the routes: `Route::apiResource('bookables', (BookableController::class));`.
- Now see all the routes generated by Laravel: `php artisan route:list`.
- Add a restraint if you only want to use two methods in the resource:
- `Route::apiResource('bookables', (BookableController::class))->only(['index', 'show']);`
- Now test again the route list, see only the routes you want.

### API resources
> If you want to add some restaints between the Model and JSON response that the Model should get from the database, 
- Create resource separately for the two methods:
- `php artisan make:resource BookableIndexResource`
- `php artisan mek:resource BookableShowResource`
- See in `Http->Resources` folder.
- Convert the object as the way you want.
- Add in the both resources below under `toArray($request)` function:
```php
return [
    'id' => $this->id,
    'title' => $this->title,
    'content' => $this->content
];
```
- See how these can be used in our controller:
- In `show` function, change `return Bookable::findOrFail($id);` to `return new BookableShowResource(Bookable::findOrFail($id));`.
- Test in url `/bookable/1`, in `Network`, you may find that all the data has been wrap by an object called `data:`, and the page does't work.
- By importing `JsonResource` and adding `JsonResource::withoutWrapping();` in `AppServiceProvider`, the page works again.

> But now we'll focus on how to use the resources, so keep the wrapper and we'll modify the vue component instead.   
- Just add `data` before `data`: `this.bookable = response.data.data`, the page recovered!   
> Why resource is useful? Because you can define what you want the user to receive as data in resources, here we asked to return `id`, `title`, `content`.   
> Ex, you can return a 'secret' only if the user is admin, `'secret' => $this->when(Auth::user()->isAdmin(), 'secret-value'),`.   
