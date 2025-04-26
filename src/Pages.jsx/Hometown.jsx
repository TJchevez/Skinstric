import React, { useState } from 'react';
import '../App.css';
import NavForForms from '../Components.jsx/NavForForms';
import DiamondTrio from '../Components.jsx/DiamondTrio';
import { useNavigate } from 'react-router-dom';
import FormNavigationButtons from '../Components.jsx/FormNavigationButtons'; 

const Hometown = () => {
  const [hometown, setHometown] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateInput = () => /^[A-Za-z\s]+$/.test(hometown);

  const handleSubmit = () => {
    if (!validateInput()) {
      setError('Please enter valid hometown (letters only).');
      return;
    }

    localStorage.setItem('hometown', hometown);
    navigate('/submittion'); 
  };

  return (
    <>
      <NavForForms />
      <div className="form-container hover-target">
        <DiamondTrio />
        <p className="clickToType-font">CLICK TO TYPE</p>
        <input
          type="text"
          placeholder="Where do you live?"
          value={hometown}
          onChange={(e) => setHometown(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
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

export default Hometown;
