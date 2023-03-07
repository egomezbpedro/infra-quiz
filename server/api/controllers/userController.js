const User = require('../schemas/User.js');

exports.createUser = async (req, res, next) => {

    // Get the username and email from the request body
    const {username, email} = req.body;

    try {
        // Create a new user
        const newUser = await User.create({username, email});

        // Send the user back to the client
        res.status(200).json({
            status: 'success',
            newUser
        });
    }
    catch (e) {
        // Send any errors to the client
        console.log(e);
        res.status(500).json({
            status: 'fail',
            message: e
        })
    }
}

exports.login = async (req, res) => {

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
        req.session.database_id = user._id;
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

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.satus(200).json({
            status: 'success',
            users
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: 'fail',
            message: e
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.database_id);
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

exports.updateUser = async (req, res) => {

    // Get the id of the user to be updated from the request parameters
    const id = req.session.database_id;
    try {
        // Update the user
        console.log(req.session);
        console.log(req.body);
        console.log(id);
        const user = await User.findByIdAndUpdate(id, req.body, {
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

exports.deleteUser = async (req, res) => {

    // Get the id of the user to be updated from the request parameters
    const id = req.session.database_id;

    try {
        const user = await User.findByIdAndDelete(id);
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