### Create a component for review input
> The star rating component can be re-used here.
- Create a new folder `review` in `js` and create the component `Review.vue` there.
- Write something in the template, then import and register a route for it in `routes.js`, and test the new route in url.
- Use `form-group` from bootstrap, design a form for entering stars and comments.
> If a user has already inserted a comment, no comment again.

### Pass data from vue to database by emitting and events handling
> How to pass event from child to parent component?    
> Exemple: in child component: `<button v-on:click="$emit('enlarge-text', 0.1)">Enlarge text</button>`, in parent component: `<blog-post v-on:enlarge-text="postFontSize += $event"></blog-post>`   
> The `0.1` is a variable pass from child to parent, called `$event`.   
> The event handler can be a method also.   

#### How to make user click the nth star and note as n? 
- In full star element, add `v-on:click="$emit('rating-changed', star)`. 
- In empty star element, add full star, `v-on:click="$emit('rating-changed', fullStar + star)"`, so once you click the nth star, it will update the rating number as n. 
- In `Review.vue`, add `v-on:rating-changed="review.rating = $event"`, the $event catch every change when user click the stars; and in `data()` property, return `review` as an object which contains `rating: 5` and `content: null`.
- Refresh the page, in dev tools -> Vue -> Switch to Events, see `payload` change when you click, in Vue -> `<Review>` -> see `review` as an object and see the rating changes accordingly when clicked, and the stars function well.

### Using `v-model` to replace `v-bind:value` and `v-on:input`
> V-model is very useful in input fields, when the field value is changed, it's automatically updated locally.
- Instead of using `v-bind` and `v-on` together to update the input data in `Review.vue`, use `v-model`.
- In `ReviewList.vue`, change the `:rating` to `:value`.
- In `StarRating.vue`, update all the `rating` as `value`, then change the two `$emit('rating-changed')` to `$emit('input')`, now the `value` and `input` matched to be used as `v-model`, see details: [Using v-model on Components](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components).
- Now we can replace the `v-bind` and `v-on` with `v-model="review.rating"` in `Review.vue`, voilà!

### Rating comments/content
- Add `v-model="review.content"`, refresh the page, dev tools -> Vue -> the content changes accordingly to input value.
- In the route `review/:id`, the id should be `uuid`, the random generated `uuid` links are for people to add a review.
> Our workflow: check if the user has reviewed this booking?   
> -> if yes, give user an alert or redirect.      
> -> if no -> get the info about user's booking, (bookable_id, booking_id) first, how -> generate a review_key whenever a booking_id is been saved, this step should have been done automatically -> fetch the booking by this review_key -> let the user review with this review_key -> save it -> once the review is saved, the review_key is removed so the user cannot review again.   

### Make a controller for reviewInput component: `Review.vue`
- `php artisan make:controller Api/ReviewController`, add a function `show($id)` to return the id.
- `php artisan make:resource ReviewResource`, return only the `created_at`, then integrate it to the controller, the logic is, if it's created already, it's been reviewed.
- Make a route to check if the booking has been reviewed.
- Test in Postman the new route: copy one uuid from database, paste it in URL, save it if it works.
- Using the `uuid` to fetch the `created_at` data in the table `reviews`, if it exists, then tell the user it's reviewed and we should hide the input form.

### Reflex the logic to `Review` component
- In `created()` lifecycle, using axios to get a response from the url, if has response, means we should return true and hide the input form, else we show the form.
- Using `computed:{}` property to return a data if review existing or it is null.
- Test in url, paste an id, see dev tools -> Vue, see the computed property, false or true.
> The route in Laravel is `api/reviews/{uuid}`, but the route in Vue component has been defined in path: `/review/:id`, so the url in Postman use Laravel route, the url in the page is Vue route.    
- It returns 404, if the review doesn't exist, use `v-if` to hide the form and show a message to user.

