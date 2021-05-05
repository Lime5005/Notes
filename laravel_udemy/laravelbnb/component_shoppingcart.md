### Create the component, set the basic form, set the path
- Create a new component `Shoppingcart.vue` in a new folder `shoppingcart`.
- Use `col-md-8` and `col-md-4` to divide the row in two parts.
- Import & set the path in `route.js`.
- In `Index.vue`, bind the route to the shoppingcart link, and test it.
- If the route link works, continue to develop the new component.

### Call the helpers
> What do we need in this component?   Total quantity, price, all the info.   
> In `Bookable.vue`, the method `addToShoppingcart()` has defined what to save as items data: bookable, price, dates.   
- Import helpers `mapGetters`, `mapState`, use them to get total quantity, and items, then save as `computed` properties.
- Try to refresh the page, see the data returned.
- In dev tools -> Vue -> Components -> Shoppingcart -> vuex binding, the data is there.
- Use `v-for` to loop through them, show/render them in template.

### How to render the data nicely?
- Use bootstrap classes, `d-flex justify-content-between`.
- A `router-link` to review the hotels booked.
- Each items from top to down.
- Beside each item, add a button for user to delete it.
> How to delete an item?   
> By binding a click event to the action directly from vuex store:
```html
<button class="btn btn-sm btn-outline-secondary" @click="$store.dispatch('removeFromShoppingcart', item.bookable.id)">
  <i class="fas fa-trash-alt"></i>
</button>
```
