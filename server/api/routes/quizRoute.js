const express = require('express')
const router = express.Router()

const quizHandler = require('../controllers/quizController');

router.route('/').get(quizHandler.getQuizById)

module.exports = router;