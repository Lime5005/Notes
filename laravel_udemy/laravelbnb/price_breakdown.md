## Backend - Laravel
### Add price in bookable table
- `php artisan make:migration AddPriceToBookables --table=bookables`
- Add `'price'` as `unsignedInteger` in the new table.
- In `BookableFactory`, add: return `'price' => random_int(15, 600)`
- Now `php artisan migrate:refresh --seed`, any error for migration, check the doc [Laravel_using_model_factories](https://laravel.com/docs/8.x/seeding), then check the database for update.
- Add a price controller: `php artisan make:controller Api/BookablePriceController --invokable`   

> Think about what we should do with price, find the price for one hotel first, then how many days a user want to book, then total price.   

- Use Carbon library to calculate days, `use Illuminate\Support\Carbon;`, in case it's the same day, should add one: `$days = (new Carbon($data['from']))->diffInDays(new Carbon($data['to'])) + 1;`, then use eloquent model to find the price: `$price = $days * $bookable->price;`, then return a json format to show the details of prices to user.
- Then define a route for this controller in `api.php`.
> Use hint in Vscode for laravel, it will import the needed class automatically.   
- Test in Postman, get `{{URL}}/api/bookables/1/price?from=2021-05-10&to=2021-05-11`, see it returns the data correctly.

## Frontend - Vue.js
### Async, await in Availability, emitting a custom event
- In method `check()`, use async/await, pass the computed property `hasAvailability` as `$event`: `this.$emit('availability', this.hasAvailability)`in both after the axios get(url) and the catch error, to ensure the event will be emitted no matter what.
- Add a method `checkPrice(hasAvailability)` in `Bookable.vue` to trigger the event and see if the event has been passed from the `Availability.vue`.
> How to name an emit event, see details: [event name](https://vuejs.org/v2/guide/components-custom-events.html), better to use only lowercase or kebab-case.   
- Enter the dates and check in Console, it returns `false` when no available, so the event is passed correctly, try more hotels to verify.

### Fetch the price
- Add a new `data()` property `price` in `Bookable.vue`.
- If no available, then `this.price = null`, and return.
- If yes, fetch the API using Async/Await, catch error by setting the price as null.
- Now refresh the page and check in Network -> url(price?...) -> Preview, if the data is returned, we need data `from` and `to`.
> How to get the data?    
> By using mapState, like how we used in `Index.vue`, and use computed property mapped from state for `from` and `to`.  
- Now check again in Preview, set a date available then another no available, see different data returned as what we asked.

### New component for price breakdown and "Book Now" button
- Add a `book now` button under the `check` button.
- Since we have `price` in `data()`, use `v-if="price"` to not display the button if no available.
- Add a transition with it's name, put the button in it, so it's a little more user friendly.
- Create a new component `PriceBreakdown.vue`.
- Insert it to `Bookable.vue`, just above the "Book Now" button, bind the `price` property with the new component, and define the price's details in the new component.
- Export the `props`: `price: Object` in the new component.
> Now everything is connected, try in browser.   
> In the price object, we have breakdown as another object, pass in browser direcly is: `{ "396": 2 }`, how to make the form nicer?    
- Loop through the object by `v-for`, (in `BookablePriceController.php`, the breakdown is `$bookable->price => $days`), so the variables are "price" and "days".
- Use bootstrap `d-flex` to place the two `<span>` inside the `<div>` left and right.
```html
<div v-for="(days, price) in price.breakdown" :key="price" class="py-2 border-top border-bottom d-flex justify-content-between">
  <span>{{days}} * ${{price}} </span>
  <span>${{ days * price}}</span>
</div>
```
> Now the price is shown to user, next step: shopping cart and checkout.
