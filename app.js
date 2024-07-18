const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 8080;

app.use(express.static("./"));

const paths = ["/", "*", "/index", "/about", "/contact"];

paths.forEach( currPath => app.get(currPath, (req, res) => {
    const filename = (currPath === "/") 
        ? "/index.html" 
        : (currPath === "*") 
            ? "/404.html" 
            : `${currPath}.html`;
    res.sendFile(path.join(__dirname, filename));
}));

app.listen(port)
console.log(`Server started at http://localhost:${port}`);
