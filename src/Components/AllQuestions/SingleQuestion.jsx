import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';

import classes from './SingleQuestion.module.css';
import AnswerBtn from './AnswerBtn';

function SingleQuestion({
  question,
  questionId,
  answerOptions,
  checkAnswersHandler,
  saveAnswer,
  showScore,
}) {
  return (
    <article className={classes.article}>
      <header>
        <h2 className={classes.question}>{decode(question)}</h2>
      </header>
      <section>
        <ul className={classes.ul}>
          {answerOptions.map((answer) => (
            <AnswerBtn
              key={answer.id}
              questionId={questionId}
              answerId={answer.id}
              text={answer.answerText}
              isCorrect={answer.isCorrect}
              isSelected={answer.isSelected}
              checkAnswersHandler={checkAnswersHandler}
              saveAnswer={saveAnswer}
              selectedAnswerId={answer.selectedAnswerId}
              showScore={showScore}
            />
          ))}
        </ul>
      </section>
    </article>
  );
}

export default SingleQuestion;
