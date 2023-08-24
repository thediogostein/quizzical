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
  inputedAnswers,
  selectedAnswerId,
  isSelected,
}) {
  function handleClick() {
    saveAnswer(questionId, answerId);
  }

  return (
    <li className={classes.li}>
      <button
        onClick={handleClick}
        style={{ backgroundColor: isSelected ? 'blue' : '' }}
      >
        {decode(text)}
      </button>
      <p>Is correct: {isCorrect && 'ok'}</p>
    </li>
  );
}

export default AnswerBtn;
