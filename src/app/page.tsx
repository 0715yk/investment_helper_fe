"use client"; // This directive tells Next.js this is a client component

import { useEffect, useState } from 'react';

interface ApiData {
  message: string;
  status: string;
  items: { id: number; name: string; price: number }[];
}

export default function Home() {
  const [data, setData] = useState<ApiData | null>(null); // State to store API data with typing
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://investment-helper.com/api/data');
            
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: ApiData = await response.json(); // Typecasting response to ApiData
        setData(result);
      } catch (err: any) {
        setError(err.message); // Set the error if the request fails
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2>API Data:</h2>
          {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre> // Display the JSON response nicely formatted
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
}
