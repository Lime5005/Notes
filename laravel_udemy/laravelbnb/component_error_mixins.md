### Render en error component if error
- Create a `FetalError` component in `shared` folder and register it in `app.js`.
- Insert the component to `Review.vue` to replace the error message on top.
- Set `v-if` as true to test the page.

### Handling error in all components
- `Availability` component also has errors for handling separately, go to `reponse.js` and add these errors there.
- DRY, re-organise the code for errors.
> Stop maliciously intentionaly entry instead of showing errors, how?   
> Lodash size, in `bootstrap.js`, it's in the first line `window._ = require('lodash');`, see details[lodash_doc_size](https://lodash.com/docs/4.17.15#size).   
> It can return the length of any kind of data: array, object, string.   
> Since we don't know what kind of data the user would enter maliciously, lodash can read the length of errors, if the errors is not from "content" and much longer than 1, we reject it with the error page.   

### Display the error when the content is incorrect
- Copy the `errorFor()` method from `Availability` component and reuse it in `Review`.
- Show the errors below the `<textarea>`.
- In method `submit`, change `loading` to `sending` to refresh only the form when clicked instead of the whole page.
- Try to insert `this.review.rating = 6` in `submit` method, see the error component shown.

### Reuse the validation errors component
- To reuse the `errorFor()` component, we have to separate the situation when there is a form or not, the form cannot be wrapped in a new div, otherwise the "display:none" will always be rendered, and we cannot see the errors.
- Add a style only for the form, how ?
- Use dev tools, locate where the errors are displayed, and set the display as block no matter what.
> `~` means sibling element in CSS.   
- Now we can wrap the errors component in a `<div>` and reuse it by creating a new component as `ValidationErrors`.
- Adapt the variables in the component for different situations.
- Register the component in `app.js`.
- Refresh the page and test, any problem, see dev tools Console.
- Reuse it in `Availability` component.

### Reuse the same code in different components using Mixins
- See `Review` and `Availability`, both have `errorFor()` method, how to reuse them?
> Using Mixin, see details[Mixins](https://fr.vuejs.org/v2/guide/mixins.html)   
> mixin is an object, can contains `methods:`, `created:`, `data:` etc, they are all followed with a function.   
> The instance of Mixin can override the values of Mixin object, if they have the same function variables, or can be mixed/added if different.    
- Create a new folder `Mixins` in `Shared` folder, and add a `validationErrors.js` file, write `export default` inside so we can import it from other components.
- We need to remove the `data()` and the `methods` from the two components to the new file, and then import mixins in the two components.
- Test and refresh the page, if any error, check type error or re-copy.
> If any properties should be different from mixins, just override them in the components.   
