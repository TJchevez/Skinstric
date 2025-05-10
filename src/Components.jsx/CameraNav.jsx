import React from 'react'


function CameraNav({ showAnalysis = false }) {
  return (
    <div className="camera-nav">
      <div className="camera__nav-style">
        <a className="camera__nav-skintric">SKINSTRIC</a>
        <p className="camera__nav-intro">[ {showAnalysis ? "ANALYSIS" : ""} ]</p>
      </div>
    </div>
  );
}


export default CameraNav;
