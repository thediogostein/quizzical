import React from 'react';
import SingleQuestion from './SingleQuestion';

import classes from './AllQuestions.module.css';

function AllQuestions({ dataArr }) {
  // Proximos passos
  // Colocar um event listener no botão check answers
  // Ele vai chamar uma funcao
  // Essa funcao vai conferir se o usuário selecionou uma resposta por pergunta
  // Vai checar se as respostas estão corretas
  // Feedback pro usuário

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
