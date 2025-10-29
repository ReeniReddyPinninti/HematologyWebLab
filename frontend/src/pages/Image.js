import React, { useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
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
    <div className="section">
      <div className='data'>
        <div className='heading'>
        <h2>Deep Learning </h2>
        </div>
      <div className='in'>
        <label>
          <input type="file" onChange={handleFileChange} />
        </label>
        </div>
      {imagePreview && (
        <div>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '250px' }} />
        </div>
      )}
      <button className='btn btn-dark' onClick={handlePredict}>Predict</button>
      {prediction && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header>
            <Modal.Title>Prediction Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{prediction}</p>
          </Modal.Body>
          <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal} style={{ backgroundColor: '#e45a5a', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
    </div>
  );
};

export default Image;