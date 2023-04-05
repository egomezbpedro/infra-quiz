const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

const {getQuizById} = require('../controllers/quizController');
// router.use(requireAuth)

router.route('/').get(getQuizById)

module.exports = router;