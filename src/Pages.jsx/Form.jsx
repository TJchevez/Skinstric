import React, { useState } from 'react';
import './App.css';

const Form = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    const nameValid = /^[A-Za-z\s]+$/.test(name);
    const locationValid = /^[A-Za-z\s]+$/.test(location);
    return nameValid && locationValid;
  };

  const handleSubmit = async () => {
    if (!validateInput()) {
      setError('Please enter valid name and location (letters only).');
      return;
    }

    try {
      const response = await fetch(
        'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, location })
        }
      );

      const data = await response.json();
      console.log(data);

      
      localStorage.setItem('skintrics_user', JSON.stringify({ name, location }));

     
      alert('Success! Proceeding to next step...');

    } catch (error) {
      setError('Submission failed. Try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Tell us about yourself</h2>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <div className="button-group">
        <button onClick={() => window.history.back()}>Back</button>
        <button onClick={handleSubmit}>Proceed</button>
      </div>
    </div>
  );
};

export default Form;