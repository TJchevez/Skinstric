import React, { useState, useRef } from "react";
import NavForForms from "../Components.jsx/NavForForms";
import GeneralButtons from "../Components.jsx/GeneralButtons";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import SpinningSquares from "../Components.jsx/SpinningSquares";
import CameraNav from "../Components.jsx/CameraNav";
import CircleIcon from "../Components.jsx/CircleIcon";

function Result() {
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("PREPARING YOUR ANALYSIS...");
  const [showCamera, setShowCamera] = useState(false);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

  const handleCameraClick = () => {
    setShowPermissionPrompt(true);
  };

 const capturePhoto = () => {
  if (!videoRef.current || !canvasRef.current) return;

  const context = canvasRef.current.getContext("2d");
  const video = videoRef.current;
  canvasRef.current.width = video.videoWidth;
  canvasRef.current.height = video.videoHeight;
  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  const base64 = canvasRef.current.toDataURL("image/jpeg").split(",")[1];
  setImageBase64(base64);
  setPhotoCaptured(true);

  const stream = video.srcObject;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  setTimeout(() => {
    handleProceed();
  }, 100); 
};
  const handleProceed = async () => {
    if (!imageBase64) {
      setError("Please upload or take a photo before proceeding.");
      return;
    }

    setLoading(true);
    setLoadingText("PREPARING YOUR ANALYSIS...");

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: imageBase64 }),
        }
      );

      const data = await response.json();
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
      <div
        className={`result-page-wrapper ${
          showPermissionPrompt ? "dimmed" : ""
        }`}
      >
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
          <div
            className="result__cameraPhoto-left icon-wrapper"
            onClick={handleCameraClick}
          >
            <p className="result__font-left">
              ALLOW A.I <br /> TO SCAN YOUR FACE
            </p>
            <div className="line-to-icon" />
            <div className="icon-stack">
              <SpinningSquares size={260} color="#0a0a0a" />
              <CircleIcon icon={faCamera} />
            </div>
          </div>

          <div className="result__imageUpload-right icon-wrapper">
            <div className="icon-stack">
              <SpinningSquares size={260} color="#0a0a0a" />
              <label htmlFor="image-upload" className="upload-label">
                <CircleIcon icon={faImage} />
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
            <p className="result__font-right">
              ALLOW A.I <br /> ACCESS GALLERY
            </p>
            <div className="line-to-icon-right" />
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        {showCamera && (
          <div className="fullscreen-camera">
            <CameraNav showAnalysis={photoCaptured} />

            {photoCaptured && (
              <div className="camera-great-shot">GREAT SHOT!</div>
            )}

            <div className="camera-capture-wrapper">
              {!photoCaptured && (
                <>
                  <span className="camera-capture-text">TAKE PICTURE</span>
                  <button
                    className="capture-button-full"
                    onClick={capturePhoto}
                  >
                    <CircleIcon icon={faCamera} />
                  </button>
                </>
              )}
            </div>

            <div className="camera-bottom-buttons">
              <div
                className="camera-button-left"
                onClick={() => window.history.back()}
              >
                <div className="result_diamond-button">
                  <div className="result_inner-diamond" />
                  <div className="result_mini-triangle-left" />
                </div>
              </div>
            </div>

            {photoCaptured && (
              <div className="camera-bottom-buttons">
                <div
                  className="camera-button-left"
                  onClick={() => window.history.back()}
                >
                  <div className="result_diamond-button">
                    <div className="result_inner-diamond" />
                    <div className="result_mini-triangle-left" />
                  </div>
                  <span className="button-label">BACK</span>
                </div>

                <div className="camera-button-right" onClick={handleProceed}>
                  <span className="button-label">PROCEED</span>
                  <div className="result_diamond-button">
                    <div className="result_inner-diamond" />
                    <div className="result_mini-triangle-right" />
                  </div>
                </div>
              </div>
            )}

            <div className="camera-bottom-instructions">
              <span className="camera_bottom-text">
                TO GET BETTER RESULTS MAKE SURE TO HAVE
              </span>
              <div className="camera_bottom-row">
                <span className="camera_bottom-item">NEUTRAL EXPRESSION</span>
                <span className="camera_bottom-item">FRONTAL POSE</span>
                <span className="camera_bottom-item">ADEQUATE LIGHTING</span>
              </div>
            </div>

            {photoCaptured ? (
              <img
                src={`data:image/jpeg;base64,${imageBase64}`}
                alt="Captured"
                className="camera-photo-still"
              />
            ) : (
              <video
                ref={videoRef}
                className="camera-video-full"
                autoPlay
                playsInline
                muted
              />
            )}

            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        )}
        <div className="button-bottom-wrapper">
          <GeneralButtons
            onBack={() => window.history.back()}
            onProceed={handleProceed}
            backText="BACK"
            proceedText="PROCESS"
          />
        </div>
      </div>
      {showPermissionPrompt && (
        <div className="camera-permission-overlay">
          <div className="camera-permission-modal">
            <p className="camera_alert-font">ALLOW A.I TO ACCESS YOUR CAMERA</p>
            <hr className="horizontal-line" />
            <div className="permission-buttons">
              <button
                className="deny-button"
                onClick={() => {
                  setShowPermissionPrompt(false);
                  window.location.href = "/";
                }}
              >
                DENY
              </button>
              <button
                className="allow-button"
                onClick={async () => {
                  setShowPermissionPrompt(false);
                  setLoading(true);
                  setLoadingText("SETTING UP CAMERA...");
                  try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                      video: { facingMode: "user" },
                    });
                    setLoading(false);
                    setShowCamera(true);
                    setTimeout(() => {
                      if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                      }
                    }, 100);
                  } catch (err) {
                    console.error("Camera access denied", err);
                    window.location.href = "/";
                  }
                }}
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <p>{loadingText}</p>

            <div className="spinner-with-icon">
              <SpinningSquares size={400} color="#0a0a0a" />
              <CircleIcon
                icon={faCamera}
                className="spinner-camera-icon"
              />
            </div>
            <div className="camera-loading-instructions">
              <span className="camera_loading-text">
                TO GET BETTER RESULTS MAKE SURE TO HAVE
              </span>
              <div className="camera_loading-row">
                <span className="camera_loading-item">NEUTRAL EXPRESSION</span>
                <span className="camera_loading-item">FRONTAL POSE</span>
                <span className="camera_loading-item">ADEQUATE LIGHTING</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Result;
