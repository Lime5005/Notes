### Create a server with node.js
#### Core modules: http, https, fs, path, os   
- http: launch a server, send requests
- https: launch a SSL server
> We'll import the module `http` to create a server: `const http = require('http')`
- When hover over the `http.`, it shows the function `createServer` with it's arg 
```js
const function createServer(requestListener?: (request: IncomingMessage, response: ServerResponse) => void):server
```
> 3 ways to define the callback function `requestListener`.
```js
// 1.Explicitely define the function:
function reqListener(req, res) {}
http.createServer(reqListener)

// 2.Anonymous function, it's Event driven
http.createServer(function(req, res) {
})

// 3. Arrow function
const server = http.createServer((req, res) => {
    console.log(req);
})
```
- Store the new server in a `const` variable, use it to listen to request. 
- Hover over `listen`, it hints the arg `port`, use any port, ex, 3000.
- Run the code in terminal, it's listening.
- Open browser, go to `localhost:3000`, then back to terminal, see a lot of output, that's the output for `console.log(req)`
> Now we can do something meaningful with the request and send back response.

### Node.js program lifecycle
- node app.js -> start script -> parse code, register variables & functions -> Event loop: keep on running as long as there are event listeners registered.
- The event loop is where the node application been managed.
- Node.js uses such a event driven approach, not just for managing the server, but also sending database request, and register functions to be execute once it's done.
- It executes single thread javascript, but behind the scene, it has multiple threads by leveraging the operating system.
- End the loop by `process.exit`, this quit the server.

### Understanding request
- See the output of request, including meta data like `headers`, etc.
- What is important:
- `req.url`, `req.headers`, `req.method`
- Try console.log these while keep listening, see output in terminal.
- `host`, `connection`, `accept`, `GET`, `cookie`, ect.

### Sending response
- Hover over `res.`, see what's available, ex, `setHeader`, `write`
- Try to ask the response to write some `<html>` elements.
- See Network -> Name:test -> Headers: Content-Type; -> Response: the html code you wrote.

### Load the page to enter data, store in a file on the server when sent
- Import fs (file system) module to write a file and redirect to home page with 302 status, when sending an input value.
```js
if (url === '/message' && method === 'POST') {      
    fs.writeFileSync('message.txt', 'dummy data')
    res.statusCode = 302
    res.setHeader('Location', '/')
    return res.end()
}
```
- See the new file in folder with dummy message, and the page is redirect, see dev tools -> Network, it's redirect with method post and status 302, success!

### Parsing request bodies
> Example: Incoming request
- Stream -> request chunk1 -> chunk2 -> chunk3 -> chunk4 -> fully parsed
- When a file is been uploaded, streaming makes sense, since the data is coming in and writing to disk or hard drive, where the app runs.
- The idea is to start working on the data early, then your code will go to a buffer to handle the data, once it's done, they will go to fully parsed.

### Store the input data
- `req.on()` is an event listener.
- Node.js has `req.on('data')`, `req.on('end')` to handle data, in `data`, ask to push the chunks into an array, in `end`, store the parsed data by `fs.writeFileSync('message.txt', data)`.

### What is a callback in Event listener?
- If we put this in the `end` listener, and re-start the server:
```js
res.statusCode = 302
res.setHeader('Location', '/')
return res.end()
```
- We'll have an error: `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`
- The callback function is executed much later, the code below the `req.on()` listener will run before it. 
> It's important, otherwise, node.js will pause each time to read and write the file, it will pause again and again for each request, hence our server will slow down.

### Block the code execution
- With `writeFileSync`, `sync` will block the code and ask to execute it first.
- Now we `return` the `req.on('end')`, change to `writeFile`, and add a callback function (usually for error handling), but here we use it to redirect:
```js
fs.writeFile('message.txt', data, err => {
    res.statusCode = 302
    res.setHeader('Location', '/')
    return res.end()
})
```
> This means write the file, then handle the error at the very end.        
> This event driven architecture make node to dispatch tiny actions to never block the the code execution, and always come back once an operation is done.   
> Before test new code, delete each time the file created last time 'message.txt'.   

### What is behind the scene
- What is written in Node.js:
> Incoming Requests (req1, req2, req3,...) -> your code & Single Javascript thread -> 1, start event loop and handle callback, 2, fs send to worker pool and do the heavy lifting, it then comes back to trigger the event callback.

### What is Event loop
- Timers: execute setTimeout, setInterval Callbacks.
- Pending callbacks: execute I/O-related callbacks that were deferred.
> I/O: Input and Output, disk & network operations(~blocking operations)   
- Pool: retrieve new I/O events, execute their callbacks.
- Check phase: execute setImmediate() callbacks.
- Close callbacks.
- `process.exit` if `refs == 0`

### Create a routes file
- Move all the `if url=xxx` logic to the `routes.js`.
- Create a `const requestHandler` to store the routes inside.
- Export the `routes.js` to `app.js`, one ways:
> By adding in the end `module.exports = requestHandler`   
> Then in `app.js`, add `const routes = require('./routes')`   
> Use the `routes` as an arg in `createServer(routes)`.
- Test again the new code.
> Or if you have multiples data to export, export it explicitly:   
> `module.exports.handler = requestHandler`, then use it as `routes.handler` in `app.js`   
