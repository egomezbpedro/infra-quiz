const express = require('express')
const cors = require('cors');
const app = express()
const {createQuizLoop} = require('./controllers/quizController')

// Import the application ROUTES
const userRouter = require('./routes/userRoute');
const quizRouter = require('./routes/quizRoute');

app.enable("trust proxy")
app.use(cors({}))
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// API ROUTES
app.use('/api/v1/users', userRouter);
app.use('/quiz', quizRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

createQuizLoop()
module.exports = app;