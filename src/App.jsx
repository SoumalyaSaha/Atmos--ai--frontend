import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext } from 'react'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Challenges from './pages/Challenges'
import Calculator from './pages/Calculator'
import Leaderboard from './pages/Leaderboard'
import Chatbot from './pages/Chatbot'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding' // NEW FILE - I'll create this next

export const AppContext = createContext()

// ============================================
// NEW: India-Specific Emission Factors (kg CO2 per unit)
// These are real values from IPCC/CEA guidelines
// ============================================
export const EMISSION_FACTORS = {
  transport: {
    walking: 0,
    cycling: 0,
    bus: 0.089,        // kg CO2 per km
    train: 0.041,      // kg CO2 per km
    metro: 0.035,      // kg CO2 per km
    car_petrol: 0.21,  // kg CO2 per km
    car_diesel: 0.17,  // kg CO2 per km
    car_cng: 0.16,     // kg CO2 per km
    bike_petrol: 0.10, // kg CO2 per km
    auto_rickshaw: 0.12, // kg CO2 per km
    flight: 0.255      // kg CO2 per km
  },
  homeEnergy: {
    electricity: 0.71,  // kg CO2 per kWh (India grid average)
    lpg: 2.98,          // kg CO2 per kg
    naturalGas: 2.1,    // kg CO2 per m3
    biogas: 0.05        // kg CO2 per m3
  },
  diet: {
    vegan: 1.5,         // kg CO2 per day
    vegetarian: 2.0,
    eggetarian: 2.3,
    meat_occasional: 2.8,
    meat_regular: 3.3,
    meat_heavy: 4.5
  },
  shopping: {
    clothing: 0.015,    // kg CO2 per rupee spent
    electronics: 0.05,
    furniture: 0.03,
    groceries: 0.008,
    other: 0.02
  },
  waste: {
    landfill: 0.5,      // kg CO2 per kg waste
    recycled: 0.05,
    composted: 0.02
  }
}

// ============================================
// NEW: Carbon Calculation Engine
// ============================================
export const calculateCarbonFootprint = (manualData, healthData = null) => {
  const result = {
    mobility: 0.00,
    homeEnergy: 0.00,
    diet: 0.00,
    shopping: 0.00,
    waste: 0.00,
    total: 0.00,
    lastCalculated: new Date().toISOString()
  }

  // If no data provided, return all zeros
  if (!manualData && !healthData) {
    return result
  }

  // MOBILITY CALCULATION
  if (manualData?.transport) {
    const { primaryMode, kmPerDay, vehicleType } = manualData.transport
    const factor = EMISSION_FACTORS.transport[vehicleType || primaryMode] || 0
    // Monthly calculation (km/day * 30 days)
    result.mobility = parseFloat((kmPerDay * 30 * factor).toFixed(2))
  }

  // HOME ENERGY CALCULATION
  if (manualData?.homeEnergy) {
    const { electricityKwh, gasUsage, gasType, householdSize } = manualData.homeEnergy
    const electricityEmission = (electricityKwh || 0) * EMISSION_FACTORS.homeEnergy.electricity
    const gasEmission = (gasUsage || 0) * (EMISSION_FACTORS.homeEnergy[gasType] || EMISSION_FACTORS.homeEnergy.lpg)
    // Divide by household size for per-person footprint
    result.homeEnergy = parseFloat(((electricityEmission + gasEmission) / (householdSize || 1)).toFixed(2))
  }

  // DIET CALCULATION
  if (manualData?.diet) {
    const { dietType, mealsPerDay } = manualData.diet
    const dailyFactor = EMISSION_FACTORS.diet[dietType] || EMISSION_FACTORS.diet.vegetarian
    // Monthly calculation
    result.diet = parseFloat((dailyFactor * 30).toFixed(2))
  }

  // SHOPPING CALCULATION
  if (manualData?.shopping) {
    const { monthlySpend, category } = manualData.shopping
    const factor = EMISSION_FACTORS.shopping[category] || EMISSION_FACTORS.shopping.other
    result.shopping = parseFloat((monthlySpend * factor).toFixed(2))
  }

  // WASTE CALCULATION
  if (manualData?.waste) {
    const { bagsPerWeek, householdSize, disposalMethod } = manualData.waste
    // Assume 5kg per bag, 4 weeks per month
    const monthlyWasteKg = (bagsPerWeek || 0) * 5 * 4
    const factor = EMISSION_FACTORS.waste[disposalMethod] || EMISSION_FACTORS.waste.landfill
    result.waste = parseFloat(((monthlyWasteKg / (householdSize || 1)) * factor).toFixed(2))
  }

  // TOTAL
  result.total = parseFloat((
    result.mobility + 
    result.homeEnergy + 
    result.diet + 
    result.shopping + 
    result.waste
  ).toFixed(2))

  return result
}

