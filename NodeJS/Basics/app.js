const http = require('http') // if ('./http'), then it's local file
const routes = require('./routes')

const server = http.createServer(routes.handler)

server.listen(3000) // Keep listening for request