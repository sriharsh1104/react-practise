const fs = require('fs');
const http = require('http');
const url = require('url');
const myServer = http.createServer((req,res)=>{
    if(req.url === "/favicon.ico")
        return res.end();
    
const log = `${Date.now()}: ${req.url} New request`;
const parsedUrl = url.parse(req.url,true);
console.log(parsedUrl);
    fs.appendFile("log.txt",log,(err,data)=> {
        switch(parsedUrl.pathname) {
            case "/":
                res.end("Hello From server");
                break;
            case "/about":
                res.end("Hello From about");
                break;
            default:
                res.end("404 Not Found");
                // break;
        }

        // console.log(req);
        // res.end("Hello From server")
    });
});
myServer.listen(8000,()=>{
    console.log("Server is running on port 8000");
})