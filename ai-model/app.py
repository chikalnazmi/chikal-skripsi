"""
AI Segmentation API — Flask Server
Serves RT-DETR + MobileNetV3 model for newspaper image segmentation.
"""

import os
import io
import json
import base64
import zipfile
import tempfile
import traceback
from pathlib import Path

import fitz  # PyMuPDF
import torch
import torch.nn as nn
from PIL import Image, ImageDraw, ImageFont
from flask import Flask, request, jsonify
from flask_cors import CORS

# ==========================================================
# 1. PATCH: MobileNetV3 backbone into Ultralytics GhostBottleneck
# ==========================================================
from ultralytics.nn.modules.block import GhostBottleneck


class h_sigmoid(nn.Module):
    def __init__(self, inplace=True):
        super().__init__()
        self.relu = nn.ReLU6(inplace=inplace)

    def forward(self, x):
        return self.relu(x + 3) / 6


class h_swish(nn.Module):
    def __init__(self, inplace=True):
        super().__init__()
        self.sigmoid = h_sigmoid(inplace=inplace)

    def forward(self, x):
        return x * self.sigmoid(x)


class SELayer(nn.Module):
    def __init__(self, channel, reduction=4):
        super().__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Sequential(
            nn.Linear(channel, channel // reduction, bias=False),
            nn.ReLU(inplace=True),
            nn.Linear(channel // reduction, channel, bias=False),
            h_sigmoid(),
        )

    def forward(self, x):
        b, c, _, _ = x.size()
        y = self.avg_pool(x).view(b, c)
        y = self.fc(y).view(b, c, 1, 1)
        return x * y.expand_as(x)


def mobilenet_init(self, c1, c2, k=3, s=1, expand_ratio=1, use_se=False, nolinear="RE"):
    nn.Module.__init__(self)
    hidden_dim = round(c1 * expand_ratio)
    self.identity = s == 1 and c1 == c2

    se_layer = SELayer(hidden_dim) if use_se else nn.Identity()

    if nolinear == "RE":
        nolinear_layer = nn.ReLU(inplace=True)
    elif nolinear == "HS":
        nolinear_layer = h_swish(inplace=True)
    else:
        nolinear_layer = nn.Identity()

    self.conv = nn.Sequential(
        nn.Conv2d(c1, hidden_dim, 1, 1, 0, bias=False),
        nn.BatchNorm2d(hidden_dim),
        nolinear_layer,
        nn.Conv2d(hidden_dim, hidden_dim, k, s, (k - 1) // 2, groups=hidden_dim, bias=False),
        nn.BatchNorm2d(hidden_dim),
        se_layer,
        nolinear_layer,
        nn.Conv2d(hidden_dim, c2, 1, 1, 0, bias=False),
        nn.BatchNorm2d(c2),
    )


def mobilenet_forward(self, x):
    if hasattr(self, "identity") and self.identity:
        return x + self.conv(x)
    else:
        return self.conv(x)


# Monkey-patch GhostBottleneck with MobileNetV3 implementation
GhostBottleneck.__init__ = mobilenet_init
GhostBottleneck.forward = mobilenet_forward

# ==========================================================
# 2. Load the custom YAML and model weights
# ==========================================================
from ultralytics import RTDETR

BASE_DIR = Path(__file__).resolve().parent

# Write the architecture YAML
YAML_CONTENT = """
nc: 6
scales:
  l: [1.00, 1.00, 1024]
backbone:
  - [-1, 1, Conv, [16, 3, 2, None, 1, 1, False]]
  - [-1, 1, GhostBottleneck, [16, 3, 1, 1, False, 'RE']]
  - [-1, 1, GhostBottleneck, [24, 3, 2, 4, False, 'RE']]
  - [-1, 1, GhostBottleneck, [24, 3, 1, 3, False, 'RE']]
  - [-1, 1, GhostBottleneck, [40, 5, 2, 3, True, 'RE']]
  - [-1, 1, GhostBottleneck, [40, 5, 1, 3, True, 'RE']]
  - [-1, 1, GhostBottleneck, [40, 5, 1, 3, True, 'RE']]
  - [-1, 1, GhostBottleneck, [80, 3, 2, 6, False, 'HS']]
  - [-1, 1, GhostBottleneck, [80, 3, 1, 2.5, False, 'HS']]
  - [-1, 1, GhostBottleneck, [80, 3, 1, 2.3, False, 'HS']]
  - [-1, 1, GhostBottleneck, [80, 3, 1, 2.3, False, 'HS']]
  - [-1, 1, GhostBottleneck, [112, 3, 1, 6, True, 'HS']]
  - [-1, 1, GhostBottleneck, [112, 3, 1, 6, True, 'HS']]
  - [-1, 1, GhostBottleneck, [160, 5, 2, 6, True, 'HS']]
  - [-1, 1, GhostBottleneck, [160, 5, 1, 6, True, 'HS']]
  - [-1, 1, GhostBottleneck, [160, 5, 1, 6, True, 'HS']]
head:
  - [-1, 1, Conv, [256, 1, 1, None, 1, 1, False]]
  - [-1, 1, AIFI, [1024, 8]]
  - [-1, 1, Conv, [256, 1, 1]]
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [12, 1, Conv, [256, 1, 1, None, 1, 1, False]]
  - [[-2, -1], 1, Concat, [1]]
  - [-1, 3, RepC3, [256, 0.5]]
  - [-1, 1, Conv, [256, 1, 1]]
  - [-1, 1, nn.Upsample, [None, 2, 'nearest']]
  - [6, 1, Conv, [256, 1, 1, None, 1, 1, False]]
  - [[-2, -1], 1, Concat, [1]]
  - [-1, 3, RepC3, [256, 0.5]]
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 23], 1, Concat, [1]]
  - [-1, 3, RepC3, [256, 0.5]]
  - [-1, 1, Conv, [256, 3, 2]]
  - [[-1, 18], 1, Concat, [1]]
  - [-1, 3, RepC3, [256, 0.5]]
  - [[27, 30, 33], 1, RTDETRDecoder, [nc, 256, 300, 4, 8, 3]]
"""

YAML_PATH = BASE_DIR / "rt-detr-mobilenetv3-final.yaml"
YAML_PATH.write_text(YAML_CONTENT.strip())

MODEL_PATH = BASE_DIR / "best.pt"


# Color palette for bounding boxes (will be assigned to model classes dynamically)
_COLOR_PALETTE = [
    (255, 87, 87),    # Red
    (72, 199, 142),   # Green
    (78, 175, 255),   # Blue
    (255, 193, 59),   # Yellow
    (190, 120, 255),  # Purple
    (255, 145, 77),   # Orange
    (255, 120, 180),  # Pink
    (100, 220, 220),  # Cyan
]

# Minimum confidence threshold — detections below this are excluded
CONFIDENCE_THRESHOLD = 0.7

print("Loading RT-DETR model...")
model = RTDETR(str(MODEL_PATH))
print("Model loaded successfully!")

# Class names from the loaded model
CLASS_NAMES = model.names

# Dynamically assign colors to each class from the model
CLASS_COLORS = {}
for idx in CLASS_NAMES:
    CLASS_COLORS[idx] = _COLOR_PALETTE[idx % len(_COLOR_PALETTE)]

print(f"Classes detected: {CLASS_NAMES}")
print(f"Colors assigned: {CLASS_COLORS}")


# ==========================================================
# 3. Helper Functions
# ==========================================================

def extract_images_from_file(file_storage, filename):
    """
    Extract images from uploaded file.
    Returns list of tuples: (image_name, PIL.Image)
    """
    images = []
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""

    if ext in ("png", "jpg", "jpeg"):
        img = Image.open(file_storage.stream).convert("RGB")
        base_name = filename.rsplit(".", 1)[0] + ".jpeg"
        images.append((base_name, img))

    elif ext == "pdf":
        # Read PDF bytes
        pdf_bytes = file_storage.read()
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        for page_num in range(len(doc)):
            page = doc[page_num]
            # Render page to image at 200 DPI
            pix = page.get_pixmap(dpi=200)
            img_data = pix.tobytes("png")
            img = Image.open(io.BytesIO(img_data)).convert("RGB")
            page_name = f"page_{page_num + 1}.jpeg"
            images.append((page_name, img))
        doc.close()

    elif ext == "zip":
        zip_bytes = file_storage.read()
        with zipfile.ZipFile(io.BytesIO(zip_bytes), "r") as zf:
            for name in sorted(zf.namelist()):
                # Skip directories and hidden/system files
                if name.endswith("/") or name.startswith("__MACOSX"):
                    continue
                inner_ext = name.rsplit(".", 1)[-1].lower() if "." in name else ""
                if inner_ext in ("png", "jpg", "jpeg", "bmp", "tiff", "tif"):
                    data = zf.read(name)
                    img = Image.open(io.BytesIO(data)).convert("RGB")
                    base_name = Path(name).stem + ".jpeg"
                    images.append((base_name, img))

    return images


def run_segmentation(images):
    """
    Run RT-DETR model on a list of (name, PIL.Image) tuples.
    Returns list of dicts with: name, image, detections, score_info
    """
    results_list = []

    for img_name, img in images:
        # Run prediction
        results = model.predict(source=img, conf=CONFIDENCE_THRESHOLD, verbose=False)
        result = results[0]

        detections = []
        unique_classes = set()
        total_conf = 0.0

        if result.boxes is not None and len(result.boxes) > 0:
            boxes = result.boxes
            for i in range(len(boxes)):
                cls_id = int(boxes.cls[i].item())
                conf = float(boxes.conf[i].item())

                # Skip detections below confidence threshold
                if conf < CONFIDENCE_THRESHOLD:
                    continue

                bbox = boxes.xyxy[i].tolist()  # [x1, y1, x2, y2]

                detections.append({
                    "class": CLASS_NAMES.get(cls_id, f"class_{cls_id}"),
                    "class_id": cls_id,
                    "confidence": round(conf, 4),
                    "bbox": [round(c, 2) for c in bbox],
                })

                unique_classes.add(cls_id)
                total_conf += conf

        avg_conf = total_conf / len(detections) if detections else 0.0

        results_list.append({
            "name": img_name,
            "image": img,
            "detections": detections,
            "unique_classes": len(unique_classes),
            "avg_confidence": avg_conf,
        })

    return results_list


def select_best_result(results_list):
    """
    Select the best result: most unique classes, then highest avg confidence.
    """
    if not results_list:
        return None

    return max(results_list, key=lambda r: (r["unique_classes"], r["avg_confidence"]))


def draw_bounding_boxes(img, detections):
    """
    Draw bounding boxes with labels on a copy of the image.
    Returns a new PIL Image with bounding boxes drawn.
    """
    img_copy = img.copy()
    draw = ImageDraw.Draw(img_copy)

    # Try to use a reasonable font size based on image size
    font_size = max(16, min(img_copy.width, img_copy.height) // 40)
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except (OSError, IOError):
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except (OSError, IOError):
            font = ImageFont.load_default()

    for det in detections:
        cls_id = det["class_id"]
        cls_name = det["class"]
        conf = det["confidence"]
        x1, y1, x2, y2 = det["bbox"]
        color = CLASS_COLORS.get(cls_id, (255, 255, 255))

        # Draw rectangle
        line_width = max(2, min(img_copy.width, img_copy.height) // 200)
        draw.rectangle([x1, y1, x2, y2], outline=color, width=line_width)

        # Draw label background
        label = f"{cls_name} {conf:.2f}"
        bbox_text = draw.textbbox((x1, y1), label, font=font)
        text_w = bbox_text[2] - bbox_text[0]
        text_h = bbox_text[3] - bbox_text[1]
        padding = 4

        # Label background
        draw.rectangle(
            [x1, y1 - text_h - padding * 2, x1 + text_w + padding * 2, y1],
            fill=color,
        )
        # Label text
        draw.text((x1 + padding, y1 - text_h - padding), label, fill=(255, 255, 255), font=font)

    return img_copy


def build_result_zip(results_list):
    """
    Build a ZIP file containing (flat structure, no subfolders):
    - All original images as JPEG
    - Annotation TXT for each image (class_id x_center y_center width height confidence)
    Returns bytes of the ZIP file.
    """
    zip_buffer = io.BytesIO()

    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for result in results_list:
            img_name = result["name"]
            img = result["image"]
            img_w, img_h = img.size

            # Save original image as JPEG (flat, no subfolder)
            img_buffer = io.BytesIO()
            img.save(img_buffer, format="JPEG", quality=95)
            zf.writestr(img_name, img_buffer.getvalue())

            # Convert detections to standard LabelMe format
            shapes = []
            for det in result["detections"]:
                x1, y1, x2, y2 = det["bbox"]
                shapes.append({
                    "label": det["class"],
                    "points": [
                        [x1, y1],
                        [x2, y2]
                    ],
                    "group_id": None,
                    "shape_type": "rectangle",
                    "flags": {}
                })

            json_name = img_name.rsplit(".", 1)[0] + ".json"
            json_data = {
                "version": "5.2.1",
                "flags": {},
                "shapes": shapes,
                "imagePath": img_name,
                "imageData": None,
                "imageHeight": img_h,
                "imageWidth": img_w
            }
            zf.writestr(json_name, json.dumps(json_data, indent=2, ensure_ascii=False))

    zip_buffer.seek(0)
    return zip_buffer.getvalue()


# ==========================================================
# 4. Flask Application
# ==========================================================

app = Flask(__name__)
CORS(app)


@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({"status": "ok", "model": "RT-DETR MobileNetV3"})


@app.route("/api/segment", methods=["POST"])
def segment():
    """
    Segmentation endpoint.
    Accepts: file upload (PNG, JPG, JPEG, PDF, ZIP)
    Returns JSON:
    {
        "success": true,
        "result_zip": "<base64 encoded ZIP>",
        "best_preview": "<base64 encoded JPEG with bounding boxes>",
        "best_detections": [...],
        "total_images": N,
        "best_image_name": "..."
    }
    """
    if "file" not in request.files:
        return jsonify({"success": False, "error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"success": False, "error": "Empty filename"}), 400

    try:
        # 1. Extract images from uploaded file
        images = extract_images_from_file(file, file.filename)

        if not images:
            return jsonify({"success": False, "error": "No valid images found in uploaded file"}), 400

        # 2. Run segmentation
        results_list = run_segmentation(images)

        # 3. Select best result
        best = select_best_result(results_list)

        # 4. Draw bounding boxes on best result for preview
        best_preview_img = draw_bounding_boxes(best["image"], best["detections"])
        preview_buffer = io.BytesIO()
        best_preview_img.save(preview_buffer, format="JPEG", quality=95)
        best_preview_b64 = base64.b64encode(preview_buffer.getvalue()).decode("utf-8")

        # 5. Build result ZIP
        result_zip_bytes = build_result_zip(results_list)
        result_zip_b64 = base64.b64encode(result_zip_bytes).decode("utf-8")

        return jsonify({
            "success": True,
            "result_zip": result_zip_b64,
            "best_preview": best_preview_b64,
            "best_detections": best["detections"],
            "best_image_name": best["name"],
            "total_images": len(results_list),
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    print("Starting AI Segmentation API on http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=False)
