import React from "react";
import { useEffect, useState } from "react";
import {useAuthContext} from "../hooks/useAuthContext"
import { ConfirmAlert } from "../components";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Game() {
  const {user} = useAuthContext();
  
  const [userScore, setUserScore] = useState(0) // TODO: We should have the score to be the user score in the database
  const [quizData, setQuizData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isIncorrect, setIsIncorrect] = useState(null);

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
  function loadUserData() {
    fetch("/users/me", {
      method: 'POST',
      body: JSON.stringify({email: user.email}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setUserScore(userData.user.score)
      });
  }

  useEffect(() => {
    if (user) {
      setError(null)
      loadUserData();
      loadQuizData();
    } else {
      setError("You need to log in")
    }
  }, [user, userData]);

  const updateUser = (newScore, date) => {

    fetch("/users/me/update", {
      method: 'PATCH',
      body: JSON.stringify({database_id: userData.user._id, updatedFields: {
        score: newScore,
        lastResponse: date
      }}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setUserScore(userData.user.score)
      });
  }

  const submitResponse = (option) => {
    let date = new Date();
    console.log(date);
    if (quizData.correct_answers[`${option}_correct`] === true) {
      setIsIncorrect(null)
      setIsCorrect(`That is correct.`)
      let newScore = userScore + 1;
      updateUser(newScore, date)
    }
    else {
      setIsCorrect(null);
      setIsIncorrect(`That is incorrect.`);
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
                <div className="quiz-data">
                  <h1>{quizData.question}</h1>

                  <p>Category: {quizData.category} / Difficulty: {quizData.difficulty}</p>
                </div>
                <div className="quiz-answers">
                  <ul>
                    {Object.keys(quizData.answers || {}).map((answer) => {
                      if (quizData.answers[answer]) {
                        return (
                          <li className="quiz-option" key={answer} onClick={()=> optionClicked(answer)}>{quizData.answers[answer]}</li>
                        )
                    }})}
                  </ul>
                </div>
                
                <div className="success">
                  {isCorrect && <p className="success">{isCorrect}</p>}
                </div>
                <div className="error">
                  {isIncorrect && <p className="error">{isIncorrect}</p>}
                </div>

                <div className="score">
                  {userScore && <p className="score">Score: {userScore}</p>}
                </div>
              </div>
              ):(
                <div className="error">
                  {error && <p className="error">{error}</p>}
                </div>
            )}
      </div>
  );
}

export default Game;
