require('dotenv').config()

// Reading the API key from env vars
const KEY = process.env.QUIZ_API_KEY;

const Quiz = require('../schemas/Quiz');
const Archive = require('../schemas/Archive')

// This function takes a quiz api key and fetches the data from the api using the fetch method.
// The function returns the data from the api.

async function getQuizData() {

    const options = {
        method: 'GET',
        headers: {
            "X-Api-Key": KEY,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch('https://quizapi.io/api/v1/questions?limit=1', options);
    const data = await response.json();
    return data[0];
};

let documentId; let archiveId;

async function createQuiz() {
    try {
        
        // Get the quiz data from the api
        const quizData = await getQuizData();

        // Create a new quiz in the database
        const newQuiz = await Quiz.create(quizData);
        
        // Retrieve the quiz id and database object id for storing
        const quizId = quizData.id

        documentId = JSON.parse(JSON.stringify(newQuiz._id));

        // Store the quizId and document id values in a different database collection
        archiveId = await Archive.create([{quizID: quizId, documentID: documentId}])
        console.log(archiveId);

    } catch (e) {
        console.log("Failed to create quiz");
        console.log(e);
    }
}

async function getQuizById (req, res){
    try {
        const quiz = await Quiz.findById(documentId);
        res.json(quiz);
    } catch (e) {
        console.log("Failed to retrieve quiz by the document id");
        console.log(e);
    }
}

async function updateQuiz() {
    try {

        // Get a new quiz from the api
        const quizData = await getQuizData();

        // Get the archiveId
        const quizIdArchive = await Archive.findOne({id: quizData.id}).exec();

        if (!quizIdArchive) {
            console.log('Quiz was already used, fetching a new one');
            await updateQuiz();
        }
        else {
            
            // Update the quiz document
            const updatedQuiz = await Quiz.findByIdAndUpdate(documentId, quizData, {
                new: true,
                runValidators: true
            }); 

            
            // Retrieve the quiz id and database object id for storing
            const quizId = quizData.id

            documentId = JSON.parse(JSON.stringify(updatedQuiz._id));

            // Store the quizId and document id values in a different database collection
            archiveId = await Archive.create([{quizID: quizId, documentID: documentId}])

            console.log('Quiz is fresh as a lettuce');
        }
    } catch (e) {
        console.log("Failed to update quiz");
        console.log(e);
        deleteQuiz();
        updateQuiz();
    }
}

async function deleteQuiz() {
    try {
        await Quiz.findById(documentId).deleteOne();
    } catch (e) {
        console.log("Failed to delete quiz");
        console.log(e);
    }
}

exports.createQuizLoop = async () => {
    try {

        await createQuiz();
        
        setInterval(async () => {
            try {

                await updateQuiz();
                console.log("Quiz updated");

            } catch (e) {

                console.log(e);
                console.log("Quiz deleted");
                await deleteQuiz();
                console.log("Quiz created");
                await createQuiz();

            }
        }, 1000 * 60 * 60 * 24);

    } catch (e) {
        console.log(e);
    }
}