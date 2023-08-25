import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';

import classes from './SingleQuestion.module.css';
import AnswerBtn from './AnswerBtn';

function SingleQuestion({
  question,
  questionId,
  answerOptions,
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
              saveAnswer={saveAnswer}
              showScore={showScore}
            />
          ))}
        </ul>
      </section>
    </article>
  );
}

export default SingleQuestion;
