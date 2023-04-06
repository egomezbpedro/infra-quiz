const User = require('../schemas/User.js');
require('dotenv').config()
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    try {
        return jwt.sign({_id}, process.env.SECRET_TOKEN, { expiresIn: '3d'})
    } catch (error) {
        return res.json({
            error: 'Internal Sever Error'
        })
    }
}

const createUser = async (req, res, next) => {

    // Get the username and email from the request body
    const {email, password} = req.body;

    try {
        const user = await User.signup(email, password);

        const token = createToken(user._id)
        
        // Send the user back to the client
        res.status(200).json({email, token});
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message
        })
    }
}

const login = async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.loginUser(email, password)

        const token = createToken(user._id)
        // Send the user back to the client
        res.status(200).json({email, token});
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json([users])
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        })
    }
}

const getUser = async (req, res) => {

    // Get user email from the request body
    const email = req.body;

    try {
        const user = await User.findOne(email);
        if (user) {
            console.log(user);
            res.status(200).json(user)
        } else {
            res.status(200).json({
                error: 'No user was found.'
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        })
    }
}

const updateUser = async (req, res) => {

    // Get the id of the user to be updated from the request parameters
    const {userId, updatedFields } = req.body;
    try {
        // Update the user
        console.log(req.body);

        const user = await User.findByIdAndUpdate(userId, updatedFields, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            user
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message
        })
    }   
}

const deleteUser = async (req, res) => {

    // Get the id of the user to be updated from the request parameters
    const userId = req.body.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

module.exports = {createUser, login, getAllUsers, getUser, updateUser, deleteUser}