import React, { useState } from 'react';
import '../App.css';
import NavForForms from '../Components.jsx/NavForForms';
import DiamondTrio from '../Components.jsx/DiamondTrio';
import { useNavigate } from 'react-router-dom';
import FormNavigationButtons from '../Components.jsx/FormNavigationButtons'; 

const Introduction = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    const nameValid = /^[A-Za-z\s]+$/.test(name);
    return nameValid;
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!validateInput()) {
      setError('Please enter valid name (letters only).');
      return;
    }
  
    localStorage.setItem('name', name);
    navigate('/location');
  };

  return (
    <>
    <NavForForms />
    <div className="form-container hover-target">
    <DiamondTrio/>
      <p className='clickToType-font'>CLICK TO TYPE</p>
      <input
        type="text"
        placeholder="Introduce Yourself"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

export default Introduction;