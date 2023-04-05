const express = require('express')
const cors = require('cors');
const app = express();
<<<<<<< HEAD
const createQuizLoop = require('./controllers/quizController');
=======
const {createQuizLoop} = require('./controllers/quizController');
>>>>>>> a48fd1872214e81bfac559f309c1d5a037fc1ffc

// Import the application ROUTES
const userRouter = require('./routes/userRoute');
const quizRouter = require('./routes/quizRoute');

app.use((req, res, next) => {
  console.log(req.path, req.method, req.body);
  next();
})

app.enable("trust proxy")
app.use(cors({}))
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// API ROUTES
app.use('/users', userRouter);
app.use('/quiz', quizRouter);

app.get('/', (req, res) => {
  res.send('The API is live')
})

createQuizLoop()
module.exports = app;