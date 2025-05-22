import React from "react";
import NavForAnalysis from "../Components.jsx/NavForAnalysis";
import GeneralButtons from "../Components.jsx/GeneralButtons";
import DiamondTrio from "../Components.jsx/DiamondTrio";
import { Link } from "react-router-dom";

function AnalysisOptions() {
  const handleProceed = () => {
    window.location.href = "/"; // I can change this route if needed but routed it to home for now
  };

  return (
    <>
      <NavForAnalysis />
      <p className="analysis_font-paragraph">
        A.I has estimated the following
        <br />
        Fix estimated information if needed.
      </p>
      <div className="diamond-container hover-target-analysis">
        <DiamondTrio />
        <Link to="/demographics">
          <div className="diamondAnalytics diamond-north">
            <div className="diamond-text">Demographics</div>
          </div>
        </Link>
        <div className="diamondAnalytics diamond-east">
          <div className="diamond-text">Skin Type Details</div>
        </div>
        <div className="diamondAnalytics diamond-south">
          <div className="diamond-text">Weather</div>
        </div>
        <div className="diamondAnalytics diamond-west">
          <div className="diamond-text">Cosmetic Concerns</div>
        </div>
      </div>
      <div className="analytic_bottom-buttons">
        <GeneralButtons
          onBack={() => window.history.back()}
          onProceed={handleProceed}
          backText="BACK"
          proceedText="HOME"
        />
      </div>
    </>
  );
}

export default AnalysisOptions;
