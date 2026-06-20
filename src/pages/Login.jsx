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
            const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
            
            const userData = {
              name: decoded.name || 'Eco Warrior',
              email: decoded.email || 'user@atmos.ai',
              picture: decoded.picture || null,
              googleId: decoded.sub,
              displayName: decoded.name || 'Eco Warrior',
              
              // NEW: Age fields for personalized calculations
              age: null,
              ageGroup: null,
              
              // Onboarding tracking
              onboardingComplete: false,
              dataSource: null,
              manualData: null,
              
              // Calculated carbon footprint (all sectors)
              carbonFootprint: {
                mobility: 0.00,
                homeEnergy: 0.00,
                diet: 0.00,
                shopping: 0.00,
                waste: 0.00,
                total: 0.00,
                lastCalculated: null
              }
            };
            
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/onboarding');
          }}
          onError={() => console.log('Login Failed')}
        />
      </div>
    </div>
  );
}
