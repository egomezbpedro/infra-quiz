import React from "react";
import { useEffect, useState } from "react";
import {useAuthContext} from "../hooks/useAuthContext"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Game() {
  // Get the user authentication context
  const {user} = useAuthContext();
  
  // Set data state
  const [hasResponded, setHasResponded] = useState(false)
  const [quizData, setQuizData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isIncorrect, setIsIncorrect] = useState(null);

  // Fetch the quiz data form the api-server and store it in the quizData state
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
  
  // Fetch the user data form the api-server and store it in the userData state
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
      });
  }
  
  const isToday  = (d2) => {  
      let date1 = new Date();
      let date2 = new Date(d2);
    
      if (date1.getDate() < date2.getDate() && 
          date1.getMonth() < date2.getMonth() &&
          date1.getFullYear() < date2.getFullYear()
        ) {
        console.log("System date is < than user date");
      }
      else if (date1.getDate() > date2.getDate() && 
              date1.getMonth() > date2.getMonth() &&
              date1.getFullYear() > date2.getFullYear()
        ) {
          return false
      } 
      else if (date1.getDate() === date2.getDate() && 
              date1.getMonth() === date2.getMonth() &&
              date1.getFullYear() === date2.getFullYear()
        ) 
          {
            return true
      }
      else {
        return false
      }
  };

  // Call the useEffect hook to check if the user is authenticated and load the data
  // Else show a error msg
  useEffect(() => {
    if (user) {
      // setHasResponded(false)
      setHasResponded(isToday(userData.lastResponse));
      if (!hasResponded){
        setError(null)
        loadUserData();
        loadQuizData();
      }
    } else {
      setError("You need to log in")
    }
  }, [user, userData.score, userData.lastResponse, hasResponded]);

  // Update the user with the new score data
  // TODO: Implement a streak
  const updateUser = (newScore, date) => {

    fetch("/users/me/update", {
      method: 'POST',
      body: JSON.stringify({userId: userData._id, updatedFields: {
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
      });
  }

  // Logic to process if the user answer is the correct one
  const submitResponse = (option) => {
    let date = new Date();
    if (quizData.correct_answers[`${option}_correct`] === true) {
      setIsIncorrect(null)
      setIsCorrect(`That is correct.`)
      let newScore = userData.score + 1;
      updateUser(newScore, date)
    }
    else {
      setIsCorrect(null);
      setIsIncorrect(`That is incorrect.`);
      updateUser(userData.score, date)
    }
    setHasResponded(true)
  }

  // Logic for the confirmation alert
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
/**
 * if a user is authenticated
 *    do:
 *        if a user has not responded (!hasresponded)
 *              do:
 *                  Present with the quiz
 *              else:
 *                  Thow confirmation (isCorrect || isIncorrect)
 *                  Throw error You have already responded today quiz
 *    else:
 *        throw error you need to log in
 */

  return (
      <div className="pages">
        {user ? (
          <div>
            {!hasResponded ? (
              <div className="quiz-card">
                <div className="quiz-data">
                  <h1>{quizData.question}</h1>

                  <p>Category: {quizData.category} / Difficulty: {quizData.difficulty}</p>
                
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
                </div>
              </div>
            ) : (
              <div>
                  <div className="success">
                    {isCorrect && <h1 className="success">{isCorrect}</h1>}
                  </div>
                  <div className="error">
                    {isIncorrect && <h1 className="error">{isIncorrect}</h1>}
                  </div>
                  <div className="error">
                    {hasResponded && <p className="error">You have already responded today's quiz</p>}
                  </div>
              </div>
            )}
            <div className="score">
              {userData.score && <p className="score">Score: {userData.score}</p>}
            </div>
          </div>
        ) : (
          <div className="error">
            {error && <p className="error">{error}</p>}
          </div>
        )}
        {/* {user ? (
            <div>
              {!hasResponded ? (
                <div className="quiz-card">
                  <div className="quiz-data">
                    <h1>{quizData.question}</h1>

                    <p>Category: {quizData.category} / Difficulty: {quizData.difficulty}</p>
                  
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
                </div>
              ):(
                <div>
                  <div className="success">
                    {isCorrect && <p className="success">{isCorrect}</p>}
                  </div>
                  <div className="error">
                    {isIncorrect && <p className="error">{isIncorrect}</p>}
                  </div>
                  div className="error">
                    {hasResponded && <p className="error">You have already responded toda's quiz</p>}
                  </div>
                </div>
              )}
            </div>
        ):(
          <div className="error">
            {error && <p className="error">{error}</p>}
          </div>
        )} */}
      </div>
  );
}

export default Game;
