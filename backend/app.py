from analysis.mutation_detection import detect_mutations
from analysis.quality_score import calculate_quality_score
from analysis.gc_content import calculate_gc_content
from analysis.read_count import count_reads

from flask import Flask, jsonify, request
from flask_cors import CORS

import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"

@app.route('/')
def home():
    return jsonify({
        "message": "GeneScope Backend Running"
    })

@app.route('/upload', methods=['POST'])
def upload_file():

    file = request.files['file']

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    reads = count_reads(filepath)
    gc_content = calculate_gc_content(filepath)
    quality_score = calculate_quality_score(filepath)
    mutations = detect_mutations(filepath)

    return jsonify({
        "status": "success",
        "filename": file.filename,
        "reads": reads,
        "gc_content": gc_content,
        "quality_score": quality_score,
        "mutations": mutations
    })
if __name__ == '__main__':
    app.run(debug=True)    