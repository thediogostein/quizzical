import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import StartScreen from './Components/StartScreen/StartScreen';
import AllQuestions from './Components/AllQuestions/AllQuestions';

import './global.css';

const MOCK_DATA = [
  {
    id: 0,
    questionText: 'Question Text',
    answerOptions: [
      { id: 0, answerText: 'answerText', isCorrect: true },
      { id: 1, answerText: 'answerText', isCorrect: false },
      { id: 2, answerText: 'answerText', isCorrect: false },
      { id: 3, answerText: 'answerText', isCorrect: false },
    ],
  },
  {
    id: 1,
    questionText: 'Question Text',
    answerOptions: [
      { id: 0, answerText: 'answerText', isCorrect: true },
      { id: 1, answerText: 'answerText', isCorrect: false },
      { id: 2, answerText: 'answerText', isCorrect: false },
      { id: 3, answerText: 'answerText', isCorrect: false },
    ],
  },
];

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [questions, setQuestions] = useState(MOCK_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  // console.log(questions);

  function restartGame() {
    setHasGameStarted(false);
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple'
        );

        if (!response.ok) {
          throw new Error('Something went wrong.');
        }

        const dataFromApi = await response.json();

        const transformedData = dataFromApi.results.map((item) => ({
          id: nanoid(),
          questionText: item.question,
          answerOptions: [
            { id: nanoid(), answerText: item.correct_answer, isCorrect: true },
            ...item.incorrect_answers.map((item) => ({
              id: nanoid(),
              answerText: item,
              isCorrect: false,
            })),
          ],
        }));

        // Shuffles the answers array so the correct answer is not always the first one
        transformedData.forEach((item) => shuffleArray(item.answerOptions));

        setQuestions(transformedData);

        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [hasGameStarted]);

  return (
    <main className="wrapper">
      {error && <p>{error}</p>}
      {!hasGameStarted ? (
        <StartScreen onStartGame={() => setHasGameStarted(true)} />
      ) : (
        <AllQuestions questions={questions} restartGame={restartGame} />
      )}
    </main>
  );
}

export default App;
