import React from 'react';
import SingleQuestion from './SingleQuestion';

import classes from './AllQuestions.module.css';

function AllQuestions({ dataArr }) {
  console.log(dataArr);
  return (
    <section>
      {dataArr.map((item) => (
        <SingleQuestion
          key={item.id}
          question={item.question}
          answersArr={item.allAnswers}
        />
      ))}

      <button className={classes['check-btn']}>Check answers</button>
    </section>
  );
}

export default AllQuestions;
