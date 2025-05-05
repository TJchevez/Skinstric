import React from 'react'

function sortAndFormat(obj) {
    return Object.entries(obj)
      .sort(([, a], [, b]) => b - a)
      .map(([key, value]) => ({
        key,
        value: (value * 100).toFixed(2) + "%",
      }));
  }
  
  function Demographics() {
    const storedData = JSON.parse(localStorage.getItem("demographic_result"));
    if (!storedData) return <p>No demographic data found.</p>;
  
    const { race, age, gender } = storedData.data;
  
    const formattedRace = sortAndFormat(race);
    const formattedAge = sortAndFormat(age);
    const formattedGender = sortAndFormat(gender);
  
    return (
      <div>
        <h1>Demographic Results</h1>
  
        <h2>Race</h2>
        <ul>
          {formattedRace.map(({ key, value }) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
  
        <h2>Age</h2>
        <ul>
          {formattedAge.map(({ key, value }) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
  
        <h2>Gender</h2>
        <ul>
          {formattedGender.map(({ key, value }) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
  
        <button onClick={() => window.history.back()}>Back</button>
        <button onClick={() => alert("You can soon fix results here.")}>Fix Results</button>
      </div>
    );
  }

export default Demographics;