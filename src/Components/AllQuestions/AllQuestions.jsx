import React, { useState } from 'react';
import SingleQuestion from './SingleQuestion';

import classes from './AllQuestions.module.css';

function AllQuestions({ questions, saveAnswer, restartGame, showCheckBtn }) {
  const [inputedAnswers, setInputtedAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);

  const score = inputedAnswers.reduce(
    (accumulator, currentValue) => accumulator + currentValue.score,
    0
  );

  function checkAnswersHandler() {
    setShowScore(true);

    // mostrar qual é a certa
    // mostrar qual o usuário selecionou
  }

  const scoreElement = (
    <p>
      You scored {score} / {inputedAnswers.length} correct answers
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
          checkAnswersHandler={checkAnswersHandler}
          inputedAnswers={inputedAnswers}
        />
      ))}

      <div>
        {showScore && scoreElement}
        {showScore && <button onClick={() => restartGame()}>Play again</button>}

        <button onClick={checkAnswersHandler} className={cssClasses}>
          Check answers
        </button>
      </div>
    </section>
  );
}

export default AllQuestions;
