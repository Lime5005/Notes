### Using vuex for shoppingcart
- Add a `shoppingcart` object contains an array `items`, in `store.js` -> `state`.
- Control dynamic data, use vuex!
> When a user add a bookable in the cart, we need to add it in the array, when he removes it, we need to remove it from the array, first, find the id of the bookable, then find the price, the dates.   
- Implement methods in `Bookable`, here we have all we want as `bookable.id`, `price`, `lastSearchComputed` as `dates`.
- Once the user clicked `Book Now`, we trigger the mutation `addToShoppingcart`.
- Refresh the page and see update -> Vue -> Vuex -> addToShoppingcart, all the properties of the component are there.
> Click `Book Now`, the button can be clicked again and again, so the shoppingcart is adding the same products again and again, how to solve it?    

### What is getters? Why?
> Getters are like computed properties in Vuex store, the 1st argument is the state, the 2nd is other getters, it's accessible for all the components, you can pass an id as argument to query an array in the state.   
> Since the state properties is in changing, the getters can catch the change.   

### Count how many items in the shoppingcart  
- In `store.js`, try to use getters to get how many items in the shoppingcart, using `array.length`.
- Then use this getter in `Index.vue` by `mapGetters`: 
```js
...mapGetters({
  itemsInShoppingcart: "itemsInShoppingcart"
})
```
- In `<nav>`, add a `<span>` in router-link and insert the data.
```html
<span v-if="itemsInShoppingcart" class="badge badge-secondary">{{ itemsInShoppingcart}}</span>
```
> Now we can see how many items in the cart.   

### Stop user from adding the same item in the cart
- Disable the button once the cart has an item.
```html
<button class="btn btn-outline-secondary btn-block mb-4" 
v-if="price"
v-on:click="addToShoppingcart"
:disabled="inShoppingcartAlready"
>Book Now</button>
```
- Add a button "Remove from cart" under the "Book Now", to encourage user to delete the first booking for re-booking.
- The button with `v-if="inShoppingcartAlready"`, will show immediately if it's booked.
- Contrarily, `:disabled="inShoppingcartAlready"` make the button unclickable if it's booked.
> The logic is, the user should not book the same hotel for the same dates twice.   
> Workflow: store mutation (removeFromShoppingcart) -> Bookable method (removeFromShoppingcart, id) -> button (Remove from cart) to trigger the method.   

### Get one item and remove it from cart
> Remind the user to remove from cart the duplicated items, how?    
- Create a computed property `inShoppingcartAlready`, in `Bookable`.
- In js, `array.reduce(previous_value/result, current_value/item)` means each item in the array will pass by the same function then return the last result, (if the values are true/false boolean, true * false = true).
```js
inShoppingcartAlready(state) {
  if (null === this.bookable) {
    return false
  }
  return state.shoppingcart.items.reduce((result, item) => result || item.bookable.id === this.bookable.id, false) // initialize as false, then once there is a true, the result is true, the logic is, we don't accept more than one item with the same bookable.id.
}
```

### Vuex composition
> The method `inShoppingcartAlready`'s logic part can be moved to `getters`, but the method is used with the item.id, how to move it to `store`?      
> The solution is there, `getters` can get the id from state, and you can also pass arguments to getters by returning a function, see details: [Method-Style Access](https://vuex.vuejs.org/guide/getters.html#property-style-access).   
> A function returns another function, it's called composition.   
- Add this in `getters`: the 1st id is from state, the 2nd id is from argument passed by a returning function
```js
inShoppingcartAlready(state) {
    return function(id) {
        return state.shoppingcart.items.reduce((result, item) => result || item.bookable.id === id, false)
    }
}
```
- In `Bookable`, use this getters function in `computed` property: 
```js
inShoppingcartAlready() {
  if (null === this.bookable) {
    return false
  }
  return this.$store.getters.inShoppingcartAlready(this.bookable.id)
}
```

### localStorage for shoppingcart
- Add the actions to add to and remove from the shopping cart, that means save and remove from localStorage respectively, then insert them in `loadStoredState`.
- Then change `commit` to `dispatch` in `Bookable`.
- Now refresh the page to test the new code, test the localStorage if updated.
> commit mutation, dispatch action.   
> Now the user can refresh the page, and still see their previous bookings in the shoppingcart.   
> Mutations are for changing the state properties; actions are for doing something together with mutations, ex, save data into localStorage; getters are for getting the state properties globally from the state.   
> Next step: clear the shopping cart and data in localStorage once user checked out.
