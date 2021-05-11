const http = require('http') // if ('./http'), then it's local file

// This create a server, store it in a const variable
const server = http.createServer((req, res) => {
    console.log(req.url, req.headers, req.method);
    // process.exit(); // Your connection was interrupted
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Write title from server</title></head>')
    res.write('<body><h1>Hello from server</h1></body>')
    res.write('</html>')
    res.end()
})

server.listen(3000) // Keep listening for request