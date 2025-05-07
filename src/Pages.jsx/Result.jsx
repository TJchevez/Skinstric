import React, { useState } from "react";
import NavForForms from "../Components.jsx/NavForForms";
import GeneralButtons from "../Components.jsx/GeneralButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import SpinningSquares from "../Components.jsx/SpinningSquares";

function Result() {
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("PREPARING YOUR ANALYSIS...");


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setImageBase64(base64);
      console.log(JSON.stringify({ image: base64 }, null, 2));
    };
    reader.readAsDataURL(file);
  };

  const handleProceed = async () => {
    if (!imageBase64) {
      setError("Please upload an image before proceeding.");
      return;
    }

    setLoading(true);
    setLoadingText("PREPARING YOUR ANALYSIS...");

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imageBase64 }),
        }
      );

      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));

      localStorage.setItem("uploaded_image", imageBase64);
      localStorage.setItem("demographic_result", JSON.stringify(data));

      setTimeout(() => {
        setLoadingText("ANALYSIS COMPLETE");
        setTimeout(() => {
          window.location.href = "/AnalysisOptions"; 
        }, 1500);
      }, 2000);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload image. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <NavForForms />

      <div className="result-page-wrapper">
        {imageBase64 && (
          <div className="image-preview">
            <h1 className="preview-label">Preview</h1>
            <img
              src={`data:image/jpeg;base64,${imageBase64}`}
              alt="Preview"
              className="preview-img"
            />
          </div>
        )}

        <div className="result__image-container">
          <div className="result__cameraPhoto-left icon-wrapper">
            <p className="result__font-left">ALLOW A.I <br/> TO SCAN YOUR FACE</p>
            <div className="line-to-icon" />
            <div className="icon-stack">
              <SpinningSquares size={260} color="#0a0a0a" />
              <FontAwesomeIcon icon={faCamera} />
            </div>
          </div>
          <div className="result__imageUpload-right icon-wrapper">
            <div className="icon-stack">
              <SpinningSquares size={260} color="#0a0a0a" />
              <label htmlFor="image-upload" className="upload-label">
                <FontAwesomeIcon icon={faImage} />
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
            <p className="result__font-right">ALLOW A.I <br/>ACCESS GALLERY</p>
            <div className="line-to-icon-right" />
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="button-bottom-wrapper">
          <GeneralButtons
            onBack={() => window.history.back()}
            onProceed={handleProceed}
            backText="BACK"
            proceedText="PROCESS"
          />
        </div>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
          <p>{loadingText}</p>
            <SpinningSquares size={400} color="#0a0a0a" />
          </div>
        </div>
      )}
    </>
  );
}

export default Result;
