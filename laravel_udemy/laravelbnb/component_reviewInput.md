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
- In `created()` lifecycle, using axios to get a response from the url, if has response, means we should return false and hide the input form, else we show the form.
- Using `computed:{}` property to return a data if review existing or it is null.
- Test in url, paste an id, see dev tools -> Vue, see the computed property, false or true.
> The route in Laravel is `api/reviews/{uuid}`, but the route in Vue component has been defined in path: `/review/:id`, so the url in Postman use Laravel route, the url in the page is Vue route.    
- It returns 404, if the review doesn't exist, use `v-if` to hide the form and show a message to user.
