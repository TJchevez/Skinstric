import React, { useState } from 'react';
import '../App.css';
import NavForForms from '../Components.jsx/NavForForms';
import DiamondTrio from '../Components.jsx/DiamondTrio';
import { useNavigate } from 'react-router-dom';
import FormNavigationButtons from '../Components.jsx/FormNavigationButtons'; 

const Location = () => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    const locationValid = /^[A-Za-z,\s]+$/.test(location);
    return locationValid;
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!validateInput()) {
      setError('Please enter valid location (letters only).');
      return;
    }
  
    const name = localStorage.getItem('name');
  
    if (!name) {
      setError('Name is missing. Please go back and enter your name.');
      return;
    }
  
    try {
      const response = await fetch(
        'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, location }),
        }
      );
  
      const data = await response.json();
      console.log(data);
  
      localStorage.setItem('location', location);
  
      navigate('/hometown'); 
    } catch (error) {
      setError('Submission failed. Try again.');
    }
  };

  return (
    <>
    <NavForForms />
    <div className="form-container hover-target">
    <DiamondTrio/>
      <p className='clickToType-font'>CLICK TO TYPE</p>
      <input
        type="text"
        placeholder="Where are you from?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      {error && <p className="error">{error}</p>}
    </div>
    <FormNavigationButtons
        onBack={() => window.history.back()}
        onProceed={handleSubmit}
      />
    </>
  );
};

export default Location;