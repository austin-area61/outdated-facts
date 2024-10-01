import React, { useState } from 'react';

function App() {
  const [year, setYear] = useState('');
  const [facts, setFacts] = useState([]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make a request to your backend to fetch the facts for the entered year
    const response = await fetch(`http://localhost:5000/facts/${year}`);
    const data = await response.json();
    setFacts(data);
  };

  return (
    <div>
      <h1>Outdated Facts</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter the year you graduated:
          <input 
            type="text" 
            value={year} 
            onChange={handleYearChange} 
            placeholder="e.g., 2005" 
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <h2>Outdated Facts:</h2>
      <ul>
        {facts.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
