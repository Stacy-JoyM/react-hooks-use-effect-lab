import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(()=>{
    // Set up a timer to decrease timeRemaining every second
    const timer = setTimeout(()=>{
      setTimeRemaining((prevTime)=>{
         // Check if the timer has reached 1 second
         if (prevTime === 1) {
           onAnswered(false)  // Move to the next question when time runs out
          return 10;   // Reset the timer for the next question
         }

        // Otherwise, decrease timeRemaining by 1 second
        return prevTime - 1;
         
      })

    }, 1000); 

    //clear the timer 
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered])

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
