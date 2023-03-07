const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js');

// Set the route for getting all users
router.route('/').get(userController.getAllUsers);

// Set the route for creating a new user
router.route('/signup').post(userController.createUser);

// Set the route for logging in a user
router.route('/login').post(userController.login);

// Set the route for getting the current user
router.route('/me').get(userController.getUser);

// Set the route for updating the current user
router.route('/updateMe').patch(userController.updateUser);

// Set the route for deleting the current user
router.route('/deleteMe').delete(userController.deleteUser);

module.exports = router;