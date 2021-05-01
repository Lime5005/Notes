### Design a review component first
> Put the component below the description card of the hotel, and use CSS `grid` to separate user name, time, comments and rating, make sure it's responsive.   
- Using `v-for="number in 3"` in the root `<div>` to iterate more data to see the design.
- using `d-flex justify-content-end` to put the "star rating" at the right side of the column.
- `d-none` means "display:none" in bootstrap.
- `d-md-block` means show the content until the breakpoint is at least middle sized screen device.

### Implement Laravel logic to the component
- Make a model for the component: `php artisan make:model Review -m` 
- Relate `Review` model with other models: `Bookable`->hasMany reviews, `Booking`->hasOne review(a user has only one comment for one booking), and `Review` belongsTo `Bookable` and `Booking`.
- Why we need to change `id` to `uuid` (universally unique id)? -> Because we need it to be "string" type and no need auto-incrementing, write them as functions in the model.
- Why using `unsignedTinyInteger('rating')`? -> It's for 1 to 5 stars.
- Add `bookable_id` and set it as foreign key:
```php
$table->unsignedBigInteger('bookable_id')->index();
$table->foreign('bookable_id')->references('id')->on('bookables');
```
- Add `booking_id` and set it as foreign key also, but set it as nullable for now.
- Run `php artisan migrate`, and see table `reviews` in database.

### Make fake data and pass them in route, try in Postman
- Using factory and seeder to generate some random `reviews`.
> `php artisan make:factory ReviewFactory`.   
> `php artisan make:seeder ReviewsTableSeeder`.   
> Define what and how to generate fake data in factory and seeder.   
> Ask Laravel to call it by adding it to `DatabaseSeeder.php`.   
> `php artisan db:seed --class=ReviewsTableSeeder`.   
- Now you have 1880 reviews!

#### Then try to reflex these fake data to vue component, but how? 
- `php artisan make:controller Api/BookableReviewController --invokable`
> The `$bookable->reviews()` function can be used as a query builder or an object to return all the `reviews`.
- Add an invokable controller and a route to get all the reviews of one specific bookable.
- Try the route in Postman for id=1, see if it returns all the reviews.
- See all the data in Postman, all the review ids are returned, we should hide them, how?
> By using resource, make a resource and find it in folder `Resources`, restrain what should be returned, then integrate it in the controller.
- `php artisan make:resource BookableReviewIndexResource`.
```php
return [
    'created_at' => $this->created_at,
    'rating' => $this->rating,
    'content' => $this->content
];
```
```php
$bookable = Bookable::findOrFail($id);
return BookableReviewIndexResource::collection(
    $bookable->reviews()->latest()->get()
); // It's an array named "data"
```
- Now try again in `Postman` to see the update.

### Pass the data from database to vue
- Using `created()` lifecycle to trigger loading data from database, with axios get(url) method.
- When using `$route.params.id`, we put it as a `props` in root component `Availability.vue`, so it's re-usable.
- Refresh the page, see in dev tools Network the `data` been fetched, put them in `data()` property as `reviews`.
- See in dev tools -> Vue -> ReviewList, it's added `reviews` in `data` after `$route`.
- Change the static values by `reviews` fetched from database, using `v-for` to loop through, and `{{ each_review_data }}` in template.
- For user friendly, change `created_at` to "how long ago" format, using [momentjs](https://momentjs.com/), and use filters function to pass to the template as `{{ review.created_at | fromNow }}`. 
- Register this filter globally in `app.js` so we can re-use it later.
