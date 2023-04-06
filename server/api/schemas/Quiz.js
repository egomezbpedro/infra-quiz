'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },    
    question: String,

    description: String,

    answers: {
        answer_a: String,
        answer_b: String,
        answer_c: String,
        answer_d: String,
        answer_e: String,
        answer_f: String,
    },
    
    multiple_correct_answers: Boolean,
    
    correct_answers: {
        answer_a_correct: Boolean,
        answer_b_correct: Boolean,
        answer_c_correct: Boolean,
        answer_d_correct: Boolean,
        answer_e_correct: Boolean,
        answer_e_correct: Boolean,
    },
    
    correct_answer: String,
    
    explanation: String,

    tip: String,
    
    tags: Array,
    
    category: String,
    
    difficulty: String,
});

const QuizSchema = mongoose.model('Quiz', quizSchema);
module.exports = QuizSchema;