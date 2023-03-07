'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const archiveSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    documentId: {
        type: String,
        required: true,
        unique: true
    }
});

const ArchiveSchema = mongoose.model('Archive', archiveSchema);
module.exports = ArchiveSchema;