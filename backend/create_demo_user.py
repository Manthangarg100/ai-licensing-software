from app.services.auth import AuthenticationManager

# Create demo user
auth = AuthenticationManager()
result = auth.register_user('demo@example.com', 'demo123', 'Demo User')
print("Demo user creation result:")
print(result)
