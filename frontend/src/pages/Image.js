import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

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
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePredict = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      // Note: Assuming backend is running on port 5000 as per original code
      // Better to use relative path if proxy is set up or environment variable
      const response = await axios.post('http://127.0.0.1:5000/dl_predict', formData);
      setPrediction(response.data.predictionResult);
      setShowModal(true);
    } catch (error) {
      console.error('Error predicting:', error);
      // Optional: Add toast error here
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', backgroundColor: 'white' }}>
      <div className="card-modern animate-fade-in" style={{ maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-600)', marginBottom: '0.5rem' }}>Deep Learning Prediction</h2>
          <p style={{ color: 'var(--gray-500)' }}>Upload a medical image for anemia detection using our advanced deep learning model</p>
        </div>
        
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="image-upload">Select Medical Image</label>
            <div style={{ 
              border: '2px dashed var(--gray-300)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: 'var(--gray-50)'
            }}
            onClick={() => document.getElementById('image-upload').click()}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary-500)'; e.currentTarget.style.backgroundColor = 'var(--primary-50)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--gray-300)'; e.currentTarget.style.backgroundColor = 'var(--gray-50)'; }}
            >
              <input 
                id="image-upload"
                type="file" 
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: 'var(--gray-600)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--primary-500)' }}>
                  <path d="M14.2639 15.9375L12.5958 14.2834C12.267 13.9587 11.7408 13.9587 11.4121 14.2834L9.74397 15.9375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12.0049 14.6667V8.33337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M20.6667 12.0001C20.6667 16.6025 16.9357 20.3334 12.3333 20.3334C7.73096 20.3334 4 16.6025 4 12.0001C4 7.39771 7.73096 3.66675 12.3333 3.66675C16.9357 3.66675 20.6667 7.39771 20.6667 12.0001Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span style={{ fontWeight: 500 }}>
                  {file ? file.name : "Click to Upload Image"}
                </span>
              </div>
            </div>
          </div>

          {imagePreview && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--gray-700)' }}>Image Preview</h4>
              <div style={{ 
                borderRadius: 'var(--radius-lg)', 
                overflow: 'hidden', 
                border: '1px solid var(--gray-200)',
                maxWidth: '100%',
                display: 'inline-block'
              }}>
                <img src={imagePreview} alt="Medical image preview" style={{ maxWidth: '100%', maxHeight: '300px', display: 'block' }} />
              </div>
            </div>
          )}

          <button 
            type="button" 
            className="btn-modern" 
            onClick={handlePredict}
            disabled={!file}
            style={{ marginTop: '2rem' }}
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
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ color: 'var(--success)', marginBottom: '1rem' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h5 style={{ marginBottom: '1rem', fontWeight: 600 }}>Prediction Complete</h5>
                <p style={{ fontSize: '1.1rem', color: 'var(--gray-800)' }}>{prediction}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="secondary" 
                onClick={handleCloseModal}
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