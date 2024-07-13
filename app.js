import express from 'express';
import http from 'http';
import fs from 'fs';
const port = 8080;
const app = express();

app.use(express.static('./'));

http.createServer((req, res) => {
    let readStream;
    if (req.url === "/styles.css") {
        res.writeHead(200, {'Content-Type': 'text/css'});
        readStream = fs.createReadStream('styles.css');
    } else {
        const validPages = ["/", "/index.html", "/about.html", "/contact.html"];
        const statusCode = validPages.includes(req.url) ? 200 : 404; 
        res.writeHead(statusCode, {'Content-Type': 'text/html'});
        
        readStream = fs.createReadStream(
            statusCode === 200 
                ? (req.url.slice(1) 
                    ? req.url.slice(1) 
                    : "index.html") 
                : '404.html'
        );
    }
    readStream.pipe(res);

}).listen(port);
console.log(`Server is listening on port ${port}`);

