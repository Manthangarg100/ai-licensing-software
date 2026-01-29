from flask import Blueprint, request, jsonify
from services.auth import AuthenticationManager

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
auth_manager = AuthenticationManager(data_dir='../data')

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        full_name = data.get('full_name', '').strip()
        
        if not email or not password:
            return jsonify({
                'success': False,
                'error': 'Email and password are required'
            }), 400
        
        result = auth_manager.register_user(email, password, full_name)
        
        status_code = 201 if result['success'] else 400
        return jsonify(result), status_code
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'message': 'Registration failed'
        }), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Login a user"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        
        if not email or not password:
            return jsonify({
                'success': False,
                'error': 'Email and password are required'
            }), 400
        
        result = auth_manager.login_user(email, password)
        
        status_code = 200 if result['success'] else 401
        return jsonify(result), status_code
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'message': 'Login failed'
        }), 500

@auth_bp.route('/logout', methods=['POST'])
def logout():
    """Logout a user"""
    try:
        data = request.get_json()
        token = data.get('token', '') if data else ''
        
        if not token:
            return jsonify({
                'success': False,
                'error': 'Token is required'
            }), 400
        
        result = auth_manager.logout_user(token)
        
        status_code = 200 if result['success'] else 401
        return jsonify(result), status_code
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'message': 'Logout failed'
        }), 500

@auth_bp.route('/verify', methods=['POST'])
def verify_token():
    """Verify if a token is valid"""
    try:
        data = request.get_json()
        token = data.get('token', '') if data else ''
        
        if not token:
            return jsonify({
                'valid': False,
                'error': 'Token is required'
            }), 400
        
        result = auth_manager.verify_token(token)
        
        status_code = 200 if result['valid'] else 401
        return jsonify(result), status_code
    
    except Exception as e:
        return jsonify({
            'valid': False,
            'error': str(e),
            'message': 'Token verification failed'
        }), 500

@auth_bp.route('/profile/<email>', methods=['GET'])
def get_profile(email):
    """Get user profile"""
    try:
        result = auth_manager.get_user_profile(email)
        
        status_code = 200 if result['success'] else 404
        return jsonify(result), status_code
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'message': 'Failed to fetch profile'
        }), 500

@auth_bp.route('/info', methods=['GET'])
def auth_info():
    """Get authentication endpoints information"""
    return jsonify({
        'endpoints': {
            'register': 'POST /api/auth/register - Register a new user',
            'login': 'POST /api/auth/login - Login user',
            'logout': 'POST /api/auth/logout - Logout user',
            'verify': 'POST /api/auth/verify - Verify token validity',
            'profile': 'GET /api/auth/profile/<email> - Get user profile',
        },
        'request_formats': {
            'register': {
                'email': 'string (required)',
                'password': 'string (min 6 chars, required)',
                'full_name': 'string (optional)'
            },
            'login': {
                'email': 'string (required)',
                'password': 'string (required)'
            },
            'logout': {
                'token': 'string (required)'
            },
            'verify': {
                'token': 'string (required)'
            }
        }
    }), 200
