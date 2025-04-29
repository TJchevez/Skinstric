import React, { useState } from 'react';
import NavForForms from '../Components.jsx/NavForForms';
import GeneralButtons from '../Components.jsx/GeneralButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons';

function Result() {
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      setImageBase64(base64);
      console.log('Image as Base64:', base64);
    };
    reader.readAsDataURL(file);
  };

  const handleProceed = async () => {
    if (!imageBase64) {
      setError('Please upload an image before proceeding.');
      return;
    }
  
    try {
      const response = await fetch(
        'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageBase64 }),
        }
      );
  
      const data = await response.json();
      console.log('Demographic Response:', data);
  
      localStorage.setItem('uploaded_image', imageBase64);
      localStorage.setItem('demographic_result', JSON.stringify(data));
  
      window.location.href = '/loading';
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload image. Please try again.');
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
          <div className="result__cameraPhoto-left">
            <FontAwesomeIcon icon={faCamera} />
          </div>

          <div className="result__imageUpload-right">
            <label htmlFor="image-upload" className="upload-label">
              <FontAwesomeIcon icon={faImage} />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
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
    </>
  );
}

export default Result;
