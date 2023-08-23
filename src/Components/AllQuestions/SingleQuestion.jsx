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
}) {
  return (
    <article>
      <header>
        <h2 className={classes.question}>{decode(question)}</h2>
      </header>
      <section>
        <ul className={classes.ul}>
          {answerOptions.map((answer, index) => (
            <AnswerBtn
              key={answer.id}
              questionId={questionId}
              answerId={answer.id}
              text={answer.answerText}
              isCorrect={answer.isCorrect}
              index={index}
              checkAnswersHandler={checkAnswersHandler}
              saveAnswer={saveAnswer}
            />
          ))}
        </ul>
      </section>
    </article>
  );
}

export default SingleQuestion;
