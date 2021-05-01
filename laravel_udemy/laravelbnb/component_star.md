### Design a component and pass data for rating stars
- Use Fontawesome star, run `npm install --save @fortawesome/fontawesome-free`.
- Import font awesome in `app.scss`.
- Create a new folder called "shared" for all the components that can be re-used, inside it, another folder "components" for all components that can be shared.
- Create a `StarRating.vue` component there, then register it globally in `app.js`.
- Write something in the new component and insert it besides the `{{ review.rating }}` to see if it works.

### Render stars according to the rating
- Try put some font awesome stars in the component, full, half, empty.
- `d-flex` means flex container in bootstrap.
- Calculating how many full, half, empty stars need to display according to the rating.
- In `created()`, see how the `Math` calculate:
```js
const numbers = [0.9, 3.1, 4.4, 4.6, 4.9]
numbers.forEach(n => {
  console.log(`round for ${n} is ${Math.round(n)}`); // 四舍五入
  console.log(`floor for ${n} is ${Math.floor(n)}`); // 尽量取最小
  console.log(`ceil for ${n} is ${Math.ceil(n)}`);  // 尽量取最大
})
```
- For the benefit of the renter, use `round` for full stars.
- Bind the `props` in parent component, `<star-rating :rating="review.rating"></star-rating>`  （变量捆绑：左子右父）

#### How to insert half star?
- If the fraction is bigger than 0, smaller than 0.5, return true, else return false.
```js
halfStar() {
  // return false // rating = 3.4, so return true
  const fraction = this.rating - Math.floor(this.rating) 
  // 3.4 - 3 = 0.4, display 
  // 2.5 - 2 = 0.5, don't display
  if (fraction * 10 > 0 && fraction * 10 < 5) {
    return true
  }
  return false // 2.0 - 2 = 0, don't display
}
```
- Cleverly add a font awesome class `class="fa-lg"` in `<star-rating>` directly instead of adding it individually in the 3 stars `<i>` elements.
