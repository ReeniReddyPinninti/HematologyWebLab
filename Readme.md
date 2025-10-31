# Hematology Web Lab

<!-- You can add a logo/banner image here -->
![Hematology Lab Banner](./assets/banner.png)

A full-stack web application for hematology analysis and prediction, integrating multiple machine learning models, a deep learning image classifier, user authentication, and a modern frontend interface.

<!-- You can add badges here -->
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Table of Contents

- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [How the Application Works](#how-the-application-works)
  - [Frontend](#frontend)
  - [Backend (Node.js)](#backend-nodejs)
  - [Python ML Service (`py_code/app.py`)](#python-ml-service-py_codeapppy)
  - [Components Interaction](#components-interaction)
- [Main Features](#main-features)
- [Data Flow Example](#data-flow-example)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

---

## Project Structure

```
├── backend/
│   ├── app.js              # Main Node.js/Express server
│   ├── controllers/
│   │   └── mlController.js # Handles ML-related requests via Python API
│   ├── Routes/
│   │   └── router.js       # API endpoints routing
│   └── models/             # MongoDB models
├── py_code/
│   └── app.py              # Flask API exposing ML models
│   └── *_model.py          # ML model implementations (svm, dt, knn, lr, nb, rf)
├── frontend/
│   ├── src/
│   │   ├── pages/          # React pages (Login, Register, Dashboard, Models, Image upload)
│   │   ├── services/       # API utility and backend URL
│   │   └── App.js          # Main React router
```

---

## Screenshots

### Dashboard
![Dashboard Screenshot](./assets/screenshots/dashboard.png)
*Modern and intuitive dashboard with prediction model selection*

### Login Interface
![Login Screenshot](./assets/screenshots/login.png)
*Clean authentication interface with modern design*

### Prediction Forms
![Prediction Form](./assets/screenshots/prediction-form.png)
*User-friendly forms for entering medical data*

### Results Display
![Results Screenshot](./assets/screenshots/results.png)
*Clear visualization of prediction results*

### Image Analysis
![Image Analysis](./assets/screenshots/image-analysis.png)
*Deep learning image analysis interface*

---

## How the Application Works

### Frontend

- Built in React (`frontend/src`).
- Users interact with pages for login, registration, dashboard, model prediction (SVM, DT, KNN, LR, NB, RF), and image upload.
- API requests are sent using utility functions in `frontend/src/services/Apis.js` to the Node backend (`http://localhost:4002`).

### Backend (Node.js)

- Express app (`backend/app.js`) serves the React frontend and provides REST API endpoints.
- User authentication and registration handled via `/user/register`, `/user/login`, etc.
- Prediction endpoints (`/user/predict_svm`, `/user/predict_dt`, etc.) handled by controllers in `backend/controllers/mlController.js`.
- For each prediction, the backend calls the Python Flask API (`py_code/app.py`) via HTTP requests using `axios`.
- Results and input data can be stored in MongoDB.

### Python ML Service (`py_code/app.py`)

- Flask app exposes endpoints for each ML model:
  - `/predict_svm`, `/predict_dt`, `/predict_knn`, `/predict_lr`, `/predict_nb`, `/predict_rf`
- Each endpoint processes the JSON payload (e.g., gender, haemoglobin, mch, mchc, mcv, features) and calls the corresponding model function.
- Returns a prediction as a JSON response.
- Deep learning image classification handled at `/dl_predict` (accepts image uploads and predicts cell type using a Keras model).
- CORS enabled to allow requests from the backend.

### Components Interaction

![Architecture Diagram](./assets/architecture-diagram.png)
*System architecture showing the interaction between frontend, backend, and ML services*

#### Data/Request Flow

![Data Flow Diagram](./assets/data-flow.png)
*Visual representation of data flow through the application*

1. **User Action:** User submits input data or uploads an image on the frontend.
2. **Frontend Request:** The React app sends a POST request to the Node backend (`/user/predict_*` or `/user/register`, etc.).
3. **Backend Processing:** The Node backend parses the request, and for prediction endpoints, forwards relevant data to the Python Flask server (`http://127.0.0.1:5000/predict_*`).
4. **Python ML Prediction:** Flask processes the request, runs the ML model, and returns the prediction.
5. **Backend Storage & Response:** Node backend stores the prediction and input in MongoDB (if required), then sends the result back to the frontend.
6. **Frontend Display:** React frontend receives and displays the result to the user.

---

## Main Features

- **User Authentication:** Registration, login, OTP verification.
- **ML Model Predictions:** SVM, Decision Tree, KNN, Logistic Regression, Naive Bayes, Random Forest.
- **Image-Based Prediction:** Deep Learning model for blood cell classification.
- **Dashboard:** View prediction results and input history.
- **Modern UI:** Responsive React frontend styled with Bootstrap and custom CSS.

---

## Data Flow Example

### Predicting with SVM

1. User enters data in frontend form and submits.
2. `frontend/src/services/Apis.js` calls:
   ```js
   commonrequest("POST",`${BACKEND_URL}/user/predict_svm`,data)
   ```
3. Node backend (`backend/app.js` and `backend/controllers/mlController.js`) receives request:
   - Calls Flask API: `axios.post('http://127.0.0.1:5000/predict_svm', {...})`
4. Flask (`py_code/app.py`) processes and returns:
   ```python
   @app.route('/predict_svm', methods=['POST'])
   def predict_svm():
       ...
       return jsonify({'prediction': prediction})
   ```
5. Backend stores result and returns to frontend for display.

### Deep Learning Image Prediction

1. User uploads image in frontend `/Image.js`.
2. Frontend sends image (as multipart/form-data) to backend, which forwards to Flask's `/dl_predict`.
3. Flask loads model, processes image, returns cell type prediction.

---

## Technology Stack

- **Frontend:** React, Bootstrap, React Router
- **Backend:** Node.js, Express, MongoDB
- **ML Service:** Python, Flask, scikit-learn, Keras, PIL
- **Communication:** REST APIs (JSON), HTTP (CORS enabled)

---

## Getting Started

### Prerequisites

- Node.js & npm
- Python 3 & pip
- MongoDB

### Setup

1. **Install Dependencies**
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
   - Python: `cd py_code && pip install -r requirements.txt`
2. **Start Flask ML Service**
   - `python app.py`
3. **Start Node Backend**
   - `npm run dev`
4. **Start Frontend**
   - `npm start` 

---

## Adding Images to README

There are several ways to add images to your README.md file:

### 1. Local Images (Recommended)
Store images in the `assets/` folder and reference them:
```markdown
![Alt text](./assets/image-name.png)
![Dashboard](./assets/screenshots/dashboard.png)
```

### 2. Online Images
Use direct URLs to hosted images:
```markdown
![Alt text](https://example.com/image.png)
```

### 3. With Links
Make images clickable:
```markdown
[![Alt text](./assets/image.png)](https://your-live-demo-url.com)
```

### 4. HTML for More Control
Use HTML tags for sizing and alignment:
```html
<img src="./assets/image.png" alt="Description" width="500" height="300">
<p align="center">
  <img src="./assets/centered-image.png" alt="Centered Image">
</p>
```

### 5. Badges and Shields
Add technology badges:
```markdown
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
```

### Image Best Practices

- **File Size**: Keep images under 2MB for fast loading
- **Format**: Use PNG for screenshots, SVG for diagrams, JPG for photos
- **Alt Text**: Always include descriptive alt text
- **Organization**: Store images in `assets/` or `images/` folder
- **Naming**: Use descriptive, kebab-case names (`login-page.png`)

---

## Contributing

Pull requests and issues are welcome! Please ensure code quality and documentation for maintainability.

---

## Credits

Developed by [ReeniReddyPinninti](https://github.com/ReeniReddyPinninti).
