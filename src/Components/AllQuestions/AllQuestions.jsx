import React, { useState } from 'react';
import SingleQuestion from './SingleQuestion';

import classes from './AllQuestions.module.css';

function AllQuestions({ questions, restartGame }) {
  const [inputedAnswers, setInputtedAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);

  const score = inputedAnswers.reduce(
    (accumulator, currentValue) => accumulator + currentValue.score,
    0
  );

  function saveAnswer(receivedAnswer) {
    // check if the answer already exists and if so updates it( this is to avoid duplication)
    for (let i = 0; i < inputedAnswers.length; i++) {
      if (inputedAnswers[i].questionId === receivedAnswer.questionId) {
        inputedAnswers[i].score = receivedAnswer.score;
        return;
      }
    }
    setInputtedAnswers((prev) => [...prev, receivedAnswer]);
  }

  function checkAnswersHandler() {
    setShowScore(true);
  }

  const scoreElement = (
    <p>
      You scored {score} / {inputedAnswers.length} correct answers
    </p>
  );

  const cssClasses =
    inputedAnswers.length === questions.length ? '' : classes.disabled;

  return (
    <section>
      {questions.map((question) => (
        <SingleQuestion
          key={question.id}
          questionId={question.id}
          question={question.questionText}
          answerOptions={question.answerOptions}
          saveAnswer={saveAnswer}
          checkAnswersHandler={checkAnswersHandler}
        />
      ))}

      <div>
        {showScore && scoreElement}
        {showScore && <button onClick={() => restartGame()}>Play again</button>}
        {!showScore && (
          <button className={cssClasses} onClick={checkAnswersHandler}>
            Check answers
          </button>
        )}
      </div>
    </section>
  );
}

export default AllQuestions;
