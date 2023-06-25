const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID); since checkid is deleted we no longer need this

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour); // we can have chaining of multiple middleware by writing them one after the another in the routes
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