// ============================================
// NEW: Check if user has completed onboarding
// ============================================
export const hasCompletedOnboarding = (user) => {
  return user?.onboardingComplete === true && 
         user?.carbonFootprint?.lastCalculated !== null &&
         user?.age !== null; // NEW: Must have age
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      const parsed = JSON.parse(saved)
      // ============================================
      // NEW: Migrate old users to new structure
      // If old user data doesn't have onboardingComplete, set it
      // ============================================
      if (parsed && !parsed.hasOwnProperty('onboardingComplete')) {
        parsed.onboardingComplete = false
        parsed.manualData = null
        parsed.carbonFootprint = {
          mobility: 0.00, homeEnergy: 0.00, diet: 0.00,
          shopping: 0.00, waste: 0.00, total: 0.00, lastCalculated: null
        }
        localStorage.setItem('user', JSON.stringify(parsed))
      }

      // NEW: Migrate users who don't have age (force re-onboarding)
      if (parsed && !parsed.hasOwnProperty('age')) {
        parsed.age = null
        parsed.ageGroup = null
        parsed.onboardingComplete = false
        localStorage.setItem('user', JSON.stringify(parsed))
      }
      return parsed
    }
    return null
  })

  // ============================================
  // CHANGED: ecoPoints starts at 0, not 7200
  // Users earn points through real challenges
  // ============================================
  const [ecoPoints, setEcoPoints] = useState(() => {
    const saved = localStorage.getItem('ecoPoints')
    return saved ? parseInt(saved) : 0
  })

  const [notifications, setNotifications] = useState([])

  // ============================================
  // NEW: Save ecoPoints to localStorage when changed
  // ============================================
  useState(() => {
    if (ecoPoints > 0) {
      localStorage.setItem('ecoPoints', ecoPoints.toString())
    }
  })

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      ecoPoints, 
      setEcoPoints, 
      notifications, 
      setNotifications,
      // NEW: Expose calculation utilities to all components
      calculateCarbonFootprint,
      EMISSION_FACTORS
    }}>
      <Routes>
        {/* ============================================ */}
        {/* PUBLIC ROUTE: Login */}
        {/* If logged in + onboarding complete → dashboard */}
        {/* If logged in + onboarding NOT complete → onboarding */}
        {/* If not logged in → login page */}
        {/* ============================================ */}
        <Route 
          path="/" 
          element={
            user ? (
              hasCompletedOnboarding(user) ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Login />
            )
          } 
        />

        {/* ============================================ */}
        {/* NEW ROUTE: Onboarding (semi-protected) */}
        {/* Accessible only when logged in but not onboarded */}
        {/* ============================================ */}
        <Route 
          path="/onboarding" 
          element={
            user ? (
              hasCompletedOnboarding(user) ? (
                <Navigate to="/dashboard" />
              ) : (
                <Onboarding />
              )
            ) : (
              <Navigate to="/" />
            )
          } 
        />

        {/* ============================================ */}
        {/* PROTECTED ROUTES: Only accessible when logged in */}
        {/* Layout will also guard against incomplete onboarding */}
        {/* ============================================ */}
        <Route element={user ? <Layout /> : <Navigate to="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch all - redirect based on auth state */}
        <Route 
          path="*" 
          element={
            user ? (
              hasCompletedOnboarding(user) ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/" />
            )
          } 
        />
      </Routes>
    </AppContext.Provider>
  )
}

export default App
