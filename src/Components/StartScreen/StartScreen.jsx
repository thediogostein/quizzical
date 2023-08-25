import React from 'react';

import classes from './StartScreen.module.css';

function StartScreen({ onStartGame }) {
  return (
    <article className={classes.container}>
      <h1 className={classes.title}>Quizzical</h1>
      <p className={classes.subtitle}>Time to challenge yourself!</p>
      <button onClick={onStartGame} className={`${classes.btn} btn`}>
        Start quiz
      </button>
    </article>
  );
}

export default StartScreen;
