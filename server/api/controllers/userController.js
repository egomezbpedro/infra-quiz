const User = require('../schemas/User.js');
const bcrypt = require('bcrypt')
const validator = require('validator')

const createUser = async (req, res, next) => {

    // Get the username and email from the request body
    const {email, password} = req.body;

    if (!email || !password){
        throw Error('All fields are required')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password, [{
        minLength: 6, 
        minLowercase: 1, 
        minUppercase: 1, 
        minNumbers: 0,
        minSymbols: 0
    }])){
        throw Error('Password not strong enough')
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const ldap = email.split("@", 1);
        // Create a new user
        const newUser = await User.create({username: ldap[0], email, password: hash});

        // Send the user back to the client
        res.status(200).json(newUser);
    }
    catch (error) {
        // Send any errors to the client
        console.log(error);
        res.status(400).json({
            error: error.message
        })
    }
}
// const createUser = async (req, res, next) => {

//     // Get the username and email from the request body
//     const {email, password} = req.body;

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(password, salt);
        
//         const username = text.split("@", 1);

//         const user = await User.

//         // Send the user back to the client
//         res.status(200).json([user]);

//         // const salt = await bcrypt.genSalt(10);
//         // const hash = await bcrypt.hash(password, salt);
        
//         // const username = text.split("@", 1);

//         // const user = await User.

//         // // Send the user back to the client
//         // res.status(200).json([user]);
//     }
//     catch (e) {
//         // Send any errors to the client
//         res.status(400).json({error: e})
//     }
// }

const login = async (req, res) => {

    const {username} = req.body;

    try {
        const user = await User.findOne({username});

        // If no user was found
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        // If a user was found
        // Set the username in the session cookie
        // req.session.database_id = user._id;
        res.status(200).json({
            status: 'success',
            user
        });
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