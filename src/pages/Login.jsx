import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">🌱</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Atmos AI</h1>
        <p className="text-gray-400">Sign in to track your carbon footprint</p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            // Decode the JWT token to get user info
            const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
            
            const userData = {
              name: decoded.name || 'Eco Warrior',
              email: decoded.email || 'user@atmos.ai',
              picture: decoded.picture || null,
              googleId: decoded.sub,
              // Add editable display name (initially same as Google name)
              displayName: decoded.name || 'Eco Warrior'
            };
            
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/dashboard');
          }}
          onError={() => console.log('Login Failed')}
        />
      </div>
    </div>
  );
}
