const fs = require('fs');
const os = require("os")
console.log(os.cpus().length)
//sync
// fs.writeFileSync('hello.txt', 'Hello from Node.js');
// //Async
// fs.writeFile('hello.txt', 'Hello from Node.js', (err) => {
//     if (err) {
//         console.log(err);
//     }
// });
// fs.readFile('hello.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(data);
// });
// fs.appendFileSync('hello.txt', 'Hello from Node.js for future');