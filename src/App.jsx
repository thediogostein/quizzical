import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import StartScreen from './Components/StartScreen/StartScreen';
import AllQuestions from './Components/AllQuestions/AllQuestions';

import './global.css';

const MOCK_DATA = [
  {
    id: 0,
    isAnswered: false,
    questionText: 'Question 1',

    answerOptions: [
      {
        id: 0,
        answerText: 'answer1',
        isCorrect: true,
        isSelected: false,
      },
      {
        id: 1,
        answerText: 'answer2',
        isCorrect: false,
        isSelected: false,
      },
      {
        id: 2,
        answerText: 'answer3',
        isCorrect: false,
        isSelected: false,
      },
      {
        id: 3,
        answerText: 'answer4',
        isCorrect: false,
        isSelected: false,
      },
    ],
  },
  {
    id: 1,
    isAnswered: false,
    questionText: 'Question 2',
    answerOptions: [
      {
        id: 0,
        answerText: 'answer1',
        isCorrect: true,
        isSelected: false,
      },
      {
        id: 1,
        answerText: 'answer2',
        isCorrect: false,
        isSelected: false,
      },
      {
        id: 2,
        answerText: 'answer3',
        isCorrect: false,
        isSelected: false,
      },
      {
        id: 3,
        answerText: 'answer4',
        isCorrect: false,
        isSelected: false,
      },
    ],
  },
];

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(true);
  const [questions, setQuestions] = useState(MOCK_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCheckBtn, setShowCheckBtn] = useState(false);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  // console.log(questions);

  /*
    ***recado para mim mesmo para testar amanhã
    preciso de um single source of truth
    salvar na array testes, tendo um boolean que 

    ver MOCK_DATA - adicionei um boolean para mostrar se está selecionado ou não,
    se der certa devo estrurar a array que vem da api desta maneira, outra possibilidade é adicionar
  
  */

  //pega o id da pergunta, para salvar no local certo
  function saveAnswer(questionId, answerId) {
    /*  
        this was tricky,
        map over the array, find the right object then map over the array inside that object and find the right object
    */

    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          isAnswered: true,
          answerOptions: question.answerOptions.map((answer) => {
            if (answer.id === answerId) {
              return { ...answer, isSelected: true };
            }
            return { ...answer, isSelected: false };
          }),
        };
      }
      return question;
    });

    setQuestions(updatedQuestions);
  }

  console.log(questions);

  function restartGame() {
    setHasGameStarted(false);
  }

  useEffect(() => {
    const areAllAnswered = questions.every((question) => question.isAnswered);

    if (areAllAnswered) {
      setShowCheckBtn(true);
    }
  }, [questions]);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const response = await fetch(
  //         'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple'
  //       );

  //       if (!response.ok) {
  //         throw new Error('Something went wrong.');
  //       }

  //       const dataFromApi = await response.json();

  //       const transformedData = dataFromApi.results.map((item) => ({
  //         id: nanoid(),
  //         questionText: item.question,
  //         answerOptions: [
  //           { id: nanoid(), answerText: item.correct_answer, isCorrect: true },
  //           ...item.incorrect_answers.map((item) => ({
  //             id: nanoid(),
  //             answerText: item,
  //             isCorrect: false,
  //           })),
  //         ],
  //       }));

  //       // Shuffles the answers array so the correct answer is not always the first one
  //       transformedData.forEach((item) => shuffleArray(item.answerOptions));

  //       setQuestions(transformedData);

  //       setError(null);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   getData();
  // }, [hasGameStarted]);

  return (
    <main className="wrapper">
      {error && <p>{error}</p>}

      {!hasGameStarted && (
        <StartScreen onStartGame={() => setHasGameStarted(true)} />
      )}
      {hasGameStarted && !error && (
        <AllQuestions
          questions={questions}
          saveAnswer={saveAnswer}
          restartGame={restartGame}
          showCheckBtn={showCheckBtn}
        />
      )}
    </main>
  );
}

export default App;
