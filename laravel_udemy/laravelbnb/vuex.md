### What is Vuex? And why?
> Vuex is a state management pattern + library, see details: [Vuex](https://vuex.vuejs.org/).   
> State is for all the properties of the components, coming from backend, once a component is destroyed, so does it's state.     
> Sometimes you may not want a certain state to be dependent on it's component, or be fetched from the backend API, you want a global state get from somewhere and it's for all the components.      
> You want some data to be globally accessible.   

> In this project, a user found a hotel for a certain day, and failed to book it, so he searched for another hotel, he doesn't want to enter again the date `from`, so how to make this data accessible in all pages?    
- Run `npm install vuex --save`.
- Import into `app.js`
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```
- Initialize by copy the exemple of `const store` and register the `store` in `const app` in `app.js`, try to use it.
- Refresh the page, you should see in dev tools -> Vue -> Vuex(it's a timer icon), see the state properties in side.
- `state` and `mutations`, `mutations` is for changing the `state` properties with methods.
> In `mutations`, all the methods must use `state` as the first parameter, then modify one or more properties of the `state`.   
> How to call the mutations? `store.commit('method_name')`.   
> In mutations method -> (state, payload), payload is like a placeholder, it will be replaced by another variable when the method is commited.   
> Important: all the state properties must be and only be changed in mutations, not somewhere else.   

- Create a new file `store.js` in `js` folder.
- "shift" + "up" => select lines up.
- In `app.js`, initialize it as below:
```js
import storeDefinition from "./store"
const store = Vuex.Store(storeDefinition);
const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        "index": Index,
    }
})
```
- Add some `state` and `mutations` properties in `store.js`, refresh the page, click the Vuex -> Base State -> see the new properties.

### How to use `store` in component?
- In `Availability`, `console.log(this.$store)` in method `check()`, refresh the page and click the button `check` to see what it will return in Console.
- See `store` in Console, with all the methods can be deployed, ex, `commit`, `getters`, so the store is available now for components!
- Trigger a mutation method in component, like below:
```js
this.$store.commit('setLastSearch', {
  from: this.from,
  to: this.to
})
```
- Refresh the page, try to enter data "from" and "to", see dev tools -> Vue, if the mutation works.
> Now the data is been recorded, but once refresh the page, data is gone, how to keep and read them?   

### How to keep and read the store properties in component?
- In `data()` properties, initialize the `from` and `to` as state from store, like this:
```js
data(){
  return {
    from: this.$store.state.lastSearch.from,
    to: this.$store.state.lastSearch.to
  }
}
```
> The `from` and `to` are already initialized as `null` in `store.js`, so no need to repeat here.   
- Now the data is transfered from store to component!
- Try to enter some data, then navigate from one hotel to another, the "from" "to" are auto filled with the last entry!
- So the state in store is accessible globally now!

### Keep state in `computed` properties, so you can have it all the time
> If you want to use state for other purpose than to initialize some data, ex, use it in `computed` properties, how?   
> In `Index.vue`, add the store state `lastSearch` as `data()` , try to enter a data and see it's not initialized there, means it's lost, if you want to keep track of the data, use computed mapState.   
- Import `import { mapState } from 'vuex'`
- Define a name in `computed:` and use the whole state to point to the data property you want from store:
```js
computed: {
    ...mapState({
        lastSearchComputed: state => state.lastSearch
    })
}
```
- Refresh the page and enter a data to see if it's kept in `index.vue`, yes, there is a new name appeared `vuex bindings`, and inside is the `lastSearchComputed` object.


### Vuex action? Why?
> When user refresh the page, all the entered data is gone, how to keep them?   
> This is where we can use actions.   
> What is action?    
> It's like "side effect", mutations can be used in actions to mutate the state along the way.可以跟着随时再做一些额外的工作, params(工作内容context， 额外变量payload), 先重复一遍工作内容，再利用变量进行额外工作    
> In this project, we want to keep data between sessions, solution?     
- Set the data as localStorage once it's mutated:
```js
actions: {
    setLastSearch(context, payload) {
        context.commit('setLastSearch', payload)
        localStorage.setItem('lastSearch', JSON.stringify(payload))
    }
}
```

### How to trigger an action? 
> Use `dispatch` instead of `commit`
- Now we'll just call action instead of mutation!
- See in localStorage, the value is object, transfer as JSON: `localStorage.setItem('lastSearch', JSON.stringify(payload))`

### Show localStorage data to component
- Use action to call back the localStorage items.
```js
loadStoredState(context) {
    const lastSearch = localStorage.getItem('lastSearch')
    if (lastSearch) {
        context.commit('setLastSearch', JSON.parse(lastSearch))
    }
}
```
>  Then use life cycle hook `beforeCreated`, so it will always be called once loaded.
- In `app.js`, add below:
```js
beforeCreate() {
    this.$store.dispatch('loadStoredState')
}
```
- Now refresh the page, the lastSearch data is still there!   
> All we want to do is to keep track of the input data from user dynamically, from just basically by using state -> then keep in computed state -> then keep in localStorage.   
