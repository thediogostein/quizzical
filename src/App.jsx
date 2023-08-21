import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import StartScreen from './Components/StartScreen/StartScreen';
import AllQuestions from './Components/AllQuestions/AllQuestions';

import './global.css';

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
          question: item.question,
          correctAnswer: item.correct_answer,
          allAnswers: [item.correct_answer, ...item.incorrect_answers],
        }));

        setDataArr(transformedData);
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
      {!hasGameStarted ? (
        <StartScreen onStartGame={() => setHasGameStarted(true)} />
      ) : (
        <AllQuestions dataArr={dataArr} />
      )}
    </main>
  );
}

export default App;
