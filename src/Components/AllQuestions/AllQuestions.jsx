import React from 'react';

import SingleQuestion from './SingleQuestion';

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
    </section>
  );
}

export default AllQuestions;
