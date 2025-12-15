import os
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.optimizers.legacy import Adam
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, classification_report, precision_score, recall_score, f1_score

# ---------------- DATA LOADING ----------------
neutrophil_dir = "/Users/reenipinninti/Downloads/Anemia-Detection-master/NEUTROPHIL"
eosinophil_dir = "/Users/reenipinninti/Downloads/Anemia-Detection-master/EOSINOPHIL"

neutrophil_images = [os.path.join(neutrophil_dir, img) for img in os.listdir(neutrophil_dir)]
eosinophil_images = [os.path.join(eosinophil_dir, img) for img in os.listdir(eosinophil_dir)]

images = neutrophil_images + eosinophil_images
labels = [0] * len(neutrophil_images) + [1] * len(eosinophil_images)

# --------- IMPORTANT: GRAYSCALE ----------
X = np.array([
    img_to_array(
        load_img(img, target_size=(100, 100), color_mode="grayscale")
    ) / 255.0
    for img in images
])

Y = np.array(labels)

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.2, random_state=42, stratify=Y
)

print("Train samples:", X_train.shape)
print("Test samples:", X_test.shape)

# ---------------- MODEL ----------------
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(100, 100, 1)),
    MaxPooling2D(2, 2),

    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),

    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),

    Flatten(),
    Dense(128, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(
    optimizer=Adam(learning_rate=0.0005),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

model.summary()

# ---------------- TRAIN ----------------
history = model.fit(
    X_train, Y_train,
    epochs=25,
    batch_size=32,
    validation_data=(X_test, Y_test)
)

# ---------------- EVALUATION ----------------
test_loss, test_accuracy = model.evaluate(X_test, Y_test)
print("\nTest Accuracy:", test_accuracy)

predictions = (model.predict(X_test) > 0.5).astype("int32")

print("\nConfusion Matrix:")
print(confusion_matrix(Y_test, predictions))

print("\nPrecision:", precision_score(Y_test, predictions))
print("Recall:", recall_score(Y_test, predictions))
print("F1 Score:", f1_score(Y_test, predictions))

print("\nClassification Report:")
print(classification_report(Y_test, predictions))

# ---------------- SAVE MODEL ----------------
model.save("/Users/reenipinninti/Documents/Hematology_web_lab copy/py_code/wbc_cnn_model.h5")