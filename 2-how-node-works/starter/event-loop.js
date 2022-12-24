const fs = require("fs");

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("****************____________********------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setImmediate(() => console.log("Immediate 1 finished"));
  setTimeout(() => console.log("Timer 3 finished"), 5000);
});

console.log("Hello from the top level code.");
