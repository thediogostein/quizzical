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
  } else if (showScore) {
    if (isSelected && !isCorrect) {
      cssClasses = classes.revealIncorrect;
    } else if (isSelected && isCorrect) {
      cssClasses = classes.revealCorrect;
    } else {
      cssClasses = classes.revealOther;
    }
  }

  return (
    <li className={classes.li}>
      <button
        onClick={handleClick}
        className={cssClasses}
        disabled={showScore && true}
      >
        {decode(text)}
      </button>
      <p>Is correct: {isCorrect && 'ok'}</p>
    </li>
  );
}

export default AnswerBtn;
