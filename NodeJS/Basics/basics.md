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
