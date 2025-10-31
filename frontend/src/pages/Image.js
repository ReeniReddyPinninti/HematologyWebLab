import React, { useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import "../styles/mix.css"
import "../styles/forms.css"

const Image = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const navigate = useNavigate();

//   const userValid = () => {
//     let token = localStorage.getItem("user");
//     if (token) {
//       console.log("user valid")
//     } else {
//       navigate("*")
//     }
//   }

//   useEffect(() => {
//     userValid();
//   }, [])

  const handlePredict = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://127.0.0.1:5000/dl_predict', formData);
      setPrediction(response.data.predictionResult);
      setShowModal(true);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h2>Deep Learning Prediction</h2>
          <p>Upload a medical image for anemia detection using our advanced deep learning model</p>
        </div>
        
        <form>
          <div className="form_input">
            <label htmlFor="image-upload">Select Medical Image</label>
            <div className="file-upload-container">
              <input 
                id="image-upload"
                type="file" 
                onChange={handleFileChange}
                accept="image/*"
                className="file-input"
              />
              <div className="file-upload-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.2639 15.9375L12.5958 14.2834C12.267 13.9587 11.7408 13.9587 11.4121 14.2834L9.74397 15.9375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12.0049 14.6667V8.33337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M20.6667 12.0001C20.6667 16.6025 16.9357 20.3334 12.3333 20.3334C7.73096 20.3334 4 16.6025 4 12.0001C4 7.39771 7.73096 3.66675 12.3333 3.66675C16.9357 3.66675 20.6667 7.39771 20.6667 12.0001Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                Choose Image
              </div>
            </div>
          </div>

          {imagePreview && (
            <div className="image-preview">
              <h4>Image Preview</h4>
              <div className="preview-container">
                <img src={imagePreview} alt="Medical image preview" />
              </div>
            </div>
          )}

          <button 
            type="button" 
            className="btn" 
            onClick={handlePredict}
            disabled={!file}
          >
            Analyze Image
          </button>
        </form>

        {prediction && (
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Analysis Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="prediction-result">
                <div className="result-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10b981" strokeWidth="2"/>
                  </svg>
                </div>
                <h5>Prediction Complete</h5>
                <p className="result-text">{prediction}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="secondary" 
                onClick={handleCloseModal}
                className="modal-close-btn"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default Image;