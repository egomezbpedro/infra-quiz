'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const validator = require('validator')


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
    },
    lastResponse: {
        type: Date,
        default: 0
    }
});

userSchema.statics.signup = async function(email, password){
    if (!email || !password){
        throw Error('All fields are required')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not a valid email')
    }

    const exists = await User.findOne({email});
    if (exists) {
        throw Error('Email already in use') 
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const ldap = email.split("@", 1);

    // Create a new user
    const user = await User.create({username: ldap[0], email, password: hash});

    return user
}

userSchema.statics.loginUser = async function(email, password) {
    if (!email || !password){
        throw Error('All fields are required')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not a valid email')
    }

    const user = await User.findOne({email});
    if (!user) {
        throw Error('There is no user registered with this email')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Incorrect password')
    }

    return user
}
const User = mongoose.model('User', userSchema);
module.exports = User;