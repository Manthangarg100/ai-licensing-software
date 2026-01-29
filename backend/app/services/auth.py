import os
import json
import hashlib
from datetime import datetime, timedelta
from functools import wraps
from flask import jsonify

class AuthenticationManager:
    """Manages user authentication and token generation"""
    
    def __init__(self, data_dir='data'):
        self.data_dir = data_dir
        self.users_file = os.path.join(data_dir, 'users.json')
        self.tokens_file = os.path.join(data_dir, 'tokens.json')
        
        # Create data directory if it doesn't exist
        os.makedirs(data_dir, exist_ok=True)
        
        # Initialize files if they don't exist
        if not os.path.exists(self.users_file):
            self._save_users({})
        if not os.path.exists(self.tokens_file):
            self._save_tokens({})
    
    def _hash_password(self, password: str) -> str:
        """Hash a password using SHA-256"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def _load_users(self) -> dict:
        """Load users from file"""
        try:
            with open(self.users_file, 'r') as f:
                return json.load(f)
        except:
            return {}
    
    def _save_users(self, users: dict):
        """Save users to file"""
        with open(self.users_file, 'w') as f:
            json.dump(users, f, indent=2)
    
    def _load_tokens(self) -> dict:
        """Load tokens from file"""
        try:
            with open(self.tokens_file, 'r') as f:
                return json.load(f)
        except:
            return {}
    
    def _save_tokens(self, tokens: dict):
        """Save tokens to file"""
        with open(self.tokens_file, 'w') as f:
            json.dump(tokens, f, indent=2)
    
    def _generate_token(self, email: str) -> str:
        """Generate a simple auth token"""
        timestamp = datetime.now().isoformat()
        token_data = f"{email}:{timestamp}"
        return hashlib.sha256(token_data.encode()).hexdigest()
    
    def register_user(self, email: str, password: str, full_name: str = "") -> dict:
        """Register a new user"""
        users = self._load_users()
        
        # Check if user already exists
        if email.lower() in users:
            return {
                'success': False,
                'error': 'User already exists with this email',
                'message': 'Email is already registered'
            }
        
        # Validate email format
        if '@' not in email or '.' not in email:
            return {
                'success': False,
                'error': 'Invalid email format',
                'message': 'Please provide a valid email address'
            }
        
        # Validate password strength
        if len(password) < 6:
            return {
                'success': False,
                'error': 'Password too short',
                'message': 'Password must be at least 6 characters long'
            }
        
        # Create new user
        user_data = {
            'email': email.lower(),
            'password_hash': self._hash_password(password),
            'full_name': full_name or email.split('@')[0],
            'created_at': datetime.now().isoformat(),
            'last_login': None,
            'status': 'active'
        }
        
        users[email.lower()] = user_data
        self._save_users(users)
        
        return {
            'success': True,
            'message': 'User registered successfully',
            'user': {
                'email': user_data['email'],
                'full_name': user_data['full_name'],
                'created_at': user_data['created_at']
            }
        }
    
    def login_user(self, email: str, password: str) -> dict:
        """Authenticate a user and generate a token"""
        users = self._load_users()
        email_lower = email.lower()
        
        # Check if user exists
        if email_lower not in users:
            return {
                'success': False,
                'error': 'Invalid credentials',
                'message': 'Email or password is incorrect'
            }
        
        user = users[email_lower]
        
        # Verify password
        if user['password_hash'] != self._hash_password(password):
            return {
                'success': False,
                'error': 'Invalid credentials',
                'message': 'Email or password is incorrect'
            }
        
        # Check if user is active
        if user['status'] != 'active':
            return {
                'success': False,
                'error': 'Account inactive',
                'message': 'This account has been deactivated'
            }
        
        # Generate token
        token = self._generate_token(email_lower)
        
        # Update last login
        user['last_login'] = datetime.now().isoformat()
        users[email_lower] = user
        self._save_users(users)
        
        # Store token
        tokens = self._load_tokens()
        tokens[token] = {
            'email': email_lower,
            'created_at': datetime.now().isoformat(),
            'expires_at': (datetime.now() + timedelta(days=30)).isoformat(),
            'active': True
        }
        self._save_tokens(tokens)
        
        return {
            'success': True,
            'message': 'Login successful',
            'token': token,
            'user': {
                'email': user['email'],
                'full_name': user['full_name'],
                'last_login': user['last_login']
            }
        }
    
    def verify_token(self, token: str) -> dict:
        """Verify if a token is valid"""
        tokens = self._load_tokens()
        
        if token not in tokens:
            return {
                'valid': False,
                'error': 'Invalid token'
            }
        
        token_data = tokens[token]
        
        # Check if token is active
        if not token_data['active']:
            return {
                'valid': False,
                'error': 'Token is inactive'
            }
        
        # Check if token is expired
        expires_at = datetime.fromisoformat(token_data['expires_at'])
        if datetime.now() > expires_at:
            return {
                'valid': False,
                'error': 'Token has expired'
            }
        
        users = self._load_users()
        email = token_data['email']
        
        if email not in users:
            return {
                'valid': False,
                'error': 'User not found'
            }
        
        return {
            'valid': True,
            'email': email,
            'user': users[email]
        }
    
    def logout_user(self, token: str) -> dict:
        """Logout a user by invalidating their token"""
        tokens = self._load_tokens()
        
        if token not in tokens:
            return {
                'success': False,
                'error': 'Invalid token'
            }
        
        tokens[token]['active'] = False
        self._save_tokens(tokens)
        
        return {
            'success': True,
            'message': 'Logout successful'
        }
    
    def get_user_profile(self, email: str) -> dict:
        """Get user profile information"""
        users = self._load_users()
        email_lower = email.lower()
        
        if email_lower not in users:
            return {
                'success': False,
                'error': 'User not found'
            }
        
        user = users[email_lower]
        return {
            'success': True,
            'user': {
                'email': user['email'],
                'full_name': user['full_name'],
                'created_at': user['created_at'],
                'last_login': user['last_login'],
                'status': user['status']
            }
        }
