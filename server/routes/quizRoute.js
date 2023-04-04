const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const quizHandler = require('../controllers/quizController');
// router.use(requireAuth)

router.route('/').get(quizHandler.getQuizById)

module.exports = router;