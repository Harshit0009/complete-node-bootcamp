// this file is created to hold all the server data of express
// port setup for running the server.
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// we need to read env variables before then only we can see them in app.js
const app = require('./app');
console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on the port ${port}...`);
});
