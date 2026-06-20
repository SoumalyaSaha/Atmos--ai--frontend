import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function Login() {
  const { setUser, setEcoPoints } = useContext(AppContext);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      
      const googleId = decoded.sub; // Google's unique user ID
      const userData = {
        name: decoded.name || 'Eco Warrior',
        email: decoded.email || 'user@atmos.ai',
        picture: decoded.picture || null,
        googleId: googleId,
        displayName: decoded.name || 'Eco Warrior',
        
        // Age fields for personalized calculations
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
      
      // CRITICAL: Store googleId as userId for backend API calls
      localStorage.setItem('userId', googleId);
      localStorage.setItem('token', googleId); // For Bearer token
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Register/login with backend
      try {
        const res = await api.post('/auth/login', {
          userId: googleId,
          name: userData.name,
          email: userData.email,
          avatar: userData.picture
        });
        
        if (res.data?.success) {
          // Merge backend data with Google data
          const mergedUser = { 
            ...userData, 
            ...res.data.user,
            ecoPoints: res.data.user.ecoPoints || 0,
            streak: res.data.user.streak || 0,
            badges: res.data.user.badges || []
          };
          setUser(mergedUser);
          setEcoPoints(res.data.user.ecoPoints || 0);
          localStorage.setItem('user', JSON.stringify(mergedUser));
        } else {
          setUser(userData);
          setEcoPoints(0);
        }
      } catch (apiErr) {
        console.error('Backend login error:', apiErr);
        // Still allow login even if backend fails
        setUser(userData);
        setEcoPoints(0);
      }
      
      navigate('/onboarding');
    } catch (err) {
      console.error('Google decode error:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">🌱</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Atmos AI</h1>
        <p className="text-gray-400">Sign in to track your carbon footprint</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('Login Failed')}
        />
      </div>
    </div>
  );
}
