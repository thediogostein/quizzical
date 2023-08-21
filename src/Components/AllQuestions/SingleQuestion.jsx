import React from 'react';

function SingleQuestion({ question, answersArr }) {
  return (
    <article>
      <h2>{question}</h2>
      {answersArr.map((item) => (
        <button key={item}>{item}</button>
      ))}
    </article>
  );
}

export default SingleQuestion;
