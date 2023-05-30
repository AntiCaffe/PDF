"""
Run a rest API exposing the yolov5s object detection model
"""
import argparse
import io
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

from PIL import Image

import torch
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DETECTION_URL = "/v1/object-detection/yolov5"


@app.route(DETECTION_URL, methods=["POST"])
def predict():
    if not request.method == "POST":
        return

    if request.files.get("image"):
        image_file = request.files["image"]
        image_bytes = image_file.read()
        img = Image.open(io.BytesIO(image_bytes))

        xwidth, yheight = img.size

        # image reshape to 512x512
        img = img.resize((512, 512), Image.LANCZOS)

        results = model(img, size=640)  # reduce size=320 for faster inference
        pan = results.pandas().xyxy[0]
        pan.loc[:, ['xmin', 'ymin', 'xmax', 'ymax']] /= 512

        pan.loc[:, ['xmin', 'xmax']] *= xwidth
        pan.loc[:, ['ymin', 'ymax']] *= yheight

        return pan.to_json(orient="records")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask api exposing yolov5 model")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    parser.add_argument('--model', default='yolov5s', help='model to run, i.e. --model yolov5s')
    args = parser.parse_args()

    model = torch.hub.load('ultralytics/yolov5', 'custom','best.pt')
    app.run(host="0.0.0.0", port=args.port)  # debug=True causes Restarting with stat
    
