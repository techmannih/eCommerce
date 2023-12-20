import React, { useEffect, useState } from 'react';

export default function Home() {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${process.env.REACT_APP_QUERIES}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
        },
      };

      try {
        const response = await fetch(url, options);

        // Check if the response status is 429 (Too Many Requests)
        if (response.status === 429) {
          const retryAfter = parseInt(response.headers.get('Retry-After')) || 5; // Default to 5 seconds if no Retry-After header
          console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds.`);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          return fetchData(); // Retry the request
        }

        const result = await response.json(); // Assuming the response is in JSON format
        setApiData(result); // Update state with the API data
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {apiData && (
        <div>
          {/* Render your data here */}
          <h2>Data from API</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
