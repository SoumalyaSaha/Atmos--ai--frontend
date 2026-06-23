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

| 🏠 Landing UI | 📊 Comparison Dashboard | 🎯 Sustainability Challenges |
|:---:|:---:|:---:|
| <img src="IMG-20260623-WA0004.jpg" width="250" /> | <img src="Screenshot_2026-06-23-14-31-44-40_99c04817c0de5652397fc8b56c3b3817.jpg" width="250" /> | <img src="Screenshot_2026-06-23-14-32-14-54_99c04817c0de5652397fc8b56c3b3817.jpg" width="250" /> |

</div>

---

## ✨ Core Technical Innovations

### ⚡ 1. Privacy-First, Edge-Computing Architecture
Instead of routing processing loops continuously to high-latency cloud servers, Atmos AI features an **offline-first local execution model**.
* **Instant Calibration:** The on-device engine instantly handles footprint calculations based on India's official national baseline emission factors.
* **Green Computing:** Minimizing continuous server-side calculations significantly reduces the digital carbon overhead of the app itself.
* **Data Security:** Core user behavioral telemetry data stays fully encrypted at the edge until explicitly synced with the remote cloud database.

### 🧠 2. Multi-LLM Hybrid Routing & Intelligent Caching
The application backend is built to overcome standard production limits regarding heavy AI usage and operating costs:
* **Dynamic API Rotation:** Features a custom load-balancing array that intelligently cycles requests across **4 Gemini API keys** and **3 Groq API keys** concurrently to ensure continuous availability and fault tolerance.
* **MongoDB Caching Layer:** Repetitive or standard environmental analysis queries are instantly caught and served by a high-efficiency MongoDB lookup layer, bypassing external API delays and cutting overhead by up to 60%.

### 🎮 3. Algorithmic Engagement & Dynamic Difficulty Adjustment (DDA)
Atmos AI abandons boring, static logs for an active behavioral correction loop:
* **Dynamic Difficulty Adjustment (DDA):** As the platform notes a sustained drop in a user's carbon footprint, a backend algorithm automatically scales up the depth and complexity of daily tasks to maintain optimal user engagement.
* **3-Day Streak Unlock State:** A core programmatic state-management system gatekeeps premier progression rewards, explicitly engineered to optimize Daily Active Users (DAU) and establish recurring habits.

---

## 🚀 Key Functional Features

### 🔐 Seamless Authentication
- **Google OAuth 2.0** integrated with secure JWT token handshakes.
- Returning users bypass onboarding configurations completely, loading state-cached dashboard metrics instantly.

### 📊 Samsung Health-Inspired Comparison Dashboard
- **Peer-Group Analytics:** Clear comparison modules highlighting individual metrics against regional age groups, national baselines, and global averages.
- **Native UI Design:** Formatted to mirror the intuitive, high-engagement layout mechanics found across premium healthcare platforms like **Samsung Health**.

### 🤖 AI Insights & Conversational Assistant
- Contextual summaries compiled instantly by **Gemini 2.5 Flash** reading user footprint data directly.
- Quick-action interactive prompt chips allow simple, one-tap strategy inquiries.

---

## 🔮 Roadmap: Native Samsung Ecosystem Integration

Atmos AI’s backend layers are uniquely architected to natively interface with the broader Samsung ecosystem:

1. **Samsung Health SDK Integration:** Direct ingestion of passive background step-counts, running telemetry, and active workout logs via the **Samsung Galaxy Watch** series to dynamically update transportation offsets without requiring any manual entry.
2. **SmartThings IoT Smart Home Sync:** Native hookup to the **Samsung SmartThings** framework to monitor real-time energy profiles of linked smart appliances (HVAC, smart washing machines, refrigerators), serving up immediate AI-driven power-efficiency configurations.

---

## 🏗️ System Architecture

### Authentication Flow
