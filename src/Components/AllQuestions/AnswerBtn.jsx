import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';

import classes from './AnswerBtn.module.css';

function AnswerBtn({
  questionId,
  answerId,
  text,
  isCorrect,
  checkAnswersHandler,
  saveAnswer,
  selectedAnswerId,
  isSelected,
  showScore,
}) {
  function handleClick() {
    saveAnswer(questionId, answerId);
  }

  let cssClasses = classes.unselected;

  if (!showScore) {
    if (isSelected) {
      cssClasses = classes.selected;
    }
  }

  if (showScore) {
    if (isCorrect) {
      cssClasses = classes.revealCorrect;
    } else if (isSelected && !isCorrect) {
      cssClasses = classes.revealIncorrect;
    } else {
      cssClasses = classes.revealOther;
    }
  }

  return (
    <li className={classes.li}>
      <button onClick={handleClick} className={cssClasses} disabled={showScore}>
        {decode(text)}
      </button>
      {isCorrect && <p>OK</p>}
    </li>
  );
}

export default AnswerBtn;