### Eloquent event, add review_key to bookings table
- `php artisan make:migration AddReviewkeyToBookingsTable`
> Let Laravel create a `review_key` automatically once a booking is created, how?   
> Listen to model events, see details [Eloquent Event](https://laravel.com/docs/8.x/eloquent#events).   
- Before migrate, add a function in the model `Booking`:
```php
use Illuminate\Support\Str;
public static function boot() {
    parent::boot();
    static::creating(function ($booking) {
        $booking->review_key = Str::uuid();
    });
}
```
- `php artisan db:seed --class=BookingsTableSeeder`

### How to find the booking by review_key?
- In model `Booking`, add a function:
```php
public static function findByReviewKey(string $reviewkey): ?Booking {
  return static::where('review_key', $reviewkey)->with('bookable')->get()->first();
}
```
> With the `?Booking`, we ask either the Booking class or null, otherwise if no bookings this query will fail.       
> Above means where review_key === $reviewkey, with ralations to bookable, and fetch it immediately.   
- `php artisan make:controller Api/BookingByReviewController --invokable`
- In controller's invoke function, ask to return either this or that by using `??`: ` return Booking::findByReviewKey($reviewkey) ?? abort(404);`.
- Add a route and try in Postman.
> Remember to refer to the URl by run `php artisan route:list` when using Postman.   
> Now we see all the data, and that's too much for user, restrain the returned data by using resource.     
> What to return? `from`, `to`, `id`.   
> Don't afraid to make more resources if needed, one resource handle one specific request.   
- `php artisan make:resource BookingByReviewShowResource`, in this resource we ask to return only `from`, `to`, and `id` as 'booking_id' from `bookings`.
- `php artisan make:resource BookingByReviewBookableShowResource`, here we ask to return `id` as 'bookable_id', `title`, `content` from `bookables`.
- Insert this new resource to the first one:
```php
'bookable' => new BookingByReviewBookableShowResource($this->bookable)
```
- Use the first resource in controller, so it can return the info that we want the user to see, try the route again in Postman to see the update.
- Now we can fetch these data with axios in Vue component!

### Promise chaining
> Understand Promise: when use axios to get a promise, if then `response => {xxx = sss}` instead of `response => xxx = sss`, the promise will stop there and not go down.      
> Here we want to verify if the user has reviewed the booking, if yes, no further fetch; if not, and only if returns 404, continue fetch the booking to let the user review his booking, and use `{}` also to not return a result to be resolved.    
> Save the fetched response in the `data()` as 'booking'.   
```js
created() {
  this.loading = true
  axios.get(`/api/reviews/${this.$route.params.id}`)
  .then(response => 
    // 1. Check if it's reviewed already
    {this.existingReview = response.data.data}) // use {} to set something here, but don't return a promise, so it will not flow down to the last then.
    // The logic is, once you found a review, it returns nothing.
  .catch(err => {
    // 2. If not, fetch a booking by review_key
    // See `BookingByReviewController` for details, either find data or return 404
    if(err.response && 
    err.response.status &&
    404 === err.response.status) {
      return axios.get(`/api/booking-by-review/${this.$route.params.id}`).then(
        response => {
          this.booking = response.data.data
        }
      )
    }
  }).then(response => {
    console.log(this.booking) // Second test, return 'null', means the second fetched data didn't flow down here either.
    // console.log(response) // First test, return 'undefined', the promise didn't went down here, other wise we'll see the data.
    this.loading = false})
},
```
- Add more computed data to observe the `data()` properties, ex, `hasReview`, `hasBooking`, and copy an id from `bookings` to test in the url, see if it shows correctly in dev tools -> Vue.

- Show user the booking he has booked, ask him to review if not done yet.
- If `hasReview:null`, and `hasBooking: true`, show the booking data to user.
- Use `v-if`, `v-else` to guide user to different pages: review form or has reviewed alert.

### How to save input into database?
> A new API endpoint for storing a review(validation rules, conplex flow).   
> So what do we have to save? see `reviews` table, we need uuid, rating, content, bookable_id, booking_id.   

- In ReviewController, add a `store()` function, ask to validate only 'id', 'rating', and 'content'; for the `booking_id` and `bookable_id`, we'll not trust user to fill them.   
> How to get the two ids above?    
> By using Eloquent model method    
> Remember to let Laravel take mass assignment by declaring the $fillable arrays in model `Review.php`.   
```php
$review = Review::make($data);
$review->booking_id = $booking->id;
$review->bookable_id = $booking->bookable_id;
$review->save();
```
> Why use `make()` instead of `create()`?    
> In Laravel, 'create' not only create an instance of the model but also save it to database, while 'make' just create an instance, here we want to save it later with other information.   
- Now add it in the route, try this new endpoint with a POST request in Postman.
- Copy a `uuid` from 'reviews' to try, then copy a `review_key` from 'bookings' to try again, see if the returned data is what we expected.
- If success, check the database and refresh the page to see if they are updated with the new input data.

### Using computed properties in CSS to display grid differently according to data
- `<div :class="[{'col-md-8': twoColumns}, {'col-md-12': oneColumn}]">`, the class will take one value from the array according to computed data.
```js
oneColumn() {
  return !this.loading && this.alreadyReviewed
},
twoColumns() {
  return this.loading || !this.alreadyReviewed
}
```

### Error handling
- Add 'error' in `data()` property, check every flow where there can have errors, catch them by set `this.error = true`
- For DRY, create a new folder under `shared` as `utils`, with file `response.js` inside.
- Move all the error logic from `Review.vue` to here, save them in variables and use the variables in components.

### Sending data from vue to server
- Add `methods` property in `Review.vue`, write a `submit()` function to console.log the response, with axios post API, `/api/reviews, this.review`,  try to fill in the form, and submit, then check in dev tools -> Vue, and go to the bookable page to see the review, it is uploaded!
- Prevent user from pressing the button 10 times when loading: `:disabled="loading"`.
