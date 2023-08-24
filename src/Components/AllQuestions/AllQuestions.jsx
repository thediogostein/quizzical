import React, { useState } from 'react';
import SingleQuestion from './SingleQuestion';

import classes from './AllQuestions.module.css';

function AllQuestions({
  questions,
  saveAnswer,
  restartGame,
  showCheckBtn,
  showScore,
  setShowScore,
  score,
}) {
  const [inputedAnswers, setInputtedAnswers] = useState([]);

  function checkAnswersHandler() {
    setShowScore();
  }

  const scoreElement = (
    <p>
      You scored {score} / {questions.length} correct answers
    </p>
  );

  const cssClasses = showCheckBtn ? '' : classes.disabled;

  return (
    <section>
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

      <div>
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
            disabled={!showCheckBtn && true}
          >
            Check answers
          </button>
        )}
      </div>
    </section>
  );
}

export default AllQuestions;
