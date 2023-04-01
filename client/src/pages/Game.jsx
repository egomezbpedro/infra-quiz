import React from "react";
import { useEffect, useState } from "react";
import {useAuthContext} from "../hooks/useAuthContext"
import { ConfirmAlert } from "../components";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Game() {
  const {user} = useAuthContext();
  
  const [userResult, setUserResult] = useState(false);
  const [score, setScore] = useState(0) // TODO: We should have the score to be the user score in the database
  const [quizData, setQuizData] = useState([]);
  const [error, setError] = useState(null)

  function loadQuizData() {
    fetch("/quiz", {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data);
      });
  }

  useEffect(() => {
    if (user) {
      loadQuizData();
    } else {
      setError("You need to log in")
    }
  }, [user]);

  const submitResponse = (option) => {
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

  const optionClicked = (option) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Is this your final answer?',
      buttons: [
          {
          label: 'Yes',
          onClick: () => submitResponse(option)
          },
          {
          label: 'No'
          }
      ]
    });
  }

  return (
      <div className="pages">
        {user ? (
          <div className="quiz-card">
            <h1>{quizData.question}</h1>

            <p>Category: {quizData.category} / Difficulty: {quizData.difficulty}</p>
            <div className="quiz-answeers">
              <ul>
                {Object.keys(quizData.answers || {}).map((answer) => {
                  if (quizData.answers[answer]) {
                    return (
                      <li className="quiz-option" key={answer} onClick={()=> optionClicked(answer)}>{quizData.answers[answer]}</li>
                    )
                }})}
              </ul>
            </div>
          </div>) 
          : (
            <div>
              {error && <div className="error">{error}</div>}
            </div>
        )}
      </div>
  );
}

export default Game;
