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
        console.log(chunk); // <Buffer 64 61 74 61 3d 6c 6c 6a 6b 6b 6a>
        // Node.js will do it so often until it's all done.
        body.push(chunk); // With push(), we are changing the object data behind, not re-assign const object itself.

    })
    return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString() // Why toString()? Since the data we input is text, if it's file, we will handle it differently.
            // console.log(parsedBody); // data=lljkkj
        const data = parsedBody.split('=')[1]
        fs.writeFile('message.txt', data, err => {
            res.statusCode = 302
            res.setHeader('Location', '/')
            return res.end()
        })
    })
}