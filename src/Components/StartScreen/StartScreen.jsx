import React from 'react';

import classes from './StartScreen.module.css';

function StartScreen({ onStartGame }) {
  return (
    <article className={classes.container}>
      <h1>Quizzical</h1>
      <p>Time to challenge yourself!</p>
      <button onClick={onStartGame} className="btn">
        Start quiz
      </button>
    </article>
  );
}

export default StartScreen;
