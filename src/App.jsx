import { useState, useEffect } from 'react';

const API_URL =
  'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=boolean';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          'https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=boolean'
        );

        if (!response.ok) {
          throw new Error('Something went wrong.');
        }

        const actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  console.log(data.results);

  return (
    <>
      <p>teste</p>
    </>
  );
}

export default App;
