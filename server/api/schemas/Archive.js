'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const archiveSchema = new Schema({
    quizID: {
        type: Number,
        required: false,
        unique: false,
    },
    documentID: {
        type: String,
        required: false,
        unique: false
    }
});

const ArchiveSchema = mongoose.model('Archive', archiveSchema);
module.exports = ArchiveSchema;