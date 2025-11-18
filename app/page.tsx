'use client'

import { useEffect, useState } from "react";


// Define the data structure coming from your backend
type Item = {
  id: number;
  name: string;
};


export default function Home() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching data from the API
    fetch('http://13.50.193.230:3001/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        setData(result);  // Set the data
        setLoading(false);  // Set loading state to false after data is fetched
      })
      .catch((error) => {
        setError(error);  // Set error state if fetching fails
        setLoading(false);
      });
  }, []); // Empty array ensures this runs once when the component is mounted

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;  // Show loading message while fetching
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">Error: {error}</div>;  // Display error message if any
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">Fetched Names</h1>
      <ul className="space-y-4">
        {data.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-blue-50">
            <span className="text-lg font-medium text-gray-700">{item.name}</span>
            <span className="text-sm text-gray-400">ID: {item.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
