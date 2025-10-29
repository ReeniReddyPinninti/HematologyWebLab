import os
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from sklearn.model_selection import train_test_split
from tensorflow.keras.optimizers import Adam
from sklearn.metrics import confusion_matrix, classification_report, f1_score, precision_score, recall_score

neutrophil_dir = "C:/Users/taman/OneDrive/Desktop/mern/Anemia project/NEUTROPHIL"
eosinophil_dir = "C:/Users/taman/OneDrive/Desktop/mern/Anemia project/EOSINOPHIL"

neutrophil_images = [os.path.join(neutrophil_dir, img) for img in os.listdir(neutrophil_dir)]
neutrophil_labels = [0] * len(neutrophil_images)

eosinophil_images = [os.path.join(eosinophil_dir, img) for img in os.listdir(eosinophil_dir)]
eosinophil_labels = [1] * len(eosinophil_images)

images = neutrophil_images + eosinophil_images
labels = neutrophil_labels + eosinophil_labels

X = np.array([img_to_array(load_img(img, target_size=(100, 100))) / 255.0 for img in images])
Y = np.array(labels)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(100, 100, 3)),
    MaxPooling2D((2, 2)),
    
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),

    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),

    Conv2D(256, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    
    Flatten(),
    Dense(512, activation='relu'),
    Dense(256, activation='relu'),
    Dense(128, activation='relu'),
    Dense(1, activation='sigmoid') 
])
model.compile(loss='binary_crossentropy', optimizer=Adam(learning_rate=0.0001), metrics=['accuracy'])

model.fit(X_train, Y_train, epochs=30,batch_size=64)

test_loss, test_accuracy = model.evaluate(X_test, Y_test)
print("Test Accuracy:", test_accuracy) 

model.summary()

predictions = model.predict(X_test)
predictions_binary = (predictions > 0.5).astype('int32') 
conf_matrix = confusion_matrix(Y_test, predictions_binary)
print("Confusion Matrix:\n", conf_matrix)
precision = precision_score(Y_test, predictions_binary)
recall = recall_score(Y_test, predictions_binary)
f1 = f1_score(Y_test, predictions_binary)

print("Precision:", precision)
print("Recall:", recall)
print("F1 Score:", f1)
class_report = classification_report(Y_test, predictions_binary)
print("Classification Report:\n", class_report)

model.save('dl_model.h5')