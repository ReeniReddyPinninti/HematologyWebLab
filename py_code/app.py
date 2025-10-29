from flask import Flask, request, jsonify
from svm_model import predict_result_svm, predict_opt_result_svm
from dt_model import predict_result_dt, predict_opt_result_dt
from knn_model import predict_opt_result_knn, predict_result_knn
from lr_model import predict_result_lr, predict_opt_result_lr
from nb_model import predict_opt_result_nb, predict_result_nb
from rf_model import predict_result_rf, predict_opt_result_rf
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from flask_cors import CORS, cross_origin

app = Flask(__name__)
#CORS(app)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}}, methods=["GET", "POST", "OPTIONS"])

@app.route('/predict_svm', methods=['POST'])
def predict_svm():
    try:
        data = request.json
        gender = data.get('gender')
        haemoglobin = data.get('haemoglobin')
        mch = data.get('mch')
        mchc = data.get('mchc')
        mcv = data.get('mcv')
        features = data.get('features', 'optimized')

        if features == 'optimized':
            prediction = predict_opt_result_svm(gender,haemoglobin, mcv)
        elif features == 'all':
            prediction = predict_result_svm(gender, haemoglobin, mch, mchc, mcv)
        else:
            return jsonify({'error': 'Invalid features parameter'}), 400

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/predict_dt', methods=['POST'])
def predict_dt():
    try:
        data = request.json
        gender = data.get('gender')
        haemoglobin = data.get('haemoglobin')
        mch = data.get('mch')
        mchc = data.get('mchc')
        mcv = data.get('mcv')
        features = data.get('features', 'optimized')

        if features == 'optimized':
            prediction = predict_opt_result_dt(gender,haemoglobin, mcv)
        elif features == 'all':
            prediction = predict_result_dt(gender, haemoglobin, mch, mchc, mcv)
        else:
            return jsonify({'error': 'Invalid features parameter'}), 400
        
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/predict_knn', methods=['POST'])
def predict_knn():
    try:
        data = request.json
        gender = data.get('gender')
        haemoglobin = data.get('haemoglobin')
        mch = data.get('mch')
        mchc = data.get('mchc')
        mcv = data.get('mcv')
        features = data.get('features', 'optimized')

        if features == 'optimized':
            prediction = predict_opt_result_knn(gender,haemoglobin, mcv)
        elif features == 'all':
            prediction = predict_result_knn(gender, haemoglobin, mch, mchc, mcv)
        else:
            return jsonify({'error': 'Invalid features parameter'}), 400
        
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/predict_lr', methods=['POST'])
def predict_lr():
    try:
        data = request.json
        gender = data.get('gender')
        haemoglobin = data.get('haemoglobin')
        mch = data.get('mch')
        mchc = data.get('mchc')
        mcv = data.get('mcv')
        features = data.get('features', 'optimized')

        if features == 'optimized':
            prediction = predict_opt_result_lr(gender,haemoglobin, mcv)
        elif features == 'all':
            prediction = predict_result_lr(gender, haemoglobin, mch, mchc, mcv)
        else:
            return jsonify({'error': 'Invalid features parameter'}), 400

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/predict_nb', methods=['POST'])
def predict_nb():
    try:
        data = request.json
        gender = data.get('gender')
        haemoglobin = data.get('haemoglobin')
        mch = data.get('mch')
        mchc = data.get('mchc')
        mcv = data.get('mcv')
        features = data.get('features', 'optimized')

        if features == 'optimized':
            prediction = predict_opt_result_nb(gender,haemoglobin, mcv)
        elif features == 'all':
            prediction = predict_result_nb(gender, haemoglobin, mch, mchc, mcv)
        else:
            return jsonify({'error': 'Invalid features parameter'}), 400
        
        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/predict_rf', methods=['POST'])
def predict_rf():
    try:
        data = request.json
        gender = data.get('gender')
        haemoglobin = data.get('haemoglobin')
        mch = data.get('mch')
        mchc = data.get('mchc')
        mcv = data.get('mcv')
        features = data.get('features', 'optimized')

        if features == 'optimized':
            prediction = predict_opt_result_rf(gender,haemoglobin, mcv)
        elif features == 'all':
            prediction = predict_result_rf(gender, haemoglobin, mch, mchc, mcv)
        else:
            return jsonify({'error': 'Invalid features parameter'}), 400

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# @app.route('/dl_predict', methods=['POST'])
# @cross_origin()
# def dl_predict():
#     try:
#         model = load_model('/Users/reenipinninti/Documents/Hematology_web_lab/py_code/dl_model.h5')
#         if 'image' not in request.files:
#             return jsonify({'error': "No 'image' key in request files."})

#         image_file = request.files['image']
#         img = Image.open(image_file.stream)
#         img = img.resize((100, 100)) 
#         img_array = img_to_array(img) / 255.0
#         img_array = np.expand_dims(img_array, axis=0)

#         prediction = model.predict(img_array)
#         predicted_class = np.argmax(prediction)
        

#         return jsonify({'predictionResult': 'Neutrophil' if predicted_class == 0 else 'Eosinophil'})
#     except Exception as e:
#         return jsonify({'error': str(e)})

@app.route('/dl_predict', methods=['POST', 'OPTIONS'])
@cross_origin(origins='*')  # ensure this stays directly above the route
def dl_predict():
    if request.method == "OPTIONS":
        # Preflight request — just return OK
        return jsonify({'message': 'CORS preflight passed'}), 200

    try:
        model = load_model('/Users/reenipinninti/Documents/Hematology_web_lab/py_code/dl_model.h5')
        if 'image' not in request.files:
            return jsonify({'error': "No 'image' key in request files."})

        image_file = request.files['image']
        img = Image.open(image_file.stream)
        img = img.resize((100, 100))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction)

        return jsonify({'predictionResult': 'Neutrophil' if predicted_class == 0 else 'Eosinophil'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)