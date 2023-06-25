// this file is created to hold all the server data of express
// port setup for running the server.
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
// we need to read env variables before then only we can see them in app.js
const app = require('./app');

mongoose // we are connecting to the local database here using all these commands these needs to be used as it is
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// code for entering the tour into the database from here
// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 440
// });
// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.log('ERROR 💥', err);
//   });

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on the port ${port}...`);
});
