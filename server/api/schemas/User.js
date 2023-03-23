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

const User = mongoose.model('User', userSchema);
module.exports = User;