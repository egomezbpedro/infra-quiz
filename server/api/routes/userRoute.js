const express = require('express')
const router = express.Router()

const {login, getUser, getAllUsers, updateUser, deleteUser, createUser} = require('../controllers/userController.js');

// Set the route for getting all users
router.route('/').get(getAllUsers);

// Set the route for creating a new user
router.route('/signup').post(createUser);

// Set the route for logging in a user
router.route('/login').post(login);

// Set the route for getting the current user
router.route('/me').get(getUser);

// Set the route for updating the current user
router.route('/me/update').patch(updateUser);

// Set the route for deleting the current user
router.route('/me/delete').delete(deleteUser);

module.exports = router;