### Availability component design and it's connection to database
- Add a `label for=""` with the same name as for `input` is good for UI design.
- In bootstrap, `btn-block` is a button take the full width of the row.   

> Design a component's UI first, then implement some Javascript logic.   
> Workflow: Get the input data from the UI -> Connect it to our component data -> Send it to the back end.  

### How to collect the data from input?
> Form-input bindings in Vue: `v-model`.    
> `data()` must return a javascript object.     
```js
data() {
  return {
    from: null,
    to: null
  }
}
```

> How to set an initial value in the input ?     
> Just set in `data()` property, like `from: "initial_value"`, because `v-model` will always override the `value=""` in HTML `input`.   


### Handling DOM event in Vue
> What is an event: for ex, the "click" event for the submit buttom.   
> Using `Methods` for event to trigger an action, ex, `v-on:click="your_action"` or directly in input `@keyup.enter="your_action"` when the user press the "enter" keyboard after entering the input value.   

### How laravel works: booking sytem, database queries, Eloquent Model.
- Install the debugbar: `composer require barryvdh/laravel-debugbar --dev`.   
- In `.env`, make sure `APP_DEBUG=true`.   
- Restart the server `php artisan serve`.   
- Now refresh the page, in dev tools you see laravel debug view, `Message`, `Timeline`, `Exceptions`, etc, `Queries` shows not only the database but also the Ajax fetching calls you use.   

### Make a Model for when the bookable is available
- `php artisan make:model Booking -m`
> The `Booking` model will not only check for availability for `Bookable` object, since it contains "date from" and "date to", but also keep all the data about the bookings made to `Bookable` object.   
> One room will be booked by many people for different times, so it's "one to many" relationship.   
- One bookable will have many bookings, so add these infos in the new table:
```php
$table->unsignedBigInteger('bookable_id')->index();
$table->foreign('bookable_id')->references('id')->on('bookables');
$table->date('from');
$table->date('to');
```
- `php artisan migrate`

### Then define the relation on models
- `Booking` belongs to `Bookable`, and `Bookable` has many `Booking`.

### Fetching data
- Creating some fake data for bookings and write an endpoint to check whether a bookable is available for the given days.
- `php artisan make:factory BookingFactory`
- Define what kind of data you want to generate using faker in `BookingFactory.php` in `definition()`:
```php
$from = Carbon::instance($this->faker->dateTimeBetween('-1 months', '+1 months')); // From one month ago to one month later
$to = (clone $from)->addDays(random_int(0, 14)); // From 1 day to 15 days
return [
    'from' => $from,
    'to' => $to
];
```
- Add `use Carbon\Carbon;`
> What is `Carbon` in Laravel? it's a simple PHP API extension for DateTime, see more [Carbon doc](https://carbon.nesbot.com/docs/).
- Now make a seeder: `php artisan make:seeder BookingsTableSeeder`
> In factory, we define what to seed as data, in seeder, we add below to make some change in details:
```php
Bookable::all()->each(function(Bookable $bookable) {
    // For each model, we want to do something
    $booking = Booking::factory()->make();// This generate one single booking
    $bookings = collect([$booking]); // we can use this collection to generate random number of bookings and add items to it.
    for ($i = 0; $i < random_int(1,20); $i++) {
        $from = (clone $booking['to'])->addDays(random_int(1, 14));
        $to = (clone $from)->addDays(random_int(0, 14));
        // In this way, the "from" day is always one day later than "to" day.
        // Mass assignment, $fillable = ['from', 'to'] in Booking model.
        $booking = Booking::make([
            'from' => $from,
            'to' => $to
        ]);
        $bookings->push($booking);
    }
    $bookable->bookings()->saveMany($bookings);
});
```
> What is Laravel collection? Collection is a class for array in Laravel, so we don't need to rely on array functions itself, here we use the `collect` to put the data in an array and then use it's build-in methods like `all`, `each`, `implode`, etc. 
- If you run `php artisan migrate:refresh --seed`, you will have an error, since the `refresh` will empty the `bookables` table.   
- Run `php artisan db:seed --class=BookingsTableSeeder`
> Now you have 1183 bookings in database!   

### Single action Controller
> Using `__invoke()` to trigger one single function controller.   
> PHP: La méthode __invoke() est appelée lorsqu'un script tente d'appeler un objet comme une fonction.    
- `php artisan make:controller Api/BookableAvailabilityController --invokable`
- Define and add a route exlusively for this controller: `Route::get('bookables/{bookable}/availability', (BookableAvailabilityController::class))->name('bookables.availability.show');`
- Add `dd('I work!')` in `__invoke`.
- Run `php artisan route:list` to see if it's updated, if not, try run:
```php
php artisan route:clear
php artisan config:clear
```
- And try again to see the route list in terminal.
- Test in Postman, it returns what you write in function `__invoke`, success!


### Implement some restriction on what should be valide as data
- In `__invoke`, add these:
```php
$data = $request->validate(["what_data_should_be_validated"]);
```
- Test in Postman, add `Headers`->`Accept: application/json` to see the error and fix it.
- Add `dd($data);`, see how the data should be formed.

### Eloquent local query scopes
> Since in `Bookable` model, we have a method `bookings` to reach all the bookings.    
- Try to find the `$id` as `$bookable` first, then `dd($bookable->bookings);` in Postman.   
> See a collection of 8 data ` #items: array:8`.
- Try `dd($bookable->bookings());`, now it returns a query.
#### How to add something in a query?
> How to avoid the from and to data not been overlapped? 重叠   
- Add in `Booking.php`: 
```php
public function scopeBetweenDates(Builder $query, $from, $to) {
    return $query->where('to', '>=', $from)
    ->where('from', '<=', $to);
}
```
- In `__invoke`, add these 
- `dd($bookable->bookings()->betweenDates($data['from'], $data['to'])->count());`  
> Try in Postman, today is 2021-04-28, from today to today for id=3, returns 0, and see it's booked in database, so it works!   
> Try another id, and date, returns 1, and try again others date and id.      
- The final code in `__invoke`:
```php
return $bookable->availableFor($data['from'], $data['to']) ? response()->json([]) : response()->json([], 404);
```

### Implement the logic in Vue.
- In `methods`, get the axios response from the route, and link it to response.status, if status is 200, it's OK, else it's 422 or 404.
- Add this to `computed`:
```js
hasErrors() {
    return 422 === this.status && this.errors !== null
},
hasAvailability() {
    return 200 === this.status
},
noAvailability() {
    return 40 === this.status
}
```
#### How to display an error? 
- Add `is-invalid` (a bootstrap class to show field in red) if `errorFor` is true.
- Re-style the `is-invalid` class in the component, set `background-image: none` to deactive browser error image.
- See `Network`->`error Name`->`Preview`->`error`->`from`&`to` errors are in arrays, so we can loop through them.
- Add a `<div>` below `input` to loop through the errors.
- Enter a date and test if the errors show correctly.

### How to show to users if available or not?
- Add two `<span>` below `check availability`, one for `hasAvailability`, the other for `noAvailability`, the two `computed` properties can be used here with `v-if`.
- Style them with bootstrap classes 'danger' or 'success'.
- Test again by entering dates, check the database, now it's linked to database with response `200` or `404` or `422`!
> We set the route in Laravel first, then get it by `axios` in Vue, then it gives a `response` to Network, with a `status`, we use the `status` to know if it's available and pass this info with `computed` properties to users.   
