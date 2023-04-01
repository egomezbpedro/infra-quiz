import React from "react";
import { useEffect, useState } from "react";

function Game() {
  function loadQuizData() {
    fetch("/quiz")
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data);
        setIsLoading(false);
      });
  }
  // function loadUserData(){
  //   fetch("/user/me")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setQuizData(data);
  //       setIsLoading(false);
  //     });
  // }

  const [userResult, setUserResult] = useState(false);
  
  const [score, setScore] = useState(0) // TODO: We should have the score to be the user score in the database.

  const [quizData, setQuizData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuizData();
  }, []);

  if (isLoading) {
    return <p>Loading quiz...</p>;
  }

  const optionClicked = (option) => {
    

    if (quizData.correct_answers[`${option}_correct`] === true) {
      console.log("correct");
      console.log(quizData.correct_answers[`${option}_correct`])
      setScore(score + 1)
       
    }
    else {
      console.log("incorrect");
      console.log(quizData.correct_answers[`${option}_correct`])
    }
    
    
  }

  return (
    <div>
      {userResult ? (
        <div className="results">
          <h3>Congrats, your answer is correct</h3>
        </div>
      ) : (
        <div className="quiz-card">
          <h2>Today's Question</h2>
          <h3>{quizData.question}</h3>
          <p>{quizData.description}</p>

          <p>
            Category: {quizData.category} - Difficulty: {quizData.difficulty}
          </p>
          <ul>
            {Object.keys(quizData.answers).map((answer) => {
              if (quizData.answers[answer]) {
                return (
                  <li className="quiz-option" key={answer} onClick={()=> optionClicked(answer)}>{quizData.answers[answer]}</li>
                )
              }})}
              
          </ul>
        </div>
      )}
    </div>
  );
}

export default Game;
