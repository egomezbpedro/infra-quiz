const User = require('../schemas/User.js');
require('dotenv').config()
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_TOKEN, { expiresIn: '3d'})
}

const createUser = async (req, res, next) => {

    // Get the username and email from the request body
    const {email, password} = req.body;

    if (!email || !password){
        return res.json({
            error: 'All fields are required'
        })
    }

    if(!validator.isEmail(email)){
        return res.json({
            error: 'Email is not a valid email'
        })
    }

    const exists = await User.findOne({email});
    if (exists) {
        return res.json({
            error: 'Email already in use'
        }) 
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const ldap = email.split("@", 1);
        // Create a new user
        const newUser = await User.create({username: ldap[0], email, password: hash});

        const token = createToken(newUser._id)
        // Send the user back to the client
        res.status(200).json({email, token});
    }
    catch (error) {
        // Send any errors to the client
        console.log(error);
        res.status(400).json({
            error: error.message
        })
    }
}

const login = async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;

    try {
        const user = await User.loginUser(email, password)

        const token = createToken(user._id)
        // Send the user back to the client
        res.status(200).json({email, token});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 'fail',
            message: e
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json([users])
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: 'fail',
            message: e
        })
    }
}

const getUser = async (req, res) => {

    // Get user _id from the request body
    const userId = req.body.database_id;

    try {
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json({
                status: 'success',
                user
            })
        } else {
            res.status(200).json({
                status: 'fail',
                user: 'No user was found'
            })
        }
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: 'fail',
            message: e
        })
    }
}

const updateUser = async (req, res) => {

    // Get the id of the user to be updated from the request parameters
    const userId = req.body.database_id;
    const updatedFields = req.body.updatedFields
    try {
        // Update the user
        console.log(req.body);

        const user = await User.findByIdAndUpdate(userId, updatedFields, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            user
        })

    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 'fail',
            message: e
        })
    }   
}

const deleteUser = async (req, res) => {

    // Get the id of the user to be updated from the request parameters
    const userId = req.body.database_id;

    try {
        const user = await User.findByIdAndDelete(userId);
        res.status(200).json({
            status: 'success',
            user

        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: 'fail',
            message: e
        })
    }
}

module.exports = {createUser, login, getAllUsers, getUser, updateUser, deleteUser}