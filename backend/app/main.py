from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
from werkzeug.utils import secure_filename

# Add the app directory to the path
sys.path.insert(0, os.path.dirname(__file__))

from routes.contract import contract_bp
from routes.auth import auth_bp
from services.analyzer import ContractAnalyzer

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'uploads')
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Register blueprints
app.register_blueprint(contract_bp)
app.register_blueprint(auth_bp)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Backend is running'}), 200

@app.route('/', methods=['GET'])
def index():
    """Welcome endpoint"""
    return jsonify({
        'message': 'AI Licensing Software Backend',
        'version': '1.0.0',
        'endpoints': {
            'health': '/health',
            'upload_contract': '/api/contracts/upload',
            'analyze_contract': '/api/contracts/analyze',
            'auth': {
                'register': '/api/auth/register',
                'login': '/api/auth/login',
                'logout': '/api/auth/logout',
                'verify': '/api/auth/verify',
                'profile': '/api/auth/profile/<email>'
            }
        }
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
