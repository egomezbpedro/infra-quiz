'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "A password is required"],
    },
    score: {
        type: Number,
        default: 0,
    },
    streak: {
        type: Number,
        default: 0,
    }
});

userSchema.statics.loginUser = async function(email, password) {
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

    const user = await User.findOne({email});
    if (!user) {
        return res.json({
            error: 'There is no user registered with this email'
        }) 
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        return res.json({
            error: 'Incorrect password'
        }) 
    }

    return user
}
const User = mongoose.model('User', userSchema);
module.exports = User;