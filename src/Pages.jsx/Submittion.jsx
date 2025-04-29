import React, { useState, useEffect } from 'react'
import NavForForms from '../Components.jsx/NavForForms';
import GeneralButtons from '../Components.jsx/GeneralButtons'; 

function Submittion() {
    const [showAlert, setShowAlert] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

   
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); 
      setTimeout(() => {
        setShowAlert(false); 
      }, 500); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <NavForForms />
      {showAlert && (
        <div className={`success-alert ${fadeOut ? 'fade-out' : ''}`}>
          <span className="success-title">SUCCESS</span>
          <span className="success-message">Your information has been submitted successfully!</span>
        </div>
      )}

      <div className="submittion_container-style">
        <h1 className="thankYou__submittion-font">Thank you for submitting!</h1>
        <h2 className="processNextStep__submittion-font">
          Ready for the result? Process for the next step
        </h2>
      </div>

      <GeneralButtons
        onBack={() => window.history.back()}
        onProceed={() => (window.location.href = "/Result")} 
        backText="BACK"
        proceedText="PROCESS"
      />
    </>
  );
}

export default Submittion;
