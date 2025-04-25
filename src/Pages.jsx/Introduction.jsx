import React, { useState } from 'react';
import '../App.css';
import NavForForms from '../Components.jsx/NavForForms';
import DiamondTrio from '../Components.jsx/DiamondTrio';
import { useNavigate } from 'react-router-dom';

const Introduction = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    const nameValid = /^[A-Za-z\s]+$/.test(name);
    return nameValid;
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!validateInput()) {
      setError('Please enter valid name (letters only).');
      return;
    }

      const response = await fetch(
        'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name })
        }
      );

      const data = await response.json();
      console.log(data);
      localStorage.setItem('skintrics_user', JSON.stringify({ name }));
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
    <div className="buttonGroup">
  <div className="button-wrapper-left" onClick={() => window.history.back()}>
    <div className="diamond-button hover-target">
    <div className="inner-diamond" />
      <div className="mini-triangle-left" />
    </div>
    <p className="button__copy">BACK</p>
  </div>
  <div className="button-wrapper-right" onClick={handleSubmit}>
    <p className="button__copy">PROCEED</p> 
    <div className="diamond-button hover">
      <div className="inner-diamond" />
      <div className="mini-triangle-right" />
    </div>
</div>
</div>
    </>
  );
};

export default Introduction;