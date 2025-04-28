import React from 'react';
import '../App.css';
// THESE BUTTONS ARE CUSTOMIZED FOR THE REST OF THE WEBSITE
const GeneralButtons = ({ onBack, onProceed, backText = 'BACK', proceedText = 'PROCEED' }) => {
  return (
    <div className="buttonGroup_General--lessMargin"> {/* <-- ONLY THIS PART IS DIFFERENT */}
      <div className="button-wrapper-left" onClick={onBack}>
        <div className="diamond-button hover-target">
          <div className="inner-diamond" />
          <div className="mini-triangle-left" />
        </div>
        <p className="button__copy">{backText}</p>
      </div>
      <div className="button-wrapper-right" onClick={onProceed}>
        <p className="button__copy">{proceedText}</p>
        <div className="diamond-button hover">
          <div className="inner-diamond" />
          <div className="mini-triangle-right" />
        </div>
      </div>
    </div>
  );
};

export default GeneralButtons;