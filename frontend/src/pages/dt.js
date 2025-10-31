import React from 'react'
import { useState } from 'react'
import { pred_dt } from '../services/Apis';
import "../styles/dropdown.css"
import "../styles/forms.css"

const DT = () => {

  const [gender, setGender] = useState('');
  const [haemoglobin, setHaemoglobin] = useState('');
  const [mch, setMch] = useState('');
  const [mchc, setMchc] = useState('');
  const [mcv, setMcv] = useState('');
  const [predictionOptimized, setPredictionOptimized] = useState(null);
  const [predictionAllFeatures, setPredictionAllFeatures] = useState(null);


  const makePrediction = async (input) => {
    try {
      // Prediction using all features
      const responseAllFeatures = await pred_dt({gender, haemoglobin,mch, mchc, mcv,features: 'all',});
      setPredictionAllFeatures(responseAllFeatures.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error.message);
    }
  };
  const makeoptPrediction = async (input) => {
    try {
      // Prediction using optimized features
      const responseOptimized = await pred_dt({gender,haemoglobin,mcv,features:'optimized'});
      setPredictionOptimized(responseOptimized.data.prediction);

    } catch (error) {
      console.error('Error making prediction:', error.message);
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h2>Decision Tree Model</h2>
          <p>Advanced machine learning model with high accuracy for anemia prediction</p>
        </div>
        
        <form>
          <div className="input-fields">
            <div className="form_input">
              <label htmlFor='gender'>Gender</label>
              <input 
                type="number" 
                id="gender"
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                placeholder="Enter gender (0 for Male, 1 for Female)"
              />
            </div>
            
            <div className="form_input">
              <label htmlFor='haemoglobin'>Haemoglobin (g/dL)</label>
              <input 
                type="number" 
                id="haemoglobin"
                step="0.1"
                value={haemoglobin} 
                onChange={(e) => setHaemoglobin(e.target.value)}
                placeholder="Enter haemoglobin level"
              />
            </div>
            
            <div className="form_input">
              <label htmlFor='mch'>MCH (pg)</label>
              <input 
                type="number" 
                id="mch"
                step="0.1"
                value={mch} 
                onChange={(e) => setMch(e.target.value)}
                placeholder="Mean Corpuscular Hemoglobin"
              />
            </div>
            
            <div className="form_input">
              <label htmlFor='mchc'>MCHC (g/dL)</label>
              <input 
                type="number" 
                id="mchc"
                step="0.1"
                value={mchc} 
                onChange={(e) => setMchc(e.target.value)}
                placeholder="Mean Corpuscular Hemoglobin Concentration"
              />
            </div>
            
            <div className="form_input">
              <label htmlFor='mcv'>MCV (fL)</label>
              <input 
                type="number" 
                id="mcv"
                step="0.1"
                value={mcv} 
                onChange={(e) => setMcv(e.target.value)}
                placeholder="Mean Corpuscular Volume"
              />
            </div>
          </div>

          <button 
            type="button"
            className='btn' 
            onClick={() => makeoptPrediction({ gender, haemoglobin, mch, mchc, mcv })}
          >
            Predict (Optimized Features)
          </button>

          <button 
            type="button"
            className="btn" 
            onClick={() => makePrediction({ gender, haemoglobin, mch, mchc, mcv })}
          >
            Predict (All Features)
          </button>
        </form>

        {(predictionOptimized !== null || predictionAllFeatures !== null) && (
          <div className="results-section">
            <h3>Prediction Results</h3>
            
            {predictionOptimized !== null && (
              <div className={`result-item ${predictionOptimized === 1 ? 'result-positive' : 'result-negative'}`}>
                <h4>Optimized Model Result</h4>
                <p>
                  {predictionOptimized === 1 
                    ? 'Anemia detected - Please consult with a healthcare professional' 
                    : 'No anemia detected - Results look normal'
                  }
                </p>
              </div>
            )}

            {predictionAllFeatures !== null && (
              <div className={`result-item ${predictionAllFeatures === 1 ? 'result-positive' : 'result-negative'}`}>
                <h4>All Features Model Result</h4>
                <p>
                  {predictionAllFeatures === 1 
                    ? 'Anemia detected - Please consult with a healthcare professional' 
                    : 'No anemia detected - Results look normal'
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )   
}


export default DT