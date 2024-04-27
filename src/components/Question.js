import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {

    const timer = timeRemaining > 0 && setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
    //if the timer is greater than 0 then reset the timer -1

    if(timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }
    //if the timer = 0 then reset it to 10 and triggers onAnswer. set onAnswer to false to show it wasnt answered

    return () => clearTimeout(timer);
    }, [timeRemaining, onAnswered]);
//clean up timer 

    function handleAnswer(isCorrect) {
      setTimeRemaining(10);
      onAnswered(isCorrect);
    }

    const { id, prompt, answers, correctIndex } = question;

    return (
      <>
        <h1>Question {id}</h1>
        <h3>{prompt}</h3>
        {answers.map((answer, index) => {
          const isCorrect = index === correctIndex;
          return (
            <button key={answer} onClick={() => handleAnswer(isCorrect)}>
              {answer}
            </button>
          );
        })}
        <h5>{timeRemaining} seconds remaining</h5>
      </>
    );
  }

export default Question;
