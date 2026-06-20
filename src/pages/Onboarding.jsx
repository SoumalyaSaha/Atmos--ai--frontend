import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Calculator, ArrowRight } from 'lucide-react';
import { AppContext } from '../App';

export default function Onboarding() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // If already onboarded, go to dashboard
  useEffect(() => {
    if (user?.onboardingComplete && user?.carbonFootprint?.lastCalculated) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 max-w-md w-full"
      >
        {/* Logo */}
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Leaf className="w-12 h-12 text-white" />
        </div>

        {/* Welcome Text */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Atmos AI!
          </h1>
          <p className="text-gray-400 leading-relaxed">
            To calculate your real carbon footprint, we need some details about your lifestyle. 
            This takes about 2 minutes.
          </p>
        </div>

        {/* What You'll Enter */}
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 text-left">
          <p className="text-gray-300 text-sm font-medium mb-4">You'll enter:</p>
          <ul className="space-y-3">
            {[
              { icon: '🚗', text: 'Transportation habits (mode, distance)' },
              { icon: '⚡', text: 'Home energy usage (electricity, gas)' },
              { icon: '🥗', text: 'Diet type and preferences' },
              { icon: '🛒', text: 'Monthly shopping patterns' },
              { icon: '🗑️', text: 'Waste generation habits' },
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-gray-400 text-sm"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Real Data', sub: 'No estimates' },
            { label: 'AI Insights', sub: 'Personalized tips' },
            { label: 'Track Progress', sub: 'See improvement' },
          ].map((feature, i) => (
            <div key={i} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
              <p className="text-emerald-400 text-sm font-medium">{feature.label}</p>
              <p className="text-gray-500 text-xs mt-1">{feature.sub}</p>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/calculator')}
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Calculator className="w-5 h-5" />
          Start Calculator
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* Skip Note */}
        <p className="text-gray-600 text-xs">
          You can update your data anytime in the Calculator
        </p>
      </motion.div>
    </div>
  );
}
