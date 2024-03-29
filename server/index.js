const express = require('express')
const cors = require('cors');
const app = express();
const {createQuizLoop} = require('./controllers/quizController');

// Import the application ROUTES
const userRouter = require('./routes/userRoute');
const quizRouter = require('./routes/quizRoute');

app.use((req, res, next) => {
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
  res.status(200).send("OK");
})

try {
  createQuizLoop()
} catch (error) {
  console.log(error);
  setTimeout(()=>{
    createQuizLoop()
  }, 20000)
}

module.exports = app;