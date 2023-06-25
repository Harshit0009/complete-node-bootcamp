const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  // this is the schema of the tour that we want to create and store as documents in the database collection
  name: {
    type: String,
    required: [true, 'A tour must have a name'], // validator which means that we require the data
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5 // this gives the default value
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  }
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
