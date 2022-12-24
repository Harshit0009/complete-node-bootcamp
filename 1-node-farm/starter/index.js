const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
//////////////////////////////////
// file read and write

// BLOCKING SYNCHRONOUS WAY.
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}. Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt' , textOut);
// console.log('File write success');

// // Non-Blocking, Asynchronous way
// // callback functions
// fs.readFile('./txt/start.txt', 'utf-8' , (err, data1) =>{
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) =>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) =>{
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log("File written successfully.");
//             });
//         });
//     });
// });

// console.log("First this code will execute depicting the asynchronous and non blocking nature of the script");
//////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW."); // creating the path for the overview page.
  } else if (pathName === "/product") {
    res.end("This is PRODUCT");
  } else if (pathName === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8")
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(data);
  } else {
    res.writeHead(404, {
      // creating the object for the header
      "content-type": "text/html",
      "my-own-type": "This is my type",
    });
    res.end("<h1>Page not found!</h1>");
  }
  // console.log(req);
  //   res.end(
  //     "Hello from the server. This is the response that we get from the server on the request."      // res.end makes the server to end after performing the action specified
  //   );
});

server.listen(8000, "127.0.0.1", () => {
  console.log(
    "Listening to requests on port 8000. Here basically the host and it's port is decided."
  );
});
// use ctrl+c to close the server.
