# data_processor.py - Python script for handling laboratory data
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import datetime

app = Flask(__name__)
CORS(app)

class LIMSDataProcessor:
    def __init__(self):
        self.analysis_types = {
            'basic_chemistry': ['pH', 'conductivity', 'TDS'],
            'advanced_chemistry': ['ICP-MS', 'HPLC', 'GC-MS'],
            'microbiology': ['total_plate_count', 'coliform', 'e_coli']
        }

    def validate_data(self, data):
        # Basic data validation
        required_fields = ['sample_id', 'analysis_type', 'measurements']
        return all(field in data for field in required_fields)

    def process_results(self, data):
        if not self.validate_data(data):
            return None

        # Process the results based on analysis type
        analysis_type = data['analysis_type']
        measurements = data['measurements']

        # Add timestamp
        processed_data = {
            'sample_id': data['sample_id'],
            'timestamp': datetime.now().isoformat(),
            'results': {}
        }

        # Apply appropriate calculations based on analysis type
        if analysis_type in self.analysis_types:
            for param in self.analysis_types[analysis_type]:
                if param in measurements:
                    # Add basic statistical analysis
                    values = measurements[param]
                    processed_data['results'][param] = {
                        'mean': np.mean(values),
                        'std': np.std(values),
                        'min': np.min(values),
                        'max': np.max(values)
                    }

        return processed_data

processor = LIMSDataProcessor()

@app.route('/process', methods=['POST'])
def process_data():
    try:
        data = request.json
        results = processor.process_results(data)
        if results is None:
            return jsonify({'error': 'Invalid data format'}), 400
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
