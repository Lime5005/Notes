const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Write title from server</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="data"><button type="submit">SEND</button></form></body>')
        res.write('</html>')
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const data = parsedBody.split('=')[1]
            fs.writeFile('message.txt', data, err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Write title from server</title></head>')
    res.write('<body><h1>Hello from server</h1></body>')
    res.write('</html>')
    res.end()
}

module.exports = requestHandler