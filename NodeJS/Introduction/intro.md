### What is node js?
- Client/Browser for request, Server for response.
- What does Server do: Database, Authentication, Input validation, our business logic.
- Node js is a javascript Runtime, not limited to run on a server, but also for local utility scripts or build tools, react or vue or angular use node js for all the build processes these frameworks needed, since it's a great tool to write utility scripts.
- You have access to the file system to read, write and manupulate files, which will never be exposed to public.

### Why it's so useful?
- Run Server: Create & Listen to Incoming requests.      
> Not only running on the server, but also writing the server yourself.   
> In PHP, you have apache or nginx which run the servers and listening to incoming requests, then execute PHP code.   
- Business logic: Handle Requests, Validate Input, Connect to Database.
- Responses: Return Responses(rendered HTML, JSON...).

### The REPL way
- Read user input, Evaluate user input, Print output/result, Loop (wait) for new input.

### Javascript summary
- A weakly typed language
> No explicit type assignment   
> Data types can be switched dynamically, easy to use, but lead to errors   
- Object-oriented language
> Data can be organised in logical objects   
> Primitive and reference types   
- Versatile language
> Runs in browser and directly on a PC/Server   
> Can perform a broad variety of tasks   


## Some core concepts

### Arrow function
- Module:
```js
const function_name = (var1, var2, var3) => {
  return (var1 + var2 + var3);
}
console.log(function_name(v1, v2, v3));
```

### An object contains a function
```js
const person = {
    name: "Lily",
    age: 30,
    greet() {
        console.log('Hi, I am ' + this.name); // `this` refers to the global object, don't use arrow function
    }
}

person.greet();
```

### Reference types: objects and arrays
- A `const` array can return a new array, it's not changed, `const` refers to an address, a pointer, just the thing it's pointing has changed, not itself.


### Patterns like immutability
- Copy and edite.
> array.slice() is a copy of the array.   

### Spread operator: to pull out elements and add something one by one
- `...array`, `...object`, it pulls out the elements one by one to a new array or a new object.

### Rest operator: to merge multiple arguments
- `..args`, with rest operator, args can be more than it's defined initially.

### Desctructuring object or array
- Retrieve a property from an object
```js
const printName = ({ name }) => {
    console.log(name);
}
```
> `{ name }` means a `name` from an object
```js
const hobbies = ['sports', 'cooking']
const [hobby1, hobby2] = hobbies
console.log(hobby1, hobby2) // sports cooking
```
### Async code and Promise
- `setTimeout`, does't execute immediately.
> Javascript does not block your code execution until the first is done.   
> callback function: a function execute when the time is defined.   
> if too many callback functions in need, use Promise.
- Set a new Promise, and return it.
- The `new Promise` should be wrapped in `()`.

### Template Literals
- Create a string by using backticks ``, to dynamically add data into a string
