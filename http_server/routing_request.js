const http = require('http')

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html')

    response.statusCode = 200

    const {
        method,
        url
    } = request

    if (url === '/') {
        if (method === 'GET') {
            response.end('<h1>ini adalah Homepage</h1>')
        } else {
            response.end(`Halaman tidak dapat diakses dengan ${method} request`)
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            response.end('<h1>Halo! ini adalah halaman about</h1>')
        } else if (method === 'POST') {
            let body = []

            request.on('data', (chunk) => {
                body.push(chunk)
            })

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {
                    name
                } = JSON.parse(body);
                response.end(`<h1>Hai, ${name}! ini adalah halaman about</h1>`);
            })
        } else {
            response.end(`Halaman tidak dapat diakses dengan ${method} request`)
        }
    } else {
        response.end('<h1>Halaman tidak ditemukan!</h1>')
    }
};

const server = http.createServer(requestListener);

const port = 5000
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
})