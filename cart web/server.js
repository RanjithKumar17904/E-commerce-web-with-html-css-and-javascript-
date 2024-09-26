const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    if (request.url === '/login') {
        const filePath = path.join(__dirname, 'cart web', 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.write('Internal Server Error');
                response.end();
                return;
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        });
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Invalid Request');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running at port number: ${port}`);
});
