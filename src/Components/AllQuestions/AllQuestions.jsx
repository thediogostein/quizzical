import React, { useState } from 'react';
import SingleQuestion from './SingleQuestion';

import classes from './AllQuestions.module.css';

function AllQuestions({
  questions,
  saveAnswer,
  restartGame,
  isCheckBtnDisabled,
  showScore,
  setShowScore,
  score,
}) {
  // const [inputedAnswers, setInputtedAnswers] = useState([]);

  function checkAnswersHandler() {
    setShowScore();
  }

  const scoreElement = (
    <p className={classes.scoreMessage}>
      You scored {score} / {questions.length} correct answers
    </p>
  );

  return (
    <>
      {questions.map((question) => (
        <SingleQuestion
          key={question.id}
          questionId={question.id}
          question={question.questionText}
          answerOptions={question.answerOptions}
          saveAnswer={saveAnswer}
          showScore={showScore}
          checkAnswersHandler={checkAnswersHandler}
        />
      ))}

      <div className={classes.ctaDiv}>
        {showScore && scoreElement}
        {showScore && (
          <button onClick={() => restartGame()} className="btn">
            Play again
          </button>
        )}

        {!showScore && (
          <button
            onClick={checkAnswersHandler}
            className="btn"
            disabled={isCheckBtnDisabled}
          >
            Check answers
          </button>
        )}
      </div>
    </>
  );
}

export default AllQuestions;
