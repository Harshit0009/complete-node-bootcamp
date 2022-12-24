const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
const replaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');
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


// in arrow function if there is no curly braces, then output gests automatically returned
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCards = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs);

const server = http.createServer((req, res) => {

  // console.log(req.url);
  //console.log(url.parse(req.url, true)); // we are parsing that id into the object form and true is used to give object
  const { query, pathname} = url.parse(req.url, true); // this is the es6 structuring where we pass the same variable name as in object and thus the value will get set to same as in the object.
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, {'content-type': 'text/html'});
    const cardHtml = dataObj.map(el => replaceTemplate(tempCards, el)).join(''); // this join function will join all the data received by map function in the array into an empty string.
    // cards html has now become a string so we can operate it now a string but it is only a single string.
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
    res.end(output); // creating the path for the overview page.

    //Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {'content-type': 'text/html'});
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathName === "/api") {
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8")
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(data);

    //OTHER PAGE
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
