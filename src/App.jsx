import { mockData } from './mockData.js';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import StartScreen from './Components/StartScreen/StartScreen';
import AllQuestions from './Components/AllQuestions/AllQuestions';

import './global.css';

function App() {
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCheckBtnDisabled, setIsCheckBtnDisabled] = useState(true);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

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

  function restartGame() {
    setHasGameStarted(false);
    setShowScore(false);
    setScore(0);
    setIsCheckBtnDisabled(true);
    getData();
  }
  async function getData() {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple'
      );

      if (!response.ok) {
        throw new Error(`Something went wrong. ${response.status}`);
      }

      const dataFromApi = await response.json();

      const transformedData = dataFromApi.results.map((item) => ({
        id: nanoid(),
        isAnswered: false,
        questionText: item.question,
        answerOptions: [
          {
            id: nanoid(),
            answerText: item.correct_answer,
            isCorrect: true,
            isSelected: false,
          },
          ...item.incorrect_answers.map((item) => ({
            id: nanoid(),
            answerText: item,
            isCorrect: false,
            isSelected: false,
          })),
        ],
      }));

      // Shuffles the answers array so the correct answer is not always the first one
      transformedData.forEach((item) => shuffleArray(item.answerOptions));

      console.log(transformedData);

      setQuestions(transformedData);
      setError(null);
    } catch (error) {
      setError(error.message);
      setQuestions(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const areAllAnswered = questions.every(
        (question) => question.isAnswered === true
      );

      if (areAllAnswered === true) {
        setIsCheckBtnDisabled(false);
      }

      let count = 0;

      for (const question of questions) {
        for (const answer of question.answerOptions) {
          if (answer.isCorrect && answer.isSelected) {
            count += 1;
          }
        }
      }
      setScore(count);
    }
  }, [questions]);

  let content = <p>Found no questions.</p>;

  if (hasGameStarted && questions.length > 0) {
    content = (
      <AllQuestions
        questions={questions}
        saveAnswer={saveAnswer}
        restartGame={restartGame}
        isCheckBtnDisabled={isCheckBtnDisabled}
        showScore={showScore}
        setShowScore={() => setShowScore(true)}
        score={score}
      />
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <main className="wrapper">
      {error && <p>{error}</p>}
      {!hasGameStarted && (
        <StartScreen onStartGame={() => setHasGameStarted(true)} />
      )}
      {/* {hasGameStarted && !error && (
        <AllQuestions
          questions={questions}
          saveAnswer={saveAnswer}
          restartGame={restartGame}
          isCheckBtnDisabled={isCheckBtnDisabled}
          showScore={showScore}
          setShowScore={() => setShowScore(true)}
          score={score}
        />
      )} */}
      <section>{hasGameStarted && content}</section>
    </main>
  );
}

export default App;
