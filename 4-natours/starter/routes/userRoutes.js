const express = require('express');

// all controllers shifted to the userController file
const userController = require('./../controllers/userController');

const router = express.Router();
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
