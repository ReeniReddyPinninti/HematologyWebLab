import React from 'react'
import { useState } from 'react'
import "../styles/dropdown.css"
import "../styles/dashboard.css"
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Hematology Lab</h1>
        <p className="subtitle">
          Predicting Anemia for a Healthier Tomorrow
        </p>
        <p>
          Unlock personalized insights on your anemia risk with our advanced predictive tools. 
          Our platform uses cutting-edge analytics to forecast anemia likelihood, empowering you 
          to take proactive steps towards a healthier life.
        </p>
      </div>

      <div className="dashboard-description">
        <div className="info-card">
          <h3>Why Predictive Anemia Analysis Matters</h3>
          <p>
            Anemia, a condition characterized by a shortage of red blood cells, can significantly 
            impact overall health and well-being. Early detection through predictive modeling is 
            key to effective intervention and improved patient outcomes.
          </p>
        </div>

        <div className="info-card">
          <h3>Multiple Advanced Models</h3>
          <p>
            Our platform employs various machine learning models to ensure the most accurate 
            predictions possible. Each model brings unique strengths to the analysis:
          </p>
          <div className="models-list">
            <span className="model-tag">Decision Tree</span>
            <span className="model-tag">Random Forest</span>
            <span className="model-tag">SVM</span>
            <span className="model-tag">KNN</span>
            <span className="model-tag">Gaussian Naive Bayes</span>
            <span className="model-tag">Linear Regression</span>
            <span className="model-tag">Deep Learning</span>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🧬</div>
          <h4>Advanced Analytics</h4>
          <p>
            State-of-the-art machine learning algorithms analyze multiple biomarkers 
            to provide accurate anemia risk assessment.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h4>Instant Results</h4>
          <p>
            Get immediate predictions with detailed analysis from multiple models 
            to ensure comprehensive evaluation.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h4>High Accuracy</h4>
          <p>
            Our ensemble of models ensures high prediction accuracy, giving you 
            confidence in the results.
          </p>
        </div>
      </div>

      <div className="dashboard-cta">
        <h2>Start Your Analysis</h2>
        <p>
          Choose from our comprehensive suite of predictive models to begin your anemia risk assessment. 
          Each model provides unique insights to help guide clinical decisions.
        </p>
        
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropbtn">
            Select Prediction Model ▼
          </button>
          {isOpen && (
            <div className="dropdown-content">
              <Link to="/dt">Decision Tree</Link>
              <Link to="/rf">Random Forest</Link>
              <Link to="/svm">Support Vector Machine</Link>
              <Link to="/knn">K-Nearest Neighbors</Link>
              <Link to="/nb">Gaussian Naive Bayes</Link>
              <Link to="/lr">Linear Regression</Link>
              <Link to="/models">Compare All Models</Link>
              <Link to="/image">Deep Learning Analysis</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard