import React from 'react';
import { decode } from 'html-entities';

import classes from './SingleQuestion.module.css';

function SingleQuestion({ question, answersArr }) {
  return (
    <article>
      <header>
        <h2>{decode(question)}</h2>
      </header>
      <section>
        <ul className={classes.ul}>
          {answersArr.map((item) => (
            <li key={item} className={classes.li}>
              <button className={classes['answer-btn']}>{decode(item)}</button>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default SingleQuestion;
