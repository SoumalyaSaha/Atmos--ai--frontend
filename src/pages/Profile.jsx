import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Award, 
  Settings, 
  Bell, 
  Moon, 
  Sun,
  LogOut, 
  Shield,
  Leaf,
  TrendingUp,
  Calendar,
  Zap,
  Pencil
} from 'lucide-react'
import { AppContext } from '../App'
import api from '../utils/api'

export default function Profile() {
  const { user, setUser } = useContext(AppContext)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState('')

  // Check if dark mode is currently active
  const isDarkMode = () => {
    return document.documentElement.classList.contains('dark')
  }

  const [settings, setSettings] = useState({
    notifications: true,
    weeklyReports: true,
    challengeReminders: true,
    darkMode: isDarkMode(),
  })

  const toggleSetting = (key) => {
    setSettings(prev => {
      const newValue = !prev[key]
      
      if (key === 'darkMode') {
        // Toggle dark class on html element
        if (newValue) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        // Save preference
        localStorage.setItem('theme', newValue ? 'dark' : 'light')
      }
      
      return { ...prev, [key]: newValue }
    })
  }

  // Sync settings with actual dark mode state on mount
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      darkMode: isDarkMode()
    }))
  }, [])

  useEffect(() => {
    if (profile?.name || profile?.displayName) {
      setNewName(profile.displayName || profile.name)
    }
  }, [profile])

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await api.get('/user/profile')
      setProfile(res.data.profile)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNameUpdate = async () => {
    const nameToSave = newName.trim() || profile?.name || 'Eco Warrior'
    const updatedProfile = { ...profile, displayName: nameToSave, name: nameToSave }
    setProfile(updatedProfile)
    
    if (setUser) {
      setUser(prev => ({ ...prev, displayName: nameToSave, name: nameToSave }))
    }
    
    try {
      await api.patch('/user/profile', { name: nameToSave, displayName: nameToSave })
    } catch (e) {
      console.error('Failed to update name:', e)
    }
    
    setIsEditingName(false)
  }

  const handleCancel = () => {
    setNewName(profile?.displayName || profile?.name || '')
    setIsEditingName(false)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 border-2 border-atmos-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const levelInfo = profile?.levelProgress || {
    currentLevel: 1,
    nextLevel: 2,
    currentPoints: 0,
    pointsToNext: 100,
    percentage: 0
  }

  const weeklyProgress = profile?.weeklyProgress || [0, 0, 0, 0, 0, 0, 0]
  const maxWeekly = Math.max(...weeklyProgress, 1)
  const normalizedWeekly = weeklyProgress.map(v => (v / maxWeekly) * 100)

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 text-center"
      >
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-atmos-500 to-ocean-500 flex items-center justify-center text-4xl mx-auto shadow-lg shadow-atmos-900/30">
            {user?.picture ? (
              <img src={user.picture} alt="avatar" className="w-24 h-24 rounded-full" />
            ) : (
              profile?.avatar || '🌱'
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-atmos-500 rounded-full flex items-center justify-center border-4 border-gray-900">
            <Leaf className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="mt-4">
          {isEditingName ? (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameUpdate()
                  if (e.key === 'Escape') handleCancel()
                }}
                className="bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm border border-gray-700 focus:border-atmos-500 focus:outline-none w-48"
                placeholder="Enter your name"
                autoFocus
              />
              <button 
                onClick={handleNameUpdate}
                className="text-emerald-400 text-sm font-medium hover:text-emerald-300 px-2 py-1 rounded-lg hover:bg-emerald-900/20 transition-colors"
              >
                Save
              </button>
              <button 
                onClick={handleCancel}
                className="text-gray-400 text-sm font-medium hover:text-gray-300 px-2 py-1 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-bold text-white">
                {profile?.displayName || profile?.name || 'Eco Warrior'}
              </h2>
              <button 
                onClick={() => setIsEditingName(true)}
                className="p-1 text-gray-500 hover:text-atmos-400 hover:bg-gray-800 rounded-lg transition-colors"
                title="Edit name"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
        
        <p className="text-gray-400 text-sm">{profile?.email || 'No email set'}</p>
        <p className="text-xs text-gray-600 mt-1">
          Member since {profile?.joinDate ? new Date(profile.joinDate).getFullYear() : '2026'}
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <div className="text-center px-4 py-2 bg-gray-800/40 rounded-xl">
            <p className="text-lg font-bold text-atmos-400">{profile?.currentStreak ?? 0}</p>
            <p className="text-xs text-gray-500">Day Streak</p>
          </div>
          <div className="text-center px-4 py-2 bg-gray-800/40 rounded-xl">
            <p className="text-lg font-bold text-ocean-400">{profile?.totalCo2Saved ?? 0} kg</p>
            <p className="text-xs text-gray-500">CO₂ Saved</p>
          </div>
          <div className="text-center px-4 py-2 bg-gray-800/40 rounded-xl">
            <p className="text-lg font-bold text-amber-400">{profile?.badges?.length ?? 0}</p>
            <p className="text-xs text-gray-500">Badges</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-atmos-600 text-white'
                  : 'bg-gray-800/60 text-gray-400 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-atmos-900/50 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-atmos-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Eco Points</p>
                    <p className="text-xl font-bold text-white">{(profile?.ecoPoints ?? 0).toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-atmos-500 to-atmos-400 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${levelInfo.percentage}%` }} 
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Level {levelInfo.currentLevel} • {levelInfo.currentPoints} to Level {levelInfo.nextLevel}
                </p>
              </div>

              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-ocean-900/50 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-ocean-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Weekly Progress</p>
                    <p className="text-xl font-bold text-white">
                      {weeklyProgress.reduce((a,b) => a+b, 0) > 0 ? '+' : ''}
                      {weeklyProgress.reduce((a,b) => a+b, 0)}
                    </p>
                  </div>
                </div>
                <div className="flex items-end gap-1 h-8">
                  {normalizedWeekly.map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-ocean-500/30 rounded-t transition-all duration-300" 
                      style={{ height: `${Math.max(5, h)}%` }} 
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {(profile?.recentActivity || []).length > 0 ? (
                  profile.recentActivity.map((activity, i) => {
                    const Icon = activity.icon === 'Award' ? Award : 
                                 activity.icon === 'Calendar' ? Calendar :
                                 activity.icon === 'Leaf' ? Leaf :
                                 activity.icon === 'Shield' ? Shield :
                                 activity.icon === 'TrendingUp' ? TrendingUp :
                                 Zap;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                          <Icon className={`w-4 h-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.desc}</p>
                        </div>
                        <span className="text-xs text-gray-600">{activity.time}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No activity yet. Start by logging your carbon footprint!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(profile?.badges || []).length > 0 ? (
              profile.badges.map((badge, i) => (
                <motion.div
                  key={badge.id || i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-5 text-center card-hover"
                >
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <h4 className="text-sm font-semibold text-white">{badge.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    {badge.earned ? new Date(badge.earned).toLocaleDateString() : 'Recently earned'}
                  </p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No badges yet. Complete challenges to earn them!</p>
                <p className="text-xs text-gray-600 mt-2">Try completing a challenge or saving CO₂</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            {[
              { icon: Bell, label: 'Push Notifications', desc: 'Get notified about challenges and achievements', key: 'notifications' },
              { icon: Calendar, label: 'Weekly Reports', desc: 'Receive weekly carbon footprint summary', key: 'weeklyReports' },
              { icon: Zap, label: 'Challenge Reminders', desc: 'Daily reminders for active challenges', key: 'challengeReminders' },
              { icon: settings.darkMode ? Moon : Sun, label: 'Dark Mode', desc: settings.darkMode ? 'Currently using dark theme' : 'Currently using light theme', key: 'darkMode' },
            ].map((setting) => {
              const Icon = setting.icon
              return (
                <div 
                  key={setting.key} 
                  onClick={() => toggleSetting(setting.key)}
                  className="glass-card p-4 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{setting.label}</p>
                      <p className="text-xs text-gray-500">{setting.desc}</p>
                    </div>
                  </div>
                  <div 
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings[setting.key] ? 'bg-atmos-600' : 'bg-gray-600'
                    }`}
                  >
                    <div 
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </div>    
                </div>
              )
            })}

            <button
              onClick={() => {
                localStorage.clear()
                setUser(null)
                window.location.replace('/')
              }}
              className="w-full glass-card p-4 flex items-center justify-center gap-2 text-red-400 hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
