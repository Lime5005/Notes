### Checkout form in `Shoppingcart.vue`
- Register some fake address from [fake_address_generator](https://www.fakeaddressgenerator.com/index.php) in chrome, so we can use them for auto-fill.
- Set the form for user to fill in name, address, etc, (set a few `row` first, then use `col-md-n`, `n` is from 1 to 12, to divide inside).

## Backend - Laravel
> Design the endpoint API first: a customer in JSON format, and a bookings in an array of objects.          
> Create a backend to receive the input information of the user.   
> What do we need to validate?    
> The user's name, address, etc, and the bookable's id, from and to dates, that's all, the price calculation will be done in the backend.   
> The logic is, if the user came back 2 hours later, the hotel he put in his shoppingcart was not available any more, the backend should re-calculate the total amount when he checkout.       
> The bookings list is an array, and we want to check every booking if it's still available, how to validate an array?   
> Validate each element of an array with a `*`, exemple:
```php
$validator = Validator::make($request->all(), [
    'person.*.email' => 'email|unique:users',
    'person.*.first_name' => 'required_with:person.*.last_name',
]);
```
> See details in Laravel doc: [validating-arrays](https://laravel.com/docs/8.x/validation#validating-arrays).   
> Using closure in array validation, details [using_closure](https://laravel.com/docs/8.x/validation#using-closures), means you can add a function to let the validation fail if it didn't meet some condition.   
> 先在controller里制定request validator规则，再建立相关route, 再去Postman测试可行性.    
- `php artisan make:model Address -m`
- Fill in the new table `firstname`, `city`, ect, then run `php artisan migrate`, now we have a table in the database!
- `php artisan make:migration AddPriceAndAddressToBookings --table=bookings`
- Relate address with bookings by adding `address_id` in the table.
- Add `price` in the table.
- `php artisan migrate`, now we have new columns in `bookings` table.
- `php artisan make:controller Api/CheckoutController --invokable`
- `Route::post('checkout', CheckoutController::class)->name('checkout');`
- Try to post a request in Postman to test the route.

### Request the validation twice in CheckoutController
> The controller will first validate all the data as required, then validate if the hotel is available.   
> But Laravel will not accumulate the two validations, so `array_merge` is usefull on the second validation.   
```php
$data = array_merge($data1, $request->validate([
    'bookings.*' => ['required', function($attribute, $value, $fail){
        // dd($attribute, $value);
        $bookable = Bookable::findOrFail($value['bookable_id']);
        if (!$bookable->availableFor($value['from'], $value['to'])) {
            $fail('The given dates are not available for this hotel');
        }
    }]
]));
```
- Once the test is passed in Postman, convert them to frontend.
- Assign the data returned in API to the database, see details in `CheckoutController`.
- In `Address.php`, instead of tell Laravel what should be mass assigned, tell the exceptions `protected $guarded = ['id'];`, means except the `id`, everything else can be mass assigned.
- Test in Postman how the data is returned.
- Check in database `bookings` -> Sort by key(bookings_address_id_index(DESC)) -> the new entry posted from Postman.
- Try in Postman again with the same data, it's not available anymore, success!
- Try to book 2 hotels in Postman, also success.
> See all the data returned, do we need all of them for Frontend?    

### Recalculating price for booking
- Remove the `Carbon` calculation from `BookablePriceController` to `Bookable`, add a new function as `priceFor()`.
- In `CheckoutController`, use the new function to calculate the price -> find `id` first -> then `priceFor()`.
- Once we can have each model's object in the same function, we can associate them `$booking->bookable()->associate($bookable);`
- Test in Postman, with the `associate` method, proving the `id`, we have all the data of that object returned!
- In `BookingFactory`, add the price, do the same in `BookingsTableSeeder`, then `php artisan migrate:refresh --seed`.

## Frontend
### Binding form
- In `Shoppingcart.vue`, we'll use as template what returned as seen from Postman, to the frontend, we create a `data()` property to receive the input data, then match with backend to transfer the data.
- Create a `customer` object and set all the customer's info (seen as `address` in Postman) as `null`, then use `v-model` to bind these info to the vue template `input` field.
- Refresh the page, see in dev tools -> Vue -> Component -> Shoppingcart, the input info is keep updating with our typing, so we can get the customer's info now!
- For the bookings array, we've recorded in the store state, so now we can use axios to make a `POST` request.
> So next step, submit these info to backend once the user clicked `Book Now`!

### Handling user entry error in book method
- Add a method `book()` to control the input, at the same time of submit.
- For the `type="submit"` button, remember to add `prevent` as `@click.prevent="method"`.

### Reuse a mixin
- In mixins, we have a `validationErrors` function, we can use it here.
- Import it, then put in `export default mixins`, this function will add a `errors` data, and check which input field has errors.
- Refresh the page, see in Vue, if the `errors` is added.
- Use `async/await` to post the request, if you forgot the request format, check in Postman again: our input is an object contains `"bookings"` as an array, and `"customer"` as an object.
> For javascript to return an arrow function with multiples data, include data in `()` after the arrow `=>`.   
```js
bookings: this.shoppingcart.map(itemsInShoppingcart => ({
  bookable_id: itemsInShoppingcart.bookable.id,
  from: itemsInShoppingcart.dates.from,
  to: itemsInShoppingcart.dates.to
}))
```
- Now refresh the page and try as a user to post a request, see in Network, Header, status 200, Preview for name 'checkout', data as expected, success!
