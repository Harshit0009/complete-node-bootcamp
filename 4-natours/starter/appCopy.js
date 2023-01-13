// this file contains all the code of app.js that has been deleted/ moved while learning and creating the app js file

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const { resolveSoa } = require('dns');
const e = require('express');
const { resourceLimits } = require('worker_threads');
const app = express();

// Morgan = it allows us to see our request data directly in our console.
app.use(morgan('dev')); // it gives all the details about the execution of the program.
app.use(express.json()); // this is a middle ware built-in.
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'hello this is from the server side.', app: 'Natours' });
// });
// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint... This is the post method');
// });

// we can create our own middleware to do the thing required
// next function is very important
app.use((req, res, next) => {
  console.log('Hello from the middleware. Always executed.');
  next(); // if we use next the req, res cycle will be stuck and we don't be able to move forward. Since no route is defined for this function this middle ware will be applied to all the routes. if the route handlers come before the request.
  // all route handlers are also the middle wares doing the sequential execution.
});
// orders really matter in the express as it does the sequential execution.

// date and time function.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  // function to get all the tours
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  // function to get a single tour
  const id = req.params.id * 1;
  // console.log(req.params);
  const tour = tours.find((el) => el.id === id); // it returns an object which qualify the callback ftn constraints.
  // value that we get of id string and we need to multiply it with another number so we need to check on that

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (req, res) => {
  // new tour adding function
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        // 201 means created
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send('Done');
};

const updateTour = (req, res) => {
  // tour update function
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    // 200 status means success means that the status we use when we update the data is 200 which means ok
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  // delete the tour function
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    // status code 204 means null that is there is no content
    status: 'success',
    data: null,
  });
};

// user's route function
const getAllUsers = (req, res) => {
  res.status(500).json({
    // 500 - server error
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.!',
  });
};

// app.get('/api/v1/tours', getAllTours); // get all tours route
// app.get('/api/v1/tours/:id', getTour); // get a single tour
// app.post('/api/v1/tours', createTour); // create a new tour
// app.patch('/api/v1/tours/:id', updateTour); // update the tour
// app.delete('/api/v1/tours/:id', deleteTour); // delete the tour

// new way of routing so that we don't need to tell domain names again and again

// tours route

// the process is called mounting a router, mounting a new router on a route basically
// mounting of router should come at least after we declare the variables.

// all the below 3 commands have been moved to routes-> tourRoutes.js
// const tourRouter = express.Router();
// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

// uncomment to see the result, not useful so commented see print command.
// app.use((req, res, next) => {
//   console.log(
//     'Hello from the middleware this will be only executed when called for updating and getting a single tour and for deletion of a tour.'
//   );
//   next();
// });

// users route
const userRouter = express.Router();
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter); // essentially a middleware function.
app.use('/api/v1/users', userRouter); // a middleware creation to route the user.

// port setup for running the server.
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on the port ${port}...`);
});
