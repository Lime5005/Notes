### Using `async/await` to replace `axios.get(url) .then .then`
- In `Review.vue`, try to convert the `get/then/catch` by `async/try/await/catch` for `submit()` method.
- It can be more readable like this:
```js
async created() {
  this.review.id = this.$route.params.id
  this.loading = true
  try {
    this.existingReview = (await axios.get(`/api/reviews/${this.review.id}`)).data.data
  } catch(err) {
    if (is404(err)) {
      try {
        this.booking = (await axios.get(`/api/booking-by-review/${this.review.id}`)).data.data
      } catch(err) {
        this.error = !is404(err)
      }
    } else {
      this.error = true
    }
  }   
  this.loading = false
},
```
- The original code is:
```js
created() {
  this.review.id = this.$route.params.id
  this.loading = true
  axios.get(`/api/reviews/${this.review.id}`)
  .then(response => {this.existingReview = response.data.data}) // 1. Check if reviewed
  .catch(err => {
    if(is404(err)) {
      // 2. If not reviewed, fetch the booking by review_key
      return axios.get(`/api/booking-by-review/${this.review.id}`)
      .then(response => {this.booking = response.data.data})
      .catch(err => {
        this.error = !is404(err)
        // Same as below
        // is404(err) ? {} : (this.error = true)
        // if(!is404(err)) {
        //     this.error = true
        //   }
      })
    }
    this.error = true
  })
  .then(response => {
    this.loading = false})
},
```

### One prop may have 2 types of data
> In both `ReviewList` and `Availability`, add `props: {bookableId: [String, Number]}`, it can be both types.    
> See details for props validation: [components-props-validation](https://vuejs.org/v2/guide/components-props.html#Prop-Validation).    

### A success component
- In shared -> components, create a new component as `success`, use `v-if` to render it once the user left a comment successfully, how?
- Just after the axios `get(url)`, the response should be 201 if submitted successfully, add in `data()` properties `success` as true, and bind it in template with success component using `v-if`.

### Vue slot
> What is slot?      
> slot is like a placeholder that can be replaced by anything, ex, an html element, or another component.     
> Everything in the parent template is compiled in parent scope; everything in the child template is compiled in the child scope.      
- In `Success.vue`, the message in `<h2>` can be stored as a `<slot>`, and in `Review.vue`, where this component is used, write a new message inside the template, the messege will be rendered together with the component.
```html
<template>
  <div class="text-center success">
    <i class="fas fa-thumbs-up"></i>
    <h1 class="mt-4">Success!</h1>
    <h2>
      <slot></slot>
    </h2>
  </div>
</template>
```
```html
<success v-if="success">
  You've left a review, thank you very much!
</success>
```
- Now try to submit a review again to see the update.
