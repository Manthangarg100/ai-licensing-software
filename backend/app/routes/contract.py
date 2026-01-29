from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
import os
from services.analyzer import ContractAnalyzer

contract_bp = Blueprint('contract', __name__, url_prefix='/api/contracts')

ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@contract_bp.route('/upload', methods=['POST'])
def upload_contract():
    """Upload and analyze a contract"""
    try:
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({'success': False, 'error': 'No file selected'}), 400
        
        # Check if file is allowed
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'error': f'File type not allowed. Allowed types: {", ".join(ALLOWED_EXTENSIONS)}'
            }), 400
        
        # Save file
        filename = secure_filename(file.filename)
        upload_folder = current_app.config['UPLOAD_FOLDER']
        file_path = os.path.join(upload_folder, filename)
        
        # Create folder if it doesn't exist
        os.makedirs(upload_folder, exist_ok=True)
        file.save(file_path)
        
        # Analyze contract
        analyzer = ContractAnalyzer()
        result = analyzer.analyze(file_path)
        
        # Add file info to response
        result['file_info'] = {
            'filename': filename,
            'size': os.path.getsize(file_path)
        }
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@contract_bp.route('/analyze', methods=['POST'])
def analyze_contract():
    """Analyze contract text directly"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'success': False, 'error': 'No contract text provided'}), 400
        
        text = data['text']
        
        if not text or len(text.strip()) == 0:
            return jsonify({'success': False, 'error': 'Contract text cannot be empty'}), 400
        
        analyzer = ContractAnalyzer()
        analyzer.extracted_text = text
        
        # Perform analyses
        platforms = analyzer.extract_platforms(text)
        exclusivity = analyzer.extract_exclusivity(text)
        license_terms = analyzer.extract_license_terms(text)
        duration = analyzer.extract_duration(text)
        eligibility = analyzer.determine_eligibility(text)
        
        result = {
            'success': True,
            'analysis': {
                'platforms': platforms if platforms else {'note': 'No specific platform mentions found'},
                'exclusivity': exclusivity if exclusivity else {'note': 'No exclusivity terms found'},
                'license_terms': license_terms if license_terms else {'note': 'No specific license terms found'},
                'duration': duration,
                'eligibility': eligibility,
                'text_preview': text[:500] + '...' if len(text) > 500 else text,
                'total_characters': len(text),
            },
            'message': 'Contract analyzed successfully'
        }
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@contract_bp.route('/info', methods=['GET'])
def contract_info():
    """Get contract analysis information"""
    return jsonify({
        'supported_formats': list(ALLOWED_EXTENSIONS),
        'max_file_size': '16MB',
        'analysis_includes': [
            'Platform detection (web, mobile, desktop, social media, streaming, SaaS, enterprise)',
            'Exclusivity terms (exclusive, non-exclusive, limited)',
            'License duration (perpetual, annual, monthly, trial, limited-time)',
            'Contract duration and dates',
            'Eligibility determination',
        ],
        'endpoints': {
            'upload': 'POST /api/contracts/upload - Upload and analyze a file',
            'analyze': 'POST /api/contracts/analyze - Analyze contract text directly',
            'info': 'GET /api/contracts/info - Get this information',
        }
    }), 200
