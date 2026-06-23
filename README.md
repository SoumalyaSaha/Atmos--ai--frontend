<div align="center">

# 🌱 Atmos AI

### *Your Personal AI-Powered Carbon Footprint Tracker*

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://atmos-aicarbon.vercel.app)
[![React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

**🌐 [Live Demo → https://atmos-aicarbon.vercel.app](https://atmos-aicarbon.vercel.app/)**

[Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📸 App Preview

<div align="center">

| 🏠 Dashboard | 🤖 AI Insights | 📊 Leaderboard |
|:---:|:---:|:---:|
| <img src="/mnt/agents/upload/Screenshot_2026-06-21-09-53-18-14_e4424258c8b8649f6e67d283a50a2cbc.jpg" width="250" /> | <img src="/mnt/agents/upload/Screenshot_2026-06-21-09-53-25-02_e4424258c8b8649f6e67d283a50a2cbc.jpg" width="250" /> | <img src="/mnt/agents/upload/Screenshot_2026-06-21-09-54-20-45_e4424258c8b8649f6e67d283a50a2cbc.jpg" width="250" /> |

| 💬 AI Chat Assistant | 👤 Profile Overview | 🎯 Active Challenges |
|:---:|:---:|:---:|
| <img src="/mnt/agents/upload/Screenshot_2026-06-21-09-55-01-37_e4424258c8b8649f6e67d283a50a2cbc.jpg" width="250" /> | <img src="/mnt/agents/upload/Screenshot_2026-06-21-09-55-11-19_e4424258c8b8649f6e67d283a50a2cbc.jpg" width="250" /> | <img src="/mnt/agents/upload/Screenshot_2026-06-21-09-55-31-01_e4424258c8b8649f6e67d283a50a2cbc.jpg" width="250" /> |

| ⚙️ Settings (Dark/Light) | 🧭 Navigation Drawer | 🏆 Community Rankings |
|:---:|:---:|:---:|
| <img src="/mnt/agents/upload/Screenshot_2026-06-21-09-55-47-12_e4424258c8b8649f6e67d283a50a2cbc.jpg" width="250" /> | <img src="/mnt/agents/upload/Screenshot_2026-06-21-10-04-11-78_e4424258c8b8649f6e67d283a50a2cbc.jpg" width="250" /> | <img src="/mnt/agents/upload/Screenshot_2026-06-21-09-58-32-52_e4424258c8b8649f6e67d283a50a2cbc.jpg" width="250" /> |

</div>

---

## ✨ Features

### 🔐 Seamless Authentication
- **Google OAuth 2.0** integration with JWT token handling
- Smart user detection — returning users skip onboarding and land directly on the dashboard
- Secure session management with MongoDB-backed user profiles

### 📊 Real-Time Carbon Dashboard
- **Total CO₂ Tracking** — Monitor your monthly carbon footprint at a glance
- **Sector Breakdown** — Visualize emissions across Transport, Home Energy, Diet, Shopping, and more
- **Interactive Charts** — Beautiful donut charts for carbon breakdown by category
- **Trend Indicators** — Instant feedback on whether your footprint is Low, Moderate, or High

### 🤖 AI-Powered Insights (Gemini 2.5 Flash)
- **Personalized Analysis** — AI reads your actual footprint data and generates contextual insights
- **Smart Recommendations** — Actionable tips ranked by impact potential (e.g., "Reduce Red Meat → Save 10-25 kg CO₂e/month")
- **Conversational Assistant** — Chat with Atmos Assistant for real-time advice on reducing emissions
- **Quick-Action Chips** — One-tap prompts for "Reduce Transport", "Save Energy", "Diet Tips"

### 🏆 Gamified Eco Challenges
- **Auto-Generated Challenges** — The app intelligently monitors your activity and generates **6 personalized challenges**
- **3-Day Streak System** — Log in for **3 consecutive days** to unlock a **fresh set of challenges**
- **Progress Tracking** — Visual progress bars and completion percentages for each challenge
- **Eco Points Rewards** — Earn points for completing challenges and maintaining streaks
- **Challenge Categories**: Transport, Energy, Diet, Shopping, Waste, and Lifestyle

### 📈 Community Leaderboard
- **Benchmark Comparisons** — Compare your footprint against:
  - Your personal average
  - Your age group (e.g., 18-24)
  - India national average
  - World average
- **Eco Warrior Rankings** — Compete with the community and climb the leaderboard
- **Achievement Stats** — Day streaks, total CO₂ saved, and badges earned

### 👤 User Profile & Settings
- **Comprehensive Profile** — Google avatar, email, member since date, edit functionality
- **Stats Overview** — Day streak, total CO₂ saved, badges collected
- **Eco Points & Leveling** — Progress through levels (Level 1 → Level 2) by earning points
- **Weekly Progress Tracking** — Visual indicators of your weekly eco-activity
- **Settings Panel**:
  - 🔔 Push Notifications (challenges & achievements)
  - 📅 Weekly Reports (carbon footprint summaries)
  - ⚡ Challenge Reminders (daily nudges)
  - 🌙 Dark Mode / Light Mode toggle

### 🧮 Smart Onboarding
- **Age-Based Calibration** — Enter your age for accurate peer-group comparisons
- **Privacy-First** — Age is used only for comparison, never shared
- **One-Flow Setup** — Seamless transition from signup to dashboard

---

## 🏗️ System Architecture

### Authentication Flow

```
┌─────────────────┐
│  Google Sign In  │
│  (same account) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  JWT decoded    │
│  googleId = "123"│  ← Same ID as before
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  POST /api/auth/login   │
│  body: { googleId: "123" } │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  User.findOne({ googleId: "123" }) │
│  → FOUND in MongoDB!         │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  existingUser = true          │
│  isNewUser = false            │
│  Returns onboardingComplete: true │
│  Returns carbonFootprint data   │
│  Returns activeChallenges     │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Login.jsx receives response │
│  isExistingUser = true        │
│  navigate('/dashboard')       │  ← SKIPS ONBOARDING
└─────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | Google OAuth 2.0 + JWT |
| **AI Engine** | Gemini 2.5 Flash API |
| **Charts** | Chart.js |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |
| **Deployment** | Vercel (Frontend) + Railway (Backend) |
| **State Management** | React Context API + useReducer |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 18.0.0`
- MongoDB Atlas account (or local MongoDB instance)
- Google Cloud Console project with OAuth 2.0 credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/atmos-ai.git
cd atmos-ai

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Variables

Create `.env` files in both `/client` and `/server` directories:

**Client (`client/.env`)**
```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_API_URL=http://localhost:5000/api
```

**Server (`server/.env`)**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GEMINI_API_KEY=your_gemini_api_key
```

### Running Locally

```bash
# Start the backend server (from /server)
npm run dev

# Start the frontend dev server (from /client, in a new terminal)
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
atmos-ai/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/           # Dashboard widgets & charts
│   │   │   ├── Leaderboard/         # Comparison & ranking UI
│   │   │   ├── AIChat/              # Atmos Assistant chat interface
│   │   │   ├── Profile/             # User profile, challenges, settings
│   │   │   ├── Onboarding/          # Age input & welcome flow
│   │   │   ├── Navigation/          # Sidebar & bottom nav
│   │   │   └── common/              # Reusable UI components
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Auth state & Google OAuth
│   │   │   └── ThemeContext.jsx     # Dark/light mode management
│   │   ├── hooks/
│   │   │   ├── useCarbonData.js     # Fetch & manage footprint data
│   │   │   ├── useChallenges.js     # Challenge progress & streaks
│   │   │   └── useAIChat.js         # Gemini API integration
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Google Sign-In handler
│   │   │   ├── Dashboard.jsx        # Main dashboard view
│   │   │   ├── Leaderboard.jsx      # Community comparisons
│   │   │   ├── AIChat.jsx           # AI assistant page
│   │   │   ├── Profile.jsx          # Profile & settings
│   │   │   └── Onboarding.jsx       # First-time user flow
│   │   └── utils/
│   │       └── api.js               # Axios instance & API helpers
│   └── public/
│
├── server/                          # Node.js Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Login, JWT, user lookup
│   │   ├── carbonController.js        # Footprint CRUD & calculations
│   │   ├── challengeController.js   # Challenge generation & tracking
│   │   ├── leaderboardController.js # Aggregated stats & rankings
│   │   └── aiController.js          # Gemini API proxy & prompts
│   ├── models/
│   │   ├── User.js                  # User schema (googleId, profile)
│   │   ├── CarbonFootprint.js       # Emission data schema
│   │   ├── Challenge.js             # Challenge schema & progress
│   │   └── ActivityLog.js           # Streak & activity tracking
│   ├── routes/
│   │   ├── auth.js
│   │   ├── carbon.js
│   │   ├── challenges.js
│   │   ├── leaderboard.js
│   │   └── ai.js
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification
│   │   └── errorHandler.js
│   └── utils/
│       └── geminiPrompts.js         # AI prompt templates
│
└── README.md
```

---

## 🎯 Challenge & Streak System

Atmos AI keeps users engaged through an intelligent challenge system:

### How It Works

1. **Auto-Monitoring** — The app tracks your daily logins, footprint updates, and eco-activities
2. **Challenge Generation** — Based on your highest emission categories, the AI generates **6 personalized challenges**
3. **Streak Rewards** — Maintain a **3-day login streak** to unlock a **fresh batch of challenges**
4. **Progress Tracking** — Each challenge shows real-time progress with visual indicators
5. **Eco Points** — Completing challenges earns points that contribute to your level progression

### Challenge Types

| Category | Example Challenge | Potential Savings |
|----------|------------------|-------------------|
| 🥩 Diet | Reduce Red Meat Consumption | 10-25 kg CO₂e/month |
| ⚡ Energy | Optimize Home Energy Use | 5-15 kg CO₂e/month |
| 🛒 Shopping | Shop Mindfully & Buy Less | 5-10 kg CO₂e/month |
| 🚲 Transport | Choose Active/Public Transport | 1-3 kg CO₂e/month |

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Google OAuth login/registration |
| `GET` | `/api/auth/me` | Get current user profile |

### Carbon Footprint
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/carbon` | Get user's carbon data |
| `POST` | `/api/carbon/calculate` | Submit new footprint calculation |
| `GET` | `/api/carbon/breakdown` | Get sector-wise breakdown |

### Challenges
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/challenges` | Get active challenges |
| `POST` | `/api/challenges/checkin` | Check in to a challenge |
| `GET` | `/api/challenges/streak` | Get current streak info |

### Leaderboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/leaderboard/compare` | Compare with age group/country/world |
| `GET` | `/api/leaderboard/rankings` | Get community rankings |

### AI Assistant
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/ai/chat` | Send message to Atmos Assistant |
| `GET` | `/api/ai/insights` | Get AI-generated footprint insights |

---

## 🛣️ Roadmap

- [x] Google OAuth authentication with JWT
- [x] Carbon footprint calculator & dashboard
- [x] AI-powered insights via Gemini 2.5 Flash
- [x] Community leaderboard & comparisons
- [x] Gamified challenges with streak system
- [x] Dark/Light mode toggle
- [x] Push notifications & weekly reports
- [ ] 🔄 Real-time activity tracking via device sensors
- [ ] 🔄 Carbon offset marketplace integration
- [ ] 🔄 Social sharing & team challenges
- [ ] 🔄 Push notification service (Firebase)
- [ ] 🔄 PWA support for mobile install

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) for the AI engine
- [Chart.js](https://www.chartjs.org/) for beautiful data visualization
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for crisp, modern icons
- [Vercel](https://vercel.com/) for seamless deployment
- [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud database hosting

---

<div align="center">

### 🌍 *Every small action counts. Track it. Reduce it. Offset it.*

**[🌐 Live Demo](https://atmos-aicarbon.vercel.app/)** · **[⬆ Back to Top](#-atmos-ai)**

</div>
