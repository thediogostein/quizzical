import React, { useState } from 'react';
import { decode } from 'html-entities';

import classes from './AnswerBtn.module.css';

function AnswerBtn({
  questionId,
  answerId,
  text,
  isCorrect,
  index,
  checkAnswersHandler,
  saveAnswer,
}) {
  const [hasUserScored, setHasUserScored] = useState(null);

  function handleClick() {
    const score = isCorrect ? 1 : 0;
    const answer = { questionId, score };

    saveAnswer(answer);

    // let score;
    // if (isCorrect) {
    //   score = 1;
    //   checkAnswersHandler(id);
    // } else {
    //   score = 0;
    //   checkAnswersHandler(id);
    // }
  }

  return (
    <li className={classes.li}>
      <button onClick={handleClick}>{decode(text)}</button>
      <p>Is correct: {isCorrect && 'ok'}</p>
    </li>
  );
}

export default AnswerBtn;
