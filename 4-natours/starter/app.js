const express = require('express');
const morgan = require('morgan');
const { resolveSoa } = require('dns');
const e = require('express');
const { resourceLimits } = require('worker_threads');
const app = express();

// Morgan = it allows us to see our request data directly in our console.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // it gives all the details about the execution of the program.
app.use(express.json()); // this is a middle ware built-in.
app.use(express.static(`${__dirname}/public`)); // this helps us to open files or server files for which routes are not defined.

// we can create our own middleware to do the thing required
// next function is very important
app.use((req, res, next) => {
  console.log('Hello from the middleware. Always executed.');
  next(); // if we use next the req, res cycle will be stuck and we don't be able to move forward. Since no route is defined for this function this middle ware will be applied to all the routes. if the route handlers come before the request.
  // all route handlers are also the middle wares doing the sequential execution.
});

// we will import the routers to use them in this file for tourRouters and userRouter

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/tours', tourRouter); // essentially a middleware function.
app.use('/api/v1/users', userRouter); // a middleware creation to route the user.

module.exports = app;
